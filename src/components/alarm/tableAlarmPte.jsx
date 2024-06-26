'use client'

import React from "react";
import IconAlarmGreen from "../icons/iconAlarmGreen";
import IconAlarmYellow from "../icons/IconAlarmYellow";
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
    const handleStatus = (id) => {

    };

    return (
        <div className="h-full flex flex-col">
            <div className="">
                {paciente.map((paciente, index) => {
                    const highestPriority = determinePriority(paciente.questionsPriority);

                    return (
                        <div
                            key={index}
                            className="grid grid-cols-6 items-center border-b border-b-[#cecece] pr-6 py-2 bg-white w-full h-14 "
                        >
                            <div className="text-[#5F5F5F] flex items-center justify-start gap-6">
                                <PriorityIcon priority={highestPriority} />
                                <span className="">{highestPriority}</span>
                                <IconCurrentRouteNav className="w-3" />
                            </div>
                            <div className="text-[#5F5F5F]">{paciente.hora}</div>
                            <div className="text-[#5F5F5F]">{paciente.fecha}</div>
                            <span className="text-[#5F5F5F]">{paciente.name} {paciente.lastname}</span>
                            <span className="text-[#5F5F5F]">{paciente?.solved === false ? "Sin resolver" : "Resuelta"}</span>
                            <div className="text-[#5F5F5F] justify-center">

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
