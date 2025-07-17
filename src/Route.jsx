import React, { useContext, useEffect, useRef, useState } from "react";
import ChatWithAI from "./components/ChatWithAI";
import LogIn from "./pages/auth/login.jsx";
import SignUp from "./pages/auth/signup.jsx";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PhotoURL from "./components/PhotoURL.jsx";
export default function AppRouter() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ChatWithAI />} />
          <Route
            path="/login"
            element={user.isLogin ? <Navigate to={"/"} /> : <LogIn />}
          />

          <Route
            path="/"
            element={user?.isLogin ? <ChatWithAI /> : <LogIn />}
          />

          <Route path="/sign-up" element={<SignUp />} /> 
          <Route path="/PhotoURL" element={<PhotoURL />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}
