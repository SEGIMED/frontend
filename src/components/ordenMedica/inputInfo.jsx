"use client";

import IconClinicalHistory from "../icons/IconClinicalHistory";

export default function InputInfoText({ title, placeholder, onChange, text, icon, className, defaultValue, disabled, classNameInput }) {
    return (
        <div className={`flex flex-col gap-2   bg-[#fafafc] ${className}`}>{title ?
            <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
                {icon ? icon : <IconClinicalHistory className="w-3" />}
                {title}
            </label> : null}
            {text ? <textarea defaultValue={defaultValue} disabled={disabled} onChange={onChange} placeholder={placeholder} className="w-full min-h-24 text-start text-[#686868] font-normal text-base leading-6 bg-white border outline-none border-[#DCDBDB] rounded-lg px-4 py-2" />
                :
                <input onChange={onChange} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} className={`w-full md:w-1/2 h-full text-start text-[#686868] font-normal outline-none text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-4 py-2 ${classNameInput}`} />}


        </div>
    );
}
