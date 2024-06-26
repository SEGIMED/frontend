import IconAlphabetic from "../icons/IconAlphabetic";
import IconFilter from "../icons/IconFilter";
import IconHooter from "../icons/IconHooter";

const FiltrosPaciente = ({ isOpen, toggleMenu, onClickSort }) => {
    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center px-6 py-2 text-white bg-[#487FFA] rounded-xl gap-3 font-bold cursor-pointer"
            >
                <IconFilter /> Filtrar
            </button>
            {isOpen && (
                <ul className="flex flex-col gap-4 absolute p-3 bg-white z-50 w-64 left-0 border-2 border-[#D7D7D7] rounded-lg shadow-lg mt-1">
                    <span className='flex items-center gap-3 justify-start text-sm font-medium'>
                        <IconHooter /> Nivel de riesgo
                    </span>       
                    <li 
                        className='flex items-center justify-start gap-3 text-sm font-medium cursor-pointer'
                        onClick={() => { onClickSort(); toggleMenu(); }}
                    >
                        <IconAlphabetic /> Orden Alfabético
                    </li>
                </ul>
            )}
        </div>
    )
};

export default FiltrosPaciente;