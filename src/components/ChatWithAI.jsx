import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  Suspense,
} from "react";
import { GoogleGenAI } from "@google/genai";
import { Send, Mic } from "lucide-react";
import { ref, onValue, set, push, getDatabase } from "firebase/database";
import { getDatabase as getRTDB } from "firebase/database";
import { AuthContext } from "../context/AuthContext";
import ThinkingLoader from "./ThinkingLoader";
import { motion } from "framer-motion";
import LogIn from "../pages/auth/login";
const ChatMessages = React.lazy(() => import("./ChatMessages"));

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatWithAI() {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [UserChat, setUserChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [unauthMessageCount, setUnauthMessageCount] = useState(0);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const { user } = useContext(AuthContext);
  const rtdb = getRTDB();

  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    
  }, [chat, loading]);

  useEffect(() => {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      let transcript = "";
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        transcript += e.results[i][0].transcript;
      }
      setUserInput(transcript);
    };

    recognitionRef.current = recognition;
  }, []);
 
  useEffect(() => {
    if (!user?.isLogin || !user?.uid) return;
 
    const chatRef = ref(rtdb, `chats/${user.uid}`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.values(data) : [];
      const sorted = messages.sort((a, b) => a.timestamp - b.timestamp);
      setChat(sorted);
    });

    return () => unsubscribe();
  }, [user?.uid, user?.isLogin]);

  const saveMessage = async (message) => {
    if (!user?.isLogin || !user?.uid)
      
      return; 
    const msgRef = ref(rtdb, `chats/${user.uid}`);
    const newMsgRef = push(msgRef);
    await set(newMsgRef, {
      ...message,
      timestamp: Date.now(),
    });
  };

  const handleSend = async () => {
  if (!userInput.trim()) return;

  if (!user?.isLogin && unauthMessageCount >= 3) {
  setChat(prev => [
    ...prev,
    {
      role: "bot",
      text: "⚠️ You've reached the limit of 3 messages. Please log in to continue chatting.",
      timestamp: Date.now(),
    },
  ]);
  setUserInput("");
  setShowLoginOverlay(true); 
  return;
}


  const userMsg = { role: "user", text: userInput };
  setUserInput("");
  setLoading(true);

  if (user?.isLogin) {
    await saveMessage(userMsg);
  } else {
    setChat((prev) => [...prev, { ...userMsg, timestamp: Date.now() }]);
    setUnauthMessageCount((count) => count + 1);
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userInput,
    });

    const output = result.candidates[0].content.parts[0].text;
    const botMsg = { role: "bot", text: output };

    if (user?.isLogin) {
      await saveMessage(botMsg);
    } else {
      setChat((prev) => [...prev, { ...botMsg, timestamp: Date.now() }]);
    }

    // const utterance = new SpeechSynthesisUtterance(output);
    // utterance.lang = "en-US";
    // speechSynthesis.speak(utterance);
  } catch (err) {
    console.error("Gemini error:", err);
    const fallback = {
      role: "bot",
      text: "Something went wrong. Try again.",
    };

    if (user?.isLogin) {
      await saveMessage(fallback);
    } else {
      setChat((prev) => [...prev, { ...fallback, timestamp: Date.now() }]);
    }
  } finally {
    setLoading(false);
  }
};


  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      listening ? recognitionRef.current.stop() : recognitionRef.current.start();
    }
  };
 
  return (
    
    <div className=" z-50">
      <motion.div
        initial={{ opacity: 0, y: 0, zIndex: -10 }}
        animate={{ opacity: 1, y: 0, zIndex: -10 }}
        exit={{ opacity: 0, y: 0, zIndex: -10 }}
        transition={{ duration: 1 }}
        className="z-50"
      >
      <div className="min-w-4xl -z-1 max-w-4xl w-full mx-auto px-4 pt-2 pb-4 flex flex-col relative">
        <div
          ref={chatContainerRef}
          className=" rounded-3xl  shadow-inner h-svh scroll-m-28 lg:h-[700px] overflow-y-auto space-y-4 py-16 pt-20 scroll-smooth scrollbar-custom"
          >
          <Suspense fallback={<div className="text-sm text-gray-800">Loading messages...</div>}>
            <ChatMessages chat={chat} />
          </Suspense>

          {loading && <ThinkingLoader />}
        </div>

          <div className="fixed  w-full md:w-12/12 lg:w-9/12 rounded-t-xl bottom-0 grid self-center py-3 px-3 md:px-0 lg:px-32 bg-gray-900">
            <motion.div
      initial={{ opacity: 0, y: 10, zIndex: -10 }}
      animate={{ opacity: 1, y: 0 , zIndex: -10}}
      exit={{ opacity: 0, y: 0, zIndex: -10 }}
      transition={{ duration: 1 }}
      className="-z-50"
            >
              
          <div className="flex gap-2 self-center shadow-black drop-shadow-md pt-1">
            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 p-3 rounded-xl w-full GlassEffect focus:outline-none text-white"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all text-white p-3 rounded-xl"
            >
              <Send size={20} />
            </button>
            <button
              onClick={handleVoiceInput}
              className={`${
                listening ? "bg-red-500" : "bg-blue-500"
              } text-white p-3  rounded-xl z-10`}
              title={listening ? "Stop Listening" : "Start Voice Input"}
            >
              <Mic size={20} />
            </button>
          </div>
            </motion.div>

          </div>
          
      </div>
            {showLoginOverlay && (
  <div className="absolute top-0 z-50 w-full h-screen  backdrop-blur-sm flex items-center justify-center">
    <div className=" w-full max-w-md relative h-screen">
      <LogIn />
      
    </div>
  </div>
)}
    </motion.div>
      </div>
      
  );
}

