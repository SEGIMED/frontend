import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import { useState, useEffect } from "react";

export default function Doctor({ handleDisabled, state }) {

    const [disabled, setDisabled] = useState({ name: false, id: false });
    const [physicianName, setPhysicianName] = useState("");
    const [physicianId, setPhysicianId] = useState("");
    const dispatch = useAppDispatch();

    const handleSelect = (event) => {
        const physician = event.target.value;
        setPhysicianName(physician);
        dispatch(setSelectedOption({ name: 'physician', option: physician }));
        handleDisabled();
    }

    const handleSelectId = (event) => {
        const physician = event.target.value;
        setPhysicianId(physician);
        dispatch(setSelectedOption({ name: 'physicianId', option: physician }));
        handleDisabled();
    }

    useEffect(() => {
        if (handleDisabled) {
            handleDisabled()
        }
        if (state.physician) {
            setDisabled({ name: false, id: true });
        } else if (state.physicianId) {
            setDisabled({ name: true, id: false });
        } else {
            setDisabled({ name: false, id: false });
        }
    }, [state]);

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <p className="font-medium text-2xl leading-5 text-center text-bluePrimary md:text-4xl md:leading-10">
                Para comenzar tu seguimiento primero debes asociarte a un médico.
            </p>
            <p className="font-medium text-xl md:text-2xl leading-6 text-center">
                Puedes buscar tu médico por su nombre o asociarte mediante un código
            </p>
            <div className="w-full flex flex-col items-center gap-2 md:gap-4">
                <input
                    defaultValue={state.physician}
                    disabled={disabled.name}

                    onChange={handleSelect}
                    type="text"
                    className="w-[17rem] px-4 py-2 outline-none border border-bluePrimary rounded-lg placeholder:text-bluePrimary"
                    placeholder="Escribí el nombre de tu médico"
                />
                <p>O</p>
                <input
                    defaultValue={state.physicianId}
                    disabled={disabled.id}

                    onChange={handleSelectId}
                    type="number"
                    className="w-[17rem] px-4 py-2 outline-none border border-[#D7D7D7] rounded-lg"
                    placeholder="Ingresa el código acá"
                />
            </div>
        </div>
    );
}
