"use client";
import React, { useState, useEffect } from 'react';
import Model from 'react-body-highlighter';
import { Slider } from '@nextui-org/react';
import ButtonNext from '../consulta/button';
import DropNext from '../consulta/dropdown';
import IconDolor from '../icons/IconDolor';
import IconDolor2 from '../icons/IconDolor2';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectedOption } from '@/redux/slices/doctor/formConsulta';
import IconConsulta from '../icons/IconConsulta';

export default function ClincalCuerpo({ info }) {
    const [isPain, setIsPain] = useState(true); // Estado para manejar si hay dolor
    const [modelType, setModelType] = useState('anterior');
    const [painLevel, setPainLevel] = useState(1);
    const [selectedMuscles, setSelectedMuscles] = useState([{ name: 'Musculo', muscles: [] }]);

    useEffect(() => {
        // Función para obtener los nombres de músculos en inglés
        const getMuscleNames = () => {
            if (info && info.painMap && info.painMap.painAreas) {
                const muscleData = info.painMap.painAreas.map(area => ({
                    name: 'Musculo',
                    muscles: [area.painArea.painAreaEnglish === "forearms" ? "forearm" : area.painArea.painAreaEnglish],
                }));
                setSelectedMuscles(muscleData);

            }
        };

        getMuscleNames();
    }, [info]);

    const handlePainSelection = (selection) => {
        setIsPain(selection === 'Si');
    };

    const handleModelTypeChange = (type) => {
        setModelType(type === 'Frente' ? 'anterior' : 'posterior');
    };


    return (
        <div className="flex flex-col">
            <div className='flex w-full justify-center '>
                <div className='w-1/2 h-full items-center flex flex-col justify-center py-4'>
                    <div className=' items-center justify-center'>
                        <ButtonNext options={["Masculino", "Femenino"]} name={"genero"} disabled={true} selectedOptions={"Femenino"} />
                    </div>
                    <div>
                        <Model
                            data={selectedMuscles}
                            style={{ width: '20rem', padding: '3rem' }}
                            type={modelType}
                        />
                    </div>
                    <div className=' items-center justify-center'>
                        <ButtonNext
                            options={["Frente", "Dorso"]}
                            handleSelection={handleModelTypeChange}
                            name={"modelType"}
                        />
                    </div>
                    {info?.painMap?.painAreas?.length > 0 &&
                        info.painMap.painAreas.map((muscle, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-2 w-full py-3 px-7 ">
                                <label
                                    className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center"
                                    htmlFor={`muscle-note-${index}`}>
                                    <IconConsulta />
                                    {muscle.painArea.painAreaSpanish}
                                </label>
                                <p className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6  border border-[#DCDBDB] rounded-lg px-4 py-1">
                                    {muscle.painNotes}
                                </p>

                            </div>
                        ))}
                </div>
                <div className='items-center w-1/2 sticky top-0'>
                    <div className='flex  flex-col gap-3 py-4 '>
                        <div>
                            <ButtonNext text={"¿Hay dolor?"} options={["Si", "No"]} handleSelection={handlePainSelection} name={"pain"} disabled={true} selectedOptions={info?.painMap.isTherePain} />
                        </div>
                        {isPain && (
                            <>
                                <div>
                                    <ButtonNext text={"¿Desde hace cuánto tiempo tiene el dolor?"} options={["Horas", "Días", "Semanas"]} name={"painTime"} disabled={true} selectedOptions={info?.painMap.painDuration} />
                                </div>
                                <div className=" flex flex-col" >
                                    <div className="items-center space-x-2 flex">
                                        <span ><IconDolor /></span>
                                        <Slider
                                            aria-label="Nivel de dolor"
                                            size="lg"
                                            step={1}
                                            showSteps={true}
                                            maxValue={10}
                                            minValue={1}
                                            value={info?.painMap?.painScale ? info.painMap.painScale : 0}

                                            className="max-w-md"
                                            showTooltip={true}
                                            disabled
                                        />
                                        <span ><IconDolor2 /></span>
                                    </div>
                                    <div className='flex px-1 pl-8'>
                                        <span className='pl-2 pr-5 text-green-500'>1</span>
                                        <span className='pl-5 pr-5 text-green-500'>2</span>
                                        <span className='pl-4 pr-4 text-green-500'>3</span>
                                        <span className='pl-5 pr-4 text-green-500'>4</span>
                                        <span className='pl-5 pr-5 text-yellow-500'>5</span>
                                        <span className='pl-4 pr-5 text-yellow-500'>6</span>
                                        <span className='pl-5 pr-5 text-yellow-500'>7</span>
                                        <span className='pl-4 pr-5 text-red-500'>8</span>
                                        <span className='pl-5 pr-4 text-red-500'>9</span>
                                        <span className='pl-4 pr-4 text-red-500'>10</span>
                                    </div>
                                </div>
                                <div>
                                    <DropNext text={"Tipo de dolor"} options={['Opresión', 'Punzante', 'Cólico (va y viene)', 'Quemante', 'Molestia', 'Eléctrico', 'Desgarro', 'Cansancio', 'Irritante', 'Pulsátil', 'Taladreante']} text2={"Seleccione tipo de dolor"} name={"painType"} disabled={true} selectedOptions={info?.painMap.painType} />
                                </div>
                                <div>
                                    <ButtonNext text={"¿Tomó analgésicos?"} options={["Si", "No"]} disabled={true} selectedOptions={info?.painMap.isTakingAnalgesic} />
                                </div>
                                <div>
                                    <ButtonNext text={"¿Calma con analgésicos?"} options={["Si", "No"]} disabled={true} selectedOptions={info?.painMap.doesAnalgesicWorks} />
                                </div>
                                <div>
                                    <DropNext text={"Frecuencia del dolor"} options={['De vez en cuando', 'Algunas veces', 'Intermitente', 'Muchas veces', 'Siempre']} text2={"Seleccione frecuencia"} name={"frecuencia"} disabled={true} selectedOptions={info?.painMap.painFrequency} />
                                </div>
                                <div>
                                    <ButtonNext text={"¿Es el peor dolor de su vida?"} options={["Si", "No"]} name={"peorDolor"} disabled={true} selectedOptions={info?.painMap.isWorstPainEver} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
