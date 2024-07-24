"use client";

import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import Avatars from "../avatar/avatarChat";
import avatar from "@/utils/defaultAvatar";
import LastLogin from "@/utils/lastLogin";
import IconOptions from "../icons/IconOptions";
import IconMensajeBoton from "../icons/IconMensajeBoton";
import Link from "next/link";
import rutas from "@/utils/rutas";

export default function ProximasConsultasInfo({ info }) {
  console.log(info);
  return (
    <div className="flex items-center px-2 xs:px-4 md:px-6 md:py-4 py-2 justify-between border-b border-[#DCDBDB]">
      <div className="flex items-center w-2/3 md:w-[55%] ">
        <div className="flex items-center w-full md:w-1/2">
          <Avatars avatar1={info?.patientUser?.avatar} />
          <p className="h-10 w-[100%] flex text-start items-center  text-[rgb(104,104,104)] font-normal text-base leading-6 px-4 py-1">
            {info.patientUser.name} {info.patientUser.lastname}
          </p>
        </div>
        <IconCurrentRouteNav className={"w-4 hidden md:block"} />
        <p className="hidden sm:flex text-center text-[#686868]  items-center justify-center font-normal text-sm md:text-base leading-6 w-60 ">
          {LastLogin(info?.scheduledStartTimestamp)}
        </p>
      </div>
      <div className="flex space-x-1 md:space-x-4 ">
        <Link href={`${rutas.Doctor}${rutas.Consultas}/${info.id}?patientId=${info.patient}`}>
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold leading-5 text-white rounded-lg xs:px-6 bg-bluePrimary ">
            <IconOptions color="#FFFFFF" />
            <p className="hidden sm:block">Ver detalle</p>
          </button>
        </Link>

        <Link href={`${rutas.Doctor}${rutas.Mensajes}`}>
          <button className="items-center hidden gap-1 px-4 py-2 text-sm font-bold leading-5 text-white rounded-lg md:flex xs:px-6 bg-bluePrimary">
            <IconMensajeBoton />
            <p className="hidden md:block">Ver mensajes</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
