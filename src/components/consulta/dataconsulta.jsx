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
import ModalModularizado from "../modal/ModalPatient/ModalModurizado";

export default function Consulta({ paciente, title, defaultOpen = false }) {

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
        idNumber: paciente?.idNumber,
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
      <details open={defaultOpen}>
        <summary className="flex items-center justify-between h-16 gap-1 px-6 bg-white border cursor-pointer " onClick={() => setIsOpen(!isOpen)}>
          <div />
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">{title}
              <b className="font-semibold text-red-500">*</b>
            </p>
          </div>
          <div className={isOpen || defaultOpen === true ? "rotate-180" : ""}>
            <IconArrowDetailDown />
          </div>
        </summary>
        <DataPatient title="Nombre completo" info={values.fullName} />
        <DataPatient title="Edad" info={values.edad} />
        <DataPatient title="Genero" info={values.genre} />
        <DataPatient title="Número de documento" info={values.idNumber} />
        <DataPatient title="Cobertura medica" info={values.medicalCoverage} />
        {/* <DataPatient title="Telefono" info={values.phone} />
        <DataPatient title="Telefono de emergencia" info={values.emergencyNumber} />
        <DataPatient title="Correo electronico" info={values.email} /> */}
        <DataPatient title="Dirección de domicilio" geolocation={paciente?.geolocation} openModal={handleGeolocationClick} />
        <DataPatient title="Lugar de nacimiento" info={values.currentLocationCountry} />
        <DataPatient title="Fecha de nacimiento" info={values.birthDate} />
      </details>

      {showMapModal === true && (
        <ModalModularizado
          isOpen={showMapModal}
          onClose={() => setShowMapModal(false)}
          Modals={[<MapModalPte
            onClose={() => setShowMapModal(false)}
            patient={paciente}
            key={"map"}
          />]}
          title={"Geolocalizacion del paciente"}
          button1={"hidden"}
          button2={"bg-bluePrimary text-white block font-font-Roboto"}
          progessBar={"hidden"}
          size={"h-[36rem] md:h-[35rem] md:w-[45rem]"}
          buttonText={{ end: `Continuar` }}
        />
      )}


    </div>
  );
}
