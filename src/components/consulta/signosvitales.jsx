import React, { useEffect, useState } from 'react';
import circleData from '@/components/images/circleData.png';
import Image from 'next/image';

const defaultAnthropometricDetails = [
    { measureType: 'Talla', measureUnit: 'Cm', measure: '' },
    { measureType: 'Peso', measureUnit: 'Kg', measure: '' },
    { measureType: 'Perímetro Abdominal', measureUnit: 'Cm', measure: '' },
    { measureType: 'IMC', measureUnit: 'Kg/m²', measure: '' },
];

const defaultVitalSigns = [
    { measureType: 'Presión Arterial Diastólica', measureUnit: 'mmHg', measure: '' },
    { measureType: 'Presión Arterial Sistólica', measureUnit: 'mmHg', measure: '' },
    { measureType: 'Saturación de Oxígeno', measureUnit: '%', measure: '' },
    { measureType: 'Temperatura', measureUnit: '°C', measure: '' },
    { measureType: 'Frecuencia Respiratoria', measureUnit: 'rpm', measure: '' },
    { measureType: 'Frecuencia Cardiaca', measureUnit: 'bpm', measure: '' },
];


export default function SignosVitalesInfo({ paciente, title, defaultOpen = false, preconsult }) {
    const [glucemiaValue, setGlucemiaValue] = useState('');
    const [glucemiaElevada, setGlucemiaElevada] = useState(null); // Estado para el botón "Sí" de la glucemia elevada
    const [ultimosValoresAnormales, setUltimosValoresAnormales] = useState(['', '', '', '']);
    
    useEffect(() => {
        if (preconsult?.abnormalGlycemia !== undefined) {
            setGlucemiaElevada(preconsult.abnormalGlycemia);
        }
    }, [preconsult]);
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
        updatedValues[index] = event.target.value ;
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

                {anthropometricDetails.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                        <label className='flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                            <Image src={circleData} alt="circulo informacion" className='w-6 h-6' /> {detail.measureType}
                        </label>
                        <input
                            type="text"
                            className='w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1'
                            value={detail.measure}
                            onChange={(e) => handleDetailChange(detailIndex, e.target.value)}
                        />
                    </div>
                ))}

                {vitalSigns.map((vital, vitalIndex) => (
                    <div key={vitalIndex} className="flex justify-start items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                        <label className='flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                            <Image src={circleData} alt="circulo informacion" className='w-6 h-6' /> {vital.measureType}
                        </label>
                        <input
                            type="text"
                            className='w-1/2 text-start text-[#5F5F5F] font-normal text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1'
                            value={vital.measure}
                            onChange={(e) => handleVitalChange(vitalIndex, e.target.value)}
                        />
                    </div>
                ))}

                <div className="flex justify-start h-14 items-center gap-2 px-3 border-b border-b-[#cecece] pr-10">
                    <label className='flex w-fit text-start text-[#5F5F5F] font-medium text-base leading-6 px-4 py-2'>
                        <Image src={circleData} alt="circulo informacion" className='w-6 h-6' /> Glucemia: ¿Tuvo valores fuera del rango normal en el último tiempo? (+ 140 mg/dl y - 80 mg/dl)
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
                        <Image src={circleData} alt="circulo informacion" className='w-6 h-6' /> Escriba los últimos 4 valores más anormales que tuvo.
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
