"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import BotonPreconsulta from "../Buttons/BotonPreconsulta";

function SignosVitales({ vitalSigns, title, onVitalSignChange, onGlicemyaActive, defaultOpen = false }) {
  const [signValue, setSignValue] = useState(0);

  const handleInput = (sign, value) => {
    setSignValue(value);
    onVitalSignChange(sign, value);
  };

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex items-center justify-between gap-1 px-6 py-2 bg-white border-b border-t cursor-pointer">
          <div />
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
            </p>
          </div>
          <div>
            <IconArrowDetailDown />
          </div>
        </summary>

        {Object.keys(vitalSigns).map((sign, index) => {
          const data = vitalSigns[sign];
          return (
            <div
              key={index}
              className="flex md:flex-row flex-col justify-start items-start gap-2 px-8 py-1">
              <label className="flex flex-1 md:w-1/2 text-start text-[#5F5F5F] font-normal text-sm leading-6 px-2 py-2">
                <Image
                  src={circleData}
                  alt="circulo informacion"
                  className="w-6 h-6"
                />
                {data.label}
              </label>
              {(sign !== 'abnormalGlycemia' && sign !== 'lastAbnormalGlycemia') &&
                <div className="w-full md:max-w-[50%] flex flex-row justify-start md:justify-end items-start gap-2 px-8 py-1">
                  <span className="w-[100px] flex md:flex-1 justify-start md:justify-end text-[#5F5F5F] font-normal text-sm">
                    {data.referenceValue} {data.unit}
                  </span>
                  <input
                    type="number"
                    placeholder={data.measure > 0 ? data.measure : ''}
                    // defaultValue={}
                    min={0}
                    className="max-w-[100px] md:max-w-[240px] text-start text-[#5F5F5F] font-semibold text-base leading-6 bg-white border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-2 py-1"
                    onChange={(e) => handleInput(sign, Number(e.target.value))}
                  />
                </div>}
              {sign === 'abnormalGlycemia' &&
                <div className="md:max-w-[50%] flex justify-end items-center gap-2 md:px-8 py-1">
                  <div
                    className='flex py-2 md:py-0 justify-evenly gap-3'>
                    <BotonPreconsulta
                      label="Sí"
                      onClick={() => onVitalSignChange(sign, null, true)}
                      active={data.active}
                    />
                    <BotonPreconsulta
                      label="No"
                      onClick={() => onVitalSignChange(sign, null, false)}
                      active={data.active}
                    />
                  </div>
                </div>
              }
              {sign === 'lastAbnormalGlycemia' &&
                <div key={index} className="md:max-w-[50%] flex flex-col justify-end items-center gap-2 py-1">
                  <span className="w-full">
                    {data.referenceValue} {data.unit}
                  </span>
                  <div className="w-full flex flex-row gap-2">
                    {Object.keys(data.options).map((option, index) => (
                      <input
                        key={index}
                        type="number"
                        placeholder={data.options[option] > 0 ? data.options[option] : ''}
                        // defaultValue={}
                        className="w-full text-start text-[#5F5F5F] font-semibold text-base leading-6 bg-white border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-2 py-1"
                        onChange={(e) => onVitalSignChange(sign, Number(e.target.value), null, option)}
                      />
                    ))}
                  </div>
                </div>
              }
            </div>
          )
        })}
      </details>
    </div>
  );
}

export default SignosVitales;
