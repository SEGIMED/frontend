import Segi from "@/components/InicioPaciente/chatSegi/segi.png";
import Image from "next/image";
import { MessageSegi } from "./MessageSegi";
import IconSendArrow from "../../icons/IconSendArrow";
import { socket } from "@/utils/socketio";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage, toogleAlarms } from "@/redux/slices/chat/chatBot";
import { useEffect, useState, useRef } from "react";
import IconAlarmRed from "@/components/icons/iconAlarmRed";
import IconAlarm from "@/components/icons/IconAlarm";
import IconRecordNav from "@/components/icons/IconRecordNav";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";
import IconAlarmYellow from "@/components/icons/IconAlarmYellow";
import IconAlarmGreen from "@/components/icons/iconAlarmGreen";
import IconAlarmBlue from "@/components/icons/iconAlarmBlue";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import Elboton from "@/components/Buttons/Elboton";
import rutas from "@/utils/rutas";

export const ChatSegi = ({ toggleChat }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messages = useAppSelector((state) => state.chatBot?.messages);
  const showAlarms = useAppSelector((state) => state.chatBot?.showAlarms);
  const alarmsData = useAppSelector((state) => state.chatBot?.alarmsData);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const chatContainerRef = useRef(null);
  const socketRef = useRef(socket.getSocket());
  console.log(alarmsData);
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

  const PriorityIcon = ({ priority }) => {
    switch (priority) {
      case "Alta":
        return <IconAlarmRed className="w-8" />;
      case "Media":
        return <IconAlarmYellow className="w-8" />;
      case "Baja":
        return <IconAlarmGreen className="w-8" />;
      case "Indefinida":
        return <IconAlarmBlue color={"gray"} className="w-8" />;
    }
  };
  const priorityColor = (priority) => {
    switch (priority) {
      case "Alta":
        return "text-redPrimary";
      case "Media":
        return "text-[#FFC900]";
      case "Baja":
        return "text-greenPrimary";
      case "Indefinida":
        return "text-textPrimary";
    }
  };
  return (
    <div className="fixed z-30 h-[75%] max-h-[700px] lg:max-h-[600px] w-[90%] lg:h-[85%] lg:max-w-[600px] lg:w-[30%] bottom-[4%] right-[2%] border-bluePrimary bg-bluePrimary border overflow-hidden rounded-3xl">
      <div className="flex flex-col h-full">
        <div className="h-[10%] lg:h-16 py-2 flex items-center px-4 justify-between">
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
        <div className="bg-white h-[90%] lg:max-h-[600px] xl:max-h-[800px] relative overflow-y-auto">
          {showAlarms ? (
            <>
              <div className="border border-bluePrimary flex gap-1 my-6 p-2 items-center w-[80%] mx-auto rounded-xl">
                <IconAlarmRed className={"w-8"} />
                <p className="text-bluePrimary font-semibold">
                  Tienes {alarmsData.length} alarmas activas
                </p>
              </div>
              <div className="px-2 lg:px-5 flex flex-col gap-2 xs:gap-6 w-full lg:w-[90%] mx-auto">
                {alarmsData.slice(0, 4).map((alarma, index) => {
                  return (
                    <div
                      key={index}
                      className="flex gap-3 items-center mx-auto">
                      <div className="flex flex-col items-center justify-center">
                        <PriorityIcon priority={alarma.ia_priority} />
                        <span className={priorityColor(alarma.ia_priority)}>
                          {alarma.ia_priority}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 w-[95%]">
                        <div className="flex gap-2 lg:gap-6 items-center font-medium w-full">
                          <p className="w-[45%] text-center line-clamp-1">
                            {alarma.patient.name} {alarma.patient.lastname}
                          </p>
                          <IconCurrentRouteNav className={"w-4"} />
                          <p className="w-[45%] line-clamp-1">
                            {alarma.alarm_description}
                          </p>
                        </div>
                        <div className="flex gap-2 lg:gap-6">
                          <p className="w-[45%] text-center line-clamp-1">
                            {Fecha(alarma.createdAt)} - {Hora(alarma.createdAt)}
                          </p>
                          <IconCurrentRouteNav className={"w-4"} />
                          <p className="w-[45%] line-clamp-1">Grupo HTP:</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-4 mt-4 xs:mt-8">
                <Elboton
                  nombre={"Ir a Segi"}
                  className={"bg-white border-bluePrimary border"}
                  classNameText={"text-bluePrimary"}
                  onPress={() => dispatch(toogleAlarms())}
                />
                <Elboton
                  nombre={"Ir a Alarmas"}
                  href={`${rutas.Doctor}${rutas.Alarm}`}
                  className={"bg-white border-bluePrimary border"}
                  classNameText={"text-bluePrimary"}
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="h-[90%] flex flex-col px-2 overflow-y-auto scroll-smooth scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-bluePrimary scrollbar-track-[#FAFAFC] scrollbar-thin"
                ref={chatContainerRef}>
                {messages?.map((msg, index) => (
                  <MessageSegi
                    key={index}
                    index={index}
                    name={msg.sender}
                    message={msg.message}
                    sender={msg.sender}
                    avatar={user.avatar}
                  />
                ))}
                {loading && (
                  <MessageSegi
                    name="Segi"
                    message="Escribiendo..."
                    sender="bot"
                  />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSegi;
