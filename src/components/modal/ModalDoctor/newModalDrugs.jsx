import React, { useEffect, useState } from "react";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconCircle from "@/components/icons/IconCircle";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function NewModalDrugs({ drugs, id, handleOptionChange, info }) {
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
        if (searchTerm.length >= 3 && !presentation.some((drug) => drug.name.toLowerCase() === searchTerm.toLowerCase())) {
            setPresentation((prevPresentation) => [
                ...prevPresentation,
                { id: `new-${searchTerm}`, name: searchTerm },
            ]);
        }
    }, [searchTerm, presentation]);

    useEffect(() => {
        getCatalogMeasure();
        getCatalogRoutesOfAdministration();
        getCatalogDrugPresentations();
    }, []);

    const handleInputChange = (name, value) => {
        if (handleOptionChange) {
            handleOptionChange(name, value);
        }
    };

    const getCatalogMeasure = async () => {
        try {
            const response = await ApiSegimed.get(
                "/catalog/get-catalog?catalogName=measure_units"
            );
            if (response.data) {
                const filteredMeasures = response.data.filter(unit => unit.id >= 30);
                setMeasureUnits(filteredMeasures);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getCatalogRoutesOfAdministration = async () => {
        try {
            const response = await ApiSegimed.get(
                "/catalog/get-catalog?catalogName=route_of_administration"
            );
            if (response.data) {
                setRoutesOfAdministration(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getCatalogDrugPresentations = async () => {
        try {
            const response = await ApiSegimed.get(
                "/catalog/get-catalog?catalogName=drug_presentations"
            );
            if (response.data) {
                setDrugPresentations(response.data);
            }
        } catch (error) {
            console.error(error);
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

                {info?.result && !isSelectedNewDrug ? (
                    <Autocomplete
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
                        classNameInput="md:w-full"
                        placeholder={"Ingrese el nombre comercial"}
                        onChange={(e) => handleInputChange("commercialDrugName", e.target.value)}
                    />
                )}
                {info ?
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
                            className="w-1/2 py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
                            onChange={(e) => handleInputChange("dose", e.target.value)}
                        >
                            <option value="">Seleccione la cantidad</option>
                            <option value="1">30</option>
                            <option value="2">20</option>
                            <option value="3">333</option>
                            <option value="4">42</option>
                        </select>
                    ) : (
                        <InputInfoText
                            classNameInput="md:w-full"
                            placeholder={"Ingrese la cantidad "}
                            onChange={(e) => handleInputChange("dose", e.target.value)}
                        />
                    )}

                    <select
                        className="w-1/2 py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
                        onChange={(e) => handleInputChange("measureUnitId", e.target.value)}
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
                    className="py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
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
                    className="py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
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
