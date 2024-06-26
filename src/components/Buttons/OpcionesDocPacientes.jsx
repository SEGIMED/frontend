"use client";

import IconAccion from "../icons/IconAccion";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import IconGeolocation from "../icons/IconGeolocation";
import IconInfo from "../icons/IconInfo";
import IconMiniCalendar from "../icons/IconMiniCalendar";
import IconOptions from "../icons/IconOptions";
import IconPersonalData from "../icons/IconPersonalData";
import IconStar2 from "@/components/icons/IconStar2";
import IconMessages from "@/components/icons/IconMessages";
import rutas from "@/utils/rutas";
import Link from "next/link";
import MapModalPte from "../modal/MapModalPte";
import { useState } from "react";

export default function OpcionesDocPacientes({
  paciente,
  onConsultationClick,
  onToggleFavorite,
  isOpen,
  toggleOptions,
}) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  return (
    <div className="relative">
      <button
        onClick={toggleOptions}
        className="flex items-center justify-center md:px-6 p-2 text-white bg-[#487FFA] rounded-xl gap-1 md:gap-3 font-bold cursor-pointer">
        <IconOptions color="#FFFFFF" />
        Opciones
      </button>

      {isOpen && (
        <ul className="flex flex-col absolute p-2 bg-white z-50 w-80 right-0 border-2 border-[#D7D7D7] rounded-lg shadow-lg mt-1">
          <span className="flex items-center gap-2 font-medium text-sm px-3 pt-3">
            <IconAccion />
            Acciones
          </span>
          <div className="flex flex-col gap-4 p-5">
            <li
              className="flex items-center gap-3 cursor-pointer"
              onClick={onConsultationClick}>
              <IconMiniCalendar />
              Agendar Consulta
            </li>
            {/* <li
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onToggleFavorite(paciente.id)}>
              <IconStar2 className="w-6" borde="#B2B2B2" />
              Agregar a favoritos
            </li> */}
          </div>
          <div className="border"></div>
          <span className="flex items-center gap-2 font-medium text-sm px-3 pt-5">
            <IconInfo />
            Información
          </span>
          <div className="flex flex-col gap-4 p-5">
            <li className="flex items-center gap-2">
              <Link
                className="flex items-center gap-2 cursor-pointer"
                href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${paciente.id}/${rutas.Datos}`}>
                <IconClinicalHistory />
                Ver Historia Clínica
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Link
                className="flex items-center gap-2 cursor-pointer"
                href={`${rutas.Doctor}${rutas.Pacientes}/${paciente.id}`}>
                <IconPersonalData />
                Ver datos Personales
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Link
                className="flex items-center gap-2 cursor-pointer"
                href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${paciente.id}/${rutas.Consultas}`}>
                <IconClinicalHistory /> Ver antiguas consultas
              </Link>
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <Link
                className="flex items-center gap-2 cursor-pointer"
                href={`${rutas.Doctor}${rutas.Mensajes}`}>
                <IconMessages />
                Ver Mensajes
              </Link>
            </li>
            <button onClick={openModal}>
              <li className="flex items-center gap-2 cursor-pointer">
                <IconGeolocation />
                Ver Geolocalización
              </li>
            </button>
          </div>
        </ul>
      )}
      {showModal && <MapModalPte onClose={() => setShowModal(false)} patient={paciente} />}
    </div>
  );
};


