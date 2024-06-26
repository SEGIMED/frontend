"use client";

import Image from "next/image";
import circleData from '@/components/images/circleData.png';
import CalcularEdad from "@/utils/calcularEdad";

const keyToTextMap = {
  name: "Nombre",
  lastname: "Apellido",
  idNumber: "Documento",
};


import DataPatient from "./info";

export default function Consulta({ paciente, title }) {
  return (
    <div className="flex flex-col">
      <details>
        <summary className="flex px-6 py-2 border gap-1 items-center cursor-pointer justify-center">
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">{title}</p>
          </div>
        </summary>
        <DataPatient title="Nombre" info={paciente?.name} />
        <DataPatient title="Apellido" info={paciente?.lastname} />
        <DataPatient title="Edad" info={CalcularEdad(paciente?.sociodemographicDetails?.birthDate)} />
        <DataPatient title="Fecha de nacimiento" info={paciente?.sociodemographicDetails?.birthDate} />
        <DataPatient title="Genero" info={paciente?.sociodemographicDetails?.genre} />
        <DataPatient title="Ciudad" info={paciente?.currentLocationCity} />
        <DataPatient title="Pais" info={paciente?.currentLocationCountry} />


      </details>
    </div>
  );
}
