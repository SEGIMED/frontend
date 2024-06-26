"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";

import IconConsulta from "../icons/IconConsulta";
import { useAppDispatch } from "@/redux/hooks";
import { updateAnamnesisField } from "@/redux/slices/user/preconsultaFormSlice";

export default function InputPreconsulta({
  title,
  subtitle,
  risk,
  data,
  defaultOpen = false,
}) {
  const dispatch = useAppDispatch();

  const handleAnamnesisChange = (e, field) => {
    console.log(e.target.value, field, sub);
    dispatch(updateAnamnesisField({ field, value: e.target.value }));
  };

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex px-6 py-2 border gap-1 items-center cursor-pointer justify-center">
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
          </div>
        ))}
        {subtitle?.map((sub, index) => {
          let field = "";
          if (sub == "¿Por qué solicitó la consulta?") {
            field = "consultationReason";
          } else if (sub == "Síntomas importantes") {
            field = "importantSymptoms";
          }
          return (
            <div
              key={index}
              className="flex flex-col gap-2 px-6 md:py-2 py-4 border-b border-b-[#cecece]">
              <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
                <IconConsulta />
                {sub}
              </label>
              <textarea
                className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]"
                placeholder="Describa toda la información posible"
                onChange={(e) => handleAnamnesisChange(e, field)}
                value={data[field]}
              />
            </div>
          );
        })}
      </details>
    </div>
  );
}
