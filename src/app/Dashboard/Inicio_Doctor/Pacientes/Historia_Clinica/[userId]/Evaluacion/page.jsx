'use client'

import ClincalCuerpo from "@/components/clinicalHistory/cuerpo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";




export default function HomeDoc() {

    const pathname = usePathname();
    const pathArray = pathname.split('/');
    const userId = pathArray[pathArray.length - 2];

    const [consultas, setConsultas] = useState();

    const getConsultas = async (headers) => {
        try {
            // const response = await ApiSegimed.get(`/medical-event/get-medical-event-history?patientId=${userId}`, headers);
            const response = await ApiSegimed.get(`/medical-event/get-medical-event-detail?medicalEventId=5`, headers);
            if (response.data) {
                console.log(response.data)
                setConsultas(response.data);

            }
        } catch (error) {
            console.error("Error fetching consultas:", error);
        }
    };

    useEffect(() => {
        const token = Cookies.get("a");
        if (token) {
            getConsultas({ headers: { token: token } }).catch(console.error);
        }
    }, []);

    return (
        <div className="h-full w-full flex flex-col">
            <div className="w-full flex justify-between px-5 items-center border-b bg-white border-b-[#cecece] pb-2 pt-2">
                <div></div>
                <p className="text-[#686868] font-semibold text-base leading-6">Autoevaluacion</p>
                <div></div>
            </div>
            {consultas ? <ClincalCuerpo info={consultas} /> : <div>loading</div>}

        </div>
    );
}