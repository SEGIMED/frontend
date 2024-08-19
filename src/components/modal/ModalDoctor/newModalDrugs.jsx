
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

import DropNext from "@/components/consulta/dropdown";
import { useAppDispatch } from "@/redux/hooks";
import InputInfoText from "@/components/ordenMedica/inputInfo";

export default function NewModalDrugs({ drugs, id, handleOptionChange }) {

    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-base text-center">
                Monodroga
            </p>
            <InputInfoText
                text={true}
                title="Observaciones"
                placeholder="Ingrese aquí las observaciones"
                onChange={(e) => handleChange("observations", e.target.value)}
                className="md:px-6 py-2 px-3"
            />
            <InputInfoText
                text={true}
                title="Indicaciones"
                placeholder="Ingrese aquí las indicaciones "
                onChange={(e) => handleChange("indications", e.target.value)}
                className="md:px-6 py-2 px-3"
            />



        </div>
    );
}
