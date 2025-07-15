import React from "react";

export default function MiniChatBotLogo() {
  return (
    <div className="w-9 h-8 relative flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-md">
      {/* Antennas */}
      <div className="absolute top-0 left-2 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute top-0 right-2 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute top-1 left-[18%] w-0.5 h-2 bg-white"></div>
      <div className="absolute top-1 right-[18%] w-0.5 h-2 bg-white"></div>

      {/* Eyes */}
      <div className="absolute top-[40%] left-[30%] w-1.5 h-1.5 bg-white rounded-full"></div>
      <div className="absolute top-[40%] right-[30%] w-1.5 h-1.5 bg-white rounded-full"></div>

      {/* Mouth */}
      <div className="absolute bottom-2 w-3 h-0.5 bg-white rounded-full opacity-70"></div>

      {/* Chat Tail */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-indigo-600 to-purple-700 rotate-45 rounded-sm shadow-sm"></div>
    </div>
  );
}
