"use client"
import { useState } from 'react';
import IconArrowDetailDown from '../icons/IconArrowDetailDown';
import IconArrowDetailUp from '../icons/IconArrowDetailUp';
import IconConsulta from '../icons/IconConsulta';


export default function ExamFisico({ pacientes, subtitle }) {
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
            {pacientes.map((paciente, index) => (
                <div key={index}>
                    <details open={openDetails[index]} onToggle={() => toggleDetail(index)}>
                        <summary className="flex items-center cursor-pointer">
                            <div className="grid grid-cols-7  items-center border-b border-b-[#cecece] pr-6 py-2 bg-white w-full h-14">
                                <div className='flex justify-center'>
                                    <IconConsulta />
                                </div>
                                <div className="text-[#5F5F5F] ">{paciente.hora}</div>
                                <div className="text-[#5F5F5F]">{paciente.fecha}</div>
                                <div className="text-[#FF8300]">{paciente.HTP}</div>
                                <div className="text-[#5F5F5F]">{paciente.lugar}</div>
                                <div className="text-[#5F5F5F]">{paciente.motivo}</div>
                                <div className='flex justify-center'>
                                    {openDetails[index] ? <IconArrowDetailUp /> : <IconArrowDetailDown />}
                                </div>
                            </div>
                        </summary>
                        <div className="p-5 ">
                            {subtitle?.map((sub, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 px-6 md:py-2 py-4 border-b border-b-[#cecece]">
                                    <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
                                        <IconConsulta />
                                        {sub}
                                    </label>
                                    <p className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1">
                                        {paciente.descripcion}
                                    </p>
                                </div>
                            ))}
                            <IconConsulta />

                        </div>
                    </details>
                </div>
            ))}
        </div>
    );
}