"use client";
import React from "react";
import RealColorRisk from "@/utils/realColor";
import IconRisk from "../icons/iconRisk";

export default function PatientCardConsulta1({ consulta, button }) {
  return (
    <div className="w-[100%] flex border-b border-b-[#cecece] py-2 items-center">
      <div className="w-[10%] md:w-[5%] items-center flex justify-center">
        {consulta?.patientUser?.patientPulmonaryHypertensionRisks?.risk ? (
          <RealColorRisk
            risk={consulta.patientUser?.patientPulmonaryHypertensionRisks?.risk}
          />
        ) : (
          <IconRisk color="lightGray" />
        )}
      </div>
      <div className="text-center w-[70%] md:w-[75%] md:text-start gap-3  grid grid-cols-3 md:grid-cols-4 items-center py-2 bg-white h-fit ">
        <p className=" text-[#686868] font-normal  md:text-base leading-6  line-clamp-2">
          {consulta?.patientUser?.name} {consulta?.patientUser?.lastname}
        </p>

        <p className=" text-[#686868] font-normal md:text-base leading-6 ">
          {/* {LastLogin(consulta?.scheduledStartTimestamp)} */}
          {new Date(consulta?.scheduledStartTimestamp).toLocaleDateString(
            "es-ES",
            {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </p>

        {/* <p className=" text-[#686868] font-normal  md:text-base leading-6 ">
                    {consulta?.patientUser?.patientPulmonaryHypertensionRisks?.risk || "No asignado"}
                </p> */}
        <p className=" text-[#686868] font-normal  md:text-base leading-6 ">
          {consulta?.healthCenter === 1 ? "Centro Gallegos" : "Otro Centro"}
        </p>
        <p className=" text-[#686868] font-normal hidden md:block  md:text-base leading-6 ">
          {consulta?.reasonForConsultation}
        </p>
      </div>
      <div className="w-[20%]  items-center justify-center flex">{button}</div>
    </div>
  );
}
