
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import { useEffect } from "react";

export default function MatriculaNumber({ handleDisabled, state }) {

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (state.nacionalRegistration) { handleDisabled() }
    }, [state]);

    const handleSelect = (event) => {
        const matricula = event.target.value;
        dispatch(setSelectedOption({ name: 'nacionalRegistration', option: matricula }));
        handleDisabled();
    }
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <p className="font-medium text-3xl leading-10 text-center">
                Ingrese su número de matrícula nacional
            </p>
            <div className="w-full">
                <input type="text" onChange={handleSelect} defaultValue={state.nacionalRegistration} className="w-full px-4 py-2 outline-none border border-[#D7D7D7] rounded-lg" placeholder="Escriba su matrícula nacional" />
            </div>
        </div>
    );
}
