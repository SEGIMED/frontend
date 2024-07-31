"use client";
import React, { useEffect, useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";

export default function DropNextPreconsultation({ text, onBodyChange, options, selectedOptions, text2, name, disabled }) {
    const [selectedOption, setSelectedOptionState] = useState('');
    const [selectedTextOption, setSelectedTextOption] = useState('');
    // const { setValue, register } = useFormContext();

    useEffect(() => {
        if (selectedOptions) {
            setSelectedOptionState(selectedOptions.toString());
            const selectText = options.find(item => item.value === selectedOptions);
            if (selectText) setSelectedTextOption(selectText.text);
        }
    }, [selectedOptions, options]);

    const handleSelectionChange = (key) => {
        const selectedOption = key;
        setSelectedOptionState(selectedOption);
        // setValue(name, selectedOption);
        onBodyChange(name, Number(key));
        const selectText = options.find(item => {
            return item.value === Number(key);
        });
        if (selectText) setSelectedTextOption(selectText.text)
    };

    return (
        <div>
            <div className="mb-2 text-sm font-semibold">{text}</div>
            <Dropdown className="emptyContent">
                <DropdownTrigger
                    style={{
                        color: "#487FFA",
                        width: "100px",
                    }}>
                    {!disabled ? (<Button
                        variant="bordered"
                        className="capitalize"
                        style={{
                            color: "#487FFA",
                            borderColor: "#487FFA",
                            border: "2",
                        }}>
                        {selectedTextOption || text2}
                    </Button>) : (<Button
                        variant="bordered"
                        className="capitalize"
                        disabled
                        style={{
                            color: "#487FFA",
                            borderColor: "#487FFA",
                            border: "2",
                        }}>
                        {selectedTextOption || text2}
                    </Button>)
                    }

                </DropdownTrigger>
                {!disabled ? (<DropdownMenu
                    aria-label="Options menu"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedOption ? new Set([selectedOption]) : new Set()}
                    onSelectionChange={(keys) =>
                        handleSelectionChange(Array.from(keys)[0])

                    }>
                    {options?.map((option) => (
                        <DropdownItem key={option.value} aria-label={option.text} >
                            {option.text}
                        </DropdownItem>
                    ))}
                </DropdownMenu>) : (null)}

            </Dropdown>
            {/* <input type="hidden" {...register(name)} value={selectedOption} /> */}
        </div>
    );
}
