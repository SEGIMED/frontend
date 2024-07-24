"use client";
import IconOptions from "../icons/IconOptions";
import IconAccion from "@/components/icons/IconAccion"; // Importa tu icono de acción adecuadamente
import rutas from "@/utils/rutas";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import IconTablillaTilde from "../icons/iconTablillaTilde";

const AlarmButtonDoc = ({ id, handleStatus }) => {
  return (
    <Dropdown
      classNames={{
        trigger:
          "relative w-[60%] md:w-fit place-self-center md:place-self-end",
      }}>
      <DropdownTrigger className="flex justify-center md:px-4 py-2 text-white rounded-xl md:gap-3 bg-[#487FFA] items-center cursor-pointer">
        <div className="flex items-center md:gap-3">
          <IconOptions color="#FFFFFF" />
          <span className="hidden md:block font-semibold">Opciones</span>
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>
          <Link href={`${rutas.Doctor}${rutas.Mensajes}/crearMensaje`}>
            <button
              className=" w-full flex items-center gap-2 font-medium text-sm cursor-pointer mb-4"
              onClick={handleStatus}>
              <IconAccion /> Marcar resuelta
            </button>
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`${rutas.Doctor}${rutas.Alarm}/${id}`}>
            <button className=" w-full flex items-center gap-2 font-medium text-sm cursor-pointer ">
              <IconTablillaTilde /> Ver Detalle
            </button>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AlarmButtonDoc;
