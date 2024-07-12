"use client";

import IconCircle from "../icons/IconCircle";

export default function InputInterconsulta({ name, title }) {
  return (
    <div className="flex flex-col gap-2 py-4 border-b border-b-[#cecece] px-3 md:px-6">
      <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2">
        <IconCircle className="w-3" />
        {title}
      </label>

      <textarea
        className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-3 md:px-4 py-2 outline-[#a8a8a8]"
        placeholder="Describa toda la información posible"
        //  {...register("inputSubsistema")}
      />
    </div>
  );
}
