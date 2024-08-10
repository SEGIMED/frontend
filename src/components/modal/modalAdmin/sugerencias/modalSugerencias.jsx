"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import DropNext from "@/components/consulta/dropdown";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconUser2 from "@/components/icons/iconUser2";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";

export default function ModalSugerencia({ state, disabled }) {

    return (
        <div className="w-full flex flex-col gap-3">
            <div >
                <InputInfoText
                    icon={<IconCurrentRouteNav color={"#808080"} className="w-3" />}
                    text={true}
                    title={"Mensaje de sugerencia"}
                    defaultValue={state?.reasonForConsultation}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
