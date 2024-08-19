import IconCloseBoton from "@/components/icons/IconCloseBoton";
import { MensajeElement } from "./MensajeElement";
import Elboton from "@/components/Buttons/Elboton";
import IconMoreInfo from "@/components/icons/IconMoreInfo";
import rutas from "@/utils/rutas";
import Cookies from "js-cookie";

const MensajesContainer = ({
  handleMensajeClick,
  formattedChats,
  handleMensajeElementClick,
}) => {
  const mappedChats = Object.values(formattedChats)
    .map((chat) => ({
      _id: chat.ultimoMensaje._id,
      message: chat.ultimoMensaje.text,
      sender: chat.sender,
      numberOfMessages: chat.cantidadMensajes,
      date: new Date(chat.ultimoMensaje.date),
      isMessageFromUser: chat?.isMessageFromUser,
    }))
    .sort((a, b) => b.date - a.date);
  const rol = Cookies.get("b");
  const Inicio =
    rol == "Paciente"
      ? "/Dashboard/Inicio_Paciente"
      : "/Dashboard/Inicio_Doctor";
  return (
    <div
      onClick={handleMensajeClick}
      className="fixed top-0 left-0 w-screen h-screen z-50">
      <div className="fixed flex flex-col gap-2 bg-red w-[90%] lg:w-[35%] md:w-[50%] h-fit max-h-[55%] md:max-h-[50%] shadow-lg bg-white rounded-2xl px-2 lg:px-4 z-50 top-[10%] right-[5%] md:right-[5%]">
        <div className="flex justify-between items-center">
          <p className="text-2xl text-bluePrimary font-semibold py-1">
            Mensajes
          </p>
          <IconCloseBoton
            onClick={handleMensajeClick}
            className="h-6 w-6 cursor-pointer"
            color={"#487FFA"}
          />
        </div>
        <div className="w-full flex flex-col gap-4 max-h-[80%] overflow-y-auto">
          {mappedChats && mappedChats?.length > 0 ? (
            mappedChats?.map((chat) => (
              <MensajeElement
                key={chat._id}
                message={chat?.message}
                onClick={() => handleMensajeElementClick(chat.sender.userId)}
                numberOfMessages={chat?.numberOfMessages}
                sender={chat?.sender}
                date={chat?.date}
                isMessageFromUser={chat?.isMessageFromUser}
              />
            ))
          ) : (
            <p className="text-lg text-[#5F5F5F] text-center py-2">
              No hay mensajes por leer
            </p>
          )}
        </div>
        <div className="flex items-center justify-center py-1">
          <Elboton
            href={`${Inicio}${rutas.Mensajes}`}
            className="rounded-full"
            nombre="Nuevo Chat"
            icon={<IconMoreInfo color="white" />}
          />
        </div>
      </div>
    </div>
  );
};

export default MensajesContainer;
