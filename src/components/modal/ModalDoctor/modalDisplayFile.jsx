"use client";
import React from "react";

export default function FileDisplay({ state }) {
  return (
    <div className="w-full h-full flex ">
      {state.study !== null ? (
        <iframe src={state.study} className="w-full h-[30rem] " />
      ) : (
        <div className="w-full h-full justify-center flex items-center">
          No hay ningun estudio importado
        </div>
      )}
    </div>
  );
}
