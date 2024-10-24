"use client";

import React, { useState, useEffect } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function ObraSocial({ handleDisabled, state, handleChange }) {
    const [selectedHealthCare, setSelectedHealthCare] = useState("");
    const [catalog, setCatalog] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getCatalog = async () => {
            try {
                const response = await ApiSegimed.get("/catalog/get-catalog?catalogName=HEALTH_CARE_PLANS");
                if (response.data) {
                    console.log(response.data);

                    setCatalog(response.data);
                }

            } catch (error) {
                console.error(error);
            }
        };
        getCatalog()

    }, []);

    useEffect(() => {
        if (state.healthCarePlanText) {
            setSelectedHealthCare(state.healthCarePlanText);
            handleDisabled(true);

        }
    }, [state.healthCarePlanText, catalog]);

    const handleSelectionChange = (value) => {
        const healthCare = catalog.find((item) => item.id === value);
        if (healthCare) {
            setSelectedHealthCare(healthCare.name);
            handleChange({ name: "healthCarePlan", option: Number(healthCare.id) });
            handleChange({ name: "healthCarePlanText", option: healthCare.name });
            handleDisabled(true);
        }
    };

    console.log(catalog);

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Seleccione su obra social
            </p>


            <Autocomplete
                aria-label="obra-social"
                defaultItems={catalog}
                variant="bordered"
                onInputChange={(value) => setSearchTerm(value)}
                placeholder="Busque aquí su obra social"
                className=" bg-white "
                onSelectionChange={handleSelectionChange}
                value={searchTerm}
                defaultSelectedKey={state.healthCarePlan?.toString()}

            >
                {(catalogo) => <AutocompleteItem key={catalogo.id}>{catalogo.name}</AutocompleteItem>}
            </Autocomplete>
        </div>
    );
}
