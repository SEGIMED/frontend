

import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";

export default function Doctor({ handleDisabled }) {

    const dispatch = useAppDispatch();

    const handleSelect = (event) => {
        const physician = event.target.value;
        dispatch(setSelectedOption({ name: 'physician', option: physician }));
        handleDisabled()
    }

    const handleSelectId = (event) => {
        const physician = event.target.value;
        dispatch(setSelectedOption({ name: 'physicianId', option: physician }));
        handleDisabled()
    }
    return (
        <div className=" w-full flex flex-col items-center gap-6">
            <p className="font-medium text-2xl leading-5  text-center text-bluePrimary md:text-4xl *:leading-10  ">
                Para comenzar tu seguimiento primero debes asociarte a un médico.
            </p>
            <p className="font-medium text-xl md:text-2xl leading-6 text-center ">
                Podes buscar tu médico por su nombre o asociarte mediante un código
            </p>
            <div className="w-full justify-center items-center flex flex-col md:gap-4 gap-2">
                <input onChange={handleSelect} type="text" className="w-[17rem] px-4 py-2 outline-none border border-bluePrimary rounded-lg placeholder:text-bluePrimary" placeholder="Escribí el nombre de tu médico" />
                <p>O</p>
                <input onChange={handleSelectId} type="number" className="w-[17rem] px-4 py-2 outline-none border border-[#D7D7D7] rounded-lg" placeholder="Ingresa el código acá" />
            </div>
        </div>
    );
}
