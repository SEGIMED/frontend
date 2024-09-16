"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import DropNext from "@/components/consulta/dropdown";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconUser2 from "@/components/icons/iconUser2";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";

export default function ModalOrdenPte({ doctors, handleChange, errors, state, disabled, doctorSelected }) {
    const [selectedDoctor, setSelectedDoctor] = useState(new Set());
    const [selectedDoctorName, setSelectedDoctorName] = useState("");

    useEffect(() => {
        if (state?.physicianId) {
            const doctor = doctors.find((item) => item.id === state.physicianId);
            if (doctor) {
                setSelectedDoctor(new Set([doctor.id.toString()]));
                setSelectedDoctorName(`${doctor.name} ${doctor.lastname}`);
            }
        }
        if (doctorSelected) {
            const doctor = doctors.find((item) => item.id === doctorSelected);
            if (doctor) {
                setSelectedDoctor(new Set([doctor.id.toString()]));
                setSelectedDoctorName(`${doctor.name} ${doctor.lastname}`);
            }
        }
    }, [state?.physicianId, doctors, doctorSelected]);

    const options = [
        "Receta médica",
        "Resumen de historia clínica",
        "Autorización de medicamentos",
        "Autorización de estudios",
        "Aptos físicos",
        "Incapacidades",
        "Certificados",
        "Otro"
    ];

    const handleDoctorChange = (key) => {
        setSelectedDoctor(key);
        const doctorId = Number(key.currentKey);
        handleChange("physicianId", doctorId);

        const doctor = doctors.find((item) => item.id === doctorId);
        const doctorName = doctor ? `${doctor.name} ${doctor.lastname}` : "";
        setSelectedDoctorName(doctorName);
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <div>
                <label className="text-start text-[#686868] font-medium text-base leading-5 py-2 flex gap-2 items-center">
                    <IconUser2 color={"#686868"} className="w-[1.5rem]" />
                    Médico al que solicita
                </label>
                <Dropdown>
                    <DropdownTrigger className="w-full">
                        {disabled ? <Button
                            disabled
                            style={{
                                borderRadius: "0.5rem",
                                textAlign: "start",
                                borderWidth: "1px",
                                justifyContent: "flex-start",
                                opacity: "1",
                                color: "#686868",
                                background: "white"
                            }}
                            variant="bordered">

                            {selectedDoctorName || "Ingrese el nombre del médico"}
                        </Button> : <Button

                            style={{
                                borderRadius: "0.5rem",
                                textAlign: "start",
                                borderWidth: "1px",
                                justifyContent: "flex-start",
                                opacity: "1",
                                color: "#686868",
                                background: "white"
                            }}
                            variant="bordered">

                            {selectedDoctorName || "Ingrese el nombre del médico"}
                        </Button>}

                    </DropdownTrigger>
                    {doctors && !disabled ? (
                        <DropdownMenu
                            aria-label="Doctors"
                            variant="flat"
                            closeOnSelect
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedDoctor}
                            onSelectionChange={handleDoctorChange}>


                            {doctors.map((item) => (
                                <DropdownItem
                                    key={item.id}
                                    value={item.id}
                                    textValue={`${item.name} ${item.lastname}`}>
                                    {item.name} {item.lastname}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    ) : null}
                </Dropdown>
                {errors.physicianId && <p className="text-red-500">Por favor seleccione un médico.</p>}
            </div>
            <div>
                <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
                    <IconCurrentRouteNav color={"#686868"} className="w-[1.5rem]" />
                    Seleccione el tipo de solicitud que desea
                </label>
                <DropNext
                    style={{
                        borderRadius: "0.5rem",
                        textAlign: "start",
                        borderWidth: "1px",
                        justifyContent: "flex-start",
                        opacity: "1",
                        color: "#686868",
                        background: "white"
                    }}
                    options={options}
                    text2={"Seleccionar tipo"}
                    handleOptionChange={handleChange}
                    name={"reqTypes"}
                    selectedOptions={state?.reqTypes}
                    disabled={disabled}
                />
                {errors.reqTypes && <p className="text-red-500">Por favor seleccione un tipo de solicitud.</p>}
            </div>
            <div className="relative">
                <InputInfoText
                    icon={<IconClinicalHistory color={"#686868"} className="w-[1.5rem]" />}
                    text={true}
                    title={"Motivo de solicitud"}
                    placeholder={"Escriba el motivo de su solicitud"}
                    onChange={(e) => handleChange("message", e.target.value)}
                    defaultValue={state?.message}
                    disabled={disabled}
                />
                {errors.message && <p className=" text-red-500">Por favor escriba el motivo de su solicitud.</p>}
            </div>
        </div>
    );
}
