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
import { useAppSelector } from "@/redux/hooks";
import { mapBoolean } from "@/utils/MapeoCuerpo";

const ModalBoarding = ({ isOpen, onClose }) => {
    const [index, setIndex] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const formStateGlobal = useAppSelector((state) => state.formSlice.selectedOptions);
    const user = useAppSelector((state) => state.user);

    const handleDisabled = () => {
        setDisabled(false);
    };

    useEffect(() => {
        if (index === 0) {
            setDisabled(false);
        }
    }, [index]);

    const Modals = [
        <Bienvenida />,
        <Hipertension handleDisabled={handleDisabled} />,
        <Genero handleDisabled={handleDisabled} />,
        <Nacimiento handleDisabled={handleDisabled} />,
        <Domicilio handleDisabled={handleDisabled} />,
        <CentroDetAtención handleDisabled={handleDisabled} />,
        <Doctor handleDisabled={handleDisabled} />,
        <ViveSolo handleDisabled={handleDisabled} />,
        <DispElectronicos handleDisabled={handleDisabled} />,
        <UsoCelular handleDisabled={handleDisabled} />,
        <Final handleDisabled={handleDisabled} />
    ];

    const handleNext = () => {
        if (index < Modals.length - 1) {
            setIndex(index + 1);
            setDisabled(true);
        } else {
            const infoSend = mapBoolean(formStateGlobal);
            console.log({ ...infoSend, userId: user?.id });
            onClose();
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
            <div className="relative z-50 bg-white rounded-lg w-[90%] md:w-[45rem] h-[33rem] flex flex-col justify-between items-center gap-5 ">
                <div className="w-full border-b border-b-[#DCDBDB] p-4 flex gap-3">
                    <IconCurrentRouteNav className={'w-4'} />
                    <p className="font-medium text-base leading-6 ">¡Te damos la bienvenida, <span className="text-bluePrimary">{user?.name}!</span></p>
                </div>
                <div className="px-8 py-5">
                    {Modals[index]}
                </div>
                <div className="flex gap-2 px-8 pb-5">
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
                        <p className="block text-white font-bold">Continuar</p>
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalBoarding;
