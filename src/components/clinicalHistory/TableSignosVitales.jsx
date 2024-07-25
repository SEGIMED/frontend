import { useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import IconConsulta from "../icons/IconConsulta";
import circleData from "@/components/images/circleData.png";
import Image from "next/image";
import DataPatient from "../consulta/info";

export default function SignosVitales({ pacientes, subtitle }) {
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
              <div className="w-[100%] flex border-b border-t border-b-[#cecece] border-t-[#cecece]  bg-white">
                <div className="justify-center w-[5%] items-center hidden md:flex">
                  <IconConsulta />
                </div>
                <div className="grid text-center grid-cols-3 w-[90%] md:text-left md:grid-cols-5 items-center  py-2 bg-white z-10">

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
            <div className="bg-[#FBFBFB]">
              {paciente.anthropometricDetails
                ? paciente.anthropometricDetails.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    <DataPatient
                      title={detail.measureType}
                      info={`${detail.measure} ${detail.measureUnit}`}
                    />
                  </div>
                ))
                : anthropometricDetails.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    <DataPatient
                      title={detail.measureType}
                      info={`${detail.measure} ${detail.measureUnit}`}
                    />
                  </div>
                ))}

              {paciente.vitalSigns
                ? paciente.vitalSigns.map((vital, vitalIndex) => (
                  <div key={vitalIndex}>
                    <DataPatient
                      title={vital.measureType}
                      info={`${vital.measure} ${vital.measureUnit}`}
                    />
                  </div>
                ))
                : vitalSigns.map((vital, vitalIndex) => (
                  <div key={vitalIndex}>
                    <DataPatient
                      title={vital.measureType}
                      info={`${vital.measure} ${vital.measureUnit}`}
                    />
                  </div>
                ))}

              <div className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] md:pr-10">
                <label className="flex w-[60%] md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
                  <Image
                    src={circleData}
                    alt="circulo informacion"
                    className="w-6 h-6"
                  />
                  Glucemia: ¿Tuvo valores fuera del rango normal en el último
                  tiempo? (+ 140 mg/dl y - 80 mg/dl)
                </label>
                <div className="flex justify-end w-1/3 gap-4">
                  <button className="px-4 py-1 border-2 rounded-xl border-[#DCDBDB]">
                    Si
                  </button>
                  <button className="px-4 py-1 border-2 rounded-xl border-[#DCDBDB]">
                    No
                  </button>
                </div>
              </div>
              <div className="flex justify-start items-center md:gap-2 px-3 border-b border-b-[#cecece] md:pr-10">
                <label className="flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
                  <Image
                    src={circleData}
                    alt="circulo informacion"
                    className="w-6 h-6"
                  />{" "}
                  Escriba los últimos 4 valores mas anormales que tuvo.
                </label>
                <div className="md:flex grid grid-cols-2 justify-start w-1/2 md:gap-4 gap-1">
                  <button className="px-[2px] md:px-4 text-center py-1 border-2 rounded-xl border-[#DCDBDB] w-full md:w-[15%]">
                    150 mg/dl
                  </button>
                  <button className="px-[2px] md:px-4 text-center py-1 border-2 rounded-xl border-[#DCDBDB] w-full md:w-[15%]">
                    75 mg/dl
                  </button>
                  <button className="px-[2px] md:px-4 text-center py-1 border-2 rounded-xl border-[#DCDBDB] w-full md:w-[15%]">
                    77 mg/dl
                  </button>
                  <button className="px-[2px] md:px-4 text-center py-1 border-2 rounded-xl border-[#DCDBDB] w-full md:w-[15%]">
                    143 mg/dl
                  </button>
                </div>
              </div>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}