"use client";
import React from "react";
import Image from "next/image";
import RealColorRisk from "@/utils/realColor";
import IconRisk from "../icons/iconRisk";
import riesgoRojo from "@/components/images/riesgoRojo.png";
import riesgoAmarillo from "@/components/images/riesgoAmarillo.png";
import riesgoVerde from "@/components/images/riesgoVerde.png";

import Avatars from "../avatar/avatarChat";
import IconMedChat from "../icons/IconMedChat";

export default function PatientCard({ paciente, button, flag }) {
  // const getRandomColor = () => {
  //   const colors = [riesgoRojo, riesgoAmarillo, riesgoVerde];
  //   const randomIndex = Math.floor(Math.random() * colors.length);
  //   return colors[randomIndex];
  // };

  return (
    <div className="flex justify-between w-full border-b border-b-[#cecece] px-6 py-2 items-center">
      <div className="flex gap-1 md:gap-3 items-center">
        {flag ? (
          <IconMedChat color="gray" className="w-6 h-6" />
        ) : paciente.patientPulmonaryHypertensionRisks?.risk ? (
          <RealColorRisk
            risk={paciente.patientPulmonaryHypertensionRisks.risk}
          />
        ) : (
          <IconRisk color="lightGray" />
        )}

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
