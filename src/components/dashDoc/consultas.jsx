"use client";

import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import Avatars from "../avatar/avatarChat";
import avatar from "@/utils/defaultAvatar";
import LastLogin from "@/utils/lastLogin";
import IconOptions from "../icons/IconOptions";
import IconMensajeBoton from "../icons/IconMensajeBoton";
import Link from "next/link";
import rutas from "@/utils/rutas";
import IconRisk from "../icons/iconRisk";
import RealColorRisk from "@/utils/realColor";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";

export default function ProximasConsultasInfo({ info }) {
  return (
    <div className="flex items-center px-2 xs:px-4 md:px-6 md:py-4 py-2 justify-between border-b border-[#DCDBDB]">
      <div className="flex items-center w-2/3 md:w-[35%] ">
      <span className="mr-2"> {info.patientPulmonaryHypertensionRisks?.risk ? (
                <RealColorRisk risk={paciente.patientPulmonaryHypertensionRisks.risk} />
              ) : (
                <IconRisk color="lightGray" />
              )}
              </span>
     
        <div className="w-full md:w-1/2 flex">
          <Avatars avatar1={info?.patientUser?.avatar} />
          </div>   
          
          <p className="h-10 w-[100%] flex text-start items-center  text-[rgb(104,104,104)] font-normal text-base leading-6 px-2 py-1">
            {info.patientUser.name} 
            </p>
          <p className="h-10 w-[100%] flex text-start items-center  text-[rgb(104,104,104)] font-normal text-base leading-6  ">
           {info.patientUser.lastname}
          </p>
        <div>
        <IconCurrentRouteNav className={"w-4 hidden md:block mr-10"}/></div>
        <p className="hidden sm:flex text-center text-[#686868]  items-center justify-center font-normal text-sm md:text-base leading-6 w-60 md:mr-10">
          {Fecha(info?.scheduledStartTimestamp)}   
        </p>
        
        <p className="hidden sm:flex text-center text-[#686868]  items-center justify-center font-normal text-sm md:text-base leading-6 w-60 ">
          {Hora(info?.scheduledStartTimestamp)}
        </p>
        
      </div>
      <div className="flex space-x-1 md:space-x-4  ">
        <Link href={`${rutas.Doctor}${rutas.Historial}/${info.patient}`}>
          <button className="flex rounded-lg items-center px-4 xs:px-6 py-2 font-bold text-sm leading-5 bg-bluePrimary text-white gap-1 ">
            <IconOptions color="#FFFFFF" />
            <p className="hidden sm:block">Ver detalle</p>
          </button>
        </Link>

        <Link href={`${rutas.Doctor}${rutas.Mensajes}`}>
          <button className="md:flex rounded-lg items-center px-4 xs:px-6 py-2 font-bold text-sm leading-5 bg-bluePrimary text-white gap-1 hidden">
            <IconMensajeBoton />
            <p className="hidden md:block">Ver mensajes</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
