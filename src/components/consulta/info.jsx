"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";

export default function DataPatient({ info, title }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] md:pr-10">
        <label className="flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 md:px-6 py-2">
          <Image
            src={circleData}
            alt="circulo informacion"
            className="w-6 h-6"
          />
          {title}
        </label>
        <span className="w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1 h-[34px]">
          {info}
        </span>
      </div>
    </div>
  );
}
