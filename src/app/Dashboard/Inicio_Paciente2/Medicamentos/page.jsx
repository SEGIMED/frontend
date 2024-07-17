"use client";

import { PathnameShow } from "@/components/pathname/path";
import prescriptions from "@/utils/dataMedicamentos";
import MedicamentosTable from "@/components/InicioPaciente/medicamentos/tableMedicentos";



export default function Medicamentos() {
    const lastSegmentTextToShow = PathnameShow()

    return (
        <div className="h-full text-[#686868] w-[100%]">
            <title>{lastSegmentTextToShow}</title>
            <div>
                <div className="flex border-b border-b-[#cecece]">


                    <div className="w-[5%]  hidden md:flex"></div>
                    <div className="grid md:grid-cols-6 grid-cols-4 items-center   md:pr-6 py-2 md:px-2 bg-white w-[100%] md:w-[70%] font-normal text-base leading-4 min-h-14 text-center md:text-start">
                        <p>Nombre</p>
                        <p>Dosis</p>
                        <p className="hidden md:block">Vía</p>
                        <p>Médico</p>
                        <p className="hidden md:block">Modificado por</p>
                        <p>Fecha de Inicio</p>
                    </div>
                    <div className="  md:w-[25%]"></div>
                </div>
                {prescriptions?.map((prescription) => (
                    <MedicamentosTable medicamento={prescription} />
                ))}
                <div>

                </div>

            </div>
        </div>
    );
}
