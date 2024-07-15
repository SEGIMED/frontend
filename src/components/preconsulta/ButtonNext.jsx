import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

export default function ButtonNextPreconsultation({ text, options, onBodyChange, handleSelection, name, disabled, selectedOptions }) {
    const opcionRecibida = selectedOptions ? selectedOptions : "";
    const [selectedOption, setSelectedOptionState] = useState(opcionRecibida);

    const handleClick = (option, index) => {
        setSelectedOptionState(option);
        onBodyChange(name, option);
        if (handleSelection) {
            handleSelection(option);
        }
    };

    return (
        <div>
            <div className="font-bold mb-2">{text}</div>
            <div className="flex space-x-4">
                {!disabled ? (
                    options?.map((opcion, index) => (
                        <Button
                            variant="bordered"
                            key={index}
                            style={{
                                backgroundColor: selectedOption === opcion ? '#487FFA' : 'white',
                                color: selectedOption === opcion ? 'white' : '#487FFA',
                                borderColor: "#487FFA",
                                border: '2px solid #487FFA'  // Asegura que el borde tenga un valor válido
                            }}
                            onClick={() => handleClick(opcion, index)}
                        >
                            {opcion}
                        </Button>
                    ))
                ) : (
                    options?.map((opcion, index) => (
                        <Button
                            variant="bordered"
                            key={index}
                            style={{
                                backgroundColor: selectedOption === opcion ? '#487FFA' : 'white',
                                color: selectedOption === opcion ? 'white' : '#487FFA',
                                borderColor: "#487FFA",
                                border: '2px solid #487FFA'  // Asegura que el borde tenga un valor válido
                            }}
                            disabled
                        >
                            {opcion}
                        </Button>
                    ))
                )}
            </div>
        </div>
    );
}