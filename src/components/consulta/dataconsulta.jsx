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
import MapModalPte from "../modal/MapModalPte";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";

export default function Consulta({ paciente, title }) {

  const [showMapModal, setShowMapModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    fullName: '',
    edad: '',
    genre: '',
    idNumber: '',
    medicalCoverage: '',
    phone: '',
    emergencyNumber: '',
    email: '',
    geolocation: '',
    currentLocationCountry: '',
    birthDate: ''
    
  });

  useEffect(() => {
    if (paciente) {
      setValues({
        fullName: [paciente?.name, paciente?.lastname].filter(Boolean).join(" "),
        edad: paciente?.sociodemographicDetails?.birthDate === undefined ? '' : CalcularEdad(paciente?.sociodemographicDetails?.birthDate),
        genre: paciente?.sociodemographicDetails?.genre,
        idNumber: paciente?.sociodemographicDetails?.idNumber,
        medicalCoverage: paciente?.sociodemographicDetails?.healthCarePlan,
        phone: paciente?.cellphone,
        emergencyNumber: paciente?.sociodemographicDetails?.emergencyContactPhone,
        email: paciente?.email,
        geolocation: paciente?.geolocation,
        currentLocationCountry: [paciente?.currentLocationCity, paciente?.currentLocationCountry].filter(Boolean).join(" "),
        birthDate: paciente?.sociodemographicDetails?.birthDate
      });
    }
  }, [paciente]);
  

  
  const handleGeolocationClick = () => {
    setShowMapModal(true);
  };
  return (
    <div className="flex flex-col">
      <details>
        <summary className="flex items-center justify-between gap-1 px-6 py-2 bg-white border cursor-pointer " onClick={() => setIsOpen(!isOpen)}>
          <div/>
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">{title}</p>
          </div>
          <div className={isOpen ? "rotate-180" : ""}>
            <IconArrowDetailDown/>
          </div>
        </summary>
        <DataPatient title="Nombre completo" info={values.fullName} />
        <DataPatient title="Edad" info={values.edad} />
        <DataPatient title="Genero" info={values.genre} />
        <DataPatient title="Número de documento" info={values.idNumber} />
        <DataPatient title="Cobertura medica" info={values.medicalCoverage} />
        <DataPatient title="Telefono" info={values.phone} />
        <DataPatient title="Telefono de emergencia" info={values.emergencyNumber} />
        <DataPatient title="Correo electronico" info={values.email} />
        <DataPatient title="Dirección de domicilio" geolocation={paciente?.geolocation} openModal={handleGeolocationClick}/>
        <DataPatient title="Lugar de nacimiento" info={values.currentLocationCountry} />
        <DataPatient title="Fecha de nacimiento" info={values.birthDate} />
      </details>

      {showMapModal === true && (
        <MapModalPte onClose={() => setShowMapModal(false)} patient={paciente} />
      )}

    </div>
  );
}
