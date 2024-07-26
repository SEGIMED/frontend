"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { socket } from "@/utils/socketio";
import rutas from "@/utils/rutas";

import ruteActual from "@/components/images/ruteActual.png";

import mensaje from "@/components/images/mensaje.png";
import LastLogin from "@/utils/lastLogin";

import Cookies from "js-cookie";
import Elboton from "@/components/Buttons/Elboton";
import IconMas from "@/components/icons/iconMas";

import IconMensajeBoton from "@/components/icons/IconMensajeBoton";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import IconOrder from "@/components/icons/IconOrder";
import avatar from "@/utils/defaultAvatar";
import AsociarMedico from "@/components/asociarMedico/AsociarMedico";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";

export default function MensajesDoc() {
  const getChats = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    // if (!socket.isConnected()) {
    //   socket.setSocket(token, dispatch);
    //   socket.emit("onJoin", { id: idUser });
    // }

    //   const listChats = Object.values(getChats);
    //   if (listChats) setChats(listChats)
    //   if (counter === 0) setCounter(1) && window.location.reload()
    //   if (getChats.length !== 0) setIsLoading(false);
    if (!reload) {
      const navigationEntries = performance.getEntriesByType("navigation");
      const navigationType =
        navigationEntries.length > 0 ? navigationEntries[0].type : null;

      if (navigationType === "reload") {
        // Page was reloaded
        const listChats = Object.values(getChats);
        if (listChats) setChats(listChats);

        if (getChats.length !== 0) setIsLoading(false);
      } else {
        // First load, trigger a reload
        window.location.reload();
        setReload(true);
      }
    }
  }, [getChats]);

  const handleImg = (img) => {
    if (img) {
      return (
        <img src={img} alt="" className="w-8 h-8 object-cover rounded-3xl " />
      );
    }
  };

  const counterM = (message) => {
    if (!message.length) return false;
    const userId = Cookies.get("c");
    const lastMessage = message[message.length - 1];
    if (lastMessage.target.userId === Number(userId)) return true;
    return false;
  };

  

  const chatElements = useMemo(
    () =>
      chats.map((chat) => (
        <div
          key={chat._id}
          className="flex justify-between w-full border-b border-b-[#cecece] md:px-6 items-center overflow-hidden  px-1 py-3">
          <div className="flex gap-4 items-center">
            <div className="w-8 h-8 flex justify-center items-center">
              {handleImg(
                chat?.target?.avatar !== null ? chat?.target?.avatar : avatar
              )}
            </div>
            <div className="flex flex-col h-fit md:flex-row md:items-center overflow-hidden">
              <p className="text-start text-[#686868] md:font-normal font-semibold text-[1rem] leading-6 md:w-48 w-36 md:line-clamp-2 line-clamp-1">
                Dr. {chat?.target?.fullName} 
              </p>
              <Image src={ruteActual} alt="" className="hidden md:block mr-20" />
              {chat.unseenMessages.length > 0 ? (
              <span className="text-start text-[#686868] font-normal text-sm md:text-base leading-6 ">
              {Fecha(chat.unseenMessages[chat.unseenMessages.length - 1].date, 4)}
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
              href={`${rutas.PacienteDash}${rutas.Mensajes}/${chat.target.userId}`}
              nombre={"Mensajes"}
              size={"sm"}
              icon={<IconMensajeBoton />}
              className={`text-[#FFFFFF] font-Roboto font-bold rounded-lg ${chat.unseenMessages.length > 0 ? 'bg-bluePrimary' : 'bg-gray-400'}`}
            />
          </div>
        </div>
      )),
    [chats]
  );

  if (isLoading) {
    return <MensajeSkeleton />;
  }

  //Falta lógica para asociar médico
  // if (user?.treatingPhysician === null) {
  //   return <AsociarMedico text={"chatear"} />;
  // }

  return (
    <div className="h-full text-[#686868] w-full flex flex-col overflow-y-auto">
      <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2 ">
        <Elboton
          href={`${rutas.PacienteDash}${rutas.Mensajes}/crearMensaje`}
          nombre={"Nuevo Chat"}
          className="w-full md:w-48 md:h-12 md:text-lg"
          icon={<IconMas />}
        />
        {/* <Elboton nombre={"Ordenar"} size={"lg"} icon={<IconOrder/>}/> */}
      </div>
      <div className="relative max-h-[90%] gap-2 items-start justify-center w-full overflow-y-auto ">
        {chatElements}
      </div>
    </div>
  );
}
