"use client";
import Elboton from "@/components/Buttons/Elboton";
import IconFatArrow from "@/components/icons/iconFatarrowDash";
import IconRegresar from "@/components/icons/iconRegresar";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage, resetMessages } from "@/redux/slices/chat/alarmasChat";
import { socket } from "@/utils/socketio";
import IconSendMensaje from "@/components/icons/IconSendMensaje";
import Avatars from "@/components/avatar/avatarChat";
import rutas from "@/utils/rutas";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Segi from "@/components/InicioPaciente/chatSegi/segi.png";

import Image from "next/image";
const Page = () => {
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messages = useAppSelector((state) => state.alarmasChat?.messages);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const userId = user?.id;
  const role = user?.role;
  const router = useRouter();
  const socketRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const mensajesEndRef = useRef(null);
  console.log(messages);
  useEffect(() => {
    // Initialize the socket connection
    if (!socketRef.current) {
      socketRef.current = socket._socket; // Ensure socket is initialized
    }

    const currentSocket = socketRef.current;

    // Set up the event listener
    currentSocket?.on("sendAlarmasBotMessage", (response) => {
      if (response.includes("Evaluaremos tu caso")) {
        Swal.fire({
          icon: "success",
          title: "Alarma creada con éxito",
          text: "Gracias por responder todas las preguntas. Evaluaremos tu caso cuidadosamente y te daremos una respuesta en las próximas horas.",
          allowOutsideClick: false,
        }).then(() => {
          dispatch(resetMessages());
          router.back();
        });
      } else {
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
            currentSocket?.emit(
              "resetMessageCount",
              { type: "Alarmas" },
              () => {
                console.log("Se solicitó reiniciar el contador de mensajes");
              }
            );
            setLoading(false);
          } else {
            setLoading(false);
          }
        }, 3500);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      currentSocket?.off("sendAlarmasBotMessage");
    };
  }, [dispatch]);

  useEffect(() => {
    const currentSocket = socketRef.current;

    // Ensure the chatbot is created when the component mounts
    currentSocket?.emit("createChatBot", { type: "Alarmas" }); // Especifica que el tipo es "Alarmas"
    console.log("se creo el chatbot");
    return () => {
      currentSocket?.emit("destroyChatBot", { type: "Alarmas" });
    };
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const sendMessage = () => {
    if (messageInput.trim()) {
      dispatch(
        addMessage({
          sender: user?.name,
          message: messageInput,
          time: new Date().toISOString(),
        })
      );
      setTimeout(() => {
        setLoading(true);

        // Ensure the socket is initialized before sending a message
        if (socketRef.current) {
          socketRef.current.emit(
            "sendUserChatBotMessage",
            { message: messageInput, type: "Alarmas" }, // Especifica que el tipo es "Alarmas"
            (response) => {
              console.log("Mensaje enviado y respuesta recibida:", response);
            }
          );
        } else {
          console.error("Socket is not initialized");
        }
      }, 1500);

      setMessageInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (loading) return;
      sendMessage();
    }
  };

  const handleCancelAlarm = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Esta seguro que desea cerrar la conversación?",
      text: "Si usted cierra esta conversación no se creará ninguna alarma y deberá iniciar el proceso nuevamente para crear una.",
      confirmButtonText: "Finalizar",
      cancelButtonText: "Regresar",
      showCancelButton: true,
      cancelButtonColor: "#E73F3F",
    }).then((response) => {
      if (response.isConfirmed) {
        router.push(`${rutas.PacienteDash}${rutas.Alarm}`);
      }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center gap-2 px-4 py-2 border-b border-b-[#cecece] bg-[#FAFAFC]">
        <Elboton
          onPress={handleCancelAlarm}
          size={"lg"}
          nombre={"Finalizar"}
          icon={<IconRegresar />}
        />
      </div>

      <div className="text-[#686868] w-full flex h-full flex-col bg-[#FAFAFC]">
        {/* ACA INICIA EL CHAT */}
        <div className="relative h-[90%] md:h-[80%] px-6 py-2 overflow-hidden">
          <div
            className="absolute inset-0 overflow-y-auto bg-image-chat bg-contain bg-no-repeat bg-center"
            ref={messagesContainerRef}>
            {messages?.map((message, index) => (
              <div
                key={index}
                className={`p-2 px-4 lg:px-8 font-poppins flex flex-col ${
                  message?.sender === "bot"
                    ? "justify-start items-start"
                    : "justify-end items-end"
                }`}>
                <div
                  className={`flex items-center justify-center text-xs mb-2 ${
                    message?.sender === "bot"
                      ? "self-start text-left"
                      : "self-end text-right flex-row-reverse gap-3"
                  }`}>
                  {message?.sender !== "bot" ? (
                    <span className={`cursor-pointer`}>
                      <Avatars avatar1={user?.avatar} />
                    </span>
                  ) : (
                    <span className={`cursor-pointer`}>
                      <Image
                        src={Segi}
                        alt="SegiBot"
                        className="border border-bluePrimary rounded-full"
                        width={36}
                        height={36}
                      />
                    </span>
                  )}
                  <span className="ml-4 text-lg">
                    {message?.sender === "bot" ? "Segi" : message?.sender}
                  </span>
                </div>
                <div
                  className={`px-1 md:px-3 py-1 md:py-2 w-fit max-w-[70%] border-[#D7D7D7] border md:max-w-[45%] bg-[#FFFFFF] rounded-2xl shadow-sm mb-2 ${
                    message?.sender === "bot"
                      ? "rounded-tl-none ms-4 lg:ms-[55px]"
                      : "rounded-tr-none me-4 lg:me-[52px]"
                  }`}>
                  <small className="inline-block px-3 py-2 rounded-lg">
                    {message?.message}
                  </small>
                </div>
              </div>
            ))}
            <div ref={mensajesEndRef} />
          </div>
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
};

export default Page;
