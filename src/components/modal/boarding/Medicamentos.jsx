
import { useEffect } from "react";
import ButtonNext from "@/components/consulta/button";

export default function Medicamentos({ handleDisabled, state, handleChange }) {


    useEffect(() => {
        if (state.medicamentos) { handleDisabled() }
    }, [state]);

    const handleSelect = (event) => {
        const medicamentos = event.target.value;
        handleChange({ name: "medicamentos", option: medicamentos })
    }


    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¿Actualmente estás tomando alguna medicación?
            </p>

            <ButtonNext
                selectedOptions={state.medicacion}
                handleDisabled={handleDisabled}
                options={["Si", "No"]}
                name={"medicacion"}
            />
            {state.medicacion === "Si" ? <div className="w-full">
                <textarea type="text" onChange={handleSelect} defaultValue={state.medicamentos} className="w-full px-4 py-2 outline-none border border-[#D7D7D7] rounded-lg" placeholder="Escriba la medicacion actual " />
            </div> : null}

        </div>
    );
}
