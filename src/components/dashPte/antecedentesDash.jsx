"use client";

import IconFatArrow from "../icons/iconFatarrowDash";

export default function AntecedenteDash({ title, info }) {
  return (
    <>

      <div

        className="flex flex-col gap-2 px-6 py-2  border-b-[#cecece]  bg-[#FAFAFC]">
        <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
          <IconFatArrow />
          {title}
        </label>
        <p className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1">
          {info}
        </p>
      </div>
    </>
  );
}
