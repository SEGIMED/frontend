import React, { useState, useEffect } from "react";
import circleData from "@/components/images/circleData.png";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconPreConsulta from "../icons/iconPreconsulta";
import IconCloseBoton from "../icons/IconCloseBoton";
import DropNext from "./dropdown";
import DropClaseFuncional from "./dropdownClaseFuncional";

export default function SignosVitalesInfo({
  paciente,
  title,
  defaultOpen = false,
  preconsult,
}) {
  const defaultAnthropometricDetails = [
    { measureType: "Estatura", measureUnit: "Cm", measure: "" },
    { measureType: "Peso", measureUnit: "Kg", measure: "" },
    { measureType: "Índice de Masa Corporal", measureUnit: "Kg/m²", measure: "" },
  ];

  const defaultVitalSigns = [
    { measureType: "Temperatura", measureUnit: "°C", measure: "" },
    { measureType: "Frecuencia Cardiaca", measureUnit: "bpm", measure: "" },
    { measureType: "Presión Arterial Sistólica", measureUnit: "mmHg", measure: "" },
    { measureType: "Presión Arterial Diastólica", measureUnit: "mmHg", measure: "" },
    { measureType: "Frecuencia Respiratoria", measureUnit: "rpm", measure: "" },
    { measureType: "Saturación de Oxígeno", measureUnit: "%", measure: "" },
  ];

  const [anthropometricDetails, setAnthropometricDetails] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [glucemiaElevada, setGlucemiaElevada] = useState(null);
  const [ultimosValoresAnormales, setUltimosValoresAnormales] = useState([
    "50",
    "",
    "",
    "",
  ]);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { register, setValue } = useFormContext();

  useEffect(() => {
    setValue("glucemiaElevada", glucemiaElevada);
  }, [glucemiaElevada, setValue]);

  useEffect(() => {
    setAnthropometricDetails(
      paciente?.anthropometricDetails?.length > 0
        ? paciente.anthropometricDetails
        : defaultAnthropometricDetails
    );

    const combinedVitalSigns = combineVitalSigns(paciente?.vitalSigns ?? [], defaultVitalSigns);
    setVitalSigns(combinedVitalSigns);
  }, [paciente]);

  const combineVitalSigns = (patientVitalSigns, defaultVitalSigns) => {
    return defaultVitalSigns.map(defaultVital => {
      const patientVital = patientVitalSigns.find(
        vital => vital.measureType === defaultVital.measureType
      );
      return patientVital ? patientVital : defaultVital;
    });
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...anthropometricDetails];
    updatedDetails[index].measure = value;
    setAnthropometricDetails(updatedDetails);
  };

  const handleVitalChange = (index, value) => {
    const updatedVitalSigns = [...vitalSigns];
    updatedVitalSigns[index].measure = value;
    setVitalSigns(updatedVitalSigns);
  };

  const handleGlucemiaSiClick = () => {
    setGlucemiaElevada(true);
  };

  const handleGlucemiaNoClick = () => {
    setGlucemiaElevada(false);
  };

  useEffect(() => {
    setGlucemiaElevada(preconsult?.abnormalGlycemia);
    const combinedAbnormalsGlycemia = combineAbnormalGlycemia(preconsult?.lastAbnormalGlycemia ?? [], ultimosValoresAnormales);
    setUltimosValoresAnormales(combinedAbnormalsGlycemia);
  }, [preconsult]);

  const combineAbnormalGlycemia = (lastAbnormalGlycemia, ultimosValoresAnormales) => {
    return ultimosValoresAnormales.map((defaultGlycemia, index) => {
      const patientGlycemia = lastAbnormalGlycemia[index];
      return patientGlycemia ? patientGlycemia : defaultGlycemia;
    });
  };

  const handleAnormalValueChange = (index, event) => {
    const updatedValues = [...ultimosValoresAnormales];
    updatedValues[index] = event.target.value;
    setUltimosValoresAnormales(updatedValues);
    setValue("lastAbnormalGlycemia", updatedValues);
  };

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex items-center justify-between gap-1 px-6 py-2 bg-white border cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div/>
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
              <b className="font-semibold text-red-500">*</b>
            </p>
          </div >
          <div className={isOpen || defaultOpen===true ? "rotate-180" : ""}>
            <IconArrowDetailDown/>
          </div>
        </summary>

        {anthropometricDetails.map((detail, detailIndex) => (
          <div
            key={detailIndex}
            className="flex items-center justify-start gap-2 px-3 bg-[#fafafc] md:pr-10 ">
            <label className="flex w-2/3 md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
              <Image
                src={circleData}
                alt="circulo informacion"
                className="w-6 h-6"
              />{" "}
              {detail.measureType}
            </label>
            <input
              type="text"
              className="w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-white border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1"
              defaultValue={detail.measure}
              onChange={(e) => handleDetailChange(detailIndex, e.target.value)}
              {...register(detail.measureType)}
            />
          </div>
        ))}

        {vitalSigns.map((vital, vitalIndex) => (
          <div
            key={vitalIndex}
            className="flex justify-start items-center gap-2 px-3 bg-[#fafafc] md:pr-10">
            <label className="flex  w-2/3 md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
              <Image
                src={circleData}
                alt="circulo informacion"
                className="w-6 h-6"
              />{" "}
              {vital.measureType}
            </label>
            <input
              type="text"
              className="w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-white border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1"
              defaultValue={vital.measure}
              onChange={(e) => handleVitalChange(vitalIndex, e.target.value)}
              {...register(vital.measureType)}
            />
          </div>
        ))}
        <div
            className="flex justify-start items-center gap-2 px-3 bg-[#fafafc] md:pr-10">
            <label className="flex  w-2/3 md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
              <Image
                src={circleData}
                alt="circulo informacion"
                className="w-6 h-6"
              />{" "}
              Clase funcional
            </label>
            <div className="flex justify-start w-1/2 gap-4">
              <DropClaseFuncional options={['Clase funcional I', 'Clase funcional II', 'Clase funcional III', 'Clase funcional IV']} text2={"Seleccione clase funcional"} name={"HeartFailureRisk"} />
            </div>
        </div>
        <div className="flex justify-start items-center gap-2 px-3 bg-[#fafafc] md:pr-10">
          <label className="flex w-2/3 md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
            <Image
              src={circleData}
              alt="circulo informacion"
              className="w-6 h-6"
            />{" "}
            Glucemia: ¿Tuvo valores fuera del rango normal en el último tiempo?
            (+ 140 mg/dl y - 80 mg/dl)
          </label>
          <div className="flex justify-end w-1/2 gap-4">
            <button
              type="button"
              className={`px-4 py-3 border-2 rounded-xl border-[#DCDBDB] flex gap-2 ${
                glucemiaElevada === true ? "bg-greenPrimary text-white" : ""
              }`}
              onClick={handleGlucemiaSiClick}
              {...register("glucemiaElevada")}
              value={glucemiaElevada}>
              Sí
              <IconPreConsulta
                    color={
                      glucemiaElevada===true
                        ? "#ffffff"
                        : "#808080"
                    }
                  />
            </button>
            <button
              type="button"
              className={`px-4 py-3 border-2 rounded-xl border-[#DCDBDB] flex gap-2 items-center ${
                glucemiaElevada === false ? "bg-[#ff0000] text-white" : ""
              }`}
              onClick={handleGlucemiaNoClick}
              {...register("glucemiaElevada")}
              value={glucemiaElevada}>
              No
              <IconCloseBoton className="w-5 " color={
                      glucemiaElevada===false
                        ? "#ffffff"
                        : "#ff0000"
                    } />
            </button>
          </div>
        </div>

        <div className="flex justify-start items-center md:gap-2 px-3 bg-[#fafafc] md:pr-10">
          <label className="flex w-2/3 md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
            <Image
              src={circleData}
              alt="circulo informacion"
              className="w-6 h-6"
            />{" "}
            Escriba los últimos 4 valores más anormales que tuvo.
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
