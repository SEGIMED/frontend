"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import FileUpload from "@/components/consulta/file";
import { useAppSelector } from "@/redux/hooks";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import { useState } from "react";

export default function InputFilePreconsultation({ tests, title, onTestSelectedOption, onTestActive, onUploadFile, onDescriptionChange, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col ">
            <details open={defaultOpen}>
                <summary className="flex items-center justify-between h-16 gap-1 px-6 bg-white border cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <div/>
                    <div className="flex items-center bg-white">
                        <Image src={circleData} alt="" />
                        <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
                            {title}
                            <b className="font-semibold text-red-500">*</b>
                        </p>
                    </div>
                    <div className={isOpen || defaultOpen===true ? "rotate-180" : ""}>
                        <IconArrowDetailDown />
                    </div>
                </summary>
                {Object.keys(tests).map((test, index) => (
                    <FileUpload key={index} data={tests[test]} onTestSelectedOption={onTestSelectedOption} onTestActive={onTestActive} onUploadFile={onUploadFile} onDescriptionChange={onDescriptionChange} test={test} label={tests[test].title} Link={tests[test].file}/>
                ))}
            </details>
        </div>
    );
}
