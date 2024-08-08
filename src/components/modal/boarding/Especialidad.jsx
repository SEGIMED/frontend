
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import DropNext from "@/components/consulta/dropdown";

export default function Especialidad({ handleDisabled, state }) {

    const options = [
        "Centro gallego",
        "María Ferrer",
        "Mater Dei",
        "Dupuytren",
        "Hospital Rivadavia",
        "Trinidad de Quilmes",
        "Trinidad Ramos Mejía",
        "Trinidad San Isidro",
        "Trinidad de Mitre",
        "Hospital Garraham",
        "Otro"
    ];


    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Seleccione su especialidad
            </p>

            <DropNext
                selectedOptions={state.espcialty2}
                handleDisabled={handleDisabled}
                type={true}
                options={options}
                text2={"Seleccione su centro de atención"}
                name={"espcialty"}

            />

        </div>
    );
}
