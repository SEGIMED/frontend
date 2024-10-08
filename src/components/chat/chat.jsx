"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import IconSendMensaje from "../icons/IconSendMensaje";
import { socket } from "@/utils/socketio";
import Cookies from "js-cookie";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addChat } from "@/redux/slices/chat/chat";
import Avatars from "../avatar/avatarChat";
import rutas from "@/utils/rutas";

export default function Chat({ chat }) {
  const dispatch = useAppDispatch();
  const sender = useAppSelector((state) => state.user);
  const userId = Number(Cookies.get("c"));
  const role = Cookies.get("b");
  const [messageInput, setMessageInput] = useState("");
  const [infoChat, setInfoChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const mensajesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [markedChats, setMarkedChats] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (chat) {
      // Solo actualiza infoChat si ha cambiado realmente
      const myId = Number(Cookies.get("c"));
      if (infoChat !== chat) {
        setInfoChat(chat);
      }
      const unseenMessages = chat.messages.filter(
        (message) => !message.state && !message._id.startsWith("Message-")
      );
      if (unseenMessages.length) {
        if (unseenMessages[unseenMessages.length - 1]?.target?.userId === myId)
          setMarkedChats(unseenMessages);
      } else {
        setMarkedChats([]);
      }

      // Actualiza los mensajes
      setMessages(chat.messages);
    }
  }, [chat]);

  useEffect(() => {
    if (markedChats.length) {
      socket._socket.emit(
        "markedMessages",
        { unseenMessages: markedChats, chat },
        (data) => {
          dispatch(addChat({ chat: data }));
        }
      );
    }
  }, [markedChats]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
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
    <div className="text-[#686868] w-full flex h-full flex-col bg-[#FAFAFC]">
      {/* ACA INICIA EL CHAT */}
      <div className="relative h-[90%] md:h-[80%] px-6 py-2 overflow-hidden ">
        <div
          className="absolute inset-0 overflow-y-auto bg-image-chat bg-contain bg-no-repeat bg-center"
          ref={messagesContainerRef}>
          {messages.map((message, index) => (
            <div
              key={message._id}
              className={`p-2 px-4 lg:px-8 font-poppins flex flex-col ${
                message?.sender?.userId === userId
                  ? "justify-end items-end"
                  : "justify-start items-start"
              }`}>
              <div
                className={`flex items-center justify-center text-xs mb-2 ${
                  message?.sender?.userId === userId
                    ? "self-end text-right flex-row-reverse gap-3"
                    : "self-start text-left"
                }`}>
                <span
                  onClick={() => {
                    if (
                      message?.sender?.userId !== userId &&
                      message?.sender?.role !== role
                    ) {
                      router.push(
                        `${rutas.Doctor}${rutas.Pacientes}/${message?.sender?.userId}`
                      );
                    }
                  }}
                  className={`${
                    message?.sender?.userId !== userId &&
                    message?.sender?.role !== role
                      ? "cursor-pointer"
                      : ""
                  }`}>
                  <Avatars
                    avatar1={
                      message?.sender?.avatar === null ||
                      message?.sender?.avatar === undefined
                        ? null
                        : message?.sender?.avatar
                    }
                  />
                </span>
                <span className="ml-4 text-lg">
                  {message?.sender?.fullName}
                </span>
              </div>
              <div
                className={`px-1 md:px-3 py-1 md:py-2 w-fit max-w-[70%] border-[#D7D7D7] border md:max-w-[45%] bg-[#FFFFFF] rounded-2xl shadow-sm mb-2 ${
                  message?.sender?.userId === userId
                    ? "rounded-tr-none me-4 lg:me-[52px]"
                    : "rounded-tl-none ms-4 lg:ms-[55px]"
                }`}>
                <small
                  className={`inline-block px-3 py-2 rounded-lg ${
                    message?.sender?.userId === userId ? "" : ""
                  }`}>
                  {message?.text}
                </small>
              </div>
            </div>
          ))}
          <div ref={mensajesEndRef} />
        </div>
      </div>

      {/* ACA INICIA EL INPUT */}
      <div className="h-[10%] md:h-[20%] flex items-center justify-center border-t bottom-0 md:px-2 gap-1">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full md:w-1/2 py-3 md:py-4 px-4 md:border outline-none md:rounded md:mr-2 h-[80px]"
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#70C247] text-white py-2 px-4 rounded flex mr-4 items-center hover:scale-105 transition-transform">
          <span className="hidden md:block">Enviar</span>
          <IconSendMensaje className="w-6" />
        </button>
      </div>
    </div>
  );
}
