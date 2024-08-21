"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import DropNext from "@/components/consulta/dropdown";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconUser2 from "@/components/icons/iconUser2";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";

export default function FileDisplay({ state }) {

    return (
        <div className="w-full h-full flex ">
            {state.study !== null ? <iframe src={state.study} className="w-full h-[30rem] " /> : <div className="w-full h-full justify-center flex items-center">No hay ningun estudio importado</div>}
        </div>
    );
}
