import React, { useState } from 'react';
import circleData from '@/components/images/circleData.png';
import Image from 'next/image';

export default function SignosVitalesInfo({ paciente, title, defaultOpen = false, preconsult }) {
    const [glucemiaValue, setGlucemiaValue] = useState('');
    const [glucemiaElevada, setGlucemiaElevada] = useState(null); // Estado para el botón "Sí" de la glucemia elevada
    const [ultimosValoresAnormales, setUltimosValoresAnormales] = useState(['', '', '', '']);

    const handleGlucemiaChange = (event) => {
        setGlucemiaValue(event.target.value);
    };

    const handleGlucemiaSiClick = () => {
        setGlucemiaElevada(true);
    };

    const handleGlucemiaNoClick = () => {
        setGlucemiaElevada(false);
    };

    const handleAnormalValueChange = (index, event) => {
        const updatedValues = [...ultimosValoresAnormales];
        updatedValues[index] = event.target.value;
        setUltimosValoresAnormales(updatedValues);
    };

    return (
        <div className="flex flex-col">
            <details open={defaultOpen}>
                <summary className="flex items-center justify-center gap-1 px-6 py-2 border cursor-pointer">
                    <div className="flex items-center">
                        <Image src={circleData} alt="" />
                        <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
                            {title}
                        </p>
                    </div>
                </summary>

                {paciente?.anthropometricDetails?.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                        <label className='flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                            <Image src={circleData} alt="circulo informacion" className='w-6 h-6' /> {detail.measureType}
                        </label>
                        <input
                            type="text"
                            className='w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1'
                            defaultValue={`${detail.measure} ${detail.measureUnit}`}

                        />
                    </div>
                ))}

                {paciente?.vitalSigns?.map((vital, vitalIndex) => (
                    <div key={vitalIndex} className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                        <label className='flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                            <Image src={circleData} alt="circulo informacion" className='w-6 h-6' /> {vital.measureType}
                        </label>
                        <input
                            type="text"
                            className='w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1'
                            defaultValue={`${vital.measure} ${vital.measureUnit}`}

                        />
                    </div>
                ))}

                <div className="flex justify-start h-14 items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                    <label className='flex w-fit text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                        <Image src={circleData} alt="circulo informacion" className='w-6 h-6' />   Glucemia: ¿Tuvo valores fuera del rango normal en el último tiempo? (+ 140 mg/dl y - 80 mg/dl)
                    </label>
                    <div className='flex justify-end w-1/3 gap-4'>
                        <button
                            type="button"
                            className={`px-6 py-2 border-2 rounded-xl border-[#DCDBDB] ${glucemiaElevada === true ? 'bg-blue-200' : ''}`}
                            onClick={handleGlucemiaSiClick}
                        >
                            Sí
                        </button>
                        <button
                            type="button"
                            className={`px-6 py-2 border-2 rounded-xl border-[#DCDBDB] ${glucemiaElevada === false ? 'bg-blue-200' : ''}`}
                            onClick={handleGlucemiaNoClick}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="flex justify-start h-14 items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                    <label className='flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                        <Image src={circleData} alt="circulo informacion" className='w-6 h-6' />   Escriba los últimos 4 valores más anormales que tuvo.
                    </label>
                    <div className='flex justify-start w-1/2 gap-4'>
                        {ultimosValoresAnormales.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                className='px-6 py-2 border-2 rounded-xl border-[#DCDBDB] w-1/6'
                                value={value || preconsult?.lastAbnormalGlycemia[index]}
                                onChange={(event) => handleAnormalValueChange(index, event)}
                            />
                        ))}
                    </div>
                </div>
            </details>
        </div>
    );
}