
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import DropNext from "@/components/consulta/dropdown";
import { useAppDispatch } from "@/redux/hooks";

export default function OrdenType({ handleOptionChange }) {

    const dispatch = useAppDispatch

    const options = [
        "Receta médica",
        "Resumen de historia clínica ",
        "Autorización de medicamentos",
        "Autorización de estudios",
        "Aptos físicos",
        "Incapacidades",
        "Certificados",
        "Otro"
    ];


    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-base text-center">
                Seleccione el tipo de órden médica
            </p>

            <DropNext
                // selectedOptions={state.AtencionCentro2}
                // handleDisabled={handleDisabled}
                // type={true}
                options={options}
                text2={"Seleccionar tipo"}
                handleOptionChange={handleOptionChange}
                name={"OrderType"}

            // name={"AtencionCentro"}

            />

        </div>
    );
}
