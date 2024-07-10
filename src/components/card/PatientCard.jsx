"use client";
import React from "react";
import Image from "next/image";

import riesgoRojo from "@/components/images/riesgoRojo.png";
import riesgoAmarillo from "@/components/images/riesgoAmarillo.png";
import riesgoVerde from "@/components/images/riesgoVerde.png";

import Avatars from "../avatar/avatarChat";

export default function PatientCard({ paciente, button, consulta }) {
  
  const getRandomColor = () => {
    const colors = [riesgoRojo, riesgoAmarillo, riesgoVerde];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // const realColor= ({paciente})=>{
  //   const risk = paciente?.patientPulmonaryHypertensionRisks?.risk
  //   switch (risk) {
  //     case "Bajo":
  //     return riesgoVerde;
  //     case "Moderado":
  //     return riesgoAmarillo;
  //     case "Alto":
  //     return riesgoRojo;
  //     default:
  //     return null;
  //   }
  // }

  return (
    <div className="flex justify-between w-full border-b border-b-[#cecece] px-6 py-2 items-center">
      <div className="flex gap-1 md:gap-3 items-center">
        <Image src={getRandomColor()} alt="Punto de color" />
        <div className="w-12 h-12 flex justify-center items-center">
          <Avatars avatar1={paciente?.avatar} />
        </div>
        <p className="text-start text-[#686868] font-normal text-sm md:text-base leading-6 w-36 md:w-fit">
          {paciente?.name} {paciente?.lastname}
        </p>
      </div>
      {button}
    </div>
  );
}
