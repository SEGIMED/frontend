"use client";

import ClincalCuerpo from "@/components/clinicalHistory/cuerpo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import TableCuerpo from "@/components/clinicalHistory/TableCuerpo";
import Ordenar from "@/components/Buttons/Ordenar";
import FiltrarPacientes from "@/components/Buttons/FiltrarPacientes";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";

export default function HomeDoc() {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const userId = pathArray[pathArray.length - 2];

  const [consultas, setConsultas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getConsultas = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        `/medical-event/get-medical-event-history?patientId=${userId}`,
        headers
      );
      if (response.data) {
        setConsultas(response.data);
      }
    } catch (error) {
      console.error("Error fetching consultas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("a");
    if (token) {
      getConsultas({ headers: { token: token } }).catch(console.error);
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex justify-between px-5 items-center border-b bg-white border-b-[#cecece] pb-2 pt-2">
        <Ordenar />
        <p className="text-[#686868] hidden md:block text-center font-semibold text-xl md:text-base leading-6">
          Autoevaluacion
        </p>
        <FiltrarPacientes />
      </div>
      <div className="overflow-y-scroll flex flex-col h-full w-full">
        <div className="flex w-[100%] border-b bg-white border-b-[#cecece]">
          <div className="w-[5%] hidden md:block"></div>
          <div className="grid w-[90%] md:w-[90%] text-center md:text-left grid-cols-3 leading-6 text-base font-normal md:grid-cols-5 items-center py-2 z-10">
            <p className="text-[#5F5F5F] hidden md:block">Hora</p>
            <p className="text-[#5F5F5F]">Fecha</p>
            <p className="text-[#5F5F5F] hidden md:block">Medico</p>
            <p className="text-[#5F5F5F]">Centro de atencion</p>
            <p className="text-[#5F5F5F]">Motivo de consulta</p>
          </div>
          <div className="w-[5%] hidden md:block"></div>
        </div>
        {isLoading ? (
          <SkeletonList count={9} />
        ) : consultas.length === 0 ? (
          <NotFound text="No hay historial de autoevaluaciones." sizeText="w-[100%]" />
        ) : (
          <TableCuerpo consultas={consultas} />
        )}
      </div>
    </div>
  );
}
