"use client"
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectedOption } from '@/redux/slices/doctor/formConsulta';

export default function ButtonNext({ text, options, handleSelection, name }) {
    const [selectedOption, setSelectedOptionState] = useState("");
    const dispatch = useAppDispatch();

    const handleClick = (option) => {
        setSelectedOptionState(option);
        dispatch(setSelectedOption({ name, option }));
        if (handleSelection) {
            handleSelection(option);
        }
    };

    return (
        <div>
            <div className="font-bold mb-2">{text}</div>
            <div className="flex space-x-4">
                {options?.map((opcion, index) => (
                    <Button
                        variant="bordered"
                        key={index}
                        style={{
                            backgroundColor: selectedOption === opcion ? '#487FFA' : 'white',
                            color: selectedOption === opcion ? 'white' : '#487FFA',
                            borderColor: "#487FFA",
                            border: '2'
                        }}
                        onClick={() => handleClick(opcion)}
                    >
                        {opcion}
                    </Button>
                ))}
            </div>
        </div>
    );
}