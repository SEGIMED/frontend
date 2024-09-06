"use client";
import CuerpoPatient from "@/components/InicioPaciente/autoevaluacion/inputcuerpopatient";
import { PathnameShow } from "@/components/pathname/path";




export default function Autoevaluacion() {
    const lastSegmentTextToShow = PathnameShow()

    return (
        <div className="h-full text-[#686868] w-full">
            <title>{lastSegmentTextToShow}</title>
            <CuerpoPatient />
        </div>
    );
}
