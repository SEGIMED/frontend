"use client";

import IconCurrentRouteNav from "../../../icons/IconCurrentRouteNav";

export default function InputInfo({ info, title }) {
  return (
    <div className="flex flex-col gap-2 md:px-6 py-2 px-3  bg-[#fafafc]">
      <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
        <IconCurrentRouteNav className="w-3" />
        {title}
      </label>
      <p className="w-full h-full text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-4 py-2">
        {info || "Sin especificar"}
      </p>
    </div>
  );
}
