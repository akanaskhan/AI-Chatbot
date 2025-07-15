import React, { useContext, useEffect, useRef, useState } from "react";
import ChatWithAI from "./components/ChatWithAI";
import LogIn from "./pages/auth/login.jsx";
import SignUp from "./pages/auth/signup.jsx";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
export default function AppRouter() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={user.isLogin ? <Navigate to={"/"} /> : <LogIn />}
          />

          <Route
            path="/"
            element={user?.isLogin ? <ChatWithAI /> : <LogIn />}
          />

          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}
