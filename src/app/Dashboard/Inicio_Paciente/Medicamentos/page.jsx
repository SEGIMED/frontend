"use client";

import { PathnameShow } from "@/components/pathname/path";
import MedicamentosTable from "@/components/InicioPaciente/medicamentos/tableMedicentos";
import NotFound from "@/components/notFound/notFound";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useEffect, useState } from "react";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import PDFExportComponent from "@/components/pdf/pdfOrder";
import Cookies from "js-cookie";


export default function Medicamentos() {
    const lastSegmentTextToShow = PathnameShow();
    const [medicamentos, setMedicamentos] = useState([]);
    const [loading, setLoading] = useState(true);  // Estado para manejar la carga

    const userId = Cookies.get("c")
    console.log(userId);


    const getDrugs = async () => {
        try {
            const response = await ApiSegimed.get(`/drug-prescription?id=${userId}`);
            console.log(response.data);
            setMedicamentos(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);  // Detener la carga después de obtener los datos
        }
    };

    useEffect(() => {
        getDrugs();
    }, []);

    return (
        <div className="h-[100%] text-[#686868] w-[100%]">
            {/* <PDFExportComponent data={data} />  para visualizar pdf comentar todo y poner esto */}
            <title>{lastSegmentTextToShow}</title>
            <div className="h-full w-full">
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
                    <div className="bg-white md:w-[20%]"></div>
                </div>

                {loading ? (
                    <SkeletonList count={10} />  // Mostrar esqueleto mientras se cargan los datos
                ) : medicamentos.length === 0 ? (
                    <NotFound text="Actualmente no tenes ningún medicamento asignado." sizeText="w-[80%]" />
                ) : (
                    medicamentos.map((medicamento, index) => (
                        <MedicamentosTable key={index} medicamento={medicamento} />
                    ))
                )}
            </div>
        </div>
    );
}
