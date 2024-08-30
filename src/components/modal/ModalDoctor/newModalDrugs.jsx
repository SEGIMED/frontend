import React, { useEffect, useState } from "react";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function NewModalDrugs({ drugs, id, handleOptionChange, info, error }) {
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [presentation, setPresentation] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSelectedNewDrug, setIsSelectedNewDrug] = useState(false);
    const [isSelectedNewDose, setIsSelectedNewDose] = useState(false);
    const [measureUnits, setMeasureUnits] = useState([]);
    const [routesOfAdministration, setRoutesOfAdministration] = useState([]);
    const [drugPresentations, setDrugPresentations] = useState([]);

    useEffect(() => {
        const selected = drugs.find((drug) => drug.id === id);
        setSelectedDrug(selected);
    }, [drugs, id]);

    useEffect(() => {
        if (info) {
            setPresentation(info.result);
        }
    }, [info]);

    useEffect(() => {
        // trae catalogos
        const fetchData = async () => {
            try {
                const [measureResponse, routesResponse, presentationsResponse] = await Promise.all([
                    ApiSegimed.get("/catalog/get-catalog?catalogName=measure_units"),
                    ApiSegimed.get("/catalog/get-catalog?catalogName=route_of_administration"),
                    ApiSegimed.get("/catalog/get-catalog?catalogName=drug_presentations")
                ]);

                if (measureResponse.data) {
                    const filteredMeasures = measureResponse.data.filter(unit => unit.id >= 30);
                    setMeasureUnits(filteredMeasures);
                }

                if (routesResponse.data) {
                    setRoutesOfAdministration(routesResponse.data);
                }

                if (presentationsResponse.data) {
                    setDrugPresentations(presentationsResponse.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (name, value) => {
        if (handleOptionChange) {
            handleOptionChange(name, value);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <InputInfoText
                classNameInput="md:w-full"
                title="Monodroga"
                disabled={true}
                defaultValue={selectedDrug ? selectedDrug.name : ""}
                className="md:px-6 py-2 px-3"
            />

            <div className="flex flex-col gap-3 md:px-6 py-2 px-3">
                <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
                    <IconClinicalHistory className="w-6" color={"#808080"} />
                    Nombre comercial
                </label>

                {presentation.length > 0 && !isSelectedNewDrug ? (
                    <Autocomplete
                        aria-label="comercial name"
                        defaultItems={presentation}
                        variant="bordered"
                        placeholder="Ingrese nombre comercial"
                        className="w-full bg-white"
                        onInputChange={(value) => setSearchTerm(value)}
                        onSelectionChange={(value) => handleInputChange("commercialDrugName", value)}

                    >

                        {(drug) => <AutocompleteItem key={drug.name}>{drug.name}</AutocompleteItem>}
                    </Autocomplete>
                ) : (
                    <InputInfoText
                        classNameInput={`md:w-full ${error?.commercialDrugName ? 'border-red-500' : ''}`}
                        placeholder={"Ingrese el nombre comercial"}
                        onChange={(e) => { handleInputChange("commercialDrugName", e.target.value); setSearchTerm(e.target.value) }}
                        error={!!error?.commercialDrugName}

                        defaultValue={searchTerm}
                    />
                )}
                {presentation.length > 0 ?
                    <Checkbox isSelected={isSelectedNewDrug} onValueChange={setIsSelectedNewDrug}>
                        <p className="text-[#686868]">Nuevo medicamento</p>
                    </Checkbox>
                    : null}
            </div>

            <div className="flex flex-col gap-2 md:px-6 py-2 px-3">
                <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                    <IconClinicalHistory color="#808080" /> Dosis de presentación
                </div>
                <div className="flex gap-3">

                    {!isSelectedNewDose ? (
                        <select
                            className={`w-1/2 py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${error?.dose ? 'border-red-500' : ''}`}
                            onChange={(e) => handleInputChange("dose", e.target.value)}
                        >
                            <option value="">Seleccione la cantidad</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                            <option value="200">200</option>
                            <option value="400">400</option>
                            <option value="500">500</option>
                            <option value="600">600</option>
                            <option value="1000">1000</option>
                        </select>
                    ) : (
                        <InputInfoText
                            classNameInput={`md:w-full ${error?.dose ? 'border-red-500' : ''}`}
                            placeholder={"Ingrese la cantidad "}
                            onChange={(e) => { handleInputChange("dose", e.target.value) }}
                            error={!!error?.dose}
                        />
                    )}

                    <select
                        className={`w-1/2 py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${error?.measureUnitId ? 'border-red-500' : ''}`}
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedUnit = measureUnits.find(unit => unit.id === selectedId); // Encuentra la unidad seleccionada
                            handleInputChange("measureUnitId", selectedId); // Guarda el ID
                            if (selectedUnit) {
                                handleInputChange("measureUnitId2", selectedUnit.name); // Guarda el nombre
                            }
                        }}
                    >
                        <option value="">Unidad de medida</option>
                        {measureUnits.map(unit => (
                            <option key={unit.id} value={unit.id}>
                                {unit.name}
                            </option>
                        ))}
                    </select>
                </div>

                <Checkbox isSelected={isSelectedNewDose} onValueChange={setIsSelectedNewDose}>
                    <p className="text-[#686868]">Nueva dosis</p>
                </Checkbox>
            </div>

            <div className="flex flex-col gap-2 md:px-6 py-2 px-3">
                <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                    <IconClinicalHistory color="#808080" /> Vía de administración
                </div>
                <select
                    className={`py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${error?.routeOfAdministrationId ? 'border-red-500' : ''}`}
                    onChange={(e) => handleInputChange("routeOfAdministrationId", e.target.value)}
                >
                    <option value="">Seleccione vía de administración</option>
                    {routesOfAdministration.map(route => (
                        <option key={route.id} value={route.id}>
                            {route.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2 md:px-6 py-2 px-3">
                <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                    <IconClinicalHistory color="#808080" /> Forma de presentación
                </div>
                <select
                    className={`py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${error?.presentationId ? 'border-red-500' : ''}`}
                    onChange={(e) => handleInputChange("presentationId", e.target.value)}
                >
                    <option value="">Seleccione una presentación</option>
                    {drugPresentations.map(presentation => (
                        <option key={presentation.id} value={presentation.id}>
                            {presentation.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}