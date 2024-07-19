"use client"
import React, { useState, useRef, useEffect } from "react";
import Model from "react-body-highlighter";
import { Slider, Button } from "@nextui-org/react";
import ButtonNextPreconsultation from "./ButtonNext";
import DropNextPreconsultation from "./DropDown";
import IconConsulta from "../icons/IconConsulta";
import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import IconDolor from "../icons/IconDolor";
import IconDolor2 from "../icons/IconDolor2";
import { useFormContext } from "react-hook-form";
import { updateBodyPainLevel } from "@/redux/slices/user/preconsultaFormSlice";
import { useAppDispatch } from "@/redux/hooks";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";

export default function InputCuerpoPre({ title, onBodyChange, defaultOpen = false }) {
  const dispatch = useAppDispatch();
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [isPain, setIsPain] = useState(false); // Estado para manejar si hay dolor
  const [selectedMuscleName, setSelectedMuscleName] = useState("");
  const [modelType, setModelType] = useState("anterior");
  const [painLevel, setPainLevel] = useState(1);

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
    const prevMusc = [...selectedMuscles];
    const existingData = prevMusc.length > 0 ? prevMusc[0] : { muscles: [] };
    let updatedMuscles;
    if (existingData.muscles.includes(muscle)) {
      updatedMuscles = existingData.muscles.filter((m) => m !== muscle);
    } else {
      updatedMuscles = [...existingData.muscles, muscle];
    }
    // Si hay una traducción definida para el músculo, úsala; de lo contrario, usa el nombre original
    const translatedMuscleName = muscleTranslations[muscle] || muscle;
    setSelectedMuscleName(translatedMuscleName); // Establecer el nombre del músculo seleccionado
    setSelectedMuscles([{ ...existingData, muscles: updatedMuscles }]);
    onBodyChange("painAreas", [...updatedMuscles.map((m) => muscleTranslations[m] || m)]);
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
    onBodyChange("painLevel", value);
  };

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex items-center justify-between gap-1 px-6 py-2 bg-white border cursor-pointer">
          <div/>
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
            </p>
          </div>
          <div>
            <IconArrowDetailDown/>
          </div>
        </summary>
        <div className="flex flex-col items-center justify-center w-full md:flex-row md:items-start ">
          <div className="flex flex-col items-center justify-center w-full h-full py-4 md:w-1/2">
            <div className="items-center justify-center ">
              <ButtonNextPreconsultation
                onBodyChange={onBodyChange}
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
          <div className="sticky top-0 items-center w-full md:w-1/2">
            <div className="flex flex-col items-center gap-3 py-4 ">
              <div>
                <ButtonNextPreconsultation
                  onBodyChange={onBodyChange}
                  text={"¿Hay dolor?"}
                  options={["Si", "No"]}
                  handleSelection={handlePainSelection}
                  name={"pain"}
                />
              </div>
              {isPain && (
                <>
                  <div>
                    <ButtonNextPreconsultation
                      onBodyChange={onBodyChange}
                      text={"¿Desde hace cuánto tiempo tiene el dolor?"}
                      options={["Horas", "Dias", "Semanas"]}
                      name={"painTime"}
                    />
                  </div>
                  <div className="w-[90%] md:w-[80%]  flex flex-col">
                    <div className="flex items-center space-x-2">
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
                  </div>
                  <div>
                    <DropNextPreconsultation
                      onBodyChange={onBodyChange}
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
                    <ButtonNextPreconsultation
                      onBodyChange={onBodyChange}
                      text={"¿Tomó analgésicos?"}
                      options={["Si", "No"]}
                      name={"analgesicos"}
                    />
                  </div>
                  <div>
                    <ButtonNextPreconsultation
                      onBodyChange={onBodyChange}
                      text={"¿Calma con analgésicos?"}
                      options={["Si", "No"]}
                      name={"calmaAnalgesicos"}
                    />
                  </div>
                  <div>
                    <DropNextPreconsultation
                      onBodyChange={onBodyChange}
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
                    <ButtonNextPreconsultation
                      onBodyChange={onBodyChange}
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
