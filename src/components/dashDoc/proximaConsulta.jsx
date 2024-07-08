"use client";

import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import ProximasConsultasInfo from "./consultas";
import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import IconArrowNext from "../icons/IconArrowNext";
import Link from "next/link";
import rutas from "@/utils/rutas";

export default function ProximasConsultas() {
    const consultas = useAppSelector((state) => state.schedules);
    const [nextFiveConsultas, setNextFiveConsultas] = useState([]);

    useEffect(() => {
        const getNextFiveConsultas = () => {
            const currentDate = new Date();

            const filteredConsultas = consultas
                .filter((consulta) => new Date(consulta.scheduledStartTimestamp) > currentDate)
                .sort((a, b) => new Date(a.scheduledStartTimestamp) - new Date(b.scheduledStartTimestamp))
                .slice(0, 5);

            setNextFiveConsultas(filteredConsultas);
        };

        if (consultas && consultas.length > 0) {
            getNextFiveConsultas();
        }
    }, [consultas]);

    return (
        <div className="flex flex-col gap-2 py-2 ">
            <div className="flex items-center justify-between px-4 py-2  border-b border-b-[#DCDBDB]">
                <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center ">
                    <IconCurrentRouteNav className={"w-4"} />
                    Sus próximas consultas
                </label>
                <Link href={`${rutas.Doctor}${rutas.Historial}`}>
                    <button className="flex rounded-lg items-center  px-6 py-3 font-bold text-sm leading-5 bg-bluePrimary text-white gap-1 ">  Ver todas</button>
                </Link>
            </div>
            {nextFiveConsultas && nextFiveConsultas.length > 0 ? (
                nextFiveConsultas.map((consulta) => (
                    <ProximasConsultasInfo key={consulta.id} info={consulta} />
                ))
            ) : (
                <p>No hay próximas consultas.</p>
            )}
        </div>
    );
}