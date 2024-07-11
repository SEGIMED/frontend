"use client";

import Ordenar from "@/components/Buttons/Ordenar";
import FiltrarPacientes from "@/components/Buttons/FiltrarPacientes";
import TableConsultas from "@/components/clinicalHistory/TableConsultas";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";

export default function HomeDoc() {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const userId = pathArray[pathArray.length - 2];
  // const userId = 8;

  const [consultas, setConsultas] = useState([]);

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
        <p className="text-[#686868] font-semibold text-xl md:text-base leading-6">
          Consultas
        </p>
        <FiltrarPacientes />
      </div>
      <div className="grid text-center grid-cols-4 md:text-left md:grid-cols-7 items-center border-b border-b-[#cecece] py-2 bg-white z-10">
        <div className="hidden md:block"></div>
        <p className="font-bold text-[#5F5F5F] ">Fecha</p>
        <p className="font-bold text-[#5F5F5F] hidden md:block">Hora</p>
        <p className="font-bold text-[#5F5F5F] ">Especialidad</p>
        <p className="font-bold text-[#5F5F5F] ">Centro de atención</p>
        <p className="font-bold text-[#5F5F5F] hidden md:block">
          Motivo de consulta
        </p>
        <p className="font-bold text-[#5F5F5F] block md:hidden">Opciones</p>
      </div>
      {consultas.length === 0 ? (
        <p className="text-[#686868] font-semibold h-full text-base items-center flex justify-center ">
          No hay informacion disponible
        </p>
      ) : (
        <TableConsultas consultas={consultas} />
      )}
    </div>
  );
}
