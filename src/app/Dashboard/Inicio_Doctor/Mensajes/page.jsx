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

export default function MensajesDoc() {
  const getChats = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const token = Cookies.get("a");
  const idUser = Cookies.get("c");
  const lastSegmentTextToShow = PathnameShow();
  const router = useRouter();
  console.log("esto es chat",getChats)
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

  const counterM = (message) => {
    if (!message.length) return false;
    const userId = Cookies.get("c");
    const lastMessage = message[message.length - 1];
    if (lastMessage.target.userId === Number(userId)) return true;
    return false;
  };

  const chatElements = useMemo(() => {
    const sortedChats = chats.sort((a, b) => {
      const dateA =
        a.unseenMessages.length > 0
          ? new Date(a.unseenMessages[a.unseenMessages.length - 1].date)
          : new Date(0);
      const dateB =
        b.unseenMessages.length > 0
          ? new Date(b.unseenMessages[b.unseenMessages.length - 1].date)
          : new Date(0);
      return dateB - dateA;
    });

    return sortedChats.map((chat) => (
      <div
        key={chat._id}
        className="flex justify-between w-full border-b border-b-[#cecece] md:px-6 items-center overflow-hidden px-1 py-3">
        <title>{lastSegmentTextToShow}</title>
        <div className="flex gap-4 items-center">
          <div className="w-8 h-8 flex justify-center items-center">
            {handleImg(
              chat?.target?.avatar !== null ? chat?.target?.avatar : avatar
            )}
          </div>
          <div className="flex flex-col h-fit md:flex-row md:items-center overflow-hidden">
            <p className="text-start text-[#686868] md:font-normal font-semibold text-[1rem] leading-6 md:w-48 w-36 md:line-clamp-2 line-clamp-1">
              {chat?.target?.fullName}
            </p>
            <Image src={ruteActual} alt="" className="hidden md:block mr-20 " />
            {chat.unseenMessages.length > 0 ? (
              <span className="text-start text-[#686868] font-normal text-sm md:text-base leading-6">
                {Fecha(
                  chat.unseenMessages[chat.unseenMessages.length - 1].date,
                  4
                )}
                <span className="mx-1">-</span>
                {Hora(chat.unseenMessages[chat.unseenMessages.length - 1].date)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex gap-0 md:gap-3 items-center">
          <div className="flex md:px-6 p-2 gap-1 items-center w-14 md:w-1/3">
            {counterM(chat.unseenMessages) ? chat.unseenMessages.length : 0}
            <Image src={mensaje} alt="" />
          </div>
          <Elboton
            onPress={() => handleViewMessages(chat)}
            nombre={"Mensajes"}
            size={"sm"}
            icon={<IconMensajeBoton />}
            className={`text-[#FFFFFF] font-Roboto font-bold rounded-lg ${
              chat.unseenMessages.length > 0 ? "bg-bluePrimary" : "bg-gray-400"
            }`}
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
        <Elboton
          href={`${rutas.Doctor}${rutas.Mensajes}/crearMensaje`}
          nombre={"Nuevo Chat"}
          size={"md"}
          icon={<IconMas />}
        />
        <div></div>
      </div>
      <div className="gap-2 items-start justify-center w-full md:overflow-y-auto">
        {chats.length !== 0 && chatElements}
      </div>
      {chats.length == 0 && <NotFound text="No hay mensajes" />}
    </div>
  );
}
