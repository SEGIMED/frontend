"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import DropNext from "@/components/consulta/dropdown";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconUser2 from "@/components/icons/iconUser2";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";

export default function ModalOrdenPte({ doctors, handleChange, errors, state, disabled }) {
    const [selectedDoctor, setSelectedDoctor] = useState(new Set());
    const [selectedDoctorName, setSelectedDoctorName] = useState("");

    useEffect(() => {
        if (state?.doctorId) {
            const doctor = doctors.find((item) => item.id === state.doctorId);
            if (doctor) {
                setSelectedDoctor(new Set([doctor.id.toString()]));
                setSelectedDoctorName(`${doctor.name} ${doctor.lastname}`);
            }
        }
    }, [state?.doctorId, doctors]);

    const options = [
        "Receta médica",
        "Resumen de historia clínica ",
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
        handleChange("doctorId", doctorId);

        const doctor = doctors.find((item) => item.id === doctorId);
        const doctorName = doctor ? `${doctor.name} ${doctor.lastname}` : "";
        setSelectedDoctorName(doctorName);
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <div>
                <label className="text-start text-[#686868] font-medium text-base leading-5 py-2 flex gap-2 items-center">
                    <IconUser2 color={"#808080"} className="w-3" />
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
                {errors.doctorId && <p className="text-red-500">Por favor seleccione un médico.</p>}
            </div>
            <div>
                <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2">
                    <IconCurrentRouteNav className="w-4" />
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
                    name={"OrderType"}
                    selectedOptions={state?.OrderType}
                    disabled={disabled}
                />
                {errors.OrderType && <p className="text-red-500">Por favor seleccione un tipo de solicitud.</p>}
            </div>
            <div className="relative">
                <InputInfoText
                    icon={<IconClinicalHistory color={"#808080"} className="w-3" />}
                    text={true}
                    title={"Motivo de solicitud"}
                    placeholder={"Escriba el motivo de su solicitud"}
                    onChange={(e) => handleChange("motivo", e.target.value)}
                    defaultValue={state?.motivo}
                    disabled={disabled}
                />
                {errors.motivo && <p className=" text-red-500">Por favor escriba el motivo de su solicitud.</p>}
            </div>
        </div>
    );
}
