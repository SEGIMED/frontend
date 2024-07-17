import React from "react";


export default function TextoMedicament({ label, description, size, className }) {
    return (
        <div className={`flex flex-col gap-2 w-[100%] ${className}`}>
            <label className="text-base font-semibold text-textSubtitle">{label}</label>
            <p className={`w-full p-3 bg-white border-[#D7D7D7] border rounded-lg min-h-${size}  text-textSubtitle outline-none`}>{description}</p>
        </div >

    );
}