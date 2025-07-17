import { message } from "antd";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import GoogleIcon from "../../assets/images/googleIcon.svg";
import { motion } from "framer-motion";
function SignUp() {
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const ref = doc(db, "users", user.uid);
        setDoc(ref, {
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
          displayName: user.displayName,
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const signedUpUser = userCredential.user;

      const userCollection = collection(db, "users");
      await addDoc(userCollection, {
        email: signedUpUser.email,
        uid: signedUpUser.uid,
        displayName: Username,
      });

      message.success("Account Created Successfully");
      navigate("/login");
      await signOut(authInstance);
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);

      if (error.code === "auth/email-already-in-use") {
        message.info("Email already exists");
      } else {
        message.error("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="backgroundImage h-screen flex justify-center items-center "
    >
      <div className="flex justify-center   ">
        <div className="p-7 rounded-2xl border border-white/20 shadow-xl backdrop-blur-xl bg-white/10 text-white">
          <div className="text-center mb-4">
            <p className=" font-extrabold text-3xl font-sans ">Sign Up</p>
          </div>
          <form onSubmit={handleSignUp}>
            <div>
              <label>Name:</label>
            </div>
            <div>
              <input
                className="w-72 rounded focus:outline-none focus:border-none py-1.5 px-2 bg-gray-900/80"
                type="text"
                placeholder="Enter you name"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <label>Email:</label>
            </div>
            <div>
              <input
                className="w-72 rounded focus:outline-none focus:border-none py-1.5 px-2 bg-gray-900/80"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <label>Password:</label>
            </div>
            <div className="flex">
              <input
                className="w-72 rounded focus:outline-none focus:border-none py-1.5 px-2 bg-gray-900/80"
                type={type}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="flex justify-around items-center"
                onClick={handleToggle}
              >
                <Icon className="absolute mr-10 " icon={icon} size={22} />
              </span>
            </div>
            <button
              className={`mt-3 py-2.5 w-72 rounded bg-white text-gray-900 transition-all flex justify-center items-center ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div>
            <Link to="/login">
              <button className="w-72 learn-btn transition-all  rounded mt-3  focus:outline-none active:outline-none active:border-none focus:border-none py-1.5 px-2 bg-gray-900 text-white ">
                Already have an account?
              </button>
            </Link>
          </div>
          <button
            className="w-72 learn-btn transition-all flex  rounded mt-3  focus:outline-none active:outline-none active:border-none focus:border-none py-1.5 px-2 bg-gray-900 text-white justify-center items-center"
            onClick={handleLogin}
          >
            <img className="w-9 pr-2" src={GoogleIcon} alt="" />
            Sign Up with Google
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUp;
