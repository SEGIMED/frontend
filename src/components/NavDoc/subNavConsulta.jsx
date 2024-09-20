"use client";
import React, { useState } from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import rutas from "@/utils/rutas";
import Link from "next/link";
import Elboton from "../Buttons/Elboton";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import IconSubNavbar from "../icons/IconSubNavbar";
import IconRegresar from "../icons/iconRegresar";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import Swal from "sweetalert2";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import IconAccion from "../icons/IconAccion";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import patchSchedule from "@/utils/dataFetching/fetching/patchSchedule";
import { useRouter } from "next/navigation";

export default function SubNavbarConsulta({ id, handleClic, actualTab }) {
  const [openDetails, setOpenDetails] = useState(false);
  const router = useRouter();
  const endConsult = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Quiere Finalizar la consulta?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Sí",
        denyButtonText: "No",
      });

      if (result.isConfirmed) {
        await Swal.fire("La consulta ha finalizado.", "", "success");

        await patchSchedule(id, { schedulingStatus: 2 });

        router.push(`${rutas.Doctor}${rutas.Consultas}`);
      } else if (result.isDenied) {
        await Swal.fire("Continúe con su consulta.", "", "info");
      }
    } catch (error) {
      console.error("Error al finalizar la consulta:", error);
    }
  };

  return (
    <div className="border-b border-b-[#cecece] bg-[#fafafc] flex w-full  flex-row items-center ">
      <Navbar
        className="flex justify-start items-center w-[86%] md:w-full bg-[#fafafc] cursor-pointer"
        classNames={{
          item: [
            "flex",
            "items-center",
            "w-full",
            "h-full",
            "max-w-full",
            "justify-center",
            // "px-0",
            "pr-4",
            "pl-4",
            "py-2",
            "border-r-1",
            "border-l-1",
          ],
          wrapper: ["px-0", "max-w-full"],
          menu: ["w-full", "max-w-full"],
        }}>
        <NavbarContent className="gap-0 w-full px-0 overflow-x-auto md:flex hidden ">
          <NavbarItem
            className="flex items-center gap-2"
            onClick={() => handleClic("Consulta")}>
            <IconSubNavbar /> Consulta
          </NavbarItem>

          <NavbarItem
            className="flex items-center gap-2"
            onClick={() => handleClic("Preconsulta")}>
            <IconSubNavbar /> Preconsulta
          </NavbarItem>
          <NavbarItem
            className="flex items-center gap-2 "
            onClick={() => handleClic("Estudios")}>
            <IconSubNavbar /> Estudios
          </NavbarItem>

          <NavbarItem
            className="flex items-center gap-2 "
            onClick={() => handleClic("Antecedentes")}>
            <IconClinicalHistory /> Antecedentes
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
                  {actualTab}
                  {openDetails ? (
                    <IconArrowDetailUp />
                  ) : (
                    <IconArrowDetailDown />
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new1">
                  <div
                    className="w-full"
                    onClick={() => handleClic("Consulta")}>
                    <p>Consulta</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="copy1">
                  <div onClick={() => handleClic("Preconsulta")}>
                    <p>Preconsulta</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="copy2">
                  <div
                    onClick={() => handleClic("Estudios")}
                    className="w-full">
                    <p>Estudios</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="new">
                  <div
                    className="w-full"
                    onClick={() => handleClic("Antecedentes")}>
                    <p>Antecedentes</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
