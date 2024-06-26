"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";

import IconConsulta from "../icons/IconConsulta";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

import { useFormContext } from "react-hook-form";

export default function InputDiagnostico({
  title,
  subtitle,
  subtitle2,
  defaultOpen = false,
}) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex px-6 py-2 border gap-2 md:gap-1 items-center cursor-pointer justify-center">
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
            </p>
          </div>
        </summary>
        {subtitle2?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-4 md:py-2 border-b border-b-[#cecece]">
            <label className="text-start  py-1 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-3" />
              {sub}
            </label>
            <input
              className="w-full md:w-1/2 h-auto text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-2 md:py-1 outline-[#a8a8a8]"
              placeholder={`Escribe el ${sub} `}
              {...register(sub)}
            />
          </div>
        ))}
        {subtitle?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-2 border-b border-b-[#cecece]">
            <label className="text-start text-[#686868] py-1 font-medium text-base leading-4 flex gap-2 items-center">
              <IconConsulta />
              {sub}
            </label>
            <textarea
              className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]"
              placeholder="Ingrese aqui sus anotaciones"
              {...register(sub)}
            />
          </div>
        ))}
      </details>
    </div>
  );
}
