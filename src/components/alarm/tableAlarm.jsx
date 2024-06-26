"use client";
import React from "react";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
import IconAlarmRed from "@/components/icons/iconAlarmRed";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import AlarmButtonDoc from "../Buttons/alarmButtonDoc";
import { useRouter } from "next/navigation";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import rutas from "@/utils/rutas";
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

export default function TableAlarm({ pacientes }) {
  const router = useRouter();
  const token = Cookies.get("a");

  const handleStatus = async ({ id }) => {
    const token = Cookies.get("a");
    const headers = { headers: { token: token } };
    const body = { solved: true };

    try {
      const response = await ApiSegimed.patch(
        `/edit-alarm-event/${id}`,
        body,
        headers
      );
    } catch (error) {
      console.error("Error al intentar actualizar la alarma:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="">
        {pacientes?.map((paciente, index) => (
          <div
            key={index}
            className="grid md:grid-cols-6 grid-cols-5 items-center border-b border-b-[#cecece] md:pr-6 py-2 md:px-2 bg-white w-full h-14 text-center md:text-start">
            <div className="text-[#5F5F5F] flex items-center justify-center md:justify-start md:gap-4">
              <PriorityIcon priority={paciente.highestPriority} />
              <span className="hidden md:block">
                {paciente.highestPriority}
              </span>
              <IconCurrentRouteNav className="w-3 hidden md:block " />
            </div>
            <span className="text-[#5F5F5F]">
              {paciente.name} {paciente.lastname}
            </span>
            <div className="text-[#5F5F5F]">
              {extractHourMinutes(paciente.hora)}
            </div>
            <div className="text-[#5F5F5F]">
              {extractMonthDay(paciente.fecha)}
            </div>
            {/* <div className="text-[#5F5F5F]"></div> */}
            <div className="text-[#5F5F5F] hidden md:block">
              {paciente.alarmDescription}
            </div>

            <AlarmButtonDoc
              id={paciente.id}
              handleStatus={() => handleStatus({ id: paciente.id })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
