"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import IconGeolocation from "../icons/IconGeolocation";
import Elboton from "../Buttons/Elboton";

export default function DataPatient({ info, title, geolocation, openModal }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-start px-3 md:pr-6 bg-[#fafafc]">
        <label className="flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 md:px-6 py-2 my-1">
          <Image
            src={circleData}
            alt="circulo informacion"
            className="w-6 h-6"
          />
          {title}
        </label>
        {title === "Ubicación" ? (
          <Elboton
            onPress={(e) => {
              e.preventDefault();
              openModal();
            }}
            size={"md"}
            nombre="Mostrar Mapa"
            icon2={<IconGeolocation color="white" />}
          />
        ) : (
          <span className="w-1/2 text-start text-[#5F5F5F] bg-white font-normal text-base leading-6 border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-3 py-1 h-[34px]">
            {info}
          </span>
        )}
      </div>
    </div>
  );
}


