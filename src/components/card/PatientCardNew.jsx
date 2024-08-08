"use client";
import React from "react";
import Image from "next/image";

import riesgoRojo from "@/components/images/riesgoRojo.png";
import riesgoAmarillo from "@/components/images/riesgoAmarillo.png";
import riesgoVerde from "@/components/images/riesgoVerde.png";
import RealColorRisk from "@/utils/realColor";
import IconRisk from "../icons/iconRisk";
import Avatars from "../avatar/avatarChat";
import LastLogin from "@/utils/lastLogin";
import avatar from "@/utils/defaultAvatar";

export default function PatientCardConsulta1({ consulta, button }) {
  const getRandomColor = () => {
    const colors = [riesgoRojo, riesgoAmarillo, riesgoVerde];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  // console.log(consulta);
  const getStatusTextAndColor = (status) => {
    switch (status) {
      case 1: // Agendada
        return { text: "Agendada", color: "text-[#686868]" }; // Color normal
      case 2: // Atendida
        return { text: "Atendida", color: "text-green-500" }; // Verde
      case 3: // Cancelada
        return { text: "Cancelada", color: "text-red-500" }; // Rojo
      case 4: // No atendida
        return { text: "No atendida", color: "text-red-500" }; // Rojo
      default:
        return { text: "Desconocido", color: "text-[#686868]" }; // Color por defecto
    }
  };

  const status = getStatusTextAndColor(consulta?.schedulingStatus);
  return (
    <div className="w-[100%] flex border-b border-b-[#cecece] py-2 items-center">
      <div className="w-[10%] md:w-[5%] items-center flex justify-center">
        {consulta?.patientUser?.patientPulmonaryHypertensionRisks?.risk ? (
          <RealColorRisk
            risk={consulta.patientUser?.patientPulmonaryHypertensionRisks?.risk}
          />
        ) : (
          <IconRisk color="lightGray" />
        )}
      </div>
      <div className="text-center w-[70%] md:w-[75%] md:text-start gap-3  grid grid-cols-3 md:grid-cols-4 items-center py-2 bg-white h-fit ">
        <p className=" text-[#686868] font-normal  md:text-base leading-6  line-clamp-2">
          {consulta?.patientUser?.name} {consulta?.patientUser?.lastname}
        </p>

        <p className=" text-[#686868] font-normal md:text-base leading-6 ">
          {/* {LastLogin(consulta?.scheduledStartTimestamp)} */}
          {new Date(consulta?.scheduledStartTimestamp).toLocaleDateString(
            "es-ES",
            {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </p>

        {/* <p className=" text-[#686868] font-normal  md:text-base leading-6 ">
                    {consulta?.patientUser?.patientPulmonaryHypertensionRisks?.risk || "No asignado"}
                </p> */}
        <p className=" text-[#686868] font-normal  md:text-base leading-6 ">
          {consulta?.healthCenter === 1 ? "Centro Gallegos" : "Otro Centro"}
        </p>
        <p className=" text-[#686868] font-normal hidden md:block  md:text-base leading-6 ">
          {consulta?.reasonForConsultation}
        </p>
      </div>
      <div className="w-[20%]  items-center justify-center flex">{button}</div>
    </div>
  );
}
