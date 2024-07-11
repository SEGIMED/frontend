"use client";

import Ordenar from "@/components/Buttons/Ordenar";
import FiltrarPacientes from "@/components/Buttons/FiltrarPacientes";
import pacientesAlarm from "@/utils/dataAlarm";
import Anamnesis from "@/components/clinicalHistory/TableAnamnesis";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";

export default function HomeDoc() {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const userId = pathArray[pathArray.length - 2];

  const [consultas, setConsultas] = useState([]);

  const getConsultas = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        `/medical-event/get-medical-event-history?patientId=${userId}`,
        headers
      );
      if (response.data) {
        console.log(response.data);
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
          Anamnesis
        </p>
        <FiltrarPacientes />
      </div>
      <div className="grid text-center grid-cols-4 text-[#5F5F5F] md:grid-cols-6 items-center border-b border-b-[#cecece] md:pl-2 md:pr-6 py-2 bg-white z-10">
        <p className="font-bold hidden md:block">Hora</p>
        <p className="font-bold">Fecha</p>
        <p className="font-bold hidden md:block">Grupo HTP</p>
        <p className="font-bold">Centro de atencion</p>
        <p className="font-bold">Motivo de consulta</p>
        <p className="font-bold"></p>
      </div>
      {consultas.length === 0 ? (
        <p className="text-[#686868] font-semibold h-full text-base items-center flex justify-center ">
          No hay informacion disponible
        </p>
      ) : (
        <Anamnesis pacientes={consultas} />
      )}
    </div>
  );
}
