"use client";

import TableAlarmResueltas from "@/components/alarm/tableAlarmResueltas";
import Link from "next/link";
import rutas from "@/utils/rutas";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Ordenar from "@/components/Buttons/Ordenar";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import IconArrowLeft from "@/components/icons/IconArrowLeft";

export default function HomeDoc() {
  const [inactiveAlarms, setInactiveAlarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAlarms = async (headers) => {
    try {
      const response = await ApiSegimed.get(`/alarms-by-patient/`, headers);
      if (response.data) {
        const inactiveAlarms = response.data?.alarms?.filter(
          (alarma) => alarma.solved === true
        ).sort((a, b) => {
          const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
          return (
            priorityOrder[a.highestPriority] - priorityOrder[b.highestPriority]
          );
        });

        setInactiveAlarms(inactiveAlarms);
      }
    } catch (error) {
      console.error("Error fetching alarms:", error);
    } finally {
      setIsLoading(false);
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
      <title>Alarmas Resueltas</title>
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
          <Ordenar />
          <h1 className="font-bold md:text-xl hidden md:block">Alarmas resueltas</h1>
          <div className="flex gap-3">
            <Link href={`${rutas.Doctor}${rutas.Alarm}`}>
              <button className="flex items-center px-6 py-2 bg-[#487FFA] rounded-xl gap-3 text-white font-bold">
                <IconArrowLeft iconColor="white" />
                Regresar
              </button>
            </Link>
          </div>
        </div>
        <div className="md:overflow-y-auto h-full w-[100%]">
          <div className="w-[100%] bg-white border-b border-b-[#cecece] flex">
            <div className="w-[10%] md:w-[5%] md:block"></div>
            <div className="grid w-[80%] md:w-[95%] text-center items-center leading-6 text-base font-normal gap-3 grid-cols-4 md:text-start md:grid-cols-7 py-2 z-10">
              <p className="text-[#5F5F5F] hidden md:block">Prioridad</p>
              <p className="text-[#5F5F5F]">Hora</p>
              <p className="text-[#5F5F5F]">Fecha</p>
              <p className="text-[#5F5F5F]">Paciente</p>
              <p className="text-[#5F5F5F] hidden md:block">HTP</p>
              <p className="text-[#5F5F5F] hidden md:block">Motivo de alarma</p>
              <p className="text-[#5F5F5F] justify-center ">Tiempo de respuesta</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonList count={10} />
          ) : inactiveAlarms.length === 0 ? (
            <NotFound text="No hay historial de consultas." sizeText="w-[100%]" />
          ) : (
            <div className="items-start justify-center w-full md:overflow-y-auto">
              <TableAlarmResueltas pacientes={inactiveAlarms} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
