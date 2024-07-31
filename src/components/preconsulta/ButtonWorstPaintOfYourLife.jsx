"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';

export default function ButtonNextPreconsultationWorst({ text, options, onBodyChange, handleSelection, name, disabled, selectedOptions,worstPainOfYourLife}) {
    const opcionRecibida = selectedOptions ? selectedOptions : "";
    const [selectedOption, setSelectedOptionState] = useState(opcionRecibida);

    useEffect(() => {
        if (selectedOptions !== undefined) {
            setSelectedOptionState(selectedOptions);
        }
    }, [selectedOptions]);

    const handleClick = (option) => {
        setSelectedOptionState(option);
        onBodyChange(name, option);
        if (handleSelection) {
            handleSelection(option);
        }
    };
    
    return (
        <div>
            <div className="mb-2 text-sm font-semibold">{text}</div>
            <div className="flex space-x-4">
                {!disabled ? (
                    options?.map((opcion, index) => (
                        <Button
                            variant="bordered"
                            key={index}
                            style={{
                                backgroundColor:  worstPainOfYourLife && opcion.text === "Si" && selectedOption === opcion.value ? 'red' : selectedOption === opcion.value ? '#487FFA' : 'white',
                                color: worstPainOfYourLife && opcion.text === "Si"  && selectedOption !== opcion.value ? 'red' : opcion.text === "Si"  && selectedOption === opcion.value ? 'white' : selectedOption === opcion.value &&  opcion.text === "No" ? 'white' : '#487FFA',
                                borderColor: worstPainOfYourLife && opcion.text === "Si"  ? 'red' : "#487FFA",
                                border: worstPainOfYourLife && opcion.text === "Si" ? '2px solid red' : '2px solid #487FFA'  // Asegura que el borde tenga un valor válido
                            }}
                            onClick={() => handleClick(opcion.value)}
                        >
                            {opcion.text}
                        </Button>
                    ))
                ) : (
                    options?.map((opcion, index) => (
                        <Button
                            variant="bordered"
                            key={index}
                            style={{
                                backgroundColor: selectedOptions === opcion.value ? '#487FFA' : 'white',
                                color: selectedOptions === opcion.value ? 'white' : '#487FFA',
                                borderColor: "#487FFA",
                                border: '2px solid #487FFA'  // Asegura que el borde tenga un valor válido
                            }}
                            disabled
                        >
                            {opcion.text}
                        </Button>
                    ))
                )}
            </div>
        </div>
    );
}