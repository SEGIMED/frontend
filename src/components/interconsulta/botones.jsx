"use client";
import IconCloseBoton from "../icons/IconCloseBoton";
import IconCheckGreenBoton from "../icons/IconCheckGreen";


export default function BotonInterconsulta({ label, onClick, active, type, Icon }) {
    return type === "green" ? (
        <div
            className={`flex items-center justify-center rounded-lg gap-2 w-fit px-3 py-3 border border-[#cecece] cursor-pointer ${active ? "border-greenPrimary border-2" : ""
                }`}
            onClick={onClick}
        >
            <p className="text-sm font-normal leading-4">{label}</p>
            {Icon ? <Icon /> : <IconCheckGreenBoton className="w-10" />}
        </div>
    ) : (
        <div
            className={`flex items-center justify-center rounded-lg gap-2 w-fit px-3 py-2 border border-[#cecece] cursor-pointer ${active ? "border-red-500 border-2 " : ""
                }`}
            onClick={onClick}
        >
            <p className="text-sm font-normal leading-4">{label}</p>
            {Icon ? <Icon /> : <IconCloseBoton className={`w-7`} color={"red"} />} {/* Usa el icono correspondiente */}
        </div>
    );
}
