import React, { useState, useEffect } from "react";
import circleData from "@/components/images/circleData.png";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

const defaultAnthropometricDetails = [
  { measureType: "Talla", measureUnit: "Cm", measure: "" },
  { measureType: "Peso", measureUnit: "Kg", measure: "" },
  { measureType: "Perímetro Abdominal", measureUnit: "Cm", measure: "" },
  { measureType: "IMC", measureUnit: "Kg/m²", measure: "" },
];

const defaultVitalSigns = [
  {
    measureType: "Presión Arterial Diastólica",
    measureUnit: "mmHg",
    measure: "",
  },
  {
    measureType: "Presión Arterial Sistólica",
    measureUnit: "mmHg",
    measure: "",
  },
  { measureType: "Saturación de Oxígeno", measureUnit: "%", measure: "" },
  { measureType: "Temperatura", measureUnit: "°C", measure: "" },
  { measureType: "Frecuencia Respiratoria", measureUnit: "rpm", measure: "" },
  { measureType: "Frecuencia Cardiaca", measureUnit: "bpm", measure: "" },
];

export default function SignosVitalesInfo({
  paciente,
  title,
  defaultOpen = false,
  preconsult,
}) {
  const [anthropometricDetails, setAnthropometricDetails] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [glucemiaElevada, setGlucemiaElevada] = useState(null);
  const [ultimosValoresAnormales, setUltimosValoresAnormales] = useState([
    "",
    "",
    "",
    "",
  ]);

  const { register } = useFormContext();
  useEffect(() => {
    console.log(glucemiaElevada);
    register("glucemiaElevada", { glucemiaElevada });
  }, [glucemiaElevada]);

  useEffect(() => {
    setAnthropometricDetails(
      paciente?.anthropometricDetails.length
        ? paciente?.anthropometricDetails
        : defaultAnthropometricDetails
    );
    setVitalSigns(
      paciente?.vitalSigns.length ? paciente?.vitalSigns : defaultVitalSigns
    );
  }, [paciente]);

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
    //register("glucemiaElevada", true);
  };

  const handleGlucemiaNoClick = () => {
    setGlucemiaElevada(false);
    //register("glucemiaElevada", false);
  };
  useEffect(() => {
    setGlucemiaElevada(preconsult?.abnormalGlycemia);
    //register("glucemiaElevada", glucemiaElevada);
  }, [preconsult]);
  const handleAnormalValueChange = (index, event) => {
    const updatedValues = [...ultimosValoresAnormales];
    updatedValues[index] = event.target.value;
    setUltimosValoresAnormales(updatedValues);
  };
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

        {anthropometricDetails.map((detail, detailIndex) => (
          <div
            key={detailIndex}
            className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] md:pr-10">
            <label className="flex  w-2/3 md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
              <Image
                src={circleData}
                alt="circulo informacion"
                className="w-6 h-6"
              />{" "}
              {detail.measureType}
            </label>
            <input
              type="text"
              className="w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1"
              defaultValue={detail.measure}
              onChange={(e) => handleDetailChange(detailIndex, e.target.value)}
              {...register(detail.measureType)}
            />
          </div>
        ))}

        {vitalSigns.map((vital, vitalIndex) => (
          <div
            key={vitalIndex}
            className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] md:pr-10">
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
              className="w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1"
              defaultValue={vital.measure}
              onChange={(e) => handleVitalChange(vitalIndex, e.target.value)}
              {...register(vital.measureType)}
            />
          </div>
        ))}

        <div className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] md:pr-10">
          <label className="flex  w-2/3 md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
            <Image
              src={circleData}
              alt="circulo informacion"
              className="w-6 h-6"
            />{" "}
            Glucemia: ¿Tuvo valores fuera del rango normal en el último tiempo?
            (+ 140 mg/dl y - 80 mg/dl)
          </label>
          <div className="flex justify-center w-1/2 gap-4">
            <button
              type="button"
              className={`px-4 py-1 border-2 rounded-xl border-[#DCDBDB] ${
                glucemiaElevada === true ? "bg-blue-200" : ""
              }`}
              onClick={handleGlucemiaSiClick}
              {...register("glucemiaElevada")}
              value={glucemiaElevada}>
              Sí
            </button>
            <button
              type="button"
              className={`px-4 py-1 border-2 rounded-xl border-[#DCDBDB] ${
                glucemiaElevada === false ? "bg-blue-200" : ""
              }`}
              onClick={handleGlucemiaNoClick}
              {...register("glucemiaElevada")}
              value={glucemiaElevada}>
              No
            </button>
            {/*<input type="hidden" {...register("glucemiaElevada")} value={glucemiaElevada} />*/}
          </div>
        </div>

        <div className="flex justify-start items-center md:gap-2 px-3 border-b border-b-[#cecece] md:pr-10">
          <label className="flex  w-2/3 md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
            <Image
              src={circleData}
              alt="circulo informacion"
              className="w-6 h-6"
            />{" "}
            Escriba los últimos 4 valores más anormales que tuvo.
          </label>
          <div className="md:flex grid grid-cols-2 justify-start w-1/2 md:gap-4 gap-1">
            {ultimosValoresAnormales.map((value, index) => (
              <input
                key={index}
                type="text"
                className="md:px-4 text-center py-1 border-2 rounded-xl border-[#DCDBDB] w-[80%] md:w-[15%]"
                defaultValue={value || preconsult?.lastAbnormalGlycemia[index]}
                onChange={(event) => handleAnormalValueChange(index, event)}
                //{...register("lastAbnormalGlycemia" )}
              />
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
