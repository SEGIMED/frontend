// components/subcomponents/AntecedentesInfo.jsx
"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import IconArrowDetailDown from "@/components/icons/IconArrowDetailDown";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconCircle from "@/components/icons/IconCircle";
import IconPreConsulta from "@/components/icons/iconPreconsulta";

export default function AntecedentesInfo({
  antecedentesData,
  onAntecedentesChange,
}) {
  const handleRiskChange = (value) => {
    onAntecedentesChange("riskCardiovascular", value);
  };

  const handleRisk2Change = (value) => {
    onAntecedentesChange("riskHipertensionPulmonar", value);
  };

  const handleGroupHTPChange = (value) => {
    onAntecedentesChange("grupoHTP", value);
  };

  const handleDescriptionChange = (field, value) => {
    onAntecedentesChange(field, value);
  };
  const options = ["Bajo", "Intermedio Bajo", "Intermedio Alto", "Alto"];
  const optionsGroupHTP = ["I", "II", "III", "IV", "V"];

  return (
    <div className="p-2 bg-white shadow-lg rounded-lg">
      <Accordion collapsible className="!px-0" selectionMode="multiple">
        {/* Signos Vitales */}
        <AccordionItem
          key="signosVitales"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Signos Vitales</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white ",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <div className="flex flex-col gap-4">
            {/* Riesgo Cardiovascular */}
            <div className="flex flex-col items-start">
              <label className="mb-2 text-gray-600 font-medium">
                Riesgo Cardiovascular
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    className={`p-2 border rounded-lg flex items-center gap-2 ${
                      antecedentesData.riskCardiovascular === option
                        ? "bg-greenPrimary text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRiskChange(option);
                    }}>
                    <IconPreConsulta
                      color={
                        antecedentesData.riskCardiovascular === option
                          ? "white"
                          : option === "Bajo"
                          ? "#70c247"
                          : option === "Moderado"
                          ? "#f5e400"
                          : option === "Alto"
                          ? "#e73f3f"
                          : "#9e193b"
                      }
                    />
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Riesgo Hipertensión Pulmonar */}
            <div className="flex flex-col items-start">
              <label className="mb-2 text-gray-600 font-medium">
                Riesgo Hipertensión Pulmonar
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    className={`p-2 border rounded-lg flex items-center gap-2 ${
                      antecedentesData.riskHipertensionPulmonar === option
                        ? "bg-greenPrimary text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRisk2Change(option);
                    }}>
                    <IconPreConsulta
                      color={
                        antecedentesData.riskHipertensionPulmonar === option
                          ? "white"
                          : option === "Bajo"
                          ? "#70c247"
                          : option === "Moderado"
                          ? "#f5e400"
                          : "#e73f3f"
                      }
                    />
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Grupo HTP */}
            <div className="flex flex-col items-start">
              <label className="mb-2 text-gray-600 font-medium">
                Grupo HTP
              </label>
              <div className="flex">
                {optionsGroupHTP?.map((htp, htpIndex) => (
                  <button
                    key={htpIndex}
                    className={`p-2 md:px-4 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] flex gap-2 ${
                      antecedentesData.grupoHTP === htp
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleGroupHTPChange(htp); // Cambia el estado al hacer clic en el botón
                    }}>
                    <IconPreConsulta
                      color={
                        antecedentesData.grupoHTP === htp
                          ? "#ffffff"
                          : "#808080"
                      }
                    />
                    {htp}
                  </button>
                ))}
              </div>
            </div>

            {/* Textareas para Antecedentes */}
            <div className="flex flex-col gap-2">
              {[
                "Antecedentes quirúrgicos",
                "Antecedentes patológicos",
                "Antecedentes no patológicos",
                "Antecedentes familiares",
                "Antecedentes de infancia",
                "Medicación actual",
                "Alergias",
                "Vacunas",
              ].map((field, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <label className="mb-2 text-gray-600 font-medium flex items-center gap-2">
                    <IconCurrentRouteNav className="w-[1.5rem]" />
                    {field}
                  </label>
                  <textarea
                    className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
                    placeholder={`Ingrese aquí sus ${field.toLowerCase()}`}
                    value={antecedentesData[field] || ""}
                    onChange={(e) =>
                      handleDescriptionChange(field, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
