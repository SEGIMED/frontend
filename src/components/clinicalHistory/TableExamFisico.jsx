"use client";
import { useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import IconConsulta from "../icons/IconConsulta";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import InputInfo from "./InputInfo";

export default function ExamFisico({ pacientes, subtitle }) {
  // Estado para controlar qué detalles están abiertos
  const [openDetails, setOpenDetails] = useState({});

  const toggleDetail = (index) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="h-full flex flex-col">
      {pacientes?.map((paciente, index) => (
        <div key={index}>
          <details
            open={openDetails[index]}
            onToggle={() => toggleDetail(index)}>
            <summary className="flex items-center cursor-pointer">
              <div className="grid text-center grid-cols-4 md:text-left md:grid-cols-7 items-center border-b border-b-[#cecece] py-2 bg-white z-10">
                <div className="justify-center hidden md:flex">
                  <IconConsulta />
                </div>
                <div className="text-[#5F5F5F] hidden md:block">
                  {new Date(paciente.timestamp).toLocaleTimeString()}
                </div>
                <div className="text-[#5F5F5F]">
                  {new Date(paciente.timestamp).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "numeric",
                  })}
                </div>
                <div className="text-[#5F5F5F] hidden md:block">
                  {paciente.HTP || "Sin asignar"}
                </div>
                <div className="text-[#5F5F5F]">
                  {paciente?.attendancePlace?.alias}
                </div>
                <div className="text-[#5F5F5F]">{paciente?.chiefComplaint}</div>
                <div className="flex justify-center">
                  {openDetails[index] ? (
                    <IconArrowDetailUp />
                  ) : (
                    <IconArrowDetailDown />
                  )}
                </div>
              </div>
            </summary>
            <div className="md:p-5 bg-[#f5f4f4] p-2">
              {paciente.physicalExaminations?.map((examen, index) => (
                <div key={index}>
                  <InputInfo
                    title={examen.physicalSubsystem}
                    info={examen?.description}
                  />
                </div>
              ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
