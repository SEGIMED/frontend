"use client"
import React, { useState, useRef } from 'react';
import Model from 'react-body-highlighter';
import { Slider, Button } from '@nextui-org/react';
import ButtonNext from '../consulta/button';
import DropNext from '../consulta/dropdown';
import IconConsulta from '../icons/IconConsulta';
import Image from "next/image";
import circleData from '@/components/images/circleData.png';
import IconDolor from '../icons/IconDolor';
import IconDolor2 from '../icons/IconDolor2';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectedOption } from '@/redux/slices/doctor/formConsulta';




export default function ClincalCuerpo({ title }) {
    const [selectedMuscles, setSelectedMuscles] = useState([]);
    const [isPain, setIsPain] = useState(true); // Estado para manejar si hay dolor
    const [selectedMuscleName, setSelectedMuscleName] = useState('');
    const [modelType, setModelType] = useState('anterior');
    const [painLevel, setPainLevel] = useState(1);

    const dispatch = useAppDispatch();



    const muscleTranslations = {
        /* Back */
        'trapezius': 'Trapecio',
        'upper-back': 'Espalda Superior',
        'lower-back': 'Espalda Inferior',

        /* Chest */
        'chest': 'Pecho',

        /* Arms */
        'biceps': 'Bíceps',
        'triceps': 'Tríceps',
        'forearm': 'Antebrazo',
        'back-deltoids': 'Deltoides Posterior',
        'front-deltoids': 'Deltoides Anterior',

        /* Abs */
        'abs': 'Abdominales',
        'obliques': 'Oblicuos',

        /* Legs */
        'adductor': 'Aductores',
        'hamstring': 'Isquiotibiales',
        'quadriceps': 'Cuádriceps',
        'abductors': 'Abductores',
        'calves': 'Pantorrillas',
        'gluteal': 'Glúteos',
        'knees': 'Rodillas',
        'right-soleus': 'Sóleo Derecho',
        'left-soleus': 'Sóleo Izquierdo',


        /* Head */
        'head': 'Cabeza',
        'neck': 'Cuello'
    };


    const handleClick = ({ muscle }) => {
        setSelectedMuscles(prevMuscles => {
            const existingData = prevMuscles.length > 0 ? prevMuscles[0] : { muscles: [] };
            let updatedMuscles;

            if (existingData.muscles.includes(muscle)) {
                updatedMuscles = existingData.muscles.filter(m => m !== muscle);
            } else {
                updatedMuscles = [...existingData.muscles, muscle];
            }

            // Si hay una traducción definida para el músculo, úsala; de lo contrario, usa el nombre original
            const translatedMuscleName = muscleTranslations[muscle] || muscle;

            dispatch(setSelectedOption({ name: "muscles", option: [...updatedMuscles.map(m => muscleTranslations[m] || m)] }));
            setSelectedMuscleName(translatedMuscleName); // Establecer el nombre del músculo seleccionado
            return [{ ...existingData, muscles: updatedMuscles }];
        });
    };

    const handlePainSelection = (selection) => {
        setIsPain(selection === 'Si');
    };

    const handleModelTypeChange = (type) => {
        if (type === 'Frente')
            setModelType("anterior")
        else setModelType("posterior")
    };


    const handleChange = (value) => {
        setPainLevel(value);
        dispatch(setSelectedOption({ name: "painLevel", option: value }));
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
                    {selectedMuscles.length > 0 && selectedMuscles[0].muscles.map((muscle, index) => (
                        <div key={index} className="flex flex-col gap-2 w-full py-3 px-7 border-b border-b-[#cecece]">
                            <label className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center" htmlFor={`muscle-note-${index}`}>
                                <IconConsulta />
                                {muscleTranslations[muscle]}
                            </label>
                            <textarea  {...register(muscleTranslations[muscle])} className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]" placeholder={`Ingrese aquí sus anotaciones sobre el ${muscleTranslations[muscle]}`} />
                        </div>
                    ))}
                </div>
                <div className='items-center w-1/2 sticky top-0'>
                    <div className='flex  flex-col gap-3 py-4 '>
                        <div>
                            <ButtonNext text={"¿Hay dolor?"} options={["Si", "No"]} handleSelection={handlePainSelection} name={"pain"} disabled={true} selectedOptions={"No"} />

                        </div>
                        {isPain && (
                            <>
                                <div>
                                    <ButtonNext text={"¿Desde hace cuánto tiempo tiene el dolor?"} options={["Horas", "Dias", "Semanas"]} name={"painTime"} disabled={true} selectedOptions={"Horas"} />
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
                                            value={5}
                                            className="max-w-md"
                                            showTooltip={true}
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
                                    <DropNext text={"Tipo de dolor"} options={['Opresión', 'Punzante', 'Cólico (va y viene)', 'Quemante', 'Molestia', 'Eléctrico', 'Desgarro', 'Cansancio', 'Irritante', 'Pulsátil', 'Taladreante']} text2={"Seleccione tipo de dolor"} name={"painType"} disabled={true} selectedOptions={'Taladreante'} />
                                </div>
                                <div>
                                    <ButtonNext text={"¿Tomó analgésicos?"} options={["Si", "No"]} disabled={true} selectedOptions={"No"} />
                                </div>
                                <div>
                                    <ButtonNext text={"¿Calma con analgésicos?"} options={["Si", "No"]} disabled={true} selectedOptions={"No"} />
                                </div>
                                <div>
                                    <DropNext text={"Frecuencia del dolor"} options={['De vez en cuando', 'Algunas veces', 'Intermitente', 'Muchas veces', 'Siempre']} text2={"Seleccione frecuencia"} name={"frecuencia"} disabled={true} selectedOptions={'Siempre'} />
                                </div>
                                <div>
                                    <ButtonNext text={"¿Es el peor dolor de su vida?"} options={["Si", "No"]} name={"peorDolor"} disabled={true} selectedOptions={"No"} />
                                </div>
                            </>
                        )
                        }
                    </div >
                </div >
            </div >

        </div >
    );
}