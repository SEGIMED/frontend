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
import { useEffect, useState } from "react";

export default function Consulta({ paciente, title }) {
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    edad: '',
    birthDate: '',
    genre: '',
    currentLocationCity: '',
    currentLocationCountry: ''
  });

  useEffect(() => {
    if (paciente) {
      setValues({
        name: paciente?.name,
        lastname: paciente?.lastname,
        edad: paciente?.sociodemographicDetails?.birthDate === undefined ? '' : CalcularEdad(paciente?.sociodemographicDetails?.birthDate),
        birthDate: paciente?.sociodemographicDetails?.birthDate,
        genre: paciente?.sociodemographicDetails?.genre,
        currentLocationCity: paciente?.currentLocationCity,
        currentLocationCountry: paciente?.currentLocationCountry
      });
    }
  }, [paciente]);
  return (
    <div className="flex flex-col">
      <details>
        <summary className="flex items-center justify-center gap-1 px-6 py-2 border cursor-pointer">
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">{title}</p>
          </div>
        </summary>
        <DataPatient title="Nombre" info={values.name} />
        <DataPatient title="Apellido" info={values.lastname} />
        <DataPatient title="Edad" info={values.edad} />
        <DataPatient title="Fecha de nacimiento" info={values.birthDate} />
        <DataPatient title="Genero" info={values.genre} />
        <DataPatient title="Ciudad" info={values.currentLocationCity} />
        <DataPatient title="Pais" info={values.currentLocationCountry} />


      </details>
    </div>
  );
}
