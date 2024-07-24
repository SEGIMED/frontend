"use client";

import Ordenar from "@/components/Buttons/Ordenar";
import FiltrarPacientes from "@/components/Buttons/FiltrarPacientes";
import TableConsultas from "@/components/clinicalHistory/TableConsultas";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";

export default function HomeDoc() {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const userId = pathArray[pathArray.length - 2];
  // const userId = 8;

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
      <div className="w-full flex justify-center items-center border-b bg-white border-b-[#cecece] py-2">
        {/* <Ordenar /> */}
        <p className="text-[#686868] text-center hidden md:block font-semibold text-xl md:text-lg leading-6">
          Consultas
        </p>
        {/* <FiltrarPacientes /> */}
      </div>
      <div className="w-[100%] bg-white border-b border-b-[#cecece] flex">
        <div className="w-[5%] hidden md:block"></div>
        <div className="grid w-full text-center leading-6 text-base font-normal gap-3 grid-cols-3 md:text-left md:grid-cols-5 items-center py-2 z-10">
          <p className="text-[#5F5F5F]">Fecha</p>
          <p className="text-[#5F5F5F] hidden md:block">Hora</p>
          <p className="text-[#5F5F5F]">Grupo HTP</p>
          <p className="text-[#5F5F5F]">Centro de atención</p>
          <p className="text-[#5F5F5F] hidden md:block">Motivo de consulta</p>
        </div>
        <div className="w-[25%] md:w-[20%]">
          <p className="text-[#5F5F5F] text-center items-center flex py-2 md:hidden">
            Ver consulta
          </p>
        </div>
      </div>
      {isLoading ? (
        <SkeletonList count={9} />
      ) : consultas.length === 0 ? (
        <NotFound text="No hay historial de consultas." sizeText="w-[100%]" />
      ) : (
        <TableConsultas consultas={consultas} />
      )}
    </div>
  );
}
