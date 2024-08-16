"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import EditarPaciente from "@/components/adminDash/editarPerfil";
import UseDataFetchingAdmin from "@/utils/dataFetching/SideBarFunctionsAdmin";
import Cookies from "js-cookie";
import HistoriaClinica from "@/components/adminDash/clinicHistory";

export default function PacienteId({ params }) {
    const paciente = useAppSelector((state) => state.user);
    const id = Number(params.userId);
    const searchParams= useSearchParams()

    const token = Cookies.get("a");
    const { getPatientD } = UseDataFetchingAdmin();

    const editarPerfilQuery= searchParams.get("editPerfil") === "true";
    const historiaClinicaQuery= searchParams.get("historiaClinica") === "true";



    useEffect(() => {
        getPatientD(id, { headers: { token: token } });
        // Run this effect only when `id` or `token` changes.
    }, [id, token]);

    return (
        <div className="h-full w-full overflow-y-auto">
        {editarPerfilQuery && <EditarPaciente id={id} paciente={paciente} /> }
        {historiaClinicaQuery && <HistoriaClinica id={id}/>}
            
        </div>
    );
}
