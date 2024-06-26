"use client"

import IconRobotRegister from "../icons/IconRobotRegister";
import { useRouter } from "next/navigation";

const ModalSuccessRegister = ({ isOpen, onClose, formData }) => {
    const router=useRouter()

    const handleContinue = () => {
        
        if (formData.role === 2) {
           router.push( "/Dashboard/Inicio_Doctor");
        } else if (formData.role === 3) {
            router.push("/Dashboard/Inicio_Paciente");
        }

        onClose()
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-50 bg-[#e6e5e5] p-10 rounded-lg w-2/5 h-5/6 flex flex-col items-center justify-around gap-5">
                <h1 className="font-extrabold text-4xl">BIENVENID@</h1>
                
                <span className="font-extrabold text-[#487FFA] text-5xl">{capitalizeFirstLetter(formData.name)}</span>

                <div className="w-40">
                    <IconRobotRegister className="w-full"/>
                </div>

                <p className="font-semibold text-xl">¡ Tu registro fue exitoso !</p>

                <button onClick={handleContinue} className="py-2 px-4 w-60 bg-[#70C247] text-xl font-bold text-white rounded-lg hover:bg-[#487FFA] transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
                    Continuar
                </button>
                
            </div>
        </div>
    ) : null;
}

export default ModalSuccessRegister;