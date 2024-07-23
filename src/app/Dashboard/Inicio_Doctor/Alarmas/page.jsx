"use client";
import TableAlarm from "@/components/alarm/tableAlarm";
import Ordenar from "@/components/Buttons/Ordenar";
import Link from "next/link";
import rutas from "@/utils/rutas";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { PathnameShow } from "@/components/pathname/path";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import NotFound from "@/components/notFound/notFound";

export default function HomeDoc() {
  const [activeAlarms, setActiveAlarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const lastSegmentTextToShow = PathnameShow();

  const getAlarms = async (headers) => {
    try {
      const response = await ApiSegimed.get(`/alarms-by-patient/`, headers);
      if (response.data) {
        const activeAlarms = response?.data?.alarms?.filter(
          (alarma) => !alarma.solved
        );
        setActiveAlarms(activeAlarms);
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
      const intervalId = setInterval(() => {
        getAlarms({ headers: { token: token } }).catch(console.error);
      }, 30000); // Polling every 30 seconds

      return () => clearInterval(intervalId); // Clean up interval on component unmount
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="h-full flex flex-col overflow-y-auto md:overflow-y-hidden">
      <title>{lastSegmentTextToShow}</title>
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
          <Ordenar />
          <h1 className="font-bold md:text-xl hidden md:block">
            Listado de Alarmas
          </h1>
          <div className="flex gap-3">
            <Link href={`${rutas.Doctor}${rutas.Alarm}${rutas.resueltas}`}>
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
          ) : activeAlarms.length === 0 ? (
            <NotFound
              text="No hay historial de consultas."
              sizeText="w-[100%]"
            />
          ) : (
            <div className="items-start justify-center w-full md:overflow-y-auto">
              <TableAlarm pacientes={activeAlarms} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
