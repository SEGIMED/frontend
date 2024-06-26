'use client'

import ClincalCuerpo from "@/components/clinicalHistory/cuerpo";
import { usePathname } from "next/navigation";



export default function HomeDoc() {

    const pathname = usePathname();
    const pathArray = pathname.split('/');
    const userId = pathArray[pathArray.length - 2];

    

    return (
        <div className="h-full w-full flex flex-col">
            <div className="w-full flex justify-between px-5 items-center border-b bg-white border-b-[#cecece] pb-2 pt-2">
                <div></div>
                <p className="text-[#686868] font-semibold text-base leading-6">Autoevaluacion</p>
                <div></div>
            </div>
            <ClincalCuerpo />
        </div>
    );
}