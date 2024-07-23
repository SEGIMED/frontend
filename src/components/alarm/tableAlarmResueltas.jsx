"use client";
import React from "react";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
// import IconAlarmRed from "../icons/IconAlarmRed";
import IconAlarmRed from "../icons/iconAlarmRed";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import { extractHourMinutes, extractMonthDay } from "@/utils/formatDate";

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case "Alta":
      return <IconAlarmRed className="md:w-8 w-[40%]" />;
    case "Media":
      return <IconAlarmYellow className="md:w-8 w-[40%]" />;
    case "Baja":
      return <IconAlarmGreen className="md:w-8 w-[40%]" />;
    default:
      return null;
  }
};

export default function TableAlarmResueltas({ pacientes }) {
  return (
    <div className="flex flex-col">
      <div className="">
        {pacientes?.map((paciente, index) => (
           <div
           key={index}
           className="grid md:grid-cols-7 grid-cols-5 items-center border-b border-b-[#cecece] md:pr-6 py-2 md:px-2 bg-white w-full h-14 text-center md:text-start">
            <div className="text-[#5F5F5F] flex items-center justify-center md:justify-start md:gap-4  ">
              <PriorityIcon priority={paciente.highestPriority} />
              <span className="hidden md:block">
                {paciente.highestPriority}
              </span>
              <IconCurrentRouteNav className="w-3 hidden md:block " />
            </div>
            <div className="text-[#5F5F5F]">
              {paciente.name} {paciente.lastname}
            </div>
            <div className="text-[#5F5F5F]">
              {extractHourMinutes(paciente.hora)}
            </div>
            <div className="text-[#5F5F5F]">
              {extractMonthDay(paciente.fecha)}
            </div>

            <div className="text-[#5F5F5F] hidden md:block">{paciente.HTP?.data?.catHpGroup?.name}</div>
            <div className="text-[#5F5F5F] hidden md:block">
              {paciente.alarmDescription}
            </div>
            {/* <div className="text-[#5F5F5F] hidden md:block">
              {paciente.espera ? paciente.espera : "No"}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
