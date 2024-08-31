"use client";
import React from "react";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
// import IconAlarmRed from "../icons/IconAlarmRed";
import IconAlarmRed from "../icons/iconAlarmRed";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import { extractHourMinutes, extractMonthDay } from "@/utils/formatDate";
import IconAlarmBlue from "../icons/iconAlarmBlue";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case "Alta":
      return <IconAlarmRed className="lg:w-8 w-[75%]" />;
    case "Media":
      return <IconAlarmYellow className="lg:w-8 w-[75%]" />;
    case "Baja":
      return <IconAlarmGreen className="lg:w-8 w-[75%]" />;
    case "Indefinida":
      return <IconAlarmBlue color={"gray"} className="lg:w-8 w-[75%]" />;
  }
};

export default function TableAlarmResueltas({ alarms }) {
  return (
    <div className="flex flex-col">
      <div className="">
        {alarms?.map((alarm, index) => (
          <div
            key={index}
            className="w-[100%] flex border-b border-b-[#cecece] py-2 items-center">
            <div className="w-[10%]  lg:w-[5%] items-center flex justify-center">
              <PriorityIcon priority={alarm?.ia_priority} />
            </div>
            <div className="text-center w-[80%] lg:w-[75%] lg:text-start gap-3  grid grid-cols-4 lg:grid-cols-5 items-center py-2 bg-white h-fit ">
              <span className="hidden lg:flex items-center justify-between pr-20 ">
                {alarm?.ia_priority}
                <IconCurrentRouteNav className="w-3 hidden lg:block " />
              </span>
              <div className="text-[#5F5F5F]">{Hora(alarm?.createdAt)}</div>
              <div className="text-[#5F5F5F]">{Fecha(alarm?.createdAt)}</div>
              <p className=" text-[#686868] font-normal  lg:text-base leading-6  line-clamp-2">
                {alarm?.patient.name} {alarm?.patient.lastname}
              </p>
              {/* 
              <div className="text-[#5F5F5F] hidden lg:block ">
                {" "}
                {alarm?.HTP?.data?.catHpGroup?.name}
              </div> */}
              <div className="text-[#5F5F5F] hidden lg:block truncate">
                {alarm?.alarm_description}
              </div>
              {/* <div className="text-[#5F5F5F] ">
                {alarm.espera ? alarm.espera : "No"}
              </div> */}
            </div>
            {/* <div className="hidden lg:w-[20%] items-center justify-center lg:flex"> */}
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
