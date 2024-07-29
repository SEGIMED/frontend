"use client";

import IconClinicalHistory from "../icons/IconClinicalHistory";

export default function InputInfoText({ title, placeholder, onChange, text }) {
    return (
        <div className="flex flex-col gap-2 md:px-6 py-2 px-3  bg-[#fafafc]">
            <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
                <IconClinicalHistory className="w-3" />
                {title}
            </label>
            {text ? <textarea onChange={onChange} placeholder={placeholder} className="w-full min-h-24 text-start text-[#686868] font-normal text-base leading-6 bg-white border outline-none border-[#DCDBDB] rounded-lg px-4 py-2" /> : <input onChange={onChange} placeholder={placeholder} className="w-full md:w-1/2 h-full text-start text-[#686868] font-normal outline-none text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-4 py-2" />}


        </div>
    );
}
