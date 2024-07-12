"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { useState } from "react";

function SignosVitales({ vitalSigns, title, onVitalSignChange, defaultOpen = false }) {
  const [signValue, setSignValue] = useState(0);

  const handleInput = (sign, value) => {
    setSignValue(value);
    onVitalSignChange(sign, value);
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

        {Object.keys(vitalSigns).map((sign, index) => {
          const data = vitalSigns[sign];

          return (
            <div
              key={index}
              className="flex justify-start items-center gap-2 md:px-8 py-1 border-b border-b-[#cecece]">
              <label className="flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6  px-2 md:px-6 py-2">
                <Image
                  src={circleData}
                  alt="circulo informacion"
                  className="w-6 h-6"
                />
                {data.label}
              </label>
              <span className="w-1/5 md:w-1/4">
                {data.referenceValue} {data.unit}
              </span>
              <input
                type="number"
                // value={signValue}
                min={0}
                className="w-[20%] md:w-[8%] text-start text-[#5F5F5F] font-semibold text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-2 md:px-4 py-1"
                onChange={(e) => handleInput(sign, Number(e.target.value))}
              />
            </div>
          )
        })}
      </details>
    </div>
  );
}

export default SignosVitales;
