"use client";
import React from "react";
import Image from "next/image";

import riesgoRojo from "@/components/images/riesgoRojo.png";
import riesgoAmarillo from "@/components/images/riesgoAmarillo.png";
import riesgoVerde from "@/components/images/riesgoVerde.png";

import Avatars from "../avatar/avatarChat";
import LastLogin from "@/utils/lastLogin";

export default function PatientCardConsulta({ paciente, button, consulta }) {
  const getRandomColor = () => {
    const colors = [riesgoRojo, riesgoAmarillo, riesgoVerde];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getStatusTextAndColor = (status) => {
    switch (status) {
      case 1: // Agendada
        return { text: 'Agendada', color: 'text-[#686868]' }; // Color normal
      case 2: // Atendida
        return { text: 'Atendida', color: 'text-green-500' }; // Verde
      case 3: // Cancelada
        return { text: 'Cancelada', color: 'text-red-500' }; // Rojo
      case 4: // No atendida
        return { text: 'No atendida', color: 'text-red-500' }; // Rojo
      default:
        return { text: 'Desconocido', color: 'text-[#686868]' }; // Color por defecto
    }
  };

  const status = getStatusTextAndColor(paciente?.schedulingStatus);


  return (
    <div className="w-full border-b border-b-[#cecece] md:px-6 py-2 items-center pl-4">
      <div className="md:w-full md:flex grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-4 items-center">
        <Image
          className="hidden md:block md:w-[1%]"
          src={getRandomColor()}
          alt="Punto de color"
        />
        <div className="md:w-[10%] h-12 gap-3 flex justify-center items-center ">
          <Avatars avatar={paciente?.avatar} />
          <p className="text-start text-[#686868] font-normal text-sm md:text-base leading-6 w-36 md:w-fit">
            {paciente?.patientUser?.name} {paciente?.patientUser?.lastname}
          </p>
        </div>

        <p className="text-center text-[#686868] font-normal text-sm md:text-base leading-6 w-36 md:w-[20%] hidden md:block">
          {paciente?.reasonForConsultation}
        </p>
        <p className="text-center text-[#686868] font-normal text-sm md:text-base leading-6 w-36 md:w-[20%] ">
          {LastLogin(paciente?.scheduledStartTimestamp)}
        </p>
        <p
          className={`text-center font-normal text-base leading-6 hidden md:block ${status?.color} md:w-[20%]`}>
          {status?.text}
        </p>
        {button}
      </div>
    </div>
  );
}
