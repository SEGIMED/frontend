"use client"
import { useState } from 'react';
import IconArrowDetailDown from '../icons/IconArrowDetailDown';
import IconArrowDetailUp from '../icons/IconArrowDetailUp';
import IconConsulta from '../icons/IconConsulta';
import IconCurrentRouteNav from '../icons/IconCurrentRouteNav';
import InputInfo from './InputInfo';


export default function Anamnesis({ pacientes, subtitle }) {
    // Estado para controlar qué detalles están abiertos
    const [openDetails, setOpenDetails] = useState({});

    const toggleDetail = (index) => {
        setOpenDetails((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div className="h-full flex flex-col">
            {pacientes?.map((paciente, index) => (
                <div key={index}>
                    <details open={openDetails[index]} onToggle={() => toggleDetail(index)}>
                        <summary className="flex items-center cursor-pointer">
                            <div className="grid grid-cols-7  items-center border-b border-b-[#cecece] pr-6 py-2 bg-white w-full h-14">
                                <div className='flex justify-center'>
                                    <IconConsulta />
                                </div>
                                <div className="text-[#5F5F5F]">{new Date(paciente.timestamp).toLocaleTimeString()}</div>
                                <div className="text-[#5F5F5F]">{new Date(paciente.timestamp).toLocaleDateString()}</div>
                                <div className="text-[#FF8300]">{paciente.HTP}</div>
                                <div className="text-[#5F5F5F]">{paciente?.attendancePlace?.alias}</div>
                                <div className="text-[#5F5F5F]">{paciente?.chiefComplaint}</div>
                                <div className='flex justify-center'>
                                    {openDetails[index] ? <IconArrowDetailUp /> : <IconArrowDetailDown />}
                                </div>
                            </div>
                        </summary>
                        <div className="p-5 ">
                            <InputInfo title={"Evolución de la enfermedad"} info={paciente?.historyOfPresentIllness} />
                            <InputInfo title={"Motivo de consulta"} info={paciente?.chiefComplaint} />
                            <InputInfo title={"Síntomas importantes"} info={paciente?.reviewOfSystems} />
                        </div>
                    </details>
                </div>
            ))}
        </div>
    );
}