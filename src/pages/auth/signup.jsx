import {  message } from "antd";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import GoogleIcon from "../../assets/images/googleIcon.svg";
import { motion } from "framer-motion";
function SignUp() {
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
          navigate("/Login");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

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
      console.log(Username)
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
    <div className="backgroundImage h-screen flex justify-center items-center bg-gray-900">
       <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1 }}
      className=""
      >
        
      <div className="flex justify-center   ">
        <div className="p-7 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md bg-white/10 text-white">
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
                <Icon className="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
            <button
              className="mt-3 py-2.5 w-72 rounded bg-white text-gray-900  transition-all"
              type="submit"
              >
              Sign Up
              {error && console.log(error)}
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
    </div>
  );
}

export default SignUp;
