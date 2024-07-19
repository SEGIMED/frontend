"use client";
import TableAlarm from "@/components/alarm/tableAlarm";
import Ordenar from "@/components/Buttons/Ordenar";
import Link from "next/link";
import rutas from "@/utils/rutas";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { PathnameShow } from "@/components/pathname/path";

// const getHighestPriority = (priorities) => {
//   if (priorities.includes("Alta")) return "Alta";
//   if (priorities.includes("Media")) return "Media";
//   return "Baja";
// };

// const formatAlarms = (alarms) => {
//   return alarms.map((alarm) => ({
//     ...alarm,
//     highestPriority: getHighestPriority(
//       alarm.questionsPriority.map((p) => p.split(": ")[1])
//     ),
//   }));
// };

export default function HomeDoc() {
  const [activeAlarms, setActiveAlarms] = useState([]);
  const lastSegmentTextToShow = PathnameShow()

  const getAlarms = async (headers) => {
    try {
      const response = await ApiSegimed.get(`/alarms-by-patient/`, headers);
     
      if (response.data) {
        const activeAlarms = response.data.filter((alarma) => !alarma.solved);

        
        // const formattedAlarms = formatAlarms(activeAlarms);
        
        // formattedAlarms.sort((a, b) => {
        //   const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
        //   return (
        //     priorityOrder[a.highestPriority] - priorityOrder[b.highestPriority]
        //   );
        // });

        setActiveAlarms(activeAlarms);
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
      <title>{lastSegmentTextToShow}</title>
      <div className="flex items-center justify-between border-b border-b-[#cecece] pl-5 pr-6 py-2 bg-white static md:sticky top-0 z-20 md:z-50">
        {/* <Ordenar /> */}
        <h1 className="font-bold">Listado de Alarmas</h1>
        <Link href={`${rutas.Doctor}${rutas.Alarm}${rutas.resueltas}`}>
          <button className="flex items-center px-6 py-2 bg-[#70C247] rounded-xl gap-3 text-white font-bold">
            Ver resueltas
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-7 items-center border-b border-b-[#cecece] text-center md:text-start p-2 bg-white static md:sticky top-14 z-10 md:z-4 ">
        <p className="font-bold text-[#5F5F5F] ">Prioridad</p>
        <p className="font-bold text-[#5F5F5F]">Paciente</p>
        <p className="font-bold text-[#5F5F5F]">Fecha</p>
        <p className="font-bold text-[#5F5F5F]">Hora</p>
        <p className="font-bold text-[#5F5F5F] hidden md:block">HTP</p>
        <p className="font-bold text-[#5F5F5F] hidden md:block">
          Motivo de alarma
        </p>
        <div>
          <p className="font-bold text-[#5F5F5F] block md:hidden"> Opciones</p>
        </div>
      </div>
      <div className="md:overflow-auto h-full">
        <TableAlarm pacientes={activeAlarms} />
      </div>
    </div>
  );
}
