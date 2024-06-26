"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

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

export default function MensajesDoc() {
  const getChats = useAppSelector((state) => state.chat);
  // const isLoading = useAppSelector(state => state.doctores.length === 0);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listChats = Object.values(getChats);
    if (listChats) setChats(listChats);

    if (getChats.length !== 0) setIsLoading(false);
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
              {handleImg(chat?.target?.avatar)}
            </div>
            <div className="flex flex-col h-fit md:flex-row md:items-center overflow-hidden">
              <p className="text-start text-[#686868] md:font-normal font-semibold text-[1rem] leading-6 md:w-48 w-36 md:line-clamp-2 line-clamp-1">
                {chat?.target?.fullName} - {chat?.target?.role}
              </p>
              <Image src={ruteActual} alt="" className="hidden md:block" />
              {chat.unseenMessages.length && (
                <p className="text-start text-[#686868] font-normal text-sm md:text-base leading-6">
                  {LastLogin(
                    chat.unseenMessages[chat.unseenMessages.length - 1].date
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-0 md:gap-3 items-center">
            <div className="flex md:px-6 p-2 gap-1 items-center w-14 md:w-full">
              {counterM(chat.unseenMessages) ? chat.unseenMessages.length : 0}
              <Image src={mensaje} alt="" />
            </div>
            <Link
              href={`${rutas.PacienteDash}${rutas.Mensajes}/${chat.target.userId}`}>
              <Elboton
                nombre={"Mensajes"}
                size={"sm"}
                icon={<IconMensajeBoton />}
              />
            </Link>
          </div>
        </div>
      )),
    [chats]
  );

  if (isLoading) {
    return <MensajeSkeleton />;
  }

  return (
    <div className="h-full text-[#686868] w-full flex flex-col">
      <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2 ">
        <Link href={`${rutas.PacienteDash}${rutas.Mensajes}/crearMensaje`}>
          <Elboton
            nombre={"Nuevo Chat"}
            className="w-full md:w-48 md:h-12 md:text-lg"
            icon={<IconMas />}
          />
        </Link>
        {/* <Elboton nombre={"Ordenar"} size={"lg"} icon={<IconOrder/>}/> */}
      </div>
      <div className="relative max-h-[90%] gap-2 items-start justify-center w-full overflow-y-auto ">
        {chatElements}
      </div>
    </div>
  );
}
