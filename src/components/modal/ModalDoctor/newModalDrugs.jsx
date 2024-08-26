import React, { useEffect, useState } from "react";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconCircle from "@/components/icons/IconCircle";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function NewModalDrugs({ drugs, id, handleOptionChange, info }) {
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [presentation, setPresentation] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleInputChange = (name, value) => {
        if (handleOptionChange) {
            handleOptionChange(name, value);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <InputInfoText
                // icon={<IconCircle className="w-4" />}
                classNameInput="md:w-full"
                title="Monodroga"
                disabled={true}
                defaultValue={selectedDrug ? selectedDrug.name : ""}
                className="md:px-6 py-2 px-3"
            />

            {info !== null ? <div className="flex flex-col gap-3 md:px-6 py-2 px-3 ">
                <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
                    <IconClinicalHistory className="w-6" color={"#808080"} />
                    Nombre comercial
                </label>
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

            </div> : <InputInfoText
                classNameInput="md:w-full"
                title="Nombre comercial"
                placeholder={"Ingrese el nombre comercial"}
                className="md:px-6 py-2 px-3"
            />}
            <div className="flex flex-col gap-2 md:px-6 py-2 px-3">
                <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                    <IconClinicalHistory color="#808080" /> Dosis de presentacion
                </div>
                <div className="flex gap-3">
                    <select
                        className=" w-1/2 py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
                        onChange={(e) => handleInputChange("doseMeasure", e.target.value)}
                    >
                        <option value="">Seleccione la cantidad</option>
                        <option value="1">30</option>
                        <option value="2">20</option>
                        <option value="3">333</option>
                        <option value="4">42</option>
                    </select>
                    <select
                        className=" w-1/2 py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
                        onChange={(e) => handleInputChange("timeMeasure", e.target.value)}
                    >
                        <option value="">Seleccione la frecuencia</option>
                        <option value="4">4 hrs</option>
                        <option value="6">6 hrs</option>
                        <option value="8">8 hrs</option>
                        <option value="12">12 hrs</option>
                        <option value="24">24 hrs</option>
                    </select>
                </div>
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
                    <option value="1">Oral</option>
                    <option value="2">Intramuscular</option>
                    <option value="3">Intravenosa</option>
                    <option value="4">Subcutánea</option>
                </select>
            </div>

            <div className="flex flex-col gap-2 md:px-6 py-2 px-3">
                <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                    <IconClinicalHistory color="#808080" /> Dosis
                </div>
                <div className="flex gap-3">
                    <InputInfoText
                        icon={null}
                        classNameInput="md:w-full"
                        onChange={(e) => handleInputChange("dose", e.target.value)}
                        placeholder="Ingrese la dosis"
                    />
                    <select
                        className="py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg w-1/2"
                        onChange={(e) => handleInputChange("measureUnitId", e.target.value)}
                    >
                        <option value="">Unidad de medida</option>
                        <option value="Gramos">Miligramos</option>
                        <option value="Ampollas">Ampollas</option>
                        <option value="Gotas">Gotas</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-2 md:px-6 py-2 px-3">
                <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                    <IconClinicalHistory color="#808080" /> Cuantas tomas por día:
                </div>
                <div className="flex gap-3">
                    <select
                        className=" w-1/2 py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
                        onChange={(e) => handleInputChange("doseMeasure", e.target.value)}
                    >
                        <option value="">Seleccione la cantidad</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <select
                        className=" w-1/2 py-2 px-3 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
                        onChange={(e) => handleInputChange("timeMeasure", e.target.value)}
                    >
                        <option value="">Seleccione la frecuencia</option>
                        <option value="4">4 hrs</option>
                        <option value="6">6 hrs</option>
                        <option value="8">8 hrs</option>
                        <option value="12">12 hrs</option>
                        <option value="24">24 hrs</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
