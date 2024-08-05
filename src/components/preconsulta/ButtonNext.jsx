import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

export default function ButtonNextPreconsultation({ text, options, onBodyChange, handleSelection, name, disabled, selectedOptions }) {
    const opcionRecibida = selectedOptions !== null ? selectedOptions : "";
    const [selectedOption, setSelectedOptionState] = useState(opcionRecibida);

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
                                backgroundColor: selectedOption === opcion.value ? '#487FFA' : 'white',
                                color: selectedOption === opcion.value ? 'white' : '#487FFA',
                                borderColor: "#487FFA",
                                border: '2px solid #487FFA'  // Asegura que el borde tenga un valor válido
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