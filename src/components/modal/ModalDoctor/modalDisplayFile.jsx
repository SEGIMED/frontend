"use client";
import React from "react";

export default function FileDisplay({ state }) {
  // Función para verificar si el archivo es una imagen
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  };

  return (
    <div className="w-full h-full flex">
      {state.study !== null ? (
        isImage(state.study) ? (
          <img src={state.study} alt="Estudio" className="w-full h-[30rem] object-contain" />
        ) : (
          <iframe src={state.study} className="w-full h-[30rem]" />
        )
      ) : (
        <div className="w-full h-full justify-center flex items-center">
          No hay ningún estudio importado
        </div>
      )}
    </div>
  );
}