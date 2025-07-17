import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ChatMessages({ chat }) {
  const {user} = useContext(AuthContext)
  return (
    <>
      {chat.map((msg, idx) => (
        <div
          key={idx}
          className={`p-3 pb-0.5 w-fit max-w-prose relative   ${
            msg.role === "user"
              ? " rounded-t-xl rounded-bl-xl ml-auto w-fit  max-w-[80%] break-all lg:max-w-prose GlassEffect text-white"
              : "bg-gray-200 mr-10 rounded-t-xl rounded-br-xl"
          }`}
        >
          
          <span className="animate-fade transition-opacity">{msg.text}</span>
          {msg.timestamp ? (
            <div className="text-[10px] text-gray-500 mt-1 ml-2 whitespace-nowrap animate-fade transition-opacity text-end mb-0">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          ) : (
            <div className="text-xs text-gray-500 mt-1 ml-2 whitespace-nowrap animate-fade transition-opacity ms-auto">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
