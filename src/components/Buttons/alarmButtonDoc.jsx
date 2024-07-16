"use client";
import React from "react";
import IconOptions from "../icons/IconOptions";
import IconAccion from "@/components/icons/IconAccion"; // Importa tu icono de acción adecuadamente
import rutas from "@/utils/rutas";
import Link from "next/link";
import IconAlarm from "../icons/IconAlarm";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconTablillaTilde from "../icons/iconTablillaTilde";

const AlarmButtonDoc = ({ id, handleStatus }) => {
  return (
    <details className="relative w-[60%] md:w-full">
      <summary className="flex justify-center md:px-6 py-2 text-white rounded-xl md:gap-3 bg-[#487FFA] items-center cursor-pointer">
        <div className="flex items-center md:gap-1">
          <IconOptions color="#FFFFFF" />
          <span className="hidden md:block">Opciones</span>
        </div>
      </summary>
      <ul className="absolute bg-white z-50 p-5 md:w-52 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-2 shadow-lg">
        <li>
          <Link href={`${rutas.Doctor}${rutas.Mensajes}/crearMensaje`}>
            <button
              className=" w-full flex items-center  justify-center gap-2 font-medium text-sm cursor-pointer mb-4"
              onClick={handleStatus}>
              <IconAccion /> Marcar resuelta
            </button>
          </Link>
        </li>
        <li >
                    <Link href={`${rutas.Doctor}${rutas.Alarm}/${id}`}>
                    <button className=" w-full flex items-center justify-center gap-2 font-medium text-sm cursor-pointer " >
                        <IconTablillaTilde /> Ver Detalle
                    </button>
                    </Link>
                </li>
      </ul>
    </details>
  );
};

export default AlarmButtonDoc;
