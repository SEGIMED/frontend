"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PathnameShow } from "@/components/pathname/path";
import Elboton from "@/components/Buttons/Elboton";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";
import IconMensajeBoton from "@/components/icons/IconMensajeBoton";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import ruteActual from "@/components/images/ruteActual.png";
import mensaje from "@/components/images/mensaje.png";
import avatar from "@/utils/defaultAvatar";
import rutas from "@/utils/rutas";
import { socket } from "@/utils/socketio";
import IconMas from "@/components/icons/iconMas";
import NotFound from "@/components/notFound/notFound";
import IconMedChat from "@/components/icons/IconMedChat";
import IconRegresar from "@/components/icons/iconRegresar";

export default function MensajesDoc() {
  const getChats = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [seen, setSeen]= useState(false)
  const[flag, setFlag]=useState(false)
  const token = Cookies.get("a");
  const idUser = Cookies.get("c");
  const lastSegmentTextToShow = PathnameShow();
  const router = useRouter();

  useEffect(() => {
    if (!reload) {
      const navigationEntries = performance.getEntriesByType("navigation");
      const navigationType =
        navigationEntries.length > 0 ? navigationEntries[0].type : null;

      if (navigationType === "reload") {
        const listChats = Object.values(getChats);
        if (listChats) setChats(listChats);

        if (getChats.length !== 0) setIsLoading(false);
      } else {
        window.location.reload();
        setReload(true);
      }
    }
  }, [getChats]);

  useEffect(() => {
    
    if (getChats) {
      const listChats = Object.values(getChats);
      const filterChatsPtes = listChats.filter(chat => chat.messages.length > 0 && chat.chatType === "Paciente");
      const filterChatsMed = listChats.filter(chat => chat.messages.length > 0 && chat.chatType === "Médico");
      const filterToSort = flag ? filterChatsMed : filterChatsPtes;

      const sortedChats = filterToSort.sort((a, b) => {
        const dateA = a.messages.length > 0 ? new Date(a.messages[a.messages.length - 1].date) : new Date(0);
        const dateB = b.messages.length > 0 ? new Date(b.messages[b.messages.length - 1].date) : new Date(0);
        return dateB - dateA;
      });

      setChats(sortedChats);
    }
  }, [flag, getChats]);

  const handleImg = (img) => {
    if (img) {
      return (
        <img src={img} alt="" className="w-12 h-12 object-cover rounded-3xl " />
      );
    }
  };

  const handleViewMessages = (chat) => {
    router.push(`${rutas.Doctor}${rutas.Mensajes}/${chat.target?.userId}`);
  };

  const counterM = (messages) => {
    if (!messages.length) return false;
    const unseenMessages = messages.filter(message => !message.state);
    if (unseenMessages.length) {
      const lastMessage = messages[messages.length - 1];
      const userId = Cookies.get("c");
      if (lastMessage.target.userId === Number(userId)) {
        return unseenMessages.length;
      }
    }
    setSeen(true);
    return 0;
  };

  const chatElements = useMemo(() => {
    return chats.map((chat) => (
      <div
        key={chat._id}
        className="flex justify-between w-full border-b border-b-[#cecece] md:px-6 items-center overflow-hidden px-1 py-3">
        <title>{lastSegmentTextToShow}</title>
        <div className="flex gap-4 items-center">
          {flag ? <IconMedChat color="gray"/> : ""}
          <div className="w-8 h-8 flex justify-center items-center gap-3">
            
            {handleImg(
              chat?.target?.avatar !== null ? chat?.target?.avatar : avatar
            )}
          </div>
          <div className="flex flex-col h-fit md:flex-row md:items-center overflow-hidden">
            
            <p className="text-start text-[#686868] md:font-normal font-semibold text-[1rem] leading-6 md:w-48 w-36 md:line-clamp-2 line-clamp-1">
              {chat?.target?.fullName}
            </p>
            <Image src={ruteActual} alt="" className="hidden md:block mr-20 " />
            {chat.messages.length > 0 ? (
              <span className="text-start text-[#686868] font-normal text-sm md:text-base leading-6">
                {Fecha(chat.messages[chat.messages.length - 1].date, 4)}
                <span className="mx-1">-</span>
                {Hora(chat.messages[chat.messages.length - 1].date)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex gap-0 md:gap-3 items-center">
          <div className="flex md:px-6 p-2 gap-1 items-center w-14 md:w-1/3">
            {counterM(chat.messages)}
            <Image src={mensaje} alt="" />
          </div>
          <Elboton
            onPress={() => handleViewMessages(chat)}
            nombre={"Mensajes"}
            size={"sm"}
            icon={<IconMensajeBoton />}
            className={`text-[#FFFFFF] font-Roboto font-bold rounded-lg ${counterM(chat.messages) > 0 ? 'bg-bluePrimary' : 'bg-gray-400'}`}
          />
        </div>
      </div>
    ));
  }, [chats]);

  if (isLoading) {
    return <MensajeSkeleton />;
  }

  return (
    <div className="h-full text-[#686868] w-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
      <div className="flex gap-3">
        <Elboton
          href={`${rutas.Doctor}${rutas.Mensajes}/crearMensaje`}
          nombre={"Nuevo Chat"}
          size={"md"}
          icon={<IconMas />}
        />
        {flag ? (
           <Elboton
           nombre={"Pacientes"}
           size={"md"}
           icon={<IconRegresar/>}
           onPress={() => setFlag(false)}
          
         />
        ):(
          <Elboton
          nombre={"Médicos"}
          size={"md"}
          icon={<IconMedChat/>}
          onPress={() => setFlag(true)}
          className={"bg-white text-[#487FFA] font-Roboto font-bold rounded-lg border-solid border-2 border-[#487FFA]"}
        />
        )}
        
        </div>
        <div></div>
      </div>
      <div className="gap-2 items-start justify-center w-full md:overflow-y-auto">
        {chats.length !== 0 && chatElements}
      </div>
      {chats.length == 0 && <NotFound text="No hay mensajes" />}
    </div>
  );
}

