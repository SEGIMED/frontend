"use client";

import React from "react";
import { extractHourMinutes, extractMonthDay } from "@/utils/formatDate";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";

export default function TableAlarm({ alarms }) {
  return (
    <div className="flex flex-col">
      {alarms?.map((alarm, index) => {
        return (
          <div
            key={index}
            className="grid md:grid-cols-5 grid-cols-4 items-center border-b border-b-[#cecece] md:pr-6 py-2 md:px-2 bg-white w-full h-14 text-center md:text-start">
            {/* <div className="text-[#5F5F5F] flex items-center justify-center md:justify-start md:gap-4">
              <PriorityIcon priority={highestPriority} />
              <span className="hidden md:block">{highestPriority}</span>
              <IconCurrentRouteNav className="w-3 hidden md:block" />
            </div> */}
            <div className="text-[#5F5F5F]">{Fecha(alarm.createdAt)}</div>
            <div className="text-[#5F5F5F]">{Hora(alarm.createdAt)}</div>
            <div className="text-[#5F5F5F]">
              {" "}
              {alarm.htp_group || "No Asignado"}
            </div>

            <div className="text-[#5F5F5F] hidden md:block">
              {alarm.solved === false ? "Sin resolver" : "Resuelta"}
            </div>
            <div className="text-[#5F5F5F] line-clamp-2">
              {alarm?.alarm_description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
