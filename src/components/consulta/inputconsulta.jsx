"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { useFormContext } from "react-hook-form";
import IconConsulta from "../icons/IconConsulta";
import { useEffect, useState } from "react";
import RomanToInt from "@/utils/romanToInt";
import IdRiskCardiovascular from "@/utils/IdRiskCardiovascular";
import IdRiskSurgical from "@/utils/idRiskSurgical";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconPreConsulta from "../icons/iconPreconsulta";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

export default function InputConsulta({
  title,
  subtitle,
  risk,
  risk2,
  defaultOpen = false,
  options,
  options2,
  riskGroup,
  groupHTP,
  preconsult,
  paciente,
  onRiskChange,
  onRiskChange2,
  onGroupChange,
  diagnostico,
  
}) {
  const [valuesAmnesis, setValuesAmnesis] = useState([]);
  const [valuesBackground, setValuesBackground] = useState([]);
  const [valueEvolution, setValueEvolution] = useState([]);
  const [riskCardiovascularButton, setRiskCardiovascularButton] = useState();
  const [riskHTPButton, setRiskHTPButton] = useState();
  const [
    groupPatientPulmonaryHypertensionRisksButton,
    setGroupPatientPulmonaryHypertensionButton,
  ] = useState();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const [reloadAmnesis, setReloadAmnesis] = useState(false);

  // Forzar re-renderizado de anamnesis cuando `preconsult` o `diagnostico` cambian
  useEffect(() => {
    setReloadAmnesis(true);
    setTimeout(() => {
      setReloadAmnesis(false); // Resetear el estado inmediatamente para asegurar el re-renderizado
    }, 0);
  }, [preconsult, diagnostico]);



  useEffect(() => {
    if (paciente?.patientCardiovascularRisks?.risk) {
      setRiskCardiovascularButton(paciente?.patientCardiovascularRisks?.risk);
    }
    if (paciente?.patientPulmonaryHypertensionRisks?.risk) {
      setRiskHTPButton(paciente?.patientPulmonaryHypertensionRisks?.risk);
    }
    /*if (paciente?.patientPulmonaryHypertensionGroups?.group) { //esto es la logica de elegir varios botones del grupo a la vez
      const group = paciente.patientPulmonaryHypertensionGroups.group;
      setGroupPatientPulmonaryHypertensionButton([group]);
    }*/
    
    setValuesBackground([
      paciente?.backgrounds?.surgicalBackground,
      paciente?.backgrounds?.pathologicBackground,
      paciente?.backgrounds?.nonPathologicBackground,
      paciente?.backgrounds?.familyBackground,
      paciente?.backgrounds?.pediatricBackground,
      paciente?.backgrounds?.allergicBackground,
      paciente?.backgrounds?.pharmacologicalBackground,
      paciente?.backgrounds?.vaccinationBackground,
    ]);
  }, [paciente]);
  useEffect(() => {
    setValuesAmnesis([
      preconsult?.consultationReason,

      preconsult?.importantSymptoms,
    ]);
  }, [preconsult, diagnostico]);
  useEffect(() => {
    setValueEvolution(diagnostico?.physicianComments);
    if (diagnostico?.patientHpGroups[0]?.group) {
      
      setGroupPatientPulmonaryHypertensionButton(
        diagnostico?.patientHpGroups[0]?.group
      );
    }
  }, [diagnostico]);

  const handleOption = (sub) => {
    
    setRiskCardiovascularButton(sub);
    if (onRiskChange) onRiskChange(IdRiskCardiovascular(sub));
  };
  
  const handleOption2 = (sub) => {
    setRiskHTPButton(sub);
    if (onRiskChange2) onRiskChange2(IdRiskSurgical(sub));
  };
  //esto es la logica de elegir varios botones del grupo a la vez
  // const handleGroupChange = (sub) => {
  //   const updatedSelection = groupPatientPulmonaryHypertensionRisksButton.includes(sub)
  //     ? groupPatientPulmonaryHypertensionRisksButton.filter(item => item !== sub)
  //     : [...groupPatientPulmonaryHypertensionRisksButton, sub];
      
  //   setGroupPatientPulmonaryHypertensionButton(updatedSelection);
  //   if (onGroupChange) onGroupChange(updatedSelection.map(RomanToInt));
  // };
  


  const handleGroupChange = (sub) => {
    setGroupPatientPulmonaryHypertensionButton(sub);
    if (onGroupChange) onGroupChange(RomanToInt(sub));
  };

  const { register } = useFormContext();

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary
          className="flex items-center justify-between h-16 gap-1 px-6 bg-white border cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          <div />
          <div className="flex items-center ">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
              
            </p>
          </div>
          <div className={isOpen || defaultOpen === true ? "rotate-180" : ""}>
            <IconArrowDetailDown />
          </div>
        </summary>
        {risk?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-4 md:flex-row md:py-2 bg-[#fafafc]">
            <label className="text-start w-full md:w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-[1.5rem]" />
              {sub}
            </label>
            <div className="flex">
              {options?.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`p-2 md:px-3 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] flex gap-2  ${riskCardiovascularButton === option
                    ? riskCardiovascularButton === "Bajo"
                      ? "bg-greenPrimary text-white"
                      : riskCardiovascularButton === "Moderado"
                        ? "bg-[#f5e400] text-white"
                        : riskCardiovascularButton === "Alto"
                          ? "bg-[#e73f3f] text-white"
                          : riskCardiovascularButton === "Muy alto"
                            ? "bg-[#9e193b] text-white"
                            : "bg-white"
                    : "bg-white"
                    }`}
                  onClick={(event) => {
                    event.preventDefault(); // Prevent the default form submission
                    handleOption(option);
                  }}>
                  <IconPreConsulta
                    color={
                      riskCardiovascularButton === option
                        ? "white"
                        : option === "Bajo"
                          ? "#70c247"
                          : option === "Moderado"
                            ? "#f5e400"
                            : option === "Alto"
                              ? "#e73f3f"
                              : option === "Muy alto"
                                ? "#9e193b"
                                : null
                    }
                  />
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        {risk2?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-4 md:flex-row md:py-2 bg-[#fafafc]">
            <label className="text-start w-full md:w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-[1.5rem]" />
              {sub}
            </label>
            <div className="flex">
              {options2?.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`p-2 md:px-3 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] flex gap-2  ${riskHTPButton === option
                      ? riskHTPButton === "Bajo"
                        ? "bg-greenPrimary text-white"
                        : riskHTPButton === "Moderado"
                          ? "bg-[#f5e400] text-white"
                          : riskHTPButton === "Alto"
                            ? "bg-[#e73f3f] text-white"
                            : "bg-white "
                      : "bg-white"
                    }`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleOption2(option);
                  }}>
                  <IconPreConsulta
                    color={
                      riskHTPButton === option
                        ? "white"
                        : option === "Bajo"
                          ? "#70c247"
                          : option === "Moderado"
                            ? "#f5e400"
                            : option === "Alto"
                              ? "#e73f3f"
                              : option === "Muy Alto"
                                ? "#9e193b"
                                : null
                    }
                  />
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        {riskGroup?.map((risk, riskIndex) => (
  <div
    key={riskIndex}
    className="flex flex-col gap-2 px-6 py-4 md:flex-row md:py-2 bg-[#fafafc]"
  >
    <label className="text-start w-full md:w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
      <IconCurrentRouteNav className="w-[1.5rem]" />
      {risk}
    </label>
    <div className="flex">
      {groupHTP?.map((htp, htpIndex) => (
        <button
          key={htpIndex}
          className={`p-2 md:px-4 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] flex gap-2 ${
            groupPatientPulmonaryHypertensionRisksButton === htp
              ? "bg-primary text-white"
              : "bg-white"
          }`}
          onClick={(event) => {
            event.preventDefault();
            handleGroupChange(htp); // Cambia el estado al hacer clic en el botón
          }}
        >
          <IconPreConsulta
            color={
              groupPatientPulmonaryHypertensionRisksButton === htp
                ? "#ffffff"
                : "#808080"
            }
          />
          {htp}
        </button>
      ))}
    </div>
  </div>
))}

        {subtitle?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-4 md:py-2 bg-[#fafafc]">
            <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center ">
              <IconCurrentRouteNav className="w-[1.5rem]" />
              {sub}
            </label>
            <textarea
              className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
              placeholder="Ingrese aqui sus anotaciones"
              {...register(sub)}
              defaultValue={
                valuesAmnesis[index] ||
                valuesBackground[index]
              }

            />
          </div>
        ))}
      </details>
    </div>
  );
}
