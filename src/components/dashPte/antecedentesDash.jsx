"use client";

import IconFatArrow from "../icons/iconFatarrowDash";

export default function AntecedenteDash({ subtitle }) {
  return (
    <>
      {subtitle?.map((sub, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 px-6 py-2  border-b-[#cecece]  bg-gray-100">
          <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
            <IconFatArrow />
            {sub}
          </label>
          <p className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </div>
      ))}
    </>
  );
}
