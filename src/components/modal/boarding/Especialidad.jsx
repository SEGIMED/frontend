
import React, { useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import DropNext from "@/components/consulta/dropdown";

export default function Especialidad({ handleDisabled, state, options }) {

    const optionNames = options ? options.map(option => option.name) : [];

    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Seleccione su especialidad
            </p>

            <DropNext
                style={{
                    borderRadius: "0.5rem",
                    textAlign: "start",
                    borderWidth: "1px",
                    justifyContent: "flex-start",
                    opacity: "1",
                    color: "#686868",
                }}
                selectedOptions={state.specialty2}
                handleDisabled={handleDisabled}
                type={true}
                options={options ? optionNames : []}
                text2={"Seleccione su especialidad"}
                name={"specialty"}

            />

        </div>
    );
}
