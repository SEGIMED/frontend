"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";

import IconConsulta from "../icons/IconConsulta";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";

export default function InputDiagnostico({
  title,
  subtitle,
  subtitle2,
  subtitle3,
  defaultOpen = false,
  diagnostico
}) {
  const { register, setValue, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [inputs, setInputs] = useState([""]); // Inicializa con un solo input vacío
  const [valueDiagnosticoSubtitle, setValueDiagnosticoSubtitle] = useState([
    "",
  ])

  const handleAddNewItem = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón
    setInputs((prevInputs) => [...prevInputs, ""]); // Agrega un nuevo input vacío al array
  };

  const handleInputChange = (index, value) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
    setValue(`medications[${index}]`, value); // Guarda el valor en react-hook-form
  };
  useEffect(() => {
    setValueDiagnosticoSubtitle([
      
      diagnostico?.alarmPattern
    ])
  },[diagnostico])
  // Observa cambios en los inputs de medications
  const medicationValues = watch('medications', inputs);

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary
          className="flex items-center justify-between h-16 gap-2 px-6 bg-white border cursor-pointer md:gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div />
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
              <b className="font-semibold text-red-500">*</b>
            </p>
          </div>
          <div className={isOpen || defaultOpen === true ? "rotate-180" : ""}>
            <IconArrowDetailDown />
          </div>
        </summary>
        {subtitle2?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-4 md:py-2 bg-[#fafafc]"
          >
            <label className="text-start py-1 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-3" />
              {sub}
            </label>
            <input
              className="w-full md:w-1/2 h-11 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 md:py-1 outline-[#a8a8a8]"
              placeholder={`Escribe el ${sub}`}
              {...register(sub)}
            />
          </div>
        ))}
        {subtitle3 && (
          <div className="flex flex-col gap-2 px-6 py-4 md:py-2 bg-[#fafafc]">
            <label className="text-start py-1 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-3" />
              {subtitle3}
            </label>
            {inputs.map((input, index) => (
              <input
                key={index}
                className="w-full md:w-1/2 h-11 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 md:py-1 outline-[#a8a8a8]"
                placeholder="Escribe el medicamento"
                value={medicationValues[index] || input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                {...register(`medications[${index}]`)}
              />
            ))}
            <button
              onClick={handleAddNewItem}
              className="w-full p-2 mt-2 text-white bg-blue-300 border-blue-300 rounded-md md:w-1/2 hover:bg-blue-400"
            >
              Agregar medicamento
            </button>
          </div>
        )}
        {subtitle?.map((sub, index) => (
          <div key={index} className="flex flex-col gap-2 px-6 py-2 bg-[#fafafc]">
            <label className="text-start text-[#686868] py-1 font-medium text-base leading-4 flex gap-2 items-center">
              <IconConsulta />
              {sub}
            </label>
            <textarea
              className="w-full h-40 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
              placeholder="Ingrese aquí sus anotaciones"
              {...register(sub)}
            />
          </div>
        ))}
      </details>
    </div>
  );
}
