import Segi from "@/components/InicioPaciente/segi.png";
import Image from "next/image";
import { MessageSegi } from "./MessageSegi";
import IconSendArrow from "../icons/IconSendArrow";

const Chat = [
  {
    id: 1,
    sender: "bot",
    message:
      "¡Hola Santiago! Soy Segi, tu asistente virtual! ¿Cómo te puedo ayudar?",
  },
  {
    id: 2,
    sender: "user",
    name: "Santiago Baglivo",
    message: "Necesito soporte",
  },
  {
    id: 3,
    sender: "bot",
    message:
      "Entiendo! ¿Podrias ser más específico con que necesitas soporte? No me acuerdo mi contraseña No me acuerdo mi contraseña No me acuerdo mi contraseña",
  },
  {
    id: 4,
    sender: "user",
    name: "Santiago Baglivo",
    message:
      "No me acuerdo mi contraseña No me acuerdo mi contraseñaNo me acuerdo mi contraseñaNo me acuerdo mi contraseña",
  },
  {
    id: 54,
    sender: "user",
    name: "Santiago Baglivo",
    message:
      "No me acuerdo mi contraseña No me acuerdo mi contraseñaNo me acuerdo mi contraseñaNo me acuerdo mi contraseña",
  },
];

export const ChatSegi = ({ toggleChat }) => {
  return (
    <div className="fixed z-30 h-[75%] max-h-[700px] md:max-h-[600px] w-[90%] md:h-[85%] md:max-w-[600px] md:w-[30%] bottom-[4%] right-[2%] border-bluePrimary bg-bluePrimary border overflow-hidden rounded-3xl">
      <div className="flex flex-col h-full ">
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
          <div className="h-[90%] flex flex-col px-2 overflow-y-auto ">
            {Chat.map((message) => (
              <MessageSegi
                key={message.id}
                name={message.name}
                message={message.message}
                sender={message.sender}
              />
            ))}
          </div>
          <div className="w-full h-[10%] px-4">
            <div className="border h-10 border-bluePrimary w-full rounded-2xl overflow-hidden flex items-center">
              <input
                className="w-[90%] px-4"
                placeholder="Envia un mensaje a Segi"
              />
              <IconSendArrow className="w-8 h-8" color="#487FFA" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
