"use client"
import React, { useState, useRef, useEffect } from "react";
import Model from "react-body-highlighter";
import { Slider, Button } from "@nextui-org/react";
import ButtonNext from "./button";
import DropNext from "./dropdown";
import IconConsulta from "../icons/IconConsulta";
import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import IconDolor from "../icons/IconDolor";
import IconDolor2 from "../icons/IconDolor2";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import { useFormContext } from "react-hook-form";
import { useCallback } from "react";

export default function Component({ title, defaultOpen = false }) {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [isPain, setIsPain] = useState(false); // Estado para manejar si hay dolor
  const [selectedMuscleName, setSelectedMuscleName] = useState("");
  const [modelType, setModelType] = useState("anterior");
  const [painLevel, setPainLevel] = useState(1);

  const dispatch = useAppDispatch();

  const { register } = useFormContext();

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

  useEffect(() => {
    const colors = {
      1: "text-green-500",
      2: "text-green-500",
      3: "text-green-500",
      4: "text-green-500",
      5: "text-orange-500",
      6: "text-orange-500",
      7: "text-orange-500",
      8: "text-red-500",
      9: "text-red-500",
      10: "text-red-500",
    };

    const applyColors = () => {
      const divs = document.querySelectorAll('.absolute[data-slot="mark"]');
      divs.forEach((div) => {
        const value = parseInt(div.textContent, 10);
        div.className = `md:text-md text-xl absolute opacity-50 data-[in-range=true]:opacity-100 top-1/3 md:top-1/2 mt-1 -translate-x-1/2 translate-y-1/2 cursor-pointer transition-opacity motion-reduce:transition-none ${colors[value]}`;
      });
    };

    // Retry applying colors after the component has mounted
    const timeoutId = setTimeout(applyColors, 100);

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [isPain, painLevel]);

  const handleClick = ({ muscle }) => {
    setSelectedMuscles((prevMuscles) => {
      const existingData =
        prevMuscles.length > 0 ? prevMuscles[0] : { muscles: [] };
      let updatedMuscles;

      if (existingData.muscles.includes(muscle)) {
        updatedMuscles = existingData.muscles.filter((m) => m !== muscle);
      } else {
        updatedMuscles = [...existingData.muscles, muscle];
      }

      // Si hay una traducción definida para el músculo, úsala; de lo contrario, usa el nombre original
      const translatedMuscleName = muscleTranslations[muscle] || muscle;

      dispatch(
        setSelectedOption({
          name: "muscles",
          option: [...updatedMuscles.map((m) => muscleTranslations[m] || m)],
        })
      );
      setSelectedMuscleName(translatedMuscleName); // Establecer el nombre del músculo seleccionado
      return [{ ...existingData, muscles: updatedMuscles }];
    });
  };

  const handlePainSelection = (selection) => {
    setIsPain(selection === "Si");
  };

  const handleModelTypeChange = (type) => {
    if (type === "Frente") setModelType("anterior");
    else setModelType("posterior");
  };

  const handleChange = (value) => {
    setPainLevel(value);
    dispatch(setSelectedOption({ name: "painLevel", option: value }));
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
                data={selectedMuscles}
                style={{ width: "20rem", padding: "3rem" }}
                onClick={handleClick}
                type={modelType}
              />
            </div>

            {selectedMuscles.length > 0 &&
              selectedMuscles[0].muscles.map((muscle, index) => (
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
                    {...register(muscleTranslations[muscle])}
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
              {isPain && (
                <>
                  <div>
                    <ButtonNext
                      text={"¿Desde hace cuánto tiempo tiene el dolor?"}
                      options={["Horas", "Dias", "Semanas"]}
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
                        value={painLevel}
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
                    {/* <div className="flex px-1 pl-8">
                      <span className="pl-2 pr-5 text-green-500">1</span>
                      <span className="pl-5 pr-5 text-green-500">2</span>
                      <span className="pl-4 pr-4 text-green-500">3</span>
                      <span className="pl-5 pr-4 text-green-500">4</span>
                      <span className="pl-5 pr-5 text-yellow-500">5</span>
                      <span className="pl-4 pr-5 text-yellow-500">6</span>
                      <span className="pl-5 pr-5 text-yellow-500">7</span>
                      <span className="pl-4 pr-5 text-red-500">8</span>
                      <span className="pl-5 pr-4 text-red-500">9</span>
                      <span className="pl-4 pr-4 text-red-500">10</span>
                    </div> */}
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
                      name={"analgesicos"}
                    />
                  </div>
                  <div>
                    <ButtonNext
                      text={"¿Calma con analgésicos?"}
                      options={["Si", "No"]}
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
