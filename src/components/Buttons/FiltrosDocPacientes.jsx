
import { useState } from "react";
import IconAlphabetic from "../icons/IconAlphabetic";
import IconFilter from "../icons/IconFilter";
import IconHooter from "../icons/IconHooter";
import IconTypeRisk from "../icons/IconTypeRisk";

const FiltroDocPacientes = ({ onClickSort, onClickFilter, isOpen, toggleMenu }) => {
    
    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center px-6 py-2 text-white bg-[#487FFA] rounded-xl gap-3 font-bold cursor-pointer"
            >
                <IconFilter /> Filtrar
            </button>
            {isOpen && (
                <ul className="flex flex-col gap-4 absolute p-3 bg-white z-50 w-64 right-0 border-2 border-[#D7D7D7] rounded-lg shadow-lg mt-1">
                    <span className='flex items-center gap-3 justify-start text-sm font-medium'>
                        <IconHooter /> Nivel de riesgo
                    </span>       

                    <li 
                        className='flex items-center justify-start gap-4 pl-5 cursor-pointer'
                        onClick={() => { onClickFilter('alto'); toggleMenu(); }}
                    >
                        <IconTypeRisk iconColor="#E73F3F" />Alto
                    </li>

                    <li 
                        className='flex items-center justify-start gap-4 pl-5 cursor-pointer'
                        onClick={() => { onClickFilter('medio'); toggleMenu(); }}    
                    >
                        <IconTypeRisk iconColor="#F5E400" />Medio
                    </li>

                    <li 
                        className='flex items-center justify-start gap-4 pl-5 cursor-pointer'
                        onClick={() => { onClickFilter('bajo'); toggleMenu(); }}
                    >
                        <IconTypeRisk iconColor="#70C247" />Bajo
                    </li>

                    <li 
                        className='flex items-center justify-start gap-3 text-sm font-medium cursor-pointer'
                        onClick={() => { onClickSort(); onClickFilter(''); toggleMenu(); }}
                    >
                        <IconAlphabetic />Orden Alfabético 
                    </li>

                    <li 
                        className='flex items-center justify-start gap-3 text-sm font-medium cursor-pointer'
                        onClick={() => { onClickFilter(''); toggleMenu(); }}
                    >
                        Ver Todos 
                    </li>
                </ul>
            )}
        </div>
    );
};

export default FiltroDocPacientes;