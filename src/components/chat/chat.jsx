"use client";

import { useState, useEffect, useRef } from "react";
import IconSendMensaje from "../icons/iconSendMensaje";
import { socket } from "@/utils/socketio";
import Cookies from "js-cookie";
import Image from "next/image";
import ImageChat from "@/components/images/imageChat.png";
import { useAppSelector } from "@/redux/hooks";
import Avatars from "../avatar/avatarChat";

export default function Chat({ chat }) {
  const userId = Number(Cookies.get("c"));
  const [messageInput, setMessageInput] = useState("");
  const [infoChat, setInfoChat] = useState("");
  const [messages, setMessages] = useState([]);
  const mensajesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (chat) {
      setInfoChat(chat);
      const updated = [...chat.seenMessages, ...chat.unseenMessages];
      setMessages(updated);
    }
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() === "") return; // No enviar mensajes vacíos
    socket.emit("sendMessage", {
      id: infoChat.target.userId,
      message: messageInput,
    });
    setMessageInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!chat) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="text-[#686868] w-full flex h-full flex-col">
      {/* ACA INICIA EL CHAT */}
      <div className="relative h-[90%] md:h-[80%] border-b border-b-[#cecece] px-6 py-2 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-[#fafafc]">
          <Image
            src={ImageChat}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-5"
          />
        </div>
        <div
          className="absolute inset-0 overflow-y-auto"
          ref={messagesContainerRef}
        >
          {messages.map((message, index) => (
            <div
              key={message._id}
              className={`p-2 font-poppins flex flex-col ${message?.sender?.userId === userId
                ? "justify-end items-end"
                : "justify-start items-start"
                }`}
            >
              <div
                className={`flex items-center justify-center text-xs mb-2 ${message?.sender?.userId === userId
                  ? "self-end text-right"
                  : "self-start text-left"
                  }`}
              >
                <span>
                  <Avatars avatar={user.avatar ? user.avatar : null} />
                </span>
                <span className="ml-4">{message?.sender?.fullName}</span>
              </div>
              <div
                className={`px-1 md:px-3 py-1 md:py-2 w-fit max-w-[70%] md:max-w-[45%] rounded-3xl shadow-sm mb-2 ${message?.sender?.userId === userId
                  ? "rounded-tr-none ml-auto bg-[#c5e7b5]"
                  : "rounded-tl-none bg-blue-100"
                  }`}
              >
                <small
                  className={`inline-block px-3 py-2 rounded-lg ${message?.sender?.userId === userId ? "" : ""
                    }`}
                >
                  {message?.text}
                </small>
              </div>
            </div>
          ))}
          <div ref={mensajesEndRef} />
        </div>
      </div>

      {/* ACA INICIA EL INPUT */}
      <div className="h-[10%] md:h-[20%] flex items-center justify-center bottom-0 px-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full md:w-1/2 py-4 md:py-8 px-4 border outline-none rounded mr-2 font-poppins"
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#70C247] text-white py-2 px-4 rounded flex items-center hover:scale-105 transition-transform"
        >
          <span className="mr-2 hidden md:block">Enviar</span>
          <IconSendMensaje />
        </button>
      </div>
    </div>
  );
}
