"use client"
import { useState } from 'react';
import IconArrowDetailDown from '../icons/IconArrowDetailDown';
import IconArrowDetailUp from '../icons/IconArrowDetailUp';
import IconConsulta from '../icons/IconConsulta';
import circleData from '@/components/images/circleData.png';
import Image from 'next/image';

export default function SignosVitales({ pacientes, subtitle }) {
    // Estado para controlar qué detalles están abiertos
    const [openDetails, setOpenDetails] = useState({});

    const toggleDetail = (index) => {
        setOpenDetails((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const keyToTextMap = {
        name: 'Nombre',
        lastname: 'Apellido',
        idNumber: 'Documento',
    };

    // Define el orden deseado de las keys
    const orderedKeys = ['name', 'lastname', 'idNumber'];

    return (
        <div className="h-full flex flex-col">
            {pacientes.map((paciente, index) => (
                <div key={index}>
                    <details open={openDetails[index]} onToggle={() => toggleDetail(index)}>
                        <summary className="flex items-center cursor-pointer">
                            <div className="grid grid-cols-7 items-center border-b border-b-[#cecece] pr-6 py-2 bg-white w-full h-14">
                                <div className='flex justify-center'>
                                    <IconConsulta />
                                </div>
                                <div className="text-[#5F5F5F]">{paciente.hora}</div>
                                <div className="text-[#5F5F5F]">{paciente.fecha}</div>
                                <div className="text-[#FF8300]">{paciente.HTP}</div>
                                <div className="text-[#5F5F5F]">{paciente.lugar}</div>
                                <div className="text-[#5F5F5F]">{paciente.motivo}</div>
                                <div className='flex justify-center'>
                                    {openDetails[index] ? <IconArrowDetailUp /> : <IconArrowDetailDown />}
                                </div>
                            </div>
                        </summary>
                        <div className="">

                            {paciente.anthropometricDetails.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                                    <label className='flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                                        <Image src={circleData} alt="circulo informacion" className='w-6 h-6' />{detail.measureType}
                                    </label>
                                    <span className='w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1'>
                                        {detail.measure} {detail.measureUnit}
                                    </span>
                                </div>
                            ))}
                            {paciente.vitalSigns.map((vital, vitalIndex) => (
                                <div key={vitalIndex} className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                                    <label className='flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                                        <Image src={circleData} alt="circulo informacion" className='w-6 h-6' /> {vital.measureType}
                                    </label>
                                    <span className='w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1'>
                                        {vital.measure} {vital.measureUnit}
                                    </span>
                                </div>
                            ))}
                            <div className="flex justify-start h-14 items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                                <label className='flex w-fit text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                                    <Image src={circleData} alt="circulo informacion" className='w-6 h-6' />   Glucemia:  ¿Tuvo valores fuera del rango normal en el último tiempo? (+ 140 mg/dl y - 80 mg/dl)
                                </label>
                                <div className='flex justify-end w-1/3 gap-4'>
                                    <button className='px-6 py-2 border-2 rounded-xl border-[#DCDBDB]'>Si</button>
                                    <button className='px-6 py-2 border-2 rounded-xl border-[#DCDBDB]'>No</button>
                                </div>
                            </div>
                            <div className="flex justify-start h-14 items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                                <label className='flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                                    <Image src={circleData} alt="circulo informacion" className='w-6 h-6' />   Escriba los últimos 4 valores mas anormales que tuvo.
                                </label>
                                <div className='flex justify-start w-1/2 gap-4'>
                                    <button className='px-6 py-2 border-2 rounded-xl border-[#DCDBDB]'>150 mg/dl</button>
                                    <button className='px-6 py-2 border-2 rounded-xl border-[#DCDBDB]'>75 mg/dl</button>
                                    <button className='px-6 py-2 border-2 rounded-xl border-[#DCDBDB]'>77 mg/dl</button>
                                    <button className='px-6 py-2 border-2 rounded-xl border-[#DCDBDB]'>143 mg/dl</button>
                                </div>
                            </div>

                        </div>
                    </details>
                </div>
            ))}
        </div>
    );
}