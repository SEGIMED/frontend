"use client";

import React from "react";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
import IconAlarmRed from "../icons/iconAlarmRed";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import { extractHourMinutes, extractMonthDay } from "@/utils/formatDate";

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case "Alta":
      return <IconAlarmRed className="md:w-8 w-1/2" />;
    case "Media":
      return <IconAlarmYellow className="md:w-8 w-1/2" />;
    case "Baja":
      return <IconAlarmGreen className="md:w-8 w-1/2" />;
    default:
      return null;
  }
};

const determinePriority = (questionsPriority) => {
  let hasAlta = false;
  let hasMedia = false;

  for (let item of questionsPriority) {
    if (item.includes("Alta")) {
      hasAlta = true;
    } else if (item.includes("Media")) {
      hasMedia = true;
    }
  }

  if (hasAlta) {
    return "Alta";
  } else if (hasMedia) {
    return "Media";
  } else {
    return "Baja";
  }
};

export default function TableAlarm({ paciente }) {
  const handleStatus = (id) => {};
  console.log(paciente)
  return (
    <div className="flex flex-col">
      {paciente.map((alarm, index) => {
        const highestPriority = determinePriority(alarm.questionsPriority);

        return (
          <div
          key={index}
          className="grid md:grid-cols-7 grid-cols-5 items-center border-b border-b-[#cecece] md:pr-6 py-2 md:px-2 bg-white w-full h-14 text-center md:text-start">
            <div className="text-[#5F5F5F] flex items-center justify-center md:justify-start md:gap-4">
              <PriorityIcon priority={highestPriority} />
              <span className="hidden md:block">{highestPriority}</span>
              <IconCurrentRouteNav className="w-3 hidden md:block" />
            </div>
            <div className="text-[#5F5F5F]">{extractMonthDay(alarm.fecha)}</div>
            <div className="text-[#5F5F5F]">
              {extractHourMinutes(alarm.hora)}
            </div>
            <div className="text-[#5F5F5F]"> {alarm.HTP?.data?.catHpGroup?.name}</div>
            
            <div className="text-[#5F5F5F] hidden md:block">
              {alarm.solved === false ? "Sin resolver" : "Resuelta"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
