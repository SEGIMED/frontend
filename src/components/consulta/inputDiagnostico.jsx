"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";

import IconConsulta from "../icons/IconConsulta";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

import { useFormContext } from "react-hook-form";
import DropNext from "./dropdown";
import AutocompleteDiagnostico from "./AutocompleteDiagnostico";
import DrugModal from "../modal/ModalDoctor/DrugModal";
import { useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";


export default function InputDiagnostico({
  title,
  subtitle,
  subtitle2,
  subtitle3,
  defaultOpen = false,
}) {
  const SwitchCatalogo  = (value) => {
    switch (value) {
      case "0":
        return "1";
      case "1":
        return "4";
      default:
        return "Medicamento Desconocido";
    }
  };
  const { register } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(defaultOpen);


  const handleOptionSelect = (option) => {
    setSelectedOption(SwitchCatalogo(option));
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex items-center justify-between h-16 gap-2 px-6 bg-white border cursor-pointer md:gap-1 " onClick={() => setIsOpen(!isOpen)}>
          <div/>
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
              <b className="font-semibold text-red-500">*</b>
            </p>
          </div>
          <div className={isOpen || defaultOpen===true ? "rotate-180" : ""}>
            <IconArrowDetailDown/>
          </div>
        </summary>
        {subtitle2?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-4 md:py-2  bg-[#fafafc]">
            <label className="text-start  py-1 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-3" />
              {sub}
            </label>
            <input
              className="w-full md:w-1/2 h-11 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 md:py-1 outline-[#a8a8a8]"
              placeholder={`Escribe el ${sub} `}
              {...register(sub)}
            />
          </div>
        ))}
        {subtitle3 ? (
          <div
            className="flex flex-col gap-2 px-6 py-4 md:py-2 bg-[#fafafc]">
            <label className="text-start  py-1 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-3" />
              {subtitle3}
            </label>
            <AutocompleteDiagnostico
              key="autocomplete-diagnostico"
              options={['Losartan', 'Ácido Fenofíbrico']}
              text2={`Escribe el ${subtitle3}`}
              name={"selectDrug"}
              onOptionSelect={handleOptionSelect}
              />
              <DrugModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} options={['Losartan', 'Ácido Fenofíbrico']} selectedOption={selectedOption}/>
          </div>
        ) : null}
        {subtitle?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-2 bg-[#fafafc]">
            <label className="text-start text-[#686868] py-1 font-medium text-base leading-4 flex gap-2 items-center">
              <IconConsulta />
              {sub}
            </label>
            <textarea
              className="w-full h-40 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
              placeholder="Ingrese aqui sus anotaciones"
              {...register(sub)}
            />
          </div>
        ))}
      </details>
    </div>
  );
}
