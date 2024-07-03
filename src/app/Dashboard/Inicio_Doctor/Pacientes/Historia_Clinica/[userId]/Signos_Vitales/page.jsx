'use client'

import Ordenar from "@/components/Buttons/Ordenar";
import FiltrarPacientes from "@/components/Buttons/FiltrarPacientes";
import pacientesAlarm from "@/utils/dataAlarm";
import SignosVitales from "@/components/clinicalHistory/TableSignosVitales";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";



export default function HomeDoc() {

    const pathname = usePathname();
    const pathArray = pathname.split('/');
    const userId = pathArray[pathArray.length - 2];

    const [infoPatient, setInfoPatient] = useState([]);

    const getConsultas = async (headers) => {
        try {
            const response = await ApiSegimed.get(`/medical-event/get-medical-event-history?patientId=${userId}`, headers);
            if (response.data) {
                console.log(response.data);
                setInfoPatient(response.data);

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
            <div className="w-full flex justify-between px-5 items-center border-b bg-[#fefffe] border-b-[#cecece] pb-2 pt-2">
                <Ordenar />
                <p className="text-[#686868] font-semibold text-base leading-6">Signos vitales</p>
                <FiltrarPacientes />
            </div>
            <div className="grid grid-cols-7 items-center border-b border-b-[#cecece] pl-2 pr-6 py-2 bg-[#fefffe] z-10">
                <p className="font-bold text-[#5F5F5F]"></p>
                <p className="font-bold text-[#5F5F5F]">Hora</p>
                <p className="font-bold text-[#5F5F5F]">Fecha</p>
                <p className="font-bold text-[#5F5F5F]">Grupo HTP</p>
                <p className="font-bold text-[#5F5F5F]">Centro de atencion</p>
                <p className="font-bold text-[#5F5F5F]">Motivo de consulta</p>
                <p className="font-bold text-[#5F5F5F]"></p>
            </div>
            {infoPatient.length === 0 ? (<p className="text-[#686868] font-semibold h-full text-base items-center flex justify-center ">No hay informacion disponible</p>) : (<SignosVitales pacientes={infoPatient} />)}

        </div>
    );
}