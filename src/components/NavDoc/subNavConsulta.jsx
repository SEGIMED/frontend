"use client";
import React, { useState } from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import rutas from "@/utils/rutas";
import Link from "next/link";

import IconClinicalHistory from "../icons/IconClinicalHistory";
import IconSubNavbar from "../icons/IconSubNavbar";
import IconRegresar from "../icons/iconRegresar";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";


import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,

} from "@nextui-org/react";

export default function SubNavbarConsulta({ id, handleClic }) {
  const [openDetails, setOpenDetails] = useState(false);
  
 

  return (
    <div className="border-b border-b-[#cecece] bg-[#fafafc] flex  flex-row items-center ">
      <Navbar
        className="flex justify-start items-center w-[86%] md:w-full bg-[#fafafc] cursor-pointer"
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
        <NavbarContent className="gap-0 px-0 overflow-x-auto md:flex hidden ">
          
          <NavbarItem
            
            onClick={() =>
              handleClic("Anamnesis")
            }>
            <div className="flex items-center gap-2" aria-current="page">
              <IconSubNavbar /> Anamnesis
            </div>
          </NavbarItem>
          
          <NavbarItem
         
            onClick={() =>
              handleClic("ExamenFisico")
            }>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Examen Fisico
            </div>
          </NavbarItem>
          <NavbarItem
            
            onClick={() =>
              handleClic("DiagnosticoyTratamiento")
            }>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Diagnostico y Tratamiento
            </div>
          </NavbarItem>
          <NavbarItem
            
            onClick={() =>
              handleClic("Estudios")
            }>
            <div className="flex items-center gap-2">
              <IconSubNavbar /> Estudios
            </div>
          </NavbarItem>

          <NavbarItem
           
            onClick={() =>
              handleClic("Preconsulta")
            }>
            <div className="flex items-center gap-2 " aria-current="page">
              <IconClinicalHistory /> Preconsulta
            </div>
          </NavbarItem>

          </NavbarContent>
          <NavbarContent className="gap-0 px-0 overflow-x-auto md:hidden flex">
          <NavbarItem className="flex items-center gap-2 cursor-pointer ">
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
                 
                  key="new1">
                  <div
                    className="w-full"
                    onClick={() =>
                      handleClic("Anamnesis")
                    }>
                    
                    <p>Anamnesis</p>
                  </div>
                </DropdownItem>
                <DropdownItem
                
                  key="copy1">
                  <div
                    onClick={() =>
                      handleClic("ExamenFisico")
                    }>
                    <p>Examen Fisico</p>
                  </div>
                </DropdownItem>
                <DropdownItem
                 
                  key="copy2">
                  <div
                    onClick={() =>
                      handleClic("DiagnosticoyTratamiento")
                    }
                    className="w-full">
                    <p>Diagnostico y Tratamiento</p>
                  </div>
                </DropdownItem>
                <DropdownItem
              
                  key="edit1">
                  <div
                    className="w-full"
                    onClick={() =>
                      handleClic("Estudios")
                    }>
                    <p>Estudios</p>
                  </div>
                </DropdownItem>

                <DropdownItem
                
                  key="new">
                  <div
                    className="w-full"
                    onClick={() =>
                      handleClic("Preconsulta")
                    }
                    >
                    <p>Preconsulta</p>
                  </div>
                </DropdownItem>
                
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Link href={`${rutas.Doctor}/${rutas.Consultas}`}>
        <button className="flex items-center px-2 md:px-6 py-2 bg-[#487FFA] rounded-lg gap-3 text-white font-bold">
          <IconRegresar />
          <p className="hidden md:block">Regresar</p>
        </button>
      </Link>
    </div>
  );
}
