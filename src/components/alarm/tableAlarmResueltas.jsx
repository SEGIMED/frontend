"use client"
import React from "react";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
// import IconAlarmRed from "../icons/IconAlarmRed";
import IconAlarmRed from "../icons/iconAlarmRed";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

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

export default function TableAlarmResueltas({ pacientes }) {
    return (
        <div className="h-full flex flex-col">
            <div className="">
                {pacientes?.map((paciente, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-7 items-center border-b border-b-[#cecece] pr-6 py-2 bg-white w-full h-14"
                    >
                        <div className="text-[#5F5F5F] flex items-center justify-start gap-6">
                            <PriorityIcon priority={paciente.highestPriority} />
                            <span className="">{paciente.highestPriority}</span>
                            <IconCurrentRouteNav className="w-3" />
                        </div>
                        <div className="text-[#5F5F5F]">{paciente.hora}</div>
                        <div className="text-[#5F5F5F]">{paciente.fecha}</div>
                        <div className="text-[#5F5F5F]">{paciente.name} {paciente.lastname}</div>
                        <div className="text-[#5F5F5F]"></div>
                        <div className="text-[#5F5F5F]">{paciente.alarmDescription}</div>
                        <div className="text-[#5F5F5F]">{paciente.espera ? paciente.espera : "No"}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}