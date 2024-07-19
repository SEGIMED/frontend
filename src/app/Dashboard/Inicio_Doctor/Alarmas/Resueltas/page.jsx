"use client";

import TableAlarmResueltas from "@/components/alarm/tableAlarmResueltas";
// import Ordenar from "@/components/Buttons/Ordenar";
import Link from "next/link";
import rutas from "@/utils/rutas";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function HomeDoc() {
  const [inactiveAlarms, setInactiveAlarms] = useState([]);

  // const getHighestPriority = (priorities) => {
  //   if (priorities.includes("Alta")) return "Alta";
  //   if (priorities.includes("Media")) return "Media";
  //   return "Baja";
  // };

  const getAlarms = async (headers) => {
    try {
      const response = await ApiSegimed.get(`/alarms-by-patient/`, headers);
      if (response.data) {
        const inactiveAlarms = response.data.filter(
          (alarma) => alarma.solved === true
        ).sort((a, b) => {
          const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
          return (
            priorityOrder[a.highestPriority] - priorityOrder[b.highestPriority]
          );
        });;

        // Map through the alarms to find the highest priority and add it to the alarm object
        // const mappedAlarms = inactiveAlarms.map((alarm) => ({
        //   ...alarm,
        //   highestPriority: getHighestPriority(
        //     alarm.questionsPriority.map((p) => p.split(": ")[1])
        //   ),
        // }));

        // Sort alarms by highest priority
        // mappedAlarms.sort((a, b) => {
        //   const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
        //   return (
        //     priorityOrder[a.highestPriority] - priorityOrder[b.highestPriority]
        //   );
        // });

        setInactiveAlarms(inactiveAlarms);
      }
    } catch (error) {
      console.error("Error fetching alarms:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("a");
    if (token) {
      getAlarms({ headers: { token: token } }).catch(console.error);
    }
  }, []);

  return (
    <div className="h-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <div className="flex items-center justify-between border-b border-b-[#cecece] pl-5 pr-6 py-2 bg-white static md:sticky top-0 z-20 md:z-50">
        {/* <Ordenar /> */}
        <div></div>
        <h1 className="font-bold">Alarmas resueltas</h1>
        <Link href={`${rutas.Doctor}${rutas.Alarm}`}>
          <button className="flex items-center px-6 py-2 bg-[#487FFA] rounded-xl gap-3 text-white font-bold">
            Regresar
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-7 items-center border-b border-b-[#cecece] text-center md:text-start p-2 bg-white static md:sticky top-14 z-10 md:z-4 ">
        <p className="font-bold text-[#5F5F5F] w-1/6">Prioridad</p>
        <p className="font-bold text-[#5F5F5F] w-1/6">Paciente</p>
        <p className="font-bold text-[#5F5F5F] w-1/6">Fecha</p>
        <p className="font-bold text-[#5F5F5F] w-1/6">Hora</p>
        <p className="font-bold text-[#5F5F5F] w-1/6 hidden md:block">HTP</p>
        <p className="font-bold text-[#5F5F5F] w-1/6 hidden md:block">Motivo</p>
        {/* <p className="font-bold text-[#5F5F5F] w-1/6  hidden md:block">
          Tiempo de respuesta
        </p> */}
      </div>
      <div className="md:overflow-auto h-full">
        <TableAlarmResueltas pacientes={inactiveAlarms} />
      </div>
    </div>
  );
}
