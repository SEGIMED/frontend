
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import { useEffect } from "react";

export default function Domicilio({ handleDisabled, state }) {

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (state.address) { handleDisabled() }
    }, [state]);

    const handleSelect = (event) => {
        const domicilio = event.target.value;
        dispatch(setSelectedOption({ name: 'address', option: domicilio }));
        handleDisabled();
    }
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                ¿Cuál es su lugar de domicilio?
            </p>
            <div className="w-full">
                <input type="text" onChange={handleSelect} defaultValue={state.address} className="w-full px-4 py-2 outline-none border border-[#D7D7D7] rounded-lg" placeholder="Escriba su localidad" />
            </div>
        </div>
    );
}
