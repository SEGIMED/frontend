"use client"
import React, { useState, useEffect } from "react";
import circleData from "@/components/images/circleData.png";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import DropClaseFuncional from "./dropdownClaseFuncional";
import { IMC } from "@/utils/normaliceVitalSigns";
import Cookies from "js-cookie";

export default function SignosVitalesInfo({
  paciente,
  title,
  defaultOpen = true,
  preconsult,
}) {
  const role=Cookies.get("b")
  console.log(preconsult,"dentro de signos vitales")
  const defaultVitalSigns = [
    //antropometricDetails que esta en vital sings
    { measureType: "Estatura",mesureExample: "180 Cm", measureUnit: "Cm", measure: "" },
    { measureType: "Peso",mesureExample: "76 Kg", measureUnit: "Kg", measure: "" },
    { measureType: "IMC",mesureExample: "24.69 Kg/m²", measureUnit: "Kg/m²", measure: "" },
    //vitalSigns
    { measureType: "Temperatura",mesureExample: "36 °C", measureUnit: "°C", measure: "" },
    { measureType: "Frecuencia Cardiaca",mesureExample: "80 bpm", measureUnit: "bpm", measure: "" },
    { measureType: "Presión Arterial Sistólica",mesureExample: "120 mmHg", measureUnit: "mmHg", measure: "" },
    { measureType: "Presión Arterial Diastólica",mesureExample: "80 mmHg", measureUnit: "mmHg", measure: "" },
    { measureType: "Frecuencia Respiratoria",mesureExample: "17 rpm", measureUnit: "rpm", measure: "" },
    { measureType: "Saturación de Oxígeno",mesureExample: "99 %", measureUnit: "%", measure: "" },
  ];
  const [imcValue, setImcValue]=useState()
  const [anthropometricDetails, setAnthropometricDetails] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [glucemiaElevada, setGlucemiaElevada] = useState(null);
  const [ultimosValoresAnormales, setUltimosValoresAnormales] = useState([
    "",
    "",
    "",
    "",
  ]);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { register, setValue } = useFormContext();

  

  useEffect(() => {
  
    const combinedVitalSigns = combineVitalSigns(preconsult?.ProvisionalPreConsultationSchedule?.vitalSignDetailsScheduling 
      ?? [], defaultVitalSigns);

    setVitalSigns(combinedVitalSigns);
  }, [preconsult]);

  const combineVitalSigns = (patientVitalSigns, defaultVitalSigns) => {
    return defaultVitalSigns.map(defaultVital => {
      const patientVital = patientVitalSigns.find(
        vital => vital.measureType === defaultVital.measureType

      );
      return patientVital ? { ...patientVital, mesureExample: patientVital.mesureExample || defaultVital.mesureExample } : defaultVital;
    });
  };

  //no se como seguir 
  const handleVitalChange = (index, value) => {
    const updatedVitalSigns = [...vitalSigns];
    updatedVitalSigns[index].measure = value;
    setVitalSigns(updatedVitalSigns);
    const estatura = vitalSigns.find(vital => vital.measureType === "Estatura")?.measure;
    const peso = vitalSigns.find(vital => vital.measureType === "Peso")?.measure;
    if (peso > 0 && estatura > 0) {
      const imc=IMC(peso, estatura)
      console.log(imc)
      setImcValue (imc);
      
      // Actualiza el IMC en vitalSigns
      const imcIndex = updatedVitalSigns.findIndex(vital => vital.measureType === "IMC");
      if (imcIndex !== -1) {
        updatedVitalSigns[imcIndex].measure = imcValue;
      }
      setVitalSigns(updatedVitalSigns);
    }

  };

  

  useEffect(() => {
    setGlucemiaElevada(preconsult?.abnormalGlycemia);
    const combinedAbnormalsGlycemia =preconsult?.lastAbnormalGlycemia?.length ? preconsult?.lastAbnormalGlycemia : ultimosValoresAnormales;
    setUltimosValoresAnormales(combinedAbnormalsGlycemia);
  }, [preconsult]);


  const handleAnormalValueChange = (index, event) => {
    const updatedValues = [...ultimosValoresAnormales];
    updatedValues[index] = event.target.value;
    setUltimosValoresAnormales(updatedValues);
    setValue("lastAbnormalGlycemia", updatedValues);
  };
 
  return (
    <div className="flex flex-col">
      <details open={true}>
      <summary className="flex items-center justify-between gap-1 px-4 py-3 bg-white border-b border-t cursor-pointer">
      <div />
      <div className="flex items-center gap-2">
        <Image src={circleData} alt="" className="w-5 h-5" />
        <p className="text-start text-[#5F5F5F] font-bold text-sm md:text-base leading-5">
          {title}
        <b className="font-semibold text-red-500">*</b>
        </p>
      </div>
      <div></div>
      </summary>

        {vitalSigns.map((vital, vitalIndex) => (
          <div
            key={vitalIndex}
            className="flex flex-col md:flex-row justify-start items-center gap-2 px-3 bg-[#fafafc] md:pr-10 py-2"
            >
            <label className="flex w-full md:w-2/3 text-start text-[#5F5F5F] font-medium text-sm md:text-base leading-6 px-2 py-2">
              <Image
                src={circleData}
                alt="circulo informacion"
                className="w-5 h-5"
              />
              <div className="w-full flex md:justify-between">
              <span className="ml-2">{vital.measureType}</span>
              <span className="ml-2">{vital.mesureExample}</span>
              </div>
            
            </label>
            
            {/* nose como seguir */}
            {vital.measureType === "IMC" ? 
            (
              <input
              type="number"
              className="w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-white border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1"
              defaultValue={vital.measure || imcValue}
              onChange={(e) => handleVitalChange(vitalIndex, e.target.value)}
              {...register(vital.measureType)}
            />
            ):
            (
              <input
              type="number"
              className="w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-white border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1"
              defaultValue={vital.measure}
              onChange={(e) => handleVitalChange(vitalIndex, e.target.value)}
              {...register(vital.measureType)}
            />
            )}
            
          </div>
        ))}
        {role=== "Médico" ? 
        (
          <div className="flex flex-col md:flex-row justify-start items-center gap-2 px-3 bg-[#fafafc] md:pr-10 py-2">
          <label className="flex w-full md:w-2/3 text-start text-[#5F5F5F] font-medium text-sm md:text-base leading-6 px-2 py-2">
              <Image
                src={circleData}
                alt="circulo informacion"
                className="w-6 h-6"
              />{" "}
              Clase funcional
            </label>
            <div className="flex justify-start w-1/2 gap-4">
              <DropClaseFuncional options={['Clase funcional I', 'Clase funcional II', 'Clase funcional III', 'Clase funcional IV']} 
              text2={"Seleccione clase funcional"} 
              name={"HeartFailureRisk"} 
              selectedOptions={paciente?.patientPulmonaryHypertensionRisks?.risk}/>
            </div>
        </div>
        )
        :
        (
          <div></div>
        )}
        
        

        <div className="flex flex-col md:flex-row justify-start items-center gap-2 px-3 bg-[#fafafc] md:pr-10 py-2">
          <label className="flex w-full md:w-2/3 text-start text-[#5F5F5F] font-medium text-sm md:text-base leading-6 px-2 py-2">
            <Image
              src={circleData}
              alt="circulo informacion"
              className="w-6 h-6"
            />{" "}
            Escriba los últimos 4 valores de glicemia que tuvo.
          </label>
          <div className="flex justify-between w-1/2 grid-cols-2 gap-1 md:flex md:gap-4 ">
            {ultimosValoresAnormales.map((value, index) => (
              <input
                key={index}
                type="text"
                className="md:px-4 text-center py-1 border-2 rounded-xl border-[#DCDBDB] w-full "
                defaultValue={value}
                onChange={(event) => handleAnormalValueChange(index, event)}
                {...register(`lastAbnormalGlycemia[${index}]` )}
              />
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
