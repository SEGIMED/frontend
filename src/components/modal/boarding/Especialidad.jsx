
import React, { useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import DropNext from "@/components/consulta/dropdown";

export default function Especialidad({ handleDisabled, state, options }) {


    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Seleccione su especialidad
            </p>

            <DropNext
                selectedOptions={state.espcialty2}
                handleDisabled={handleDisabled}
                type={true}
                options={options ? options : []}
                text2={"Seleccione su centro de atención"}
                name={"espcialty"}

            />

        </div>
    );
}
