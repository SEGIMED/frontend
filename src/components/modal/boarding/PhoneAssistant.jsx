
import flags from "@/utils/countriesFlags";
import { useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";

export default function PhoneAssistant({ handleDisabled, state, handleChange }) {


    useEffect(() => {
        if (state.numberOfFamilyAsistence && state.numberOfFamilyAsistencePrefix) { handleDisabled() }
    }, [state]);

    const handleSelect = (event) => {
        const number = event.target.value;
        handleChange({ name: "numberOfFamilyAsistence", option: number })

    }
    const handleSelectPrefix = (event) => {
        const prefix = event
        handleChange({ name: "numberOfFamilyAsistencePrefix", option: prefix })

    }


    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Ingrese un número de contacto de emergencia o de un familiar
            </p>
            <div className="w-full flex gap-2 justify-center items-center">
                <ReactFlagsSelect
                    className="items-center justify-center pt-1 w-[15rem]"
                    customLabels={flags}
                    searchable={true}
                    selected={state.numberOfFamilyAsistencePrefix}
                    showSelectedLabel={false}
                    placeholder="Prefijo"
                    onSelect={handleSelectPrefix}
                />
                <input type="number" onChange={handleSelect} defaultValue={state.numberOfFamilyAsistence} className="w-full px-4 py-2 outline-none border border-[#D7D7D7] rounded-lg" placeholder="Escriba aqui el numero de telefono" />
            </div>
        </div>
    );
}
