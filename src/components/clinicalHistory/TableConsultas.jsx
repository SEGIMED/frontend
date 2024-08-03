"use client";
import React from "react";
import AlarmButtonDoc from "../Buttons/alarmButtonDoc";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
import IconAlarmRed from "../icons/iconAlarmRed";
import IconConsulta from "../icons/IconConsulta";
import rutas from "@/utils/rutas";
import Link from "next/link";
import IconOptions from "../icons/IconOptions";

const PriorityIcon = ({ priority }) => {
  switch (priority.toLowerCase()) {
    case "alta":
      return <IconAlarmRed className="md:w-8 w-1/2" />;
    case "media":
      IconClinicalHistory;
      return <IconAlarmYellow className="md:w-8 w-1/2" />;
    case "baja":
      return <IconAlarmGreen className="md:w-8 w-1/2" />;
    default:
      return null;
  }
};

const handleStatus = (id) => { };

export default function TableConsultas({ consultas }) {

  return (
    <div className="h-full flex flex-col">
      {consultas?.map((paciente, index) => (
        <div
          key={index}
          className="w-[100%] border-b border-b-[#cecece] flex justify-start gap-3 md:gap-0">
          <div className=" items-center w-[5%] hidden justify-center md:flex">
            <div className=" justify-center w-1/2 hidden md:flex">
              <IconConsulta />
            </div>
          </div>
          <div className="text-center w-[75%] md:w-[90%] md:text-start gap-3  grid grid-cols-3 md:grid-cols-5 items-center py-2 bg-white h-fit ">
            <div className="text-[#5F5F5F]">
              {new Date(paciente.timestamp).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
            <div className="text-[#5F5F5F] hidden md:block">
              {new Date(paciente.timestamp).toLocaleTimeString()}
            </div>
            <p className="text-[#FF8300] ">{paciente?.patientHpGroups[0]?.group}</p>
            <div className="text-[#5F5F5F]">
              {paciente?.attendancePlace?.alias}
            </div>
            <div className="text-[#5F5F5F] hidden md:block line-clamp-2">
              {paciente?.chiefComplaint}
            </div>
          </div>
          <div className="w-[25%] md:w-[5%]  items-center justify-center flex">
            {/*            
            <Link href={`${rutas.Doctor}${rutas.Pacientes}`}>
              <button className="flex rounded-lg items-center px-4 xs:px-6 py-2 font-bold text-sm leading-5 bg-bluePrimary text-white gap-1 ">
                <IconOptions color="#FFFFFF" />
                <p className="hidden md:block">Ver consulta</p>
              </button>
            </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
}
