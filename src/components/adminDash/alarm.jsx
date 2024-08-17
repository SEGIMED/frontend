"use client";
import TableAlarm from "@/components/alarm/tableAlarm";
import Link from "next/link";
import rutas from "@/utils/rutas";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import { useState, useEffect } from "react";

export default function AlarmsByRole({ alarms, isLoading, role }) {
  const lastSegmentTextToShow = rutas.Alarm;
  
 
  return (
    <div className="h-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <title>{lastSegmentTextToShow}</title>
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
          <div></div>
          <h1 className="font-bold md:text-xl hidden md:block">
            Listado de Alarmas
          </h1>
          <div className="flex gap-3">
            <Link href={`${rutas.Admin}${rutas.Usuarios}?pacientes=true`}>
              <button className="flex items-center px-6 py-2 bg-[#70C247] rounded-xl gap-3 text-white font-bold">
                Ver resueltas
              </button>
            </Link>
          </div>
        </div>
        <div className="md:overflow-y-auto h-full">
          <div className="w-[100%] bg-white border-b border-b-[#cecece] flex">
            <div className="w-[12%] md:w-[5%] md:block"></div>
            <div className="grid w-[70%] md:w-[75%] text-center items-center leading-6 text-base font-normal gap-3 grid-cols-3 md:text-start md:grid-cols-6 py-2 z-10">
              <p className="text-[#5F5F5F] hidden md:block">Prioridad</p>
              <p className="text-[#5F5F5F]">Hora</p>
              <p className="text-[#5F5F5F]">Fecha</p>
              <p className="text-[#5F5F5F]">Paciente</p>
              <p className="text-[#5F5F5F] hidden md:block">HTP</p>
              <p className="text-[#5F5F5F] hidden md:block">Motivo de alarma</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonList count={10} />
          ) : alarms.length ? (
            <div className="items-start justify-center w-full md:overflow-y-auto">
              <TableAlarm pacientes={alarms} />
            </div>
        ) : (
              <NotFound
                text="No tenes alarmas pendientes."
                sizeText="w-[100%]"
              />
          )}
        </div>
      </div>
    </div>
  );
}


