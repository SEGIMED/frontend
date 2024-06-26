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

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case "Alta":
      return <IconAlarmRed />;
    case "Media":
      return <IconAlarmYellow />;
    case "Baja":
      return <IconAlarmGreen />;
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
    <div className="h-full flex flex-col">
      <div className="">
        {pacientes?.map((paciente, index) => (
          <div
            key={index}
            className="grid md:grid-cols-6 grid-cols-5 items-center border-b border-b-[#cecece] md:pr-6 py-2 bg-white w-full h-14 ">
            <div className="text-[#5F5F5F] flex items-center justify-start md:gap-6">
              <PriorityIcon priority={paciente.highestPriority} />
              <span className="hidden md:block">
                {paciente.highestPriority}
              </span>
              <IconCurrentRouteNav className="w-3 hidden md:block " />
            </div>
            <div className="text-[#5F5F5F]">{paciente.hora}</div>
            <div className="text-[#5F5F5F]">{paciente.fecha}</div>
            <span className="text-[#5F5F5F]">
              {paciente.name} {paciente.lastname}
            </span>
            {/* <div className="text-[#5F5F5F]"></div> */}
            <div className="text-[#5F5F5F] hidden md:block">
              {paciente.alarmDescription}
            </div>

            <div className="text-[#5F5F5F] justify-center">
              <AlarmButtonDoc
                id={paciente.id}
                handleStatus={() => handleStatus({ id: paciente.id })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
