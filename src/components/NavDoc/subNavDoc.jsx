"use client";
import React, { useState } from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import rutas from "@/utils/rutas";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import IconSubNavbar from "../icons/IconSubNavbar";
import IconRegresar from "../icons/iconRegresar";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function SubNavbar({ id }) {
    const [openDetails, setOpenDetails] = useState(false);
    const pathname = usePathname();
    const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
    console.log(lastSegment);

    const getLinkClass = (routeLastSegment) => (
        `/${lastSegment}` === routeLastSegment
            ? "bg-gray-200" // Estilo para la pestaña activa
            : " "
    );

    return (
        <div className="border-b border-b-[#cecece] flex justify-around items-center pr-6">
            <Navbar
                className="flex justify-start items-center"
                classNames={{
                    item: [
                        "flex",
                        "items-center",
                        "w-full",
                        "h-full",
                        "justify-start",
                        // "px-0",
                        "pr-4",
                        "pl-4",
                        "py-2",
                        "border-r-1",
                        "border-l-1",
                    ],
                    wrapper: ["px-0",]
                }}
            >
                <NavbarContent className="hidden sm:flex gap-0 px-0">
                    <NavbarItem className={getLinkClass(rutas.Datos)}>
                        <Link
                            className="flex items-center gap-2"
                            href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.Datos}`}
                            aria-current="page"
                        >
                            <IconClinicalHistory /> Datos del Paciente
                        </Link>
                    </NavbarItem>
                    <NavbarItem className={getLinkClass(rutas.Consultas)}>
                        <Link
                            className="flex items-center gap-2"
                            href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Consultas}`}
                            aria-current="page"
                        >
                            <IconSubNavbar /> Consultas
                        </Link>
                    </NavbarItem>
                    <NavbarItem className={getLinkClass(rutas.Evoluciones)}>
                        <Link
                            className="flex items-center gap-2"
                            href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Evoluciones}`}
                        >
                            <IconSubNavbar /> Evoluciones
                        </Link>
                    </NavbarItem>
                    <NavbarItem className={getLinkClass(rutas.Anamnesis)}>
                        <Link

                            className="flex items-center gap-2"
                            href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Anamnesis}`}
                        >
                            <IconSubNavbar /> Anamnesis
                        </Link>
                    </NavbarItem>
                    <NavbarItem className={getLinkClass(rutas.Evaluacion)}>
                        <Link
                            className="flex items-center gap-2"
                            href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Evaluacion}`}
                        >
                            <IconSubNavbar /> Autoevaluación
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="flex items-center gap-2">

                        <Dropdown>
                            <DropdownTrigger >
                                <Button style={{
                                    color: "#686868",
                                    fontWeight: 400,
                                    fontSize: 16,
                                    border: "0",
                                }}
                                    variant="bordered"
                                    onClick={() => setOpenDetails(!openDetails)}
                                >
                                    Mas {openDetails ? <IconArrowDetailUp /> : <IconArrowDetailDown />}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem onClick={() => setOpenDetails(!openDetails)} className={getLinkClass(rutas.ExamenFisico)} key="new">     <Link
                                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.ExamenFisico}`}>
                                    Examen Fisico
                                </Link></DropdownItem>
                                <DropdownItem onClick={() => setOpenDetails(!openDetails)} className={getLinkClass(rutas.SignosVitales)} key="copy"> <Link
                                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.SignosVitales}`}>
                                    Signos Vitales
                                </Link></DropdownItem>
                                <DropdownItem onClick={() => setOpenDetails(!openDetails)} className={getLinkClass(rutas.Diagnostico)} key="edit">  <Link
                                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Diagnostico}`}>
                                    Diagnosticos y tratamientos
                                </Link></DropdownItem>

                            </DropdownMenu>
                        </Dropdown>

                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <Link href={`${rutas.Doctor}${rutas.Pacientes}`}>
                <button className="flex items-center px-6 py-2 bg-[#487FFA] rounded-xl gap-3 text-white font-bold">
                    <IconRegresar /> Regresar
                </button>
            </Link>
        </div>
    );
}
