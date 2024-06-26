"use client"
import { useState } from 'react';
import IconArrowDetailDown from '../icons/IconArrowDetailDown';
import IconArrowDetailUp from '../icons/IconArrowDetailUp';
import IconConsulta from '../icons/IconConsulta';


export default function Evoluciones({ pacientes }) {
    // Estado para controlar qué detalles están abiertos
    const [openDetails, setOpenDetails] = useState({});

    const toggleDetail = (index) => {
        setOpenDetails((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    return (
        <div className="h-full flex flex-col">
            {pacientes?.map((paciente, index) => (
                <div key={index}>
                    <details open={openDetails[index]} onToggle={() => toggleDetail(index)}>
                        <summary className="flex items-center cursor-pointer ">
                            <div className="grid grid-cols-7  items-center border-b border-t border-b-[#cecece] border-t-[#cecece] pr-6 py-2 bg-white w-full h-fit">
                                <div className='flex justify-center'>
                                    <IconConsulta />
                                </div>
                                <div className="text-[#5F5F5F]">{new Date(paciente.timestamp).toLocaleDateString()}</div>
                                <div className="text-[#5F5F5F]">{new Date(paciente.timestamp).toLocaleTimeString()}</div>
                                <div className="text-[#FF8300]">{paciente?.physician?.name} {paciente?.physician?.lastname}</div>
                                <div className="text-[#5F5F5F]">{paciente?.attendancePlace?.alias}</div>
                                <div className="text-[#5F5F5F]">{paciente?.chiefComplaint}</div>
                                <div className='flex justify-center'>
                                    {openDetails[index] ? <IconArrowDetailUp /> : <IconArrowDetailDown />}
                                </div>
                            </div>
                        </summary>
                        <div className="p-5 bg-[#f5f4f4]">
                            <p className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1">
                                {paciente.historyOfPresentIllness}
                            </p>
                        </div>
                    </details>
                </div>
            ))}
        </div>
    );
}