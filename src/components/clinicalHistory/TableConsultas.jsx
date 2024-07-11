"use client";
import React from "react";
import AlarmButtonDoc from "../Buttons/alarmButtonDoc";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
import IconAlarmRed from "../icons/iconAlarmRed";
import IconConsulta from "../icons/IconConsulta";

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

const handleStatus = (id) => {};

export default function TableConsultas({ consultas }) {
  return (
    <div className="h-full flex flex-col">
      {consultas?.map((paciente, index) => (
        <div
          key={index}
          className="text-center md:text-left xs:gap-2 grid grid-cols-4 md:grid-cols-7 items-center border-b border-b-[#cecece] md:px-2 py-2 bg-white w-full h-fit ">
          <div className="justify-center w-1/2 hidden md:flex">
            <IconConsulta />
          </div>
          <div className="text-[#5F5F5F]">
            {new Date(paciente.timestamp).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
            })}
          </div>
          <div className="text-[#5F5F5F] hidden md:block">
            {new Date(paciente.timestamp).toLocaleTimeString()}
          </div>
          <p className="text-[#FF8300] ">{paciente?.medicalSpecialty}</p>
          <div className="text-[#5F5F5F]">
            {paciente?.attendancePlace?.alias}
          </div>
          <div className="text-[#5F5F5F] hidden md:block">
            {paciente?.chiefComplaint}
          </div>
          <AlarmButtonDoc id={paciente.id} handleStatus={handleStatus} />
        </div>
      ))}
    </div>
  );
}
