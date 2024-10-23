
import { useEffect } from "react";

export default function HealthCareNumber({ handleDisabled, state, handleChange }) {


    useEffect(() => {
        if (state.healthCareNumber) { handleDisabled() }
    }, [state]);

    const handleSelect = (event) => {
        const number = event.target.value;
        handleChange({ name: "healthCareNumber", option: number })
        handleDisabled()
    }


    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Escriba su numero de cobertura medica
            </p>
            <div className="w-full">
                <input type="text" onChange={handleSelect} defaultValue={state.healthCareNumber} className="w-full px-4 py-2 outline-none border border-[#D7D7D7] rounded-lg" placeholder="Escriba su numero de cobertura medica" />
            </div>
        </div>
    );
}
