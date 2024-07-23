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
      return <IconAlarmRed className="md:w-8 w-[75%]" />;
    case "Media":
      return <IconAlarmYellow className="md:w-8 w-[75%]" />;
    case "Baja":
      return <IconAlarmGreen className="md:w-8 w-[75%]" />;
    default:
      return null;
  }
};

export default function TableAlarmResueltas({ pacientes }) {
  return (
    <div className="flex flex-col">
      <div className="">
        {pacientes?.map((paciente, index) => (
          <div key={index} className="w-[100%] flex border-b border-b-[#cecece] py-2 items-center">
            <div className="w-[10%]  md:w-[5%] items-center flex justify-center">
              <PriorityIcon priority={paciente.highestPriority} />

            </div>
            <div className="text-center w-[80%] md:w-[80%] md:text-start gap-3  grid grid-cols-4 md:grid-cols-6 items-center py-2 bg-white h-fit ">
              <span className="hidden md:flex items-center justify-between pr-20 ">
                {paciente.highestPriority}
                <IconCurrentRouteNav className="w-3 hidden md:block " />
              </span>
              <div className="text-[#5F5F5F]">
                {extractHourMinutes(paciente.hora)}
              </div>
              <div className="text-[#5F5F5F]">
                {extractMonthDay(paciente.fecha)}
              </div>
              <p className=" text-[#686868] font-normal  md:text-base leading-6  line-clamp-2">
                {paciente?.name} {paciente?.lastname}
              </p>

              <div className="text-[#5F5F5F] hidden md:block "> {paciente.HTP?.data?.catHpGroup?.name}</div>
              <div className="text-[#5F5F5F] hidden md:block truncate">
                {paciente.alarmDescription}
              </div>
              {/* <div className="text-[#5F5F5F] ">
                {paciente.espera ? paciente.espera : "No"}
              </div> */}
            </div>
            {/* <div className="hidden md:w-[20%] items-center justify-center md:flex"> */}
            {/* </div> */}


          </div >
        ))}
      </div>
    </div >
  );
}

