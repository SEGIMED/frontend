"use client";
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
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import ButtonNextPreconsultationWorst from "./ButtonWorstPaintOfYourLife";
import LoadingFallback from "../loading/loading";

export default function InputCuerpoPre({
  title,
  onBodyChange,
  bodySection,
  defaultOpen = false,
  flag = false,
  isReadOnly = false,
}) {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [isPain, setIsPain] = useState(); // Estado para manejar si hay dolor
  const [selectedMuscleName, setSelectedMuscleName] = useState("");
  const [musclesObject, setMusclesObject] = useState({});
  const [modelType, setModelType] = useState("anterior");
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

  const reversePainAreaMap = {
    trapezius: 1,
    "upper-back": 2,
    "lower-back": 3,
    chest: 4,
    biceps: 5,
    triceps: 6,
    forearm: 7,
    "back-deltoids": 8,
    "front-deltoids": 9,
    abs: "10",
    obliques: 11,
    adductor: 12,
    hamstring: 13,
    quadriceps: 14,
    abductors: 15,
    calves: 16,
    gluteal: 17,
    knees: 18,
    "right-soleus": 19,
    "left-soleus": 20,
    head: 21,
    neck: 22,
  };
  const painAreaMapIngles = {
    1: "trapezius",
    2: "upper-back",
    3: "lower-back",
    4: "chest",
    5: "biceps",
    6: "triceps",
    7: "forearm",
    8: "back-deltoids",
    9: "front-deltoids",
    10: "abs",
    11: "obliques",
    12: "adductor",
    13: "hamstring",
    14: "quadriceps",
    15: "abductors",
    16: "calves",
    17: "gluteal",
    18: "knees",
    19: "right-soleus",
    20: "left-soleus",
    21: "head",
    22: "neck",
  };
  useEffect(() => {
    const getMuscleNames = (painAreas) => {
      const newMusclesArray = []; // This will store all active muscles
      if (painAreas) {
        Object.keys(painAreas).forEach((key) => {
          if (painAreas[key].active) {
            // Collect muscles under one object with 'muscles' array
            newMusclesArray.push(key); // Use the key directly (like "abs", "quadriceps", etc.)
          }
        });
      }

      // Merge new muscles with existing selected muscles
      if (newMusclesArray.length > 0) {
        setSelectedMuscles((prevSelectedMuscles) => {
          // If there are previous muscles selected, merge them
          const existingMuscles =
            prevSelectedMuscles.length > 0
              ? prevSelectedMuscles[0].muscles
              : [];

          // Create a new array combining existing muscles and the new ones
          const updatedMuscles = [
            ...new Set([...existingMuscles, ...newMusclesArray]),
          ];

          return [{ muscles: updatedMuscles }];
        });
      }
    };

    getMuscleNames(bodySection?.painAreas);
  }, [bodySection]);
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
  }, [isPain, bodySection?.painScale]);

  const handleClick = ({ muscle }) => {
    if (isReadOnly) return;
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
    if (musclesObject[muscle] && musclesObject[muscle].active) {
      setMusclesObject({
        ...musclesObject,
        [muscle]: {
          ...musclesObject[muscle],
          muscle: muscle,
          painArea: reversePainAreaMap[muscle],
          active: false,
          painNotes: "",
        },
      });
      onBodyChange("painAreas", {
        ...musclesObject,
        [muscle]: {
          ...musclesObject[muscle],
          muscle: muscle,
          painArea: reversePainAreaMap[muscle],
          active: false,
          painNotes: "",
        },
      });
    } else {
      setMusclesObject({
        ...musclesObject,
        [muscle]: {
          ...musclesObject[muscle],
          muscle: muscle,
          painArea: reversePainAreaMap[muscle],
          active: true,
          painNotes: "",
        },
      });
      onBodyChange("painAreas", {
        ...musclesObject,
        [muscle]: {
          ...musclesObject[muscle],
          muscle: muscle,
          painArea: reversePainAreaMap[muscle],
          active: true,
          painNotes: "",
        },
      });
    }
  };

  const handleDescription = (description, muscle) => {
    if (isReadOnly) return;
    // agregamos una descripción del dolor muscular que seleccionamos
    setMusclesObject({
      ...musclesObject,
      [muscle]: {
        ...musclesObject[muscle],
        muscle: muscle,
        painArea: reversePainAreaMap[muscle],
        active: true,
        painNotes: description,
      },
    });
    onBodyChange("painAreas", {
      ...musclesObject,
      [muscle]: {
        ...musclesObject[muscle],
        muscle: muscle,
        painArea: reversePainAreaMap[muscle],
        active: true,
        painNotes: description,
      },
    });
  };
  const handlePainSelection = (selection) => {
    if (isReadOnly) return;
    // setea si hay dolor o no
    setIsPain(selection);
  };

  const handleModelTypeChange = (type) => {
    if (isReadOnly) return;
    // para dar vuelta el cuerpo
    if (type === "Frente") setModelType("anterior");
    else setModelType("posterior");
  };

  const handleChangePainLevel = (value) => {
    if (isReadOnly) return;
    onBodyChange("painScale", value);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col">
      {flag ? (
        <div className="flex items-center justify-center h-20">
          <LoadingFallback />
        </div>
      ) : (
        <details open={defaultOpen}>
          <summary
            className="flex items-center justify-between h-16 gap-1 px-6 bg-white border cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}>
            <div />
            <div className="flex items-center">
              <Image src={circleData} alt="" />
              <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
                {title}
              </p>
            </div>
            <div className={isOpen || defaultOpen === true ? "rotate-180" : ""}>
              <IconArrowDetailDown />
            </div>
          </summary>
          <div className="flex flex-col items-center justify-center w-full md:flex-row md:items-start ">
            <div className="flex flex-col items-center justify-center w-full h-full py-4 md:w-1/2">
              <div className="items-center justify-center ">
                <ButtonNextPreconsultation
                  onBodyChange={onBodyChange}
                  options={[
                    { value: "Frente", text: "Frente" },
                    { value: "Dorso", text: "Dorso" },
                  ]}
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
                selectedMuscles[0]?.muscles?.map((muscle, index) => (
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
                      onChange={(e) =>
                        handleDescription(e.target.value, muscle)
                      }
                      value={bodySection?.painAreas?.[muscle]?.painNotes}
                      className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]"
                      placeholder={`Ingrese aquí sus anotaciones sobre el ${muscleTranslations[muscle]}`}
                    />
                  </div>
                ))}
            </div>
            <div className="sticky top-0 items-center w-full md:w-1/2">
              <div className="flex flex-col items-center gap-3 py-4 md:items-start ">
                <div>
                  <ButtonNextPreconsultation
                    disabled={isReadOnly}
                    onBodyChange={onBodyChange}
                    text={"¿Hay dolor?"}
                    selectedOptions={bodySection?.isTherePain}
                    options={[
                      { value: true, text: "Si" },
                      { value: false, text: "No" },
                    ]}
                    handleSelection={handlePainSelection}
                    name={"isTherePain"}
                  />
                </div>
                {bodySection?.isTherePain ? (
                  <>
                    <div>
                      <ButtonNextPreconsultation
                        disabled={isReadOnly}
                        onBodyChange={onBodyChange}
                        text={"¿Desde hace cuánto tiempo tiene el dolor?"}
                        selectedOptions={bodySection?.painDuration}
                        options={[
                          { value: 1, text: "Horas" },
                          { value: 2, text: "Días" },
                          { value: 3, text: "Semana" },
                        ]}
                        name={"painDuration"}
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
                          value={bodySection?.painScale}
                          onChange={handleChangePainLevel}
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
                        disabled={isReadOnly}
                        onBodyChange={onBodyChange}
                        text={"Tipo de dolor"}
                        selectedOptions={bodySection?.painType}
                        options={[
                          { value: 1, text: "Opresión" },
                          { value: 2, text: "Punzante" },
                          { value: 3, text: "Cólico (va y viene)" },
                          { value: 4, text: "Quemante" },
                          { value: 5, text: "Molestia" },
                          { value: 6, text: "Eléctrico" },
                          { value: 7, text: "Desgarro" },
                          { value: 8, text: "Cansancio" },
                          { value: 9, text: "Irritante" },
                          { value: 10, text: "Pulsátil" },
                          { value: 11, text: "Taladreante" },
                        ]}
                        text2={"Seleccione tipo de dolor"}
                        name={"painType"}
                      />
                    </div>
                    <div>
                      <ButtonNextPreconsultation
                        disabled={isReadOnly}
                        onBodyChange={onBodyChange}
                        text={"¿Tomó analgésicos?"}
                        selectedOptions={bodySection?.isTakingAnalgesic}
                        options={[
                          { value: true, text: "Si" },
                          { value: false, text: "No" },
                        ]}
                        name={"isTakingAnalgesic"}
                      />
                    </div>
                    {/* <div>
                      <ButtonNextPreconsultation
                        onBodyChange={onBodyChange}
                        text={"¿Calma con analgésicos?"}
                        selectedOptions={bodySection?.doesAnalgesicWorks}
                        options={[
                          { value: true, text: "Si" },
                          { value: false, text: "No" },
                        ]}
                        name={"doesAnalgesicWorks"}
                      />
                    </div> */}
                    <div>
                      <DropNextPreconsultation
                        disabled={isReadOnly}
                        onBodyChange={onBodyChange}
                        text={"Frecuencia del dolor"}
                        selectedOptions={bodySection?.painFrequency}
                        options={[
                          { value: 1, text: "De vez en cuando" },
                          { value: 2, text: "Algunas veces" },
                          { value: 3, text: "Intermitente" },
                          { value: 4, text: "Muchas veces" },
                          { value: 5, text: "Siempre" },
                        ]}
                        text2={"Seleccione frecuencia"}
                        name={"painFrequency"}
                      />
                    </div>
                    <div>
                      <ButtonNextPreconsultationWorst
                        disabled={isReadOnly}
                        onBodyChange={onBodyChange}
                        text={"¿Es el peor dolor de su vida?"}
                        selectedOptions={bodySection?.isWorstPainEver}
                        worstPainOfYourLife
                        options={[
                          { value: true, text: "Si" },
                          { value: false, text: "No" },
                        ]}
                        name={"isWorstPainEver"}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}
