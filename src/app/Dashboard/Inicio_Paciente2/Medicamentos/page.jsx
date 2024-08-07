"use client";

import { PathnameShow } from "@/components/pathname/path";
import prescriptions from "@/utils/dataMedicamentos";
import MedicamentosTable from "@/components/InicioPaciente/medicamentos/tableMedicentos";
import NotFound from "@/components/notFound/notFound";

export default function Medicamentos() {
    const lastSegmentTextToShow = PathnameShow()

    return (
        <div className="h-[100%] text-[#686868] w-[100%]">
            <title>{lastSegmentTextToShow}</title>
            <div className="h-[100%]">
                <div className="flex border-b border-b-[#cecece]">
                    <div className="w-[5%] bg-white hidden md:flex"></div>
                    <div className="grid md:grid-cols-6 grid-cols-3 items-center px-2 md:pr-6 py-2 md:px-2 bg-white w-[100%] md:w-[70%] font-normal text-base leading-4 min-h-14 text-center md:text-start">
                        <p>Nombre</p>
                        <p>Dosis</p>
                        <p>Vía</p>
                        <p className="hidden md:block">Médico</p>
                        <p className="hidden md:block">Modificado por</p>
                        <p className="hidden md:block">Fecha de Inicio</p>
                    </div>
                    <div className="bg-white md:w-[25%]"></div>
                </div>

                {prescriptions.length === 0 ? (
                    <NotFound text="Actualmente no tenes ningún medicamento asignado." />
                ) : (
                    prescriptions.map((prescription, index) => (
                        <MedicamentosTable key={index} medicamento={prescription} />
                    ))
                )}
            </div>
        </div>
    );
}
