"use client";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";

const healthcareProviders = [
    { id: 1, name: "Pami" },
    { id: 2, name: "Galeno" },
    { id: 3, name: "Osde" },
    { id: 4, name: "Swiss Medical Group" },
    { id: 5, name: "Osmedica" },
    { id: 6, name: "Omint" },
    { id: 7, name: "Medicus" },
    { id: 8, name: "Sancor Salud" },
    { id: 9, name: "Hospital Italiano" },
    { id: 10, name: "Hospital Británico" },
    { id: 11, name: "Hospital Alemán" },
    { id: 12, name: "Prevención Salud" },
    { id: 13, name: "Accord Salud" },
];

export default function ObraSocial({ handleDisabled, state, handleChange, rol }) {
    const [selectedKeys, setSelectedKeys] = useState(new Set());
    const [selectedHealthCare, setSelectedHealthCare] = useState(null); // Estado para el centro seleccionado
    const [catalog, setCatalog] = useState([]);


    const getCatalog = async () => {

        // try {
        //     const response = await ApiSegimed.get("/catalog/get-catalog?catalogName=healthCarePlan");
        //     if (response.data) {
        //         setCatalog(response.data);
        //     }
        // } catch (error) {
        //     console.error(error);
        // }

        setCatalog(healthcareProviders);
    };

    useEffect(() => {
        getCatalog();
        if (state.healthCarePlan) {
            const selectedPlan = healthcareProviders.find((provider) => provider.id === state.healthCarePlan);
            if (selectedPlan) {
                setSelectedHealthCare(selectedPlan.name);
                handleDisabled(true);
            }
        }
    }, []);

    const handleSelectionChange = (keys) => {
        setSelectedKeys(keys);
        const healthCare = catalog.find((item) => keys.has(item.name));
        if (healthCare) {
            const numericId = Number(healthCare.id);
            setSelectedHealthCare(healthCare.name); // Actualiza el nombre seleccionado
            handleChange({ name: "healthCarePlan", option: numericId }); // Pasa el ID al handleChange
            handleDisabled(true);

        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-3 ">
            <p className="font-medium text-3xl leading-10 text-center">
                Seleccione su obra social
            </p>

            <Dropdown>
                <DropdownTrigger className="max-w-[20rem] md:max-w-[45rem]">
                    <Button
                        style={{
                            borderRadius: "0.5rem",
                            textAlign: "start",
                            borderWidth: "1px",
                            justifyContent: "flex-start",
                            opacity: "1",
                            color: "#686868",
                        }}
                        variant="bordered"
                    >
                        {selectedHealthCare
                            ? selectedHealthCare
                            : "Seleccione su obra social"}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Seleccionar obra social"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode={"single"} // Modo de selección basado en el rol
                    selectedKeys={selectedKeys}  // Aseguramos que se mantenga la opción seleccionada
                    onSelectionChange={handleSelectionChange}
                >
                    {catalog?.map((item) => (
                        <DropdownItem key={item.name} value={item.name}>
                            {item.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}