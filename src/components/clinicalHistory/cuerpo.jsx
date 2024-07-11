"use client";
import React, { useState, useEffect } from "react";
import Model from "react-body-highlighter";
import { Slider } from "@nextui-org/react";
import ButtonNext from "../consulta/button";
import DropNext from "../consulta/dropdown";
import IconDolor from "../icons/IconDolor";
import IconDolor2 from "../icons/IconDolor2";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import IconConsulta from "../icons/IconConsulta";

export default function ClincalCuerpo({ info }) {
  const [isPain, setIsPain] = useState(true); // Estado para manejar si hay dolor
  const [modelType, setModelType] = useState("anterior");
  const [painLevel, setPainLevel] = useState(1);
  const [selectedMuscles, setSelectedMuscles] = useState([
    { name: "Musculo", muscles: [] },
  ]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Función para obtener los nombres de músculos en inglés
    const getMuscleNames = () => {
      if (info && info.painMap && info.painMap.painAreas) {
        const muscleData = info.painMap.painAreas.map((area) => ({
          name: "Musculo",
          muscles: [area.painArea?.painAreaEnglish],
        }));
        setSelectedMuscles(muscleData);
      }
    };

    getMuscleNames();
  }, [info]);

  const handlePainSelection = (selection) => {
    setIsPain(selection === "Si");
  };

  const handleModelTypeChange = (type) => {
    setModelType(type === "Frente" ? "anterior" : "posterior");
  };

  console.log(selectedMuscles);

  return (
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col w-full items-center md:items-start justify-center ">
        <div className="w-full md:w-1/2 h-full items-center flex flex-col justify-center py-2">
          <div>
            {selectedMuscles.length > 0 ? (
              <Model
                data={selectedMuscles}
                style={{ width: "20rem", padding: "3rem" }}
                type={modelType}
              />
            ) : null}
          </div>
          <div className=" items-center justify-center">
            <ButtonNext
              options={["Frente", "Dorso"]}
              handleSelection={handleModelTypeChange}
              name={"modelType"}
            />
          </div>
          {info.painMap.painAreas.length > 0 &&
            info.painMap.painAreas.map((muscle, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 w-full py-3 px-7 border-b border-b-[#cecece]">
                <label
                  className="text-start text-[#686868] font-medium text-base leading-4 flex gap-2 items-center"
                  htmlFor={`muscle-note-${index}`}>
                  <IconConsulta />
                  {muscle.painArea?.painAreaSpanish}
                </label>
                <p className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6  border border-[#DCDBDB] rounded-lg px-4 py-1">
                  {muscle.painNotes}
                </p>
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
                disabled={true}
                selectedOptions={"No"}
              />
            </div>
            {isPain && (
              <>
                <ButtonNext
                  text={"¿Desde hace cuánto tiempo tiene el dolor?"}
                  options={["Horas", "Días", "Semanas"]}
                  name={"painTime"}
                  disabled={true}
                  selectedOptions={info?.painMap.painDuration}
                />
                <div className="w-[90%] md:w-[80%]  flex flex-col">
                  <div className="items-center  space-x-2 flex">
                    <span className="h-12">
                      <IconDolor />
                    </span>
                    <Slider
                      aria-label="Nivel de dolor"
                      size="lg"
                      step={1}
                      showSteps={true}
                      maxValue={10}
                      minValue={1}
                      value={info?.painMap?.painScale}
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
                  disabled={true}
                  selectedOptions={info?.painMap.painType}
                />
                <ButtonNext
                  text={"¿Tomó analgésicos?"}
                  options={["Si", "No"]}
                  disabled={true}
                  selectedOptions={info?.painMap.isTakingAnalgesic}
                />
                <ButtonNext
                  text={"¿Calma con analgésicos?"}
                  options={["Si", "No"]}
                  disabled={true}
                  selectedOptions={info?.painMap.doesAnalgesicWorks}
                />
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
                  disabled={true}
                  selectedOptions={info?.painMap.painFrequency}
                />
                <ButtonNext
                  text={"¿Es el peor dolor de su vida?"}
                  options={["Si", "No"]}
                  name={"peorDolor"}
                  disabled={true}
                  selectedOptions={info?.painMap.isWorstPainEver}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
