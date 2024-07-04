"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { useFormContext } from "react-hook-form";

import IconConsulta from "../icons/IconConsulta";
import { useEffect, useState } from "react";
import RomanToInt from "@/utils/romanToInt";
import IdRiskCardiovascular from "@/utils/IdRiskCardiovascular";
import IdRiskSurgical from "@/utils/idRiskSurgical";


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
  onGroupChange
}) {
  const [valuesAmnesis, setValuesAmnesis] = useState([]);
  const [valuesBackground, setValuesBackground] = useState([]);
  const [riskCardiovascularButton, setRiskCardiovascularButton] = useState();
  const [riskSurgicalButton, setRiskSurgicalButton] = useState();
  const [groupPatientPulmonaryHypertensionRisksButton, setGroupPatientPulmonaryHypertensionButton] = useState();
  
  useEffect(() => {
    setRiskCardiovascularButton(paciente?.patientCardiovascularRisks[0]?.risk);
    setRiskSurgicalButton(paciente?.patientSurgicalRisks[0]?.risk);
    setGroupPatientPulmonaryHypertensionButton(paciente?.patientPulmonaryHypertensionGroups[0]?.group);
    setValuesBackground([paciente?.backgrounds?.surgicalBackground,paciente?.backgrounds?.pathologicBackground ,paciente?.backgrounds?.nonPathologicBackground,paciente?.backgrounds?.familyBackground,paciente?.backgrounds?.pediatricBackground,paciente?.backgrounds?.allergicBackground, paciente?.backgrounds?.pharmacologicalBackground, paciente?.backgrounds?.vaccinationBackground]);
  }, [paciente]);

  useEffect(() => {
    setValuesAmnesis([preconsult?.consultationReason,preconsult?.healthChangesDescription ,preconsult?.importantSymptoms]);
  }, [preconsult]);

  const handleOption = (sub) => {
    setRiskCardiovascularButton(sub);
    if (onRiskChange) onRiskChange(IdRiskCardiovascular(sub));
  };
  const handleOption2 = (sub) => {
    setRiskSurgicalButton(sub);
    if (onRiskChange2)onRiskChange2(IdRiskSurgical(sub));
  };
  const handleGroupChange = (sub) => {
    setGroupPatientPulmonaryHypertensionButton(sub);
    if (onGroupChange) onGroupChange(RomanToInt(sub));
  };
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex items-center justify-center gap-1 px-6 py-2 border cursor-pointer">
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
            </p>
          </div>
        </summary>
        {risk?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-2 px-6 md:py-2 py-4 border-b border-b-[#cecece]">
            <label className="text-start w-full md:w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconConsulta />
              {sub}
            </label>
             <div className="flex">
              {options?.map((option, optionIndex) => (
                <button 
                key={optionIndex}
                className={` p-2 md:px-3 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] ${riskCardiovascularButton === option ? 'bg-blue-200' : ''}`} 
                
                onClick={(event) => {
                  event.preventDefault(); // Prevent the default form submission
                  handleOption(option);
                  
              }}
                >
                  {option}
                </button >
              ))}
              
            </div> 
            
          </div>
        ))}
        {risk2?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-2 px-6 md:py-2 py-4 border-b border-b-[#cecece]">
            <label className="text-start w-full md:w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconConsulta />
              {sub}
            </label>
             <div className="flex">
              {options2?.map((option, optionIndex) => (
                <button 
                key={optionIndex}
                className={` p-2 md:px-3 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] ${riskSurgicalButton === option ? 'bg-blue-200' : ''}`} 
                onClick={(event) => {
                  event.preventDefault();
                   handleOption2(option)}}
                >
                  {option}
                </button >
                
              ))}
            </div> 
            
          </div>
        ))}
        {riskGroup?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-2 px-6 md:py-2 py-4 border-b border-b-[#cecece]">
            <label className="text-start w-full md:w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconConsulta />
              {sub}
            </label>
             <div className="flex">
              {groupHTP?.map((sub, index) => (
                <button 
                key={index} 
                className={` p-2 md:px-4 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] flex ${groupPatientPulmonaryHypertensionRisksButton === sub ? 'bg-blue-200' : ''}`}
                onClick={(event) => {
                  event.preventDefault(); handleGroupChange(sub)
                }}
                >
                  {sub}
                </button>
              ))}
            </div> 
          </div>
        ))}
        {subtitle?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 md:py-2 py-4 border-b border-b-[#cecece]">
            <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconConsulta />
              {sub}
            </label>
            <textarea
              className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]"
              placeholder="Ingrese aqui sus anotaciones"
              {...register(sub)}
              defaultValue={valuesAmnesis[index] || valuesBackground[index] || ""}
            />
          </div>
        ))}
      </details>
    </div>
  );
}
