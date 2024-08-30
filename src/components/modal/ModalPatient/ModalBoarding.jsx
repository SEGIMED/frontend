"use client";

import React, { useState, useEffect } from "react";
import Bienvenida from "../boarding/Bienvenida";
import Hipertension from "../boarding/Hipertension";
import ViveSolo from "../boarding/ViveSolo";
import UsoCelular from "../boarding/UsoCelular";
import Nacimiento from "../boarding/Nacimiento";
import Genero from "../boarding/Genero";
import DispElectronicos from "../boarding/DispositivosElectronicos";
import Final from "../boarding/Final";
import Domicilio from "../boarding/Domicilio";
import CentroDetAtención from "../boarding/CentroDeAtencion";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import Doctor from "../boarding/Doctor";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { mapBoolean } from "@/utils/MapeoCuerpo";
import MatriculaNumber from "../boarding/Matricula";
import MatriculaProvNumber from "../boarding/MatriculaProv";
import Especialidad from "../boarding/Especialidad";
import IconArrowRight from "@/components/icons/iconArrowRight";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";

const ProgressBar = ({ steps, currentIndex }) => {
    return (
        <div className="flex justify-center space-x-2">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`h-1 w-5 md:w-8 ${index <= currentIndex ? "bg-bluePrimary" : "bg-gray-300"}`}
                />
            ))}
        </div>
    );
};

const ModalBoarding = ({ isOpen, onClose, rol, setOnboarding }) => {
    const [index, setIndex] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [catalog, setCatalog] = useState([]);

    const formStateGlobal = useAppSelector((state) => state.formSlice.selectedOptions);
    const user = useAppSelector((state) => state.user);

    console.log(formStateGlobal);


    const dispatch = useAppDispatch()


    const handleDisabled = () => {
        setDisabled(false);
    };

    const getCatalog = async () => {
        try {
            const response = await ApiSegimed.get(
                "/catalog/get-catalog?catalogName=medical_specialties",

            );
            if (response.data) {
                setCatalog(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };



    const handleChange = ({ name, option }) => {
        dispatch(setSelectedOption({ name, option }));
    }


    useEffect(() => {
        if (rol === "Médico") {
            getCatalog();
        }
    }, [rol]);


    useEffect(() => {
        if (index === 0) {
            setDisabled(false);
        }
    }, [index]);


    // <Doctor key="doctor" handleDisabled={handleDisabled} state={formStateGlobal} />,

    const Modals = rol === "Paciente" ? [
        <Bienvenida key="bienvenida" />,
        <Hipertension key="hipertension" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <Genero key="genero" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <Nacimiento key="nacimiento" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <Domicilio key="domicilio" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <CentroDetAtención key="centro_det_atencion" handleDisabled={handleDisabled} state={formStateGlobal} handleChange={handleChange} rol={rol} />,
        <ViveSolo key="vive_solo" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <DispElectronicos key="disp_electronicos" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <UsoCelular key="uso_celular" handleDisabled={handleDisabled} state={formStateGlobal} />,

        <Final key="final" handleDisabled={handleDisabled} state={formStateGlobal} />
    ] : [
        <Bienvenida key="bienvenida" />,
        <Genero key="genero" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <Nacimiento key="nacimiento" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <Domicilio key="domicilio" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <CentroDetAtención key="centro_det_atencion" handleDisabled={handleDisabled} state={formStateGlobal} handleChange={handleChange} rol={rol} />,
        <Especialidad key="Especialidad" handleDisabled={handleDisabled} state={formStateGlobal} options={catalog} />,
        <MatriculaNumber key="MatriculaNumber" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <MatriculaProvNumber key="MatriculaProvNumber" handleDisabled={handleDisabled} state={formStateGlobal} />,
        <Final key="final" handleDisabled={handleDisabled} state={formStateGlobal} />
    ];



    const handleNext = async () => {

        if (index < Modals.length - 1) {
            setIndex(index + 1);
            setDisabled(true);
        } else {
            const infoSend = mapBoolean(formStateGlobal);
            try {
                const response = await ApiSegimed.patch(
                    `/onboarding?tipo=${rol === "Médico" ? 2 : 3}&id=${user.userId}`,
                    // `/onboarding?tipo=2&id=15`,
                    infoSend
                );
                setOnboarding(true)
                onClose();
            } catch (error) {
                console.error("Error al enviar la información:", error);
            }
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
            if (index === 1) {
                setDisabled(false);
            }
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-50 bg-white rounded-lg w-[90%] md:w-[48rem] h-[33rem] flex flex-col items-center gap-5 ">
                <div className="w-full border-b border-b-[#DCDBDB] p-4 flex gap-3">
                    <IconCurrentRouteNav className={'w-4'} />
                    <p className="font-medium text-base leading-6 ">¡Te damos la bienvenida, <span className="text-bluePrimary">{user?.name}!</span></p>
                </div>
                <ProgressBar steps={Modals} currentIndex={index} />
                <div className="flex flex-col items-center gap-5 justify-center h-full ">
                    <div className="px-8 py-5">
                        {Modals[index]}
                    </div>
                    <div className="flex gap-2 px-8 pb-5 pt-5">
                        <button
                            disabled={index === 0}
                            onClick={handlePrev}
                            className="bg-bluePrimary py-2 px-4 items-center flex rounded-lg gap-2 w-fit disabled:bg-gray-400">
                            <p className="block text-white font-bold">Regresar</p>
                        </button>
                        <button
                            disabled={disabled}
                            onClick={handleNext}
                            className="bg-bluePrimary py-2 px-4 items-center flex rounded-lg gap-2 w-fit disabled:bg-gray-400">
                            <p className="flex text-white font-bold">Continuar <IconArrowRight /></p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    ) : null;
};

export default ModalBoarding;
