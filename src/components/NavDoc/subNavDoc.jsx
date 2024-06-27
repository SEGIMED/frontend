"use client"
import React from "react";
import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import rutas from "@/utils/rutas";
import Link from "next/link";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import IconSubNavbar from "../icons/IconSubNavbar";

import IconRegresar from "../icons/iconRegresar";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import { useState } from "react";


export default function SubNavbar({ id }) {

    const [openDetails, setOpenDetails] = useState(false);


    return (
        <div className="border-b border-b-[#cecece] flex justify-around items-center pr-4">
            <Navbar className="flex justify-start items-center "
                classNames={{
                    item: [
                        "flex",
                        "items-center",
                        "w-full",
                        "h-full",
                        "justify-start",
                        "pr-4",
                        "py-2",
                        "border-r-2",
                        "hover:bg-gray-100",
                    ],
                }}
            >
                <NavbarContent className="hidden sm:flex gap-4 " justify="start">
                    <NavbarItem>
                        <Link color="foreground" className="flex items-center gap-2" href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.Datos}`} aria-current="page">
                            <IconClinicalHistory />    Datos del Paciente
                        </Link>
                    </NavbarItem>
                    <NavbarItem >
                        <Link className="flex items-center gap-2" href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Consultas}`} aria-current="page">
                            <IconSubNavbar />  Consultas
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="flex items-center gap-2" color="foreground" href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Evoluciones}`}>
                            <IconSubNavbar />   Evoluciones
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="flex items-center gap-2" color="foreground" href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Anamnesis}`}>
                            <IconSubNavbar />   Anamnesis
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="flex items-center gap-2" color="foreground" href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Evaluacion}`}>
                            <IconSubNavbar />  Autoevaluación
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="flex items-center gap-2">
                        <details className="flex px-6 py-2  gap-1 items-center cursor-pointer" onToggle={() => setOpenDetails(!openDetails)}>
                            <summary className="flex items-center cursor-pointer">  Más    {openDetails ? <IconArrowDetailUp /> : <IconArrowDetailDown />}</summary>
                            <div className="absolute bg-white z-50 p-2 text-start text-[#686868] font-normal text-base leading-6 w-64 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-5 shadow-lg">
                                <button className='font-normal text-base leading-8 ml-6 flex items-center gap-2'>

                                    <Link className='flex items-center gap-2' href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.ExamenFisico}`}>
                                        Examen Fisico
                                    </Link>
                                </button>
                                <button className='font-normal text-base leading-8 ml-6 flex items-center gap-2'>
                                    <Link className='flex items-center gap-2' href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.SignosVitales}`}>
                                        Signos Vitales
                                    </Link>
                                </button>
                                <button className='font-normal text-base leading-8 ml-6 flex items-center gap-2'>
                                    <Link className='flex items-center gap-2' href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Diagnostico}`}>
                                        Diagnosticos y tratamientos
                                    </Link>
                                </button>
                            </div>
                        </details>
                    </NavbarItem>
                </NavbarContent>

            </Navbar>
            <Link href={`${rutas.Doctor}${rutas.Pacientes}`} >
                <button className="flex items-center px-6 py-2 bg-[#487FFA] rounded-xl gap-3 text-white font-bold"
                >
                    <IconRegresar />  Regresar
                </button>
            </Link>
        </div>
    );
}