import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectedOption } from '@/redux/slices/doctor/formConsulta';

export default function ButtonNext({ text, options, handleSelection, name, disabled, selectedOptions }) {
    // Define the initial state based on selectedOptions
    const opcionRecibida = selectedOptions === true ? "Si" : selectedOptions === false ? "No" : selectedOptions;

    const [selectedOption, setSelectedOptionState] = useState(opcionRecibida);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSelectedOptionState(opcionRecibida);
    }, [selectedOptions]);

    const handleClick = (option) => {
        setSelectedOptionState(option);
        dispatch(setSelectedOption({ name, option }));
        if (handleSelection) {
            handleSelection(option);
        }
    };

    return (
        <div>
            <div className='flex items-center justify-center'>
                <div className="font-bold mb-2 ">{text}</div>

            </div>
            <div className="flex justify-center space-x-4">
                {options?.map((opcion, index) => (
                    <Button
                        variant="bordered"
                        key={index}
                        style={{
                            backgroundColor: selectedOption === opcion ? '#487FFA' : 'white',
                            color: selectedOption === opcion ? 'white' : '#487FFA',
                            borderColor: "#487FFA",
                            border: '2px solid #487FFA'
                        }}
                        onClick={() => handleClick(opcion)}
                        disabled={disabled}
                    >
                        {opcion}
                    </Button>
                ))}
            </div>
        </div>
    );
}
