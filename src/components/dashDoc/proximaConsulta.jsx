"use client";

import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import ProximasConsultasInfo from "./consultas";
import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import IconArrowNext from "../icons/IconArrowNext";
import Link from "next/link";
import rutas from "@/utils/rutas";
import Elboton from "../Buttons/Elboton";
import IconNext from "../icons/IconNext";
import Cookies from "js-cookie";

export default function ProximasConsultas() {
  const consultas = useAppSelector((state) => state.schedules);
  const myID = Number(Cookies.get("c"));
  const [nextFiveConsultas, setNextFiveConsultas] = useState([]);

  useEffect(() => {
    const getNextFiveConsultas = () => {
      const currentDate = new Date();

      const filteredConsultas = consultas
        .filter(
          (consulta) =>
            new Date(consulta.scheduledStartTimestamp) > currentDate &&
            consulta.schedulingStatus === 1 &&
            consulta.physician === myID
        )
        .sort(
          (a, b) =>
            new Date(a.scheduledStartTimestamp) -
            new Date(b.scheduledStartTimestamp)
        )
        .slice(0, 5);

      setNextFiveConsultas(filteredConsultas);
    };
    if (consultas && consultas.length > 0) {
      getNextFiveConsultas();
    }
  }, [consultas]);

  return (
    <div className="h-full w-full bg-white rounded-2xl border pb-2 border-[#DCDBDB]  ">
      <div className="flex items-center justify-between px-6 py-2 border-b border-[#DCDBDB]">
        <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center ">
          <IconCurrentRouteNav className={"w-4"} />
          Próximas consultas
        </label>
        <Elboton
          className="font-bold px-8 py-3"
          href={`${rutas.Doctor}${rutas.Historial}`}
          nombre={"Ver todas"}
          icon2={<IconNext color="white" />}
        />
        {/* <Link >
          <button className="flex rounded-lg items-center  px-2 md:px-5 py-3 ont-bold text-sm leading-5 bg-bluePrimary text-white gap-1 ">
            Ver todas
          </button>
        </Link> */}
      </div>

      {nextFiveConsultas && nextFiveConsultas.length > 0 ? (
        nextFiveConsultas.map((consulta) => (
          <ProximasConsultasInfo key={consulta.id} info={consulta} />
        ))
      ) : (
        <p className="px-2 xs:px-4 md:px-6">No hay próximas consultas.</p>
      )}
    </div>
  );
}
