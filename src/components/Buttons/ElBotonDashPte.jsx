"use client";

import IconCheckBoton from "../icons/iconCheckBoton";

export default function BotonDashPte({ color, nombre, riesgo }) {
  let bgColor, textColor, borderColor, iconColor;

  if (nombre === "Bajo" && riesgo === "Bajo") {
    bgColor = "bg-[#4CAF50]"; // Verde para Bajo
    textColor = "text-white";
    borderColor = "border-[#4CAF50]";
    color = "white";
  } else if (nombre === "Moderado" && riesgo === "Moderado") {
    bgColor = "bg-[#FFC900]"; // Amarillo para Medio
    textColor = "text-white";
    borderColor = "border-[#FFC900]";
    color = "white";
  } else if (nombre === "Alto" && riesgo === "Alto") {
    bgColor = "bg-[#F44336]"; // Rojo para Alto
    textColor = "text-white";
    borderColor = "border-[#F44336]";
    color = "white";
  } else if (nombre === "Muy Alto" && riesgo === "Muy Alto") {
    bgColor = "bg-[#D32F2F]"; // Rojo para Alto
    textColor = "text-white";
    borderColor = "border-[#D32F2F]";
    color = "white";
  } else {
    bgColor = "bg-white"; // Fondo blanco por defecto
    textColor = "text-black";
    borderColor = "border-gray-300";
    if (nombre == "Bajo") iconColor = "#70C247";
    if (nombre == "Moderado") iconColor = "#FFC900";
    if (nombre == "Alto") iconColor = "#E73F3F";
    if (nombre == "Muy Alto") iconColor = "#9E193B";
  }

  return (
    <button
      className={`px-2 md:px-3 py-2 border-4 rounded-lg ${bgColor} ${textColor} ${borderColor} flex items-center justify-center gap-2 md:w-fit w-full`}>
      <p>{nombre}</p>
      <IconCheckBoton color={iconColor} className={"w-6"} />
    </button>
  );
}
