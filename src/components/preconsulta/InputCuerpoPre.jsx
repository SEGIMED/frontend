"use client";
import React, { useState, useRef, useEffect } from "react";
import Model from "react-body-highlighter";
import { Slider, Button } from "@nextui-org/react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ButtonNext from "../consulta/button";
import IconConsulta from "../icons/IconConsulta";
import IconDolor from "../icons/IconDolor";
import IconDolor2 from "../icons/IconDolor2";
import DropNext from "../consulta/dropdown";
import circleData from "../images/circleData.png";
import { updateBodyField } from "@/redux/slices/user/preconsultaFormSlice";

const muscleTranslations = {
  /* Back */
  trapezius: "Trapecio",
  "upper-back": "Espalda Superior",
  "lower-back": "Espalda Inferior",

  /* Chest */
  chest: "Pecho",

  /* Arms */
  biceps: "Bíceps",
  triceps: "Tríceps",
  forearm: "Antebrazo",
  "back-deltoids": "Deltoides Posterior",
  "front-deltoids": "Deltoides Anterior",

  /* Abs */
  abs: "Abdominales",
  obliques: "Oblicuos",

  /* Legs */
  adductor: "Aductores",
  hamstring: "Isquiotibiales",
  quadriceps: "Cuádriceps",
  abductors: "Abductores",
  calves: "Pantorrillas",
  gluteal: "Glúteos",
  knees: "Rodillas",
  "right-soleus": "Sóleo Derecho",
  "left-soleus": "Sóleo Izquierdo",

  /* Head */
  head: "Cabeza",
  neck: "Cuello",
};
export default function InputCuerpoPre({ title, defaultOpen = false }) {
  const dispatch = useAppDispatch();
  const bodySection = useAppSelector(
    (state) => state.preconsultaForm.formData.bodySection
  );

  const handleClick = ({ muscle }) => {
    const existingData =
      bodySection.selectedMuscles.length > 0
        ? bodySection.selectedMuscles[0]
        : { muscles: [] };
    let updatedMuscles;

    if (existingData.muscles.includes(muscle)) {
      updatedMuscles = existingData.muscles.filter((m) => m !== muscle);
    } else {
      updatedMuscles = [...existingData.muscles, muscle];
    }

    dispatch(
      updateBodyField({
        field: "selectedMuscles",
        value: [{ ...existingData, muscles: updatedMuscles }],
      })
    );
  };

  const handlePainSelection = (selection) => {
    dispatch(updateBodyField({ field: "isPain", value: selection === "Si" }));
  };

  const handleModelTypeChange = (type) => {
    dispatch(
      updateBodyField({
        field: "modelType",
        value: type === "Frente" ? "anterior" : "posterior",
      })
    );
  };

  const handleChange = (value) => {
    dispatch(updateBodyField({ field: "painLevel", value }));
  };

  const handleTextChange = (field, value) => {
    console.log(field, value);
    dispatch(updateBodyField({ field, value }));
  };

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex px-6 py-2 border gap-1 items-center cursor-pointer justify-center">
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
            </p>
          </div>
        </summary>
        <div className="flex md:flex-row flex-col w-full items-center md:items-start justify-center ">
          <div className="w-full md:w-1/2 h-full items-center flex flex-col justify-center py-4">
            <div className=" items-center justify-center">
              <ButtonNext
                options={["Frente", "Dorso"]}
                handleSelection={handleModelTypeChange}
                name={"modelType"}
              />
            </div>
            <div>
              <Model
                data={bodySection.selectedMuscles}
                style={{ width: "20rem", padding: "3rem" }}
                onClick={handleClick}
                type={bodySection.modelType}
              />
            </div>

            {bodySection.selectedMuscles.length > 0 &&
              bodySection.selectedMuscles[0].muscles.map((muscle, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 w-full py-3 px-7 border-b border-b-[#cecece]">
                  <label
                    className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center"
                    htmlFor={`muscle-note-${index}`}>
                    <IconConsulta />
                    {muscleTranslations[muscle]}
                  </label>
                  <textarea
                    value={bodySection[muscleTranslations[muscle]] || ""}
                    onChange={(e) =>
                      handleTextChange(
                        muscleTranslations[muscle],
                        e.target.value
                      )
                    }
                    className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]"
                    placeholder={`Ingrese aquí sus anotaciones sobre el ${muscleTranslations[muscle]}`}
                  />
                </div>
              ))}
          </div>
          <div className="items-center w-full md:w-1/2 sticky top-0">
            <div className="flex items-center flex-col gap-3 py-4 ">
              <div>
                <ButtonNext
                  text={"¿Hay dolor?"}
                  options={["Si", "No"]}
                  handleSelection={handlePainSelection}
                  name={"pain"}
                />
              </div>
              {bodySection.isPain && (
                <>
                  <div>
                    <ButtonNext
                      text={"¿Desde hace cuánto tiempo tiene el dolor?"}
                      options={["Horas", "Dias", "Semanas"]}
                      handleSelection={(value) =>
                        handleTextChange("painTime", value)
                      }
                      name={"painTime"}
                    />
                  </div>
                  <div className="w-[90%] md:w-[80%]  flex flex-col">
                    <div className="items-center  space-x-2 flex">
                      <span className="h-12">
                        <IconDolor />
                      </span>
                      <Slider
                        aria-label="Nivel de dolor"
                        size="lg"
                        step={1}
                        value={bodySection.painLevel}
                        onChange={handleChange}
                        showSteps={true}
                        maxValue={10}
                        minValue={1}
                        marks={[
                          {
                            value: 1,
                            label: "1",
                          },
                          {
                            value: 2,
                            label: "2",
                          },
                          {
                            value: 3,
                            label: "3",
                          },
                          {
                            value: 4,
                            label: "4",
                          },
                          {
                            value: 5,
                            label: "5",
                          },
                          {
                            value: 6,
                            label: "6",
                          },
                          {
                            value: 7,
                            label: "7",
                          },
                          {
                            value: 8,
                            label: "8",
                          },
                          {
                            value: 9,
                            label: "9",
                          },
                          {
                            value: 10,
                            label: "10",
                          },
                        ]}
                        defaultValue={1}
                        className="max-w-md"
                        showTooltip={true}
                      />
                      <span className="h-12">
                        <IconDolor2 />
                      </span>
                    </div>
                  </div>
                  <div>
                    <DropNext
                      text={"Tipo de dolor"}
                      options={[
                        "Opresión",
                        "Punzante",
                        "Cólico (va y viene)",
                        "Quemante",
                        "Molestia",
                        "Eléctrico",
                        "Desgarro",
                        "Cansancio",
                        "Irritante",
                        "Pulsátil",
                        "Taladreante",
                      ]}
                      text2={"Seleccione tipo de dolor"}
                      name={"painType"}
                    />
                  </div>
                  <div>
                    <ButtonNext
                      text={"¿Tomó analgésicos?"}
                      options={["Si", "No"]}
                      handleSelection={(value) =>
                        handleTextChange("analgesics", value)
                      }
                      name={"analgesicos"}
                    />
                  </div>
                  <div>
                    <ButtonNext
                      text={"¿Calma con analgésicos?"}
                      options={["Si", "No"]}
                      handleSelection={(value) =>
                        handleTextChange("calmWithAnalgesics", value)
                      }
                      name={"calmaAnalgesicos"}
                    />
                  </div>
                  <div>
                    <DropNext
                      text={"Frecuencia del dolor"}
                      options={[
                        "De vez en cuando",
                        "Algunas veces",
                        "Intermitente",
                        "Muchas veces",
                        "Siempre",
                      ]}
                      text2={"Seleccione frecuencia"}
                      name={"frecuencia"}
                    />
                  </div>
                  <div>
                    <ButtonNext
                      text={"¿Es el peor dolor de su vida?"}
                      options={["Si", "No"]}
                      handleSelection={(value) =>
                        handleTextChange("worstPain", value)
                      }
                      name={"peorDolor"}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
