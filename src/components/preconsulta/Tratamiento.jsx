"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { useFormContext } from "react-hook-form";
import IconConsulta from "../icons/IconConsulta";
import { useState } from "react";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

const TratamientoItem = ({ title, placeholder, field, selectedOptions, onTratamientoChange }) => {

    const handleDescriptionChange = (item, description) => {
        onTratamientoChange(field, item, description);
    }

    const handleAddNewItem = (item, description) => {
        const isAnyOneEmpty = Object.keys(selectedOptions).find(item => selectedOptions[item].trim() === '');
        if (!isAnyOneEmpty) {
            onTratamientoChange(field, item, description);
        }
    }

    return (
        <div className="p-6 mb-4">
            <div className="mb-2 font-semibold text-ms color-[#5F5F5F] flex gap-3 ">
                <IconCurrentRouteNav className="w-[1.5rem]" />
                {title}
            </div>
            {Object.keys(selectedOptions)?.map((item, index) => (
                <div key={index}>
                    <input
                        type="text"
                        className="w-full p-2 mt-2 border rounded"
                        placeholder={placeholder}
                        value={selectedOptions[item]}
                        onChange={(e) => handleDescriptionChange(item, e.target.value)}
                    />
                </div>
            ))}
            <button
                onClick={(e) => handleAddNewItem(`item${String(Object.keys(selectedOptions).length)}`, '')}
                className="w-[150px] p-2 mt-2 text-white border-blue-300 rounded-md bg-blue-300 hover:bg-blue-400">
                Agregar item
            </button>
        </div>
    )
}

function TratamientoPreconsulta({ title, tratamiento, onTratamientoChange, defaultOpen = false }) {
    return (
        <div className="flex flex-col">
            <details open={defaultOpen}>
                <summary className="flex px-6 py-2 border-b border-t gap-1 items-center cursor-pointer justify-center bg-white">
                    <div className="flex items-center">
                        <Image src={circleData} alt="" />
                        <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
                            {title}
                        </p>
                    </div>
                </summary>
                {Object.keys(tratamiento).map((field, index) => {
                    return (
                        <TratamientoItem key={index} field={field} selectedOptions={tratamiento[field].selectedOptions} title={tratamiento[field].title} placeholder={tratamiento[field].placeholder} onTratamientoChange={onTratamientoChange} />
                    )
                })}
            </details>
        </div>
    );
}

export default TratamientoPreconsulta;
