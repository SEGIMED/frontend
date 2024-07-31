import Segi from "@/components/InicioPaciente/chatSegi/segi.png";
import Image from "next/image";
import { MessageSegi } from "./MessageSegi";
import IconSendArrow from "../../icons/IconSendArrow";
import { socket } from "@/utils/socketio";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage } from "@/redux/slices/chat/chatBot";
import { useEffect, useState, useRef } from "react";

export const ChatSegi = ({ toggleChat }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messages = useAppSelector((state) => state.chatBot?.messages);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const chatContainerRef = useRef(null);
  const socketRef = useRef(socket.getSocket());

  useEffect(() => {
    const currentSocket = socketRef.current;

    currentSocket.on("sendChatBotMessage", (response) => {
      setTimeout(() => {
        dispatch(
          addMessage({
            sender: "bot",
            message: response,
            time: new Date().toISOString(),
          })
        );
        if (
          response ===
          "Has alcanzado el límite de mensajes. Por favor, intenta nuevamente en unos segundos."
        ) {
          currentSocket.emit("resetMessageCount", () => {
            console.log("Se solicitó reiniciar el contador de mensajes");
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      }, 3500);
    });

    return () => {
      currentSocket.off("sendChatBotMessage");
    };
  }, [dispatch]);

  useEffect(() => {
    const currentSocket = socketRef.current;

    currentSocket.emit("createChatBot");
  }, []);

  useEffect(() => {
    // desplazar al último mensaje entrante
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(
        addMessage({
          sender: user?.name,
          message,
          time: new Date().toISOString(),
        })
      );
      setTimeout(() => {
        setLoading(true);
        socketRef.current.emit(
          "sendUserChatBotMessage",
          { message },
          (response) => {
            console.log("Mensaje enviado y respuesta recibida:", response);
          }
        );
      }, 1500);

      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (loading) return;
      handleSendMessage();
    }
  };
  return (
    <div className="fixed z-30 h-[75%] max-h-[700px] md:max-h-[600px] w-[90%] md:h-[85%] md:max-w-[600px] md:w-[30%] bottom-[4%] right-[2%] border-bluePrimary bg-bluePrimary border overflow-hidden rounded-3xl">
      <div className="flex flex-col h-full">
        <div className="h-[10%] md:h-16 py-2 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={Segi}
              alt="SegiBot"
              className="border rounded-full w-10 h-10"
            />
            <p className="text-center text-lg text-white">
              Segi - Tu Asistente Virtual
            </p>
          </div>

          <button onClick={toggleChat} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="bg-white h-[90%] md:max-h-[600px] xl:max-h-[800px] relative">
          <div
            className="h-[90%] flex flex-col px-2 overflow-y-auto scroll-smooth scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-bluePrimary scrollbar-track-[#FAFAFC] scrollbar-thin"
            ref={chatContainerRef}>
            {messages?.map((msg, index) => (
              <MessageSegi
                key={index || msg.time}
                name={msg.sender}
                message={msg.message}
                sender={msg.sender}
                avatar={user.avatar}
              />
            ))}
            {loading && (
              <MessageSegi name="Segi" message="Escribiendo..." sender="bot" />
            )}
          </div>
          <div className="w-full h-[10%] px-4">
            <div className="border h-10 border-bluePrimary w-full rounded-2xl overflow-hidden flex items-center">
              <input
                className="w-[90%] px-4 outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Envia un mensaje a Segi"
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSendMessage} disabled={loading}>
                <IconSendArrow className="w-8 h-8" color="#487FFA" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSegi;
