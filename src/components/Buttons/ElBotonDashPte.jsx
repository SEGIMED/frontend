"use client"


import IconCheckBoton from "../icons/iconCheckBoton";

export default function BotonDashPte({ color, nombre, riesgo }) {
  let bgColor, textColor, borderColor;

  if (nombre === "Bajo" && riesgo === "Bajo") {
    bgColor = "bg-[#4CAF50]"; // Verde para Bajo
    textColor = "text-white";
    borderColor = "border-[#4CAF50]";
    color = "white";
  } else if (nombre === "Moderado" && riesgo === "Moderado") {
    bgColor = "bg-[#FFEB3B]"; // Amarillo para Medio
    textColor = "text-white";
    borderColor = "border-[#FFEB3B]";
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
  }


  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button
        className={`px-3 py-2 border-4 rounded-lg ${bgColor} ${textColor} ${borderColor} flex items-center gap-2`}>
        {nombre}
        <IconCheckBoton className={"w-4"} />
      </button>
    </div>
  );
}
