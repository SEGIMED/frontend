"use client";
import { Slider } from "@nextui-org/react";
import BotonPreconsulta from "../Buttons/BotonPreconsulta";
import IconFatArrow from "../icons/iconFatarrowDash";
import IconDolor from "../icons/IconDolor";
import IconDolor2 from "../icons/IconDolor2";
import PreconsultaSubquestion from "./PreconsultaSubquestion";
import IconMalFace from "./IconMalFace";
import IconRegularFace from "./IconRegularFace";
import IconNormalFace from "./IconNormalFace";
import IconBienFace from "./IconBienFace";
import { useState } from "react";
import IconCircle from "../icons/IconCircle";
import Cookies from "js-cookie";

const SimpleQuestionBox = ({
  question,
  label,
  index,
  selectedOption,
  onQuestionChange,
}) => {
  const role = Cookies.get("b");

  return (
    <div className="animate-fade-in flex items-start md:flex-row flex-col px-4 md:pl-20 py-4">
      <div
        key={index}
        className={`md:max-w-[600px] flex flex-wrap px-4 md:p-0 gap-2 items-start ${
          selectedOption === index ? "bg-blue-100" : ""
        }`} // Aplicar un fondo si está seleccionado
      >
        <input
          type="checkbox"
          id={`checkbox${index}${question}`}
          className="h-5 w-5 cursor-pointer border-gray-300 rounded"
          checked={selectedOption === index}
          onChange={() => {
            if (role === "Paciente") {
              onQuestionChange(question, index);
            }
          }}
        />
        <label
          htmlFor={`checkbox${index}${question}`}
          className={`text-[#686868] flex-1 font-normal text-sm leading-4 ${
            role !== "Paciente" ? "cursor-default" : "cursor-pointer"
          } ${selectedOption === index ? "text-blue-600 font-semibold" : ""}`}>
          {label}
        </label>
      </div>
    </div>
  );
};

function PreconsultaQuestion({
  question,
  section,
  sectionIndex,
  onQuestionActive,
  onSubquestionChange, // This will handle the subquestion updates
  onQuestionChange,
  onDescriptionChange,
  preconsult,
}) {
  const [currentDescription, setCurrentDescription] = useState(
    section.description
  );
  const role = Cookies.get("b");

  const isEditable = role === "Paciente";

  const handleChangeDescription = (e) => {
    setCurrentDescription(e.target.value);
    onDescriptionChange(question, e.target.value); // Update the description
  };
  const iconMap = {
    Mal: <IconMalFace className="w-5" />,
    Regular: <IconRegularFace className="w-5" />,
    Normal: <IconNormalFace className="w-5" />,
    Bien: <IconBienFace className="w-5" />,
  };
  return (
    <div
      className={`flex ${
        section.showRowOptions || section.showSlider ? "flex-row" : "flex-col"
      }`}>
      <div className="flex items-start justify-between w-[100%] flex-col md:flex-row md:gap-2 px-6 md:px-8 md:py-2 border-b-[#cecece]">
        <label className="text-start py-4 md:py-0 w-full md:w-[50%] text-[#686868] font-semibold text-base leading-4 flex gap-2 items-center">
          <IconFatArrow />
          {section.title}
        </label>

        {section.binaryOptions && (
          <div className="py-2 md:py-0 md:max-w-[50%] w-full flex justify-start md:justify-end gap-3">
            <BotonPreconsulta
              label="Sí"
              onClick={() => onQuestionActive(question, true)} // Set active to true
              active={section.active === true} // Highlight if active is true
            />
            <BotonPreconsulta
              label="No"
              onClick={() => onQuestionActive(question, false)} // Set active to false
              active={section.active === false} // Highlight if active is false
            />
          </div>
        )}

        {section.showRowOptions && (
          <div className="flex gap-5 flex-row flex-wrap items-start justify-start md:justify-end py-1">
            {section.options?.map((option, index) => (
              <button
                key={index}
                className={`flex flex-row gap-3 items-center px-4 py-2 border-1 rounded-lg ${
                  section.selectedOption === index ? "bg-green-300" : "bg-white"
                }`}
                onClick={() => isEditable && onQuestionChange(question, index)} // Solo cambia si es editable
              >
                <p className="text-[#686868] font-semibold text-sm leading-4">
                  {option.label}
                </p>
                {iconMap[option.label]}
              </button>
            ))}
          </div>
        )}

        {section.showSlider && (
          <div className="items-center w-full md:w-[50%] space-x-2 flex md:justify-end">
            <span className="h-12">
              <IconDolor2 />
            </span>
            <Slider
              aria-label="Nivel de dolor"
              size="lg"
              step={1}
              showSteps={true}
              maxValue={10}
              minValue={1}
              marks={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
                { value: 6, label: "6" },
                { value: 7, label: "7" },
                { value: 8, label: "8" },
                { value: 9, label: "9" },
                { value: 10, label: "10" },
              ]}
              value={section.selectedOption || 1}
              defaultValue={section.selectedOption || 1}
              className="max-w-md"
              showTooltip={true}
              onChange={(value) =>
                isEditable && onQuestionChange(question, value)
              } // Solo cambia si es editable
            />
            <span className="h-12">
              <IconDolor />
            </span>
          </div>
        )}
      </div>

      {section.active &&
        section.subquestions &&
        Object.keys(section.subquestions)?.map((subquestionKey, index) => (
          <PreconsultaSubquestion
            key={index}
            section={section.subquestions[subquestionKey]} // Pass the subquestion data
            question={question} // Parent question key
            subquestion={subquestionKey} // Subquestion key
            sectionIndex={sectionIndex} // Parent question index
            subquestionIndex={index} // Subquestion index
            onSubquestionChange={onSubquestionChange} // Handler for subquestion changes
          />
        ))}

      {section.active &&
        !section.binaryOptions &&
        section.options.length > 0 &&
        section.options.map((option, index) => (
          <SimpleQuestionBox
            key={index}
            index={index}
            question={question}
            label={option.label}
            selectedOption={section.selectedOption}
            onQuestionChange={onQuestionChange}
          />
        ))}

      {section.active && section.showTextInput && (
        <div className="animate-fade-in w-full flex justify-center">
          <textarea
            className="w-[96%] p-2 h-24 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg outline-[#a8a8a8]"
            placeholder={`Ingrese aquí una descripción`}
            value={section.description}
            onChange={isEditable ? handleChangeDescription : undefined} // Solo editable para pacientes
          />
        </div>
      )}
    </div>
  );
}

export default PreconsultaQuestion;
