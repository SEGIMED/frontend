"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import EditarPaciente from "@/components/adminDash/editarPerfil";
import UseDataFetchingAdmin from "@/utils/dataFetching/SideBarFunctionsAdmin";
import Cookies from "js-cookie";

export default function PacienteId({ params }) {
    const paciente = useAppSelector((state) => state.user);
    const id = Number(params.id);

    const token = Cookies.get("a");
    const { getPatientD } = UseDataFetchingAdmin();

    useEffect(() => {
        getPatientD(id, { headers: { token: token } });
        // Run this effect only when `id` or `token` changes.
    }, [id, token]);

    return (
        <>
            <EditarPaciente id={id} paciente={paciente} />
        </>
    );
}
