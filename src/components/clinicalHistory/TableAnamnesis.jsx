"use client";
import { useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import IconConsulta from "../icons/IconConsulta";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import InputInfo from "./InputInfo";

export default function Anamnesis({ pacientes, subtitle }) {
  // Estado para controlar qué detalles están abiertos
  const [openDetails, setOpenDetails] = useState({});
  console.log(pacientes)
  const toggleDetail = (index) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="h-full flex flex-col">
      {pacientes?.map((paciente, index) => (
        <div key={index} >
          <details
            open={openDetails[index]}
            onToggle={() => toggleDetail(index)}>
            <summary className="flex w-[100%] items-center cursor-pointer  border-b border-b-[#cecece] border-t border-t-[#cecece]  ">
              <div className="flex w-[100%]    ">
                <div className=" items-center w-[5%] hidden justify-center md:flex"><div className=" justify-center w-1/2 hidden md:flex">
                  <IconConsulta />
                </div></div>
                <div className="grid grid-cols-3 md:grid-cols-5 w-[90%] items-center  py-2 bg-white  h-fit text-center md:text-start">
                  <div className="text-[#5F5F5F] hidden md:block">
                    {new Date(paciente.appSch?.scheduledStartTimestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-[#5F5F5F]">
                    {new Date(paciente.appSch?.scheduledStartTimestamp).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric"
                    })}
                  </div>
                  <div className="text-[#5F5F5F] hidden md:block">
                  {paciente?.appSch?.physicianThatAttend?.name} {paciente?.appSch?.physicianThatAttend?.lastname}
                  </div>
                  <div className="text-[#5F5F5F]">
                  {paciente?.appSch?.attendancePlace?.alias}
                  </div>
                  <div className="text-[#5F5F5F]">{paciente?.chiefComplaint}</div>

                </div>
                <div className="flex w-[10%] md:w-[5%]  items-center justify-center">
                  {openDetails[index] ? (
                    <IconArrowDetailUp />
                  ) : (
                    <IconArrowDetailDown />
                  )}
                </div>
              </div>
            </summary>
            <div className="md:p-5 flex flex-col gap-2 bg-[#fafafc] ">
              <InputInfo
                title={"Evolución de la enfermedad"}
                info={paciente?.historyOfPresentIllness}
              />
              <InputInfo
                title={"Motivo de consulta"}
                info={paciente?.chiefComplaint}
              />
              <InputInfo
                title={"Síntomas importantes"}
                info={paciente?.reviewOfSystems}
              />
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
