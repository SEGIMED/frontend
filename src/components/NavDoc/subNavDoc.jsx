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
import { useRouter } from "next/navigation";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function SubNavbar({ id }) {
  const [openDetails, setOpenDetails] = useState(false);
  const pathname = usePathname();
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  console.log(lastSegment);

  const getLinkClass = (routeLastSegment) =>
    `/${lastSegment}` === routeLastSegment
      ? "bg-white" // Estilo para la pestaña activa
      : "cursor-pointer ";

  const router = useRouter();

  return (
    <div className="border-b border-b-[#cecece] bg-[#fafafc] flex  flex-row-reverse md:flex-row justify-around items-center md:pr-6">
      <Navbar
        className="flex justify-start items-center w-[86%] md:w-full bg-[#fafafc]"
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
          wrapper: ["px-0"],
        }}>
        <NavbarContent className="gap-0 px-0 overflow-x-auto">
          <NavbarItem
            className={getLinkClass(rutas.Datos)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.Datos}`
              )
            }>
            <div className="flex items-center gap-2" aria-current="page">
              <IconClinicalHistory /> Datos del Paciente
            </div>
          </NavbarItem>
          <NavbarItem
            className={getLinkClass(rutas.Consultas)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Consultas}`
              )
            }>
            <div className="flex items-center gap-2" aria-current="page">
              <IconSubNavbar /> Consultas
            </div>
          </NavbarItem>
          <NavbarItem
            className={getLinkClass(rutas.Evoluciones)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Evoluciones}`
              )
            }>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Evoluciones
            </div>
          </NavbarItem>
          <NavbarItem
            className={getLinkClass(rutas.Anamnesis)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Anamnesis}`
              )
            }>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Anamnesis
            </div>
          </NavbarItem>
          <NavbarItem
            className={getLinkClass(rutas.Evaluacion)}
            onClick={() =>
              router.push(
                `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}/${rutas.Evaluacion}`
              )
            }>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Autoevaluación
            </div>
          </NavbarItem>
          <NavbarItem className="flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  style={{
                    color: "#686868",
                    fontWeight: 400,
                    fontSize: 16,
                    border: "0",
                  }}
                  variant="bordered"
                  onClick={() => setOpenDetails(!openDetails)}>
                  Mas{" "}
                  {openDetails ? (
                    <IconArrowDetailUp />
                  ) : (
                    <IconArrowDetailDown />
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  className={getLinkClass(rutas.ExamenFisico)}
                  key="new">
                  <Link
                    className="w-full"
                    onClick={() => setOpenDetails(!openDetails)}
                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.ExamenFisico}`}>
                    <p>Examen Fisico</p>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className={getLinkClass(rutas.SignosVitales)}
                  key="copy">
                  <Link
                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.SignosVitales}`}
                    onClick={() => setOpenDetails(!openDetails)}
                    className="w-full">
                    <p>Signos Vitales</p>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className={getLinkClass(rutas.Diagnostico)}
                  key="edit">
                  <Link
                    onClick={() => setOpenDetails(!openDetails)}
                    className="w-full"
                    href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${id}${rutas.Diagnostico}`}>
                    <p>Diagnosticos y tratamientos</p>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Link href={`${rutas.Doctor}${rutas.Pacientes}`}>
        <button className="flex items-center px-2 md:px-6 py-2 bg-[#487FFA] rounded-xl gap-3 text-white font-bold">
          <IconRegresar />
          <p className="hidden md:block">Regresar</p>
        </button>
      </Link>
    </div>
  );
}
