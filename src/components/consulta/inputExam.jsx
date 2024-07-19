'use client'

import Image from "next/image";
import circleData from '@/components/images/circleData.png';
import ButtonNext from "./button";
import DropNext from "./dropdown";
import { useState } from "react";

import { useFormContext } from "react-hook-form";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";

export default function InputExam({ title, subtitle }) {

    const { register } = useFormContext()

    const [subsistemas, setSubsistemas] = useState(false); // Estado para manejar si hay dolor


    const handleSubsistemas = (selection) => {
        setSubsistemas(selection === 'Si');
    };


    return (
        <div className="flex flex-col">
            <details>
                <summary className="flex items-center justify-between gap-1 px-6 py-2 bg-white border cursor-pointer">
                    <div/>
                    <div className="flex items-center">
                        <Image src={circleData} alt="" />
                        <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">{title}</p>
                    </div>
                    <div>
                        <IconArrowDetailDown/>
                    </div>
                </summary>
                <div className="flex flex-col items-center justify-center w-full px-4 py-4 bg-[#fafafc]">
                    <div>
                        <ButtonNext text={"¿Usar subsistemas?"} options={["Si", "No"]} name={"subsitemas"} handleSelection={handleSubsistemas} />
                    </div>
                    {
                        subsistemas && (
                            <>
                                <div>
                                    <DropNext options={['Sistema Cardiovascular', 'Sistema Respiratorio', 'Sistema Neurológico', 'Sistema Digestivo', 'Sistema Osteomuscular', 'Sistema Endocrino', 'Sistema Reproductor y Urológico', 'Sistema Oftalmológico', 'ORL', 'Piel y Faneras', 'Otros']} text2={"Seleccionar subsistema"} name={"selectSubsistema"} />
                                </div>
                                <div className="flex flex-col w-full gap-2 px-6 py-2 ">
                                    <textarea className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]" placeholder="Describa toda la información posible"  {...register("inputSubsistema")} />
                                </div>
                            </>
                        )
                    }

                </div>
            </details>
        </div>
    );
}