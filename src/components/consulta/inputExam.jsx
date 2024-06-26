'use client'

import Image from "next/image";
import circleData from '@/components/images/circleData.png';
import ButtonNext from "./button";
import DropNext from "./dropdown";
import { useState } from "react";

import { useFormContext } from "react-hook-form";

export default function InputExam({ title, subtitle }) {

    const { register } = useFormContext()

    const [subsistemas, setSubsistemas] = useState(false); // Estado para manejar si hay dolor


    const handleSubsistemas = (selection) => {
        setSubsistemas(selection === 'Si');
    };


    return (
        <div className="flex flex-col">
            <details>
                <summary className="flex px-6 py-2 border gap-1 items-center cursor-pointer justify-center">
                    <div className="flex items-center">
                        <Image src={circleData} alt="" />
                        <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">{title}</p>
                    </div>
                </summary>
                <div className="flex justify-center items-center flex-col w-full px-4 py-4">
                    <div>
                        <ButtonNext text={"¿Usar subsistemas?"} options={["Si", "No"]} name={"subsitemas"} handleSelection={handleSubsistemas} />
                    </div>
                    {
                        subsistemas && (
                            <>
                                <div>
                                    <DropNext options={['Sistema Cardiovascular', 'Sistema Respiratorio', 'Sistema Neurológico', 'Sistema Digestivo', 'Sistema Osteomuscular', 'Sistema Endocrino', 'Sistema Reproductor y Urológico', 'Sistema Oftalmológico', 'ORL', 'Piel y Faneras', 'Otros']} text2={"Seleccionar subsistema"} name={"selectSubsistema"} />
                                </div>
                                <div className="flex w-full flex-col gap-2 px-6 py-2 border-b border-b-[#cecece]">
                                    <textarea className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]" placeholder="Describa toda la información posible"  {...register("inputSubsistema")} />
                                </div>
                            </>
                        )
                    }

                </div>
            </details>
        </div>
    );
}