"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import config from "@/components/localData/localdata";
import Cookies from "js-cookie";
import { PathnameShow } from "@/components/pathname/path";
import rutas from "@/utils/rutas.js";
import IconRegresar from "@/components/icons/iconRegresar";
import { useRouter, useSearchParams } from "next/navigation";
import { resetFormState, setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconDay from "@/components/icons/IconDay";
import IconMas from "@/components/icons/iconMas";
import Swal from "sweetalert2";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function HomeDoc() {
    const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
    const orden = useAppSelector((state) => state.formSlice.selectedOptions);
    const [pendientes, setPendientes] = useState(false);
    console.log(orden);


    const router = useRouter();
    const userId = config.c;
    const dispatch = useAppDispatch();
    const token = Cookies.get("a");
    const lastSegmentTextToShow = PathnameShow();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("Pendientes")) {
            setPendientes(true);
        }
    }, [searchParams]);

    const handleChange = (name, value) => {
        dispatch(setSelectedOption({ name, option: value }));
    };

    const onSubmit = async (orden) => {
        if (pendientes) {
            const body = { status: true }
            try {
                const response = await ApiSegimed.patch(`/patient-medical-request?id=${orden.id}`, body);
                if (response.data) {
                    await getDoctorRequest({ token });
                    dispatch(resetFormState());
                }
            } catch (error) {
                console.error("Error creating patient request:", error);
            }
        }
        console.log(orden);
        Swal.fire({
            icon: "success",
            text: "Se ha creado la nueva orden",
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
        }).then(() => {
            const targetRoute = pendientes
                ? `${rutas.Doctor}${rutas.Pendientes}`
                : `${rutas.Doctor}${rutas.Ordenes}`;
            router.push(targetRoute);
        });
        dispatch(resetFormState());
    };

    return (
        <div className="flex flex-col h-full">
            <title>{lastSegmentTextToShow}</title>
            <div className="flex items-center border-b justify-between border-b-[#cecece] px-2 md:pl-10 md:pr-6 py-2 h-[10%] bg-white sticky top-0 z-10">
                <div className="flex gap-2 md:gap-4">
                    <button
                        type="button"
                        className="flex md:px-6 px-4 py-2 rounded-xl gap-1 items-center bg-[#487FFA]"
                        onClick={() => {
                            const targetRoute = pendientes
                                ? `${rutas.Doctor}${rutas.Pendientes}`
                                : `${rutas.Doctor}${rutas.Pacientes}?ordenMedica=true`;
                            router.push(targetRoute);
                        }}
                    >
                        <IconRegresar />
                        <p className="text-start hidden md:block text-white font-bold text-base leading-5">
                            Regresar
                        </p>
                    </button>
                </div>

                <h1 className="font-bold ml-4 md:block hidden">Generar órden médica</h1>
                <button
                    onClick={() => onSubmit(orden)}
                    className="bg-greenPrimary text-white md:px-4 md:py-2 py-2 px-2 items-center flex rounded-lg border gap-2 w-fit transition duration-300 ease-in-out"
                >
                    <IconMas />
                    <p>Generar</p>
                </button>
            </div>
            <div className="gap-3 flex flex-col overflow-auto w-full h-full bg-[#fafafc] pb-3">
                <InputInfoText
                    title="Diagnóstico"
                    placeholder="Ingrese aquí el diagnóstico"
                    onChange={(e) => handleChange("diagnostic", e.target.value)}
                    className="md:px-6 py-2 px-3"
                />
                <InputInfoText
                    text={true}
                    title="Indicaciones"
                    placeholder="Ingrese aquí las indicaciones para el paciente"
                    onChange={(e) => handleChange("indication", e.target.value)}
                    className="md:px-6 py-2 px-3"
                />
                <InputInfoText
                    title="Medicamentos"
                    placeholder="Buscar medicamento..."
                    onChange={(e) => handleChange("drug", e.target.value)}
                    className="md:px-6 py-2 px-3"
                />
                <div className="flex flex-col gap-2 md:px-6 py-2 px-3 bg-[#fafafc]">
                    <label className="flex items-center gap-2">
                        <IconDay /> Fecha
                    </label>
                    <input
                        id="date"
                        type="date"
                        className="w-1/2 outline-none p-2 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                        onChange={(e) => handleChange("date", e.target.value)}
                    />
                </div>
                <InputInfoText
                    text={true}
                    title="Texto adicional (opcional)"
                    placeholder="Ingrese aquí cualquier otra aclaración"
                    onChange={(e) => handleChange("comments", e.target.value)}
                    className="md:px-6 py-2 px-3"
                />
            </div>
        </div>
    );
}
