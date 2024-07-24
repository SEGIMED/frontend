"use client";
import { useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import IconConsulta from "../icons/IconConsulta";

export default function Evoluciones({ pacientes }) {
  // Estado para controlar qué detalles están abiertos
 
  const [openDetails, setOpenDetails] = useState({});

  const toggleDetail = (index) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="h-full flex flex-col ">
      {pacientes?.map((paciente, index) => (
        <div key={index}>
          <details
            open={openDetails[index]}
            onToggle={() => toggleDetail(index)}>
            <summary className="flex items-center cursor-pointer ">
              <div className="w-[100%] flex border-b border-t border-b-[#cecece] border-t-[#cecece]  bg-white">
                <div className="justify-center w-[5%] items-center hidden md:flex">
                  <IconConsulta />
                </div>

                <div className="grid grid-cols-3 w-[90%] md:w-[90%]   md:grid-cols-5 text-center md:text-left px-2 md:px-0 items-center  py-2   h-fit">
                  <div className="text-[#5F5F5F] hidden md:block">
                    {new Date(paciente.appSch?.scheduledStartTimestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-[#5F5F5F]">
                    {new Date(paciente.appSch?.scheduledStartTimestamp).toLocaleDateString("es-ES", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>

                  <div className="text-[#FF8300]">
                    {paciente?.appSch?.physicianThatAttend?.name} {paciente?.appSch?.physicianThatAttend?.lastname}
                  </div>
                  <div className="text-[#5F5F5F]">
                  {paciente?.appSch?.attendancePlace?.alias}
                  </div>
                  <div className="text-[#5F5F5F] hidden md:block">
                    {paciente?.chiefComplaint}
                  </div>

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
            <div className="p-5 bg-[#f5f4f4]">
              <p className="w-full h-fit md:h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1">
                {paciente.historyOfPresentIllness}
              </p>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
