"use client";

import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

export default function InputInfo2({ info, title, keyProp }) {
  return (
    <div className="flex flex-col gap-2 md:px-6 py-2 px-3  bg-[#fafafc]">
      <label className="text-start py-1 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
        <IconCurrentRouteNav className="w-3" />
        {title}
      </label>
      {info && info.length > 0 ? (
        info.map((item, index) => (
          <p
            key={index}
            className="w-full md:w-1/2 h-auto text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-4 py-2 md:py-1 outline-[#a8a8a8]">
            {item[keyProp]}
          </p>
        ))
      ) : (
        <p className="w-full md:w-1/2 h-auto text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-4 py-2 md:py-1 outline-[#a8a8a8]">
          Sin especificar
        </p>
      )}
    </div>
  );
}
