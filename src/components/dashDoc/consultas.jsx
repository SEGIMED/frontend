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
    return (
        <div className="flex items-center border-b border-b-[#cecece] px-6 py-2 justify-between bg-white z-10">
            <div className="flex items-center ">
                <Avatars
                    avatar1={info?.patientUser?.avatar}
                />
                <p className="w-60 h-10 flex text-start items-center  text-[rgb(104,104,104)] font-normal text-base leading-6 px-4 py-1">
                    {info.patientUser.name}   {info.patientUser.lastname}
                </p>
                <IconCurrentRouteNav className={"w-4"} />
                <p className="text-center text-[#686868] flex items-center justify-center font-normal text-sm md:text-base leading-6 w-60 ">
                    {LastLogin(info?.scheduledStartTimestamp)}
                </p>
            </div>

            <div className="flex space-x-4 ">
                <Link href={`${rutas.Doctor}${rutas.Historial}/${info.patient}`}>
                    <button className="flex rounded-lg items-center  px-6 py-3 font-bold text-sm leading-5 bg-bluePrimary text-white gap-1 ">
                        <IconOptions color="#FFFFFF" />
                        Ver detalle
                    </button>
                </Link>

                <Link href={`${rutas.Doctor}${rutas.Mensajes}`}
                >
                    <button className="flex rounded-lg items-center  px-6 py-3 font-bold text-sm leading-5 bg-bluePrimary text-white gap-1 ">
                        <IconMensajeBoton />
                        Ver mensajes
                    </button>
                </Link>

            </div>

        </div>

    );
}
