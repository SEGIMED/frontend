"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import IconDelete from "@/components/icons/IconDelete";
import IconCircle from "../icons/IconCircle";
import IconDown from "../icons/IconDown";
import IconAdd from "../icons/IconAdd";
import IconAddPast from "../icons/IconAddPast";

export default function ClinicalHistory({
  edit,
  paciente = {},
  title,
  patologias = [],
  dataType,
  saveData,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [nuevasPatologias, setNuevasPatologias] = useState([]);
  const [patologiasRestantes, setPatologiasRestantes] = useState(patologias);

  useEffect(() => {
    if (paciente[dataType] && typeof paciente[dataType] === "object") {
      const existingPatologias = Object.keys(paciente[dataType]);
      setPatologiasRestantes(
        patologias.filter(
          (patologia) => !existingPatologias.includes(patologia)
        )
      );
    }
  }, [paciente, dataType, patologias]);

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectPatologia = e.target.innerText;
    if (selectPatologia !== "Añadir") {
      setNuevasPatologias([...nuevasPatologias, selectPatologia]);
      const nuevasPatologiasRestantes = patologiasRestantes.filter(
        (patologia) => patologia !== selectPatologia
      );
      setPatologiasRestantes(nuevasPatologiasRestantes);
    }
  };

  const handleDelete = (key) => {
    if (paciente[dataType] && paciente[dataType][key]) {
      const updatedPacienteData = { ...paciente[dataType] };
      delete updatedPacienteData[key];
      saveData(updatedPacienteData, dataType);
    } else {
      setNuevasPatologias(
        nuevasPatologias.filter((patologia) => patologia !== key)
      );
    }

    setPatologiasRestantes([...patologiasRestantes, key]);
  };

  const patologiasDisponibles = patologiasRestantes.filter((patologia) => {
    if (paciente[dataType] && typeof paciente[dataType] === "object") {
      return !Object.keys(paciente[dataType]).includes(patologia);
    }
    return true;
  });

  const onSubmit = (data) => {
    saveData(data, dataType);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <details>
          <summary className="flex px-6 py-2 border gap-1 items-center cursor-pointer justify-between">
            <div></div>
            <div className="flex items-center justify-center gap-4">
              <IconCircle className="w-3" />
              <p className="font-bold">{title}</p>
            </div>
            {edit ? (
              <div>
                <details className="relative">
                  <summary className="flex justify-center items-center px-6 py-2 bg-[#487FFA] rounded-lg gap-3 cursor-pointer text-white font-bold">
                    <IconAdd />
                    <p>Añadir</p>
                    <IconDown />
                  </summary>
                  <ul className="absolute bg-white z-50 p-2 text-start w-64 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-2 shadow-lg">
                    <span className="flex items-center gap-2 justify-start text-sm font-medium">
                      <IconAddPast /> Añadir antecedentes
                    </span>
                    {patologiasDisponibles.map((option) => (
                      <li
                        className="flex items-center justify-start gap-4 font-medium text-sm z-50"
                        key={option}
                        onClick={handleSelectChange}
                        onMouseDown={(e) => e.preventDefault()}>
                        <IconCircle className="w-3" />
                        {option}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ) : (
              <div></div>
            )}
          </summary>
          <ul className="bg-white py-5 px-2 w-full right-4 gap-3 z-10">
            {paciente[dataType] && typeof paciente[dataType] === "object"
              ? Object.entries(paciente[dataType]).map(([key, value]) => (
                <li key={key} className="flex justify-start items-center p-4">
                  <label className="flex gap-3 w-1/2 font-medium p-4 ">
                    <IconCircle className="w-3" /> {key}
                  </label>
                  {edit ? (
                    <div className="w-1/2 flex justify-between items-center gap-2">
                      <input
                        className="w-full text-start bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1 items-center "
                        type="text"
                        defaultValue={value}
                        {...register(key, {
                          required: "*Este campo es obligatorio",
                          minLength: 2,
                          maxLength: 20,
                        })}
                      />
                      <button type="button" onClick={() => handleDelete(key)}>
                        <IconDelete />
                      </button>
                    </div>
                  ) : (
                    <span className="w-1/2 text-start px-6 py-1 ">
                      {value}
                    </span>
                  )}
                </li>
              ))
              : null}
            {nuevasPatologias.map((patologia, index) => (
              <li
                key={index}
                className="flex justify-start items-center px-3 pr-10 mt-2">
                <label className="flex items-center w-1/2 font-medium ml-2 ">
                  <IconCircle className="w-3" />{" "}
                  <span className="ml-4">{patologia}</span>
                </label>
                {edit ? (
                  <div className="w-1/2 flex justify-between items-center gap-2">
                    <input
                      className="w-full bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-6 py-1 items-center  "
                      type="text"
                      {...register(patologia, {
                        required: "*Este campo es obligatorio",
                        minLength: 2,
                        maxLength: 20,
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(patologia)}>
                      <IconDelete />
                    </button>
                  </div>
                ) : (
                  <span className="w-1/2 text-start px-6 py-1 ">
                    {watch(patologia) || ""}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </details>
      </form>
    </div>
  );
}
