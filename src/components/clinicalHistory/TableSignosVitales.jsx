import { useState } from 'react';
import IconArrowDetailDown from '../icons/IconArrowDetailDown';
import IconArrowDetailUp from '../icons/IconArrowDetailUp';
import IconConsulta from '../icons/IconConsulta';
import circleData from '@/components/images/circleData.png';
import Image from 'next/image';
import DataPatient from '../consulta/info';

export default function SignosVitales({ pacientes, subtitle }) {
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
                            <div className="grid grid-cols-7 items-center border-b border-b-[#cecece] pr-6 py-2 bg-[#fefffe] w-full h-fit">
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
                        <div className="">
                            {paciente.anthropometricDetails ? (
                                paciente.anthropometricDetails.map((detail, detailIndex) => (
                                    <div key={detailIndex}>
                                        <DataPatient title={detail.measureType} info={`${detail.measure} ${detail.measureUnit}`} />
                                    </div>
                                ))
                            ) : (
                                anthropometricDetails.map((detail, detailIndex) => (
                                    <div key={detailIndex}>
                                        <DataPatient title={detail.measureType} info={`${detail.measure} ${detail.measureUnit}`} />
                                    </div>
                                ))
                            )}

                            {paciente.vitalSigns ? (
                                paciente.vitalSigns.map((vital, vitalIndex) => (
                                    <div key={vitalIndex}>
                                        <DataPatient title={vital.measureType} info={`${vital.measure} ${vital.measureUnit}`} />
                                    </div>
                                ))
                            ) : (
                                vitalSigns.map((vital, vitalIndex) => (
                                    <div key={vitalIndex}>
                                        <DataPatient title={vital.measureType} info={`${vital.measure} ${vital.measureUnit}`} />
                                    </div>
                                ))
                            )}

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
