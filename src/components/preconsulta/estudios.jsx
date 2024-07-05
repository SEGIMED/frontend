"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import FileUpload from "@/components/consulta/file";
import { useAppSelector } from "@/redux/hooks";

export default function InputFilePreconsultation({ tests, title, onUploadFile, onDescriptionChange, defaultOpen = false }) {
    return (
        <div className="flex flex-col">
            <details open={defaultOpen}>
                <summary className="flex px-6 py-2 border gap-1 items-center cursor-pointer justify-center">
                    <div className="flex items-center">
                        <Image src={circleData} alt="" />
                        <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
                            {title}
                        </p>
                    </div>
                </summary>
                {Object.keys(tests).map((test, index) => (
                    <FileUpload key={index} onUploadFile={onUploadFile} onDescriptionChange={onDescriptionChange} test={test} label={tests[test].title} />
                ))}
            </details>
        </div>
    );
}
