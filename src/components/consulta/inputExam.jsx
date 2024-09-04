'use client'

import Image from "next/image";
import circleData from '@/components/images/circleData.png';
import ButtonNext from "./button";
import DropNext from "./dropdown";
import { useEffect, useState } from "react";

import { useFormContext } from "react-hook-form";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";

export default function InputExam({ title, subtitle , defaultOpen = false, diagnostico }) {
    
    const { register } = useFormContext()
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [subsistemas, setSubsistemas] = useState(false); // Estado para manejar si hay dolor
    const [selectedOption, setSelectedOption] = useState("");

    const handleSubsistemas = (selection) => {
        setSubsistemas(selection === 'Si');
        if (selection === 'No') {
            setSelectedOption("");
        }
    };

    const handleOptionChange = (name, option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        if (diagnostico?.physicalExaminations[0]?.physicalSubsystem) {
            setSelectedOption(diagnostico?.physicalExaminations[0]?.physicalSubsystem);
            setSubsistemas(true);
        }
    }, [diagnostico]);
    return (
        <div className="flex flex-col">
            <details open={defaultOpen}>
                <summary className="flex items-center justify-between h-16 gap-1 px-6 bg-white border cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <div/>
                    <div className="flex items-center">
                        <Image src={circleData} alt="" />
                        <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">{title}<b className="font-semibold text-red-500">*</b></p>
                    </div>
                    <div className={isOpen || defaultOpen===true ? "rotate-180" : ""}>
                        <IconArrowDetailDown/>
                    </div>
                </summary>
                <div className="flex flex-col items-center justify-center w-full px-4 py-4 bg-[#fafafc]">
                    <div>
                        <ButtonNext text={"¿Usar subsistemas?"} options={["Si", "No"]} name={"subsitemas"} handleSelection={handleSubsistemas} defaultValue={diagnostico}/>
                    </div>
                    {
                        subsistemas   && (
                            <>
                                <div>
                                    <DropNext 
                                        options={['Sistema Cardiovascular', 'Sistema Respiratorio', 'Sistema Neurológico', 'Sistema Digestivo', 'Sistema Osteomuscular', 'Sistema Endocrino', 'Sistema Reproductor y Urológico', 'Sistema Oftalmológico', 'ORL', 'Piel y Faneras', 'Otros']} 
                                        text2={"Seleccionar subsistema"} 
                                        name={"selectSubsistema"} 
                                        icon={<IconArrowDetailDown color={"white"}/>} 
                                        colorBackground={"#487FFA"} 
                                        colorText={"white"}
                                        handleOptionChange={handleOptionChange}
                                        selectedOptions={diagnostico?.physicalExaminations[0]?.physicalSubsystem || null}
                                        />
                                </div>
                                
                            </>
                        )
                    }
                   {selectedOption && <div className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 w-full px-6 py-2">
                        <IconCurrentRouteNav className="w-3 h-3"/>
                        {selectedOption}
                    </div>}
                    <div className="flex flex-col w-full gap-2 px-6 py-2 ">
                        <textarea 
                            className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
                            placeholder="Describa toda la información posible"  
                            {...register("inputSubsistema")} 
                            defaultValue={diagnostico?.physicalExaminations[0]?.description || ""}                           
                            />
                    </div>
                </div>
            </details>
        </div>
    );
}