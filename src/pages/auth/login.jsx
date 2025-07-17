import { message } from "antd";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";
function LogIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [icon, setIcon] = useState(eyeOff);

  const [type, setType] = useState("password");

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoading(false);
        navigate("/");
        message.success("Login Successfully");
      })
      .catch((error) => {
        setError(error.message);
        message.error("Invalid Email/Password");
        setLoading(false);
      });
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
    <div className="flex h-screen  justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1 }}
        className=""
      >
        <div className="flex justify-center  items-center shadow-2xl">
          <div className="p-7 rounded-2xl border border-white/20 shadow-xl backdrop-blur-sm bg-white/10 text-white">
            <div className="text-center mb-4">
              <p className=" font-extrabold text-3xl font-sans ">Log In</p>
            </div>

            <form onSubmit={handleSignIn}>
              <div>
                <label>Email:</label>
                <div>
                  <input
                    className="w-72 rounded focus:outline-none focus:border-none py-2 px-2.5 bg-gray-900/80 text-white"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-3">
                <label>Password:</label>
                <div className="flex">
                  <input
                    className="w-72 rounded focus:outline-none focus:border-none py-2 px-2.5 bg-gray-900/80 text-white"
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
              </div>
              <button
                className="mt-3 py-2.5 w-72 rounded bg-white text-gray-900 transition-all disabled:opacity-50"
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
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            {error && console.log(error)}
            <div>
              <Link to="/sign-up">
                <button className="w-72  transition-all flex justify-center gap-2  rounded mt-3 focus:rounded focus:outline-none active:outline-none active:border-none focus:border-none py-2 px-2 bg-gray-900 text-white ">
                  Create an account{" "}
                  <span className="-rotate-45">
                    <ArrowRightCircle />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LogIn;
