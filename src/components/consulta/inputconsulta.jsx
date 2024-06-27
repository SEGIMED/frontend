"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { useFormContext } from "react-hook-form";

import IconConsulta from "../icons/IconConsulta";
import IconCheckBotonConsulta from "../icons/iconCheckBotonConsulta";


export default function InputConsulta({
  title,
  subtitle,
  risk,
  defaultOpen = false,
  options,
  riskGroup,
  groupHTP
}) {
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
              {options?.map((sub, index) => (
                <button className=" p-2 md:px-3 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7]">
                  {sub}
                </button>
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
                <button key={index} className=" p-2 md:px-4 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] flex">
                  {/*<IconCheckBotonConsulta className={"w-5  h-5 bg-black"} />*/}{sub}
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
            />
          </div>
        ))}
      </details>
    </div>
  );
}
