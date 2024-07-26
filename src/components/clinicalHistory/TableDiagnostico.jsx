"use client";
import { useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import IconConsulta from "../icons/IconConsulta";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import InputInfo from "./InputInfo";
import InputInfo2 from "./InputInfoV2";

export default function TableDiagnostico({ pacientes, subtitle, subtitle2 }) {
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
                    {paciente?.physician?.name} {paciente?.physician?.lastname}
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
            <div className="md:p-4 p-2 bg-[#f5f4f4] ">
              <InputInfo2
                title="Diagnósticos"
                info={paciente.diagnostics}
                keyProp="disease"
              />
              <InputInfo2
                title="Medicamentos"
                info={paciente.drugPrescriptions}
                keyProp="drugName"
              />
              <InputInfo2
                title="Procedimientos"
                info={paciente.medicalProcedures}
                keyProp="procedureName"
              />
              {/* <InputInfo title='Conducta terapeutica' info={paciente.medicalProcedures} /> */}
              <InputInfo
                title="Tratamiento no farmacológico"
                info={paciente.treatmentPlan}
              />
              <InputInfo title="Pauta de alarma" info={paciente.alarmPattern} />
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
