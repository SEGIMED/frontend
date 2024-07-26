"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { useFormContext } from "react-hook-form";
import IconConsulta from "../icons/IconConsulta";
import { useState } from "react";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

const AnamnesisItem = ({ title, field, description, onAnamnesisChange }) => {
    // const [description, setDescription] = useState('');

    const handleDescriptionChange = (e) => {
        // setDescription(e.target.value);
        onAnamnesisChange(field, e.target.value);
    }

    return (
        <div className="px-6 py-4">
            <div className="mb-2 font-semibold text-ms color-[#5F5F5F] flex gap-3 ">
                <IconCurrentRouteNav className="w-4" />
                {title}
            </div>
            <div>
                <textarea
                    className="w-full p-2 mt-2 border rounded"
                    placeholder="Describa el informe"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
        </div>
    )
}

function AnamnesisPreconsulta({ title, anamnesis, onAnamnesisChange, defaultOpen = false }) {
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
                {Object.keys(anamnesis).map((field, index) => {
                    return (
                        <AnamnesisItem key={index} field={field} title={anamnesis[field].title} description={anamnesis[field].description} onAnamnesisChange={onAnamnesisChange} />
                    )
                })}
            </details>
        </div>
    );
}

export default AnamnesisPreconsulta;
