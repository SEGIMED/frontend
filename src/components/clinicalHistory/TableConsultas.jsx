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
      <div className="">
        {consultas?.map((paciente, index) => (
          <div
            key={index}
            className="grid grid-cols-7 items-center border-b border-b-[#cecece] pr-6 py-2 bg-white w-full h-fit ">
            <div className="flex justify-center">
              <IconConsulta />
            </div>
            <div className="text-[#5F5F5F]">
              {new Date(paciente.timestamp).toLocaleDateString()}
            </div>
            <div className="text-[#5F5F5F]">
              {new Date(paciente.timestamp).toLocaleTimeString()}
            </div>
            <div className="text-[#FF8300]">{paciente?.medicalSpecialty}</div>
            <div className="text-[#5F5F5F]">
              {paciente?.attendancePlace?.alias}
            </div>
            <div className="text-[#5F5F5F]">{paciente?.chiefComplaint}</div>
            <div className="text-[#5F5F5F] justify-center">
              <AlarmButtonDoc id={paciente.id} handleStatus={handleStatus} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
