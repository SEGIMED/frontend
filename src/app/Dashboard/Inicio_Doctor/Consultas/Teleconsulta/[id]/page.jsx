"use client"

import IconCamera from "@/components/icons/IconCamera";
import IconData from "@/components/icons/IconData";
import IconFinish from "@/components/icons/IconFinish";
import IconLive from "@/components/icons/IconLive";
import IconMicrophone from "@/components/icons/IconMicrophone";
import { useAppSelector } from "@/redux/hooks";

export default function TeleconsultaId() {

    const consultasTodas = useAppSelector(state => state.schedules)
    const user = useAppSelector(state => state.user)
    const patientsList = useAppSelector(state => state.allPatients.patients)

    return (
        <div className="h-full w-full flex flex-col justify-between bg-[#FAFAFC]">
            <div className="w-full flex justify-between items-center border-b-2">
                <div className="flex justify-start items-center">
                    <button className="flex justify-center items-center gap-3 py-3 px-6 border-r-2">
                        <IconLive /> Datos de consulta
                    </button>
                    <botton className="flex justify-center items-center gap-3 py-3 px-6 border-r-2">
                        <IconData /> Datos del paciente
                    </botton>
                </div>
                <button className="flex justify-center items-center gap-3 bg-[#E73F3F] text-white py-2 px-6 rounded-lg mr-6">
                    <IconFinish /> Finalizar
                </button>
            </div>
            <div className="flex justify-center py-2 border-b-2">
                <p>Dr. Kevin Lado</p>
            </div>
            <div className="h-full w-full flex justify-between items-center flex-col py-5">
                <div className="h-full w-[40rem] flex justify-center items-center bg-white rounded-lg border">
                    video
                </div>
                <div className="pt-3 flex justify-center items-center gap-5">
                    <button className="bg-[#0060FF] p-3 rounded-full">
                        <IconMicrophone />
                    </button>
                    <button className="bg-[#0060FF] p-3 rounded-full">
                        <IconCamera />
                    </button>
                </div>
            </div>
        </div>
    )
}