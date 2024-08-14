"use client";
import IconCloseBoton from "../icons/IconCloseBoton";
import IconCheckGreenBoton from "../icons/IconCheckGreen";
import IconCheckBoton from "../icons/iconCheckBoton";

export default function BotonInterconsulta({
  label,
  onClick,
  active,
  type,
  Icon,
  disabled = false,
}) {
  return type === "green" ? (
    <div
      className={`flex items-center justify-center rounded-lg gap-2 w-fit px-3 py-1 border bg-white border-[#cecece] ${
        disabled && "cursor-pointer"
      } ${active ? "bg-[#70C247]" : ""}`}
      onClick={!disabled && onClick}>
      <p className={`text-sm font-normal leading-4 ${active && "text-white"}`}>
        {label}
      </p>
      {Icon ? (
        <Icon />
      ) : (
        <IconCheckBoton color={active && "white"} className="w-6" />
      )}
    </div>
  ) : (
    <div
      className={`flex items-center justify-center rounded-lg gap-2 w-fit px-3 py-1 border bg-white border-[#cecece] ${
        disabled && "cursor-pointer"
      } ${active ? "bg-red-500" : ""}`}
      onClick={!disabled && onClick}>
      <p className={`text-sm font-normal leading-4 ${active && "text-white"}`}>
        {label}
      </p>
      {Icon ? (
        <Icon className="w-6" color={active && "white"} />
      ) : (
        <IconCloseBoton className={`w-6`} color={active && "white"} />
      )}
      {/* Usa el icono correspondiente */}
    </div>
  );
}
