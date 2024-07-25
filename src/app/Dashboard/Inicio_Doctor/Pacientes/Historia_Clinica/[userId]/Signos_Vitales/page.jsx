"use client";

import Ordenar from "@/components/Buttons/Ordenar";
import FiltrarPacientes from "@/components/Buttons/FiltrarPacientes";
import pacientesAlarm from "@/utils/dataAlarm";
import SignosVitales from "@/components/clinicalHistory/TableSignosVitales";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import { useAppSelector } from "@/redux/hooks";

export default function HomeDoc() {


  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const userId = pathArray[pathArray.length - 2];

  const infoPatient = useAppSelector((state) => state.clinicalHistory.data);
  const isLoading = useAppSelector((state) => state.clinicalHistory.loading);


  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex justify-center items-center border-b bg-[#fefffe] border-b-[#cecece] py-2">
        {/* <Ordenar /> */}
        <p className="text-[#686868] hidden md:block text-center font-semibold text-xl md:text-lg leading-6">
          Signos vitales
        </p>
        {/* <FiltrarPacientes /> */}
      </div>
      <div className="overflow-y-scroll flex flex-col h-full w-full">
        <div className="flex w-[100%] border-b bg-white border-b-[#cecece] ">
          <div className="w-[5%] hidden md:block"></div>
          <div className="grid w-[90%] md:w-[90%] text-center md:text-left grid-cols-3 leading-6 text-base font-normal md:grid-cols-5 items-center py-2 z-10">
            <p className="text-[#5F5F5F] hidden md:block">Hora</p>
            <p className=" text-[#5F5F5F]">Fecha</p>
            <p className=" text-[#5F5F5F] hidden md:block">Medico</p>
            <p className="text-[#5F5F5F]">Centro de atencion</p>
            <p className=" text-[#5F5F5F]">Motivo de consulta</p>
          </div>
          <div className="w-[5%] hidden md:block"></div>
        </div>
        {isLoading ? (
          <SkeletonList count={9} />
        ) : infoPatient.length === 0 ? (
          <NotFound
            text="No hay historial de signos vitales."
            sizeText="w-[100%]"
          />
        ) : (
          <SignosVitales pacientes={infoPatient} />
        )}
      </div>
    </div>
  );
}
