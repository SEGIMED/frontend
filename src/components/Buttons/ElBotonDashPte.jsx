"use client";

import { useState, useEffect } from "react";
import IconCheckBoton from "../icons/iconCheckBoton";

export default function BotonDashPte({ color, nombre, riesgo }) {
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [iconColor, setIconColor] = useState("");

  useEffect(() => {
    if (nombre === "Bajo" && riesgo === "Bajo") {
      setBgColor("bg-[#4CAF50]"); // Verde para Bajo
      setTextColor("text-white");
      setBorderColor("border-[#4CAF50]");
      setIconColor("white"); // Ensure icon is white
    } else if (nombre === "Moderado" && riesgo === "Moderado") {
      setBgColor("bg-[#FFC900]"); // Amarillo para Medio
      setTextColor("text-white");
      setBorderColor("border-[#FFC900]");
      setIconColor("white"); // Ensure icon is white
    } else if (nombre == "Alto" && riesgo == "Alto") {
      setBgColor("bg-[#F44336]"); // Rojo para Alto
      setTextColor("text-white");
      setBorderColor("border-[#F44336]");
      setIconColor("white"); // Ensure icon is white
    } else if (nombre === "Muy Alto" && riesgo === "Muy Alto") {
      setBgColor("bg-[#D32F2F]"); // Rojo para Muy Alto
      setTextColor("text-white");
      setBorderColor("border-[#D32F2F]");
      setIconColor("white"); // Ensure icon is white
    } else {
      setBgColor("bg-white"); // Fondo blanco por defecto
      setTextColor("text-[#686868]");
      setBorderColor("border-gray-300");
      if (nombre === "Bajo") setIconColor("#70C247");
      if (nombre === "Moderado") setIconColor("#FFC900");
      if (nombre === "Alto") setIconColor("#E73F3F");
      if (nombre === "Muy Alto") setIconColor("#9E193B");
    }
  }, [nombre, riesgo]);

  return (
    <button
      className={`px-2 md:px-3 py-2 border-1 rounded-lg ${bgColor} ${textColor} ${borderColor} flex items-center justify-center gap-2 md:w-fit w-full`}>
      <IconCheckBoton color={iconColor} className={"w-6"} />
      <p className=" font-normal text-base leading-8">{nombre}</p>
    </button>
  );
}
