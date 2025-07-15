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

function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [icon, setIcon] = useState(eyeOff);

  const [type, setType] = useState("password");

  const handleSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(user);

        navigate("/");
        message.success("Login Successfully");
      })
      .catch((error) => {
        setError(error.message);
        message.error("Invalid Email/Pasword");
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
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="flex justify-center textColor items-center">
        <div className="p-7 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md bg-white/10 text-white">
          <div className="text-center mb-4">
            <p className="textColor font-extrabold text-3xl font-sans ">
              Log In
            </p>
          </div>

          <form onSubmit={handleSignIn}>
            <div>
              <label>Email:</label>
              <div>
                <input
                  className="w-72 rounded focus:outline-none focus:border-none py-1 px-2 bg-gray-900/80 text-white"
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
                  className="w-72 rounded focus:outline-none focus:border-none py-1 px-2 bg-gray-900/80 text-white"
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
              className="mt-3 py-2.5 w-72 rounded bg-white text-gray-900  transition-all"
              type="submit"
            >
              Login
            </button>
          </form>
          {error && console.log(error)}
          <div>
            <Link to="/sign-up">
              <button className="w-72  transition-all flex justify-center gap-2  rounded mt-3 focus:rounded focus:outline-none active:outline-none active:border-none focus:border-none py-2 px-2 bg-gray-950 text-white ">
                Create an account{" "}
                <span className="-rotate-45">
                  <ArrowRightCircle />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
