import { message } from "antd";
import { getAuth, reload, signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogIn, User } from "lucide-react";
import ChatBotLogo from "./ChatBotLogo";
import { motion } from "framer-motion";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, displayName, photoUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth();
  function HandleSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/login");
        message.success("Log Out successful.");
      })
      .catch((error) => {
        console.log("signout error", error);
      });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, zIndex: 10 }}
      animate={{ opacity: 1, y: 0, zIndex: 10 }}
      exit={{ opacity: 0, y: -0, zIndex: 10 }}
      transition={{ duration: 1 }}
      className="z-50 "
    >
      <nav className=" fixed z-10  w-full  container-sm top-2  ">
        <div className="mx-2">
          <div className="mx-auto max-w-5xl px-0 md:px-2 lg:px-4 w-full  GlassEffect rounded-full  border-none outline-none ">
            <div className="relative flex h-14 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-2 flex items-center sm:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-full p-1 text-gray-900 bg-white focus:outline-none "
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <svg
                      className="block w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Logo and desktop links */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <Link to="/">
                    <ChatBotLogo />
                  </Link>
                </div>
                <div className="hidden sm:ml-3 sm:block">
                  <div className="flex space-x-1 items-center">
                    <h1 className="h-full text-2xl font-bold text-gray-900">
                      AI ChatBot
                    </h1>
                  </div>
                </div>
              </div>

              {/* Notification and Profile */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  className="rounded-full bg-white text-gray-900 font-semibold p-1  focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="w-6 h-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022 23.848 23.848 0 005.455 1.31m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>

                {/* Profile dropdown */}
                <div className="relative ml-2 w-fit h-fit">
                  <button
                    className="flex rounded-full w-8 h-8 font-semibold p-1 bg-white text-sm focus:outline-none "
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    {user?.isLogin ? (
                      user?.photoUrl ? (
                        <div>
                          <img
                            src={user.photoUrl}
                            className="w-full h-full rounded-full"
                            alt="User Avatar"
                          />
                        </div>
                      ) : (
                        <User className=" " />
                      )
                    ) : (
                      // <span className="flex items-center text-gray-900 rounded-full font-semibold p-1">
                      <LogIn className="w-6 h-6 rounded-full  bg-white text-gray-900 " />
                      // </span>
                    )}
                  </button>
                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-800"
                      >
                        Comming Soon
                      </a>
                      {user.isLogin ? (
                        <button
                          onClick={HandleSignOut}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-800"
                        >
                          Sign out
                        </button>
                      ) : (
                        <Link to={"/login"}>
                          <button className="block px-4 py-2 text-sm text-gray-700">
                            login
                          </button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden rounded-md" id="mobile-menu">
              <div className="space-y-1 px-2 pt-2 pb-3 bg-gray-800 rounded-md">
                <a
                  href="#"
                  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Comming Soon
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Comming Soon
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Comming Soon
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Comming Soon
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </motion.div>
  );
}
