"use client";
import IconCloseBoton from "../icons/IconCloseBoton";
import IconCheckBoton from "../icons/iconCheckBoton";

export default function BotonPreconsulta({ label, onClick, active }) {
  return label == "Sí" ? (
    <div
      className={`flex items-center justify-center rounded-lg gap-2 w-20 px-3 py-3 border border-[#cecece] cursor-pointer ${active ? "bg-[#70C247] text-white" : ""
        }`}
      onClick={onClick}>
      <p className="text-sm font-normal leading-4">{label}</p>
      <IconCheckBoton className="w-10" color={active ? "white" : "#70C247"} />
    </div>
  ) : (
    <div
      className={`flex items-center justify-center rounded-lg gap-2 w-20 px-3 py-2 border border-[#cecece] cursor-pointer ${active === false ? "bg-[#ff4040] text-white" : ""}`}
      onClick={onClick}>
      <p className="text-sm font-normal leading-4">{label}</p>
      <IconCloseBoton className={`w-10`} color={active === false ? "white" : "red"} />
    </div>
  );
}
