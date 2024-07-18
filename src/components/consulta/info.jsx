"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import IconGeolocation from "../icons/IconGeolocation";

export default function DataPatient({ info, title, geolocation, openModal }) {

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-start px-3 md:pr-6">
        <label className="flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 md:px-6 py-2 my-1">
          <Image
            src={circleData}
            alt="circulo informacion"
            className="w-6 h-6"
          />
          {title}
          
        </label>
        {
          geolocation ? 
          <button
          onClick={openModal}
          className="flex px-6 py-3 text-sm font-bold text-white rounded-xl flex-nowrap bg-primary w-min"
           >
            <p className="mr-2 text-sm text-nowrap">
                 Mostrar Mapa
            </p>
          <IconGeolocation />
          </button>
          : 
            <span className="w-1/2 text-start text-[#5F5F5F] bg-white font-normal text-base leading-6  border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1 h-[34px]">
            {info}
            </span>
        }
      </div>
    </div>
  );
}
