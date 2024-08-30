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

const SimpleQuestionBox = ({ question, label, index, selectedOption, onQuestionChange }) => {
  return (
    <div className="animate-fade-in flex items-start md:flex-row flex-col px-4 md:pl-20 py-4">
      <div key={index} className="md:max-w-[600px] flex flex-wrap px-4 md:p-0 gap-2 items-start">
        <input
          type="checkbox"
          id={`checkbox${index}${question}`}
          className="h-5 w-5 cursor-pointer border-gray-300 rounded"
          checked={selectedOption === index}
          onChange={() => onQuestionChange(question, index)}
        />
        <label
          htmlFor={`checkbox${index}${question}`}
          className="text-[#686868] cursor-pointer flex-1 font-normal text-sm leading-4">
          {label}
        </label>
      </div>
    </div>
  )
}

function PreconsultaQuestion({ question, section, sectionIndex, onQuestionActive, onSubquestionChange, onQuestionChange, onDescriptionChange, preconsult }) {
  const [currentDescription, setCurrentDescription] = useState('');
  console.log(question, "question")
  console.log(section, "section")
  console.log(preconsult, "preconsult")
  const handleChangeDescription = (e) => {
    setCurrentDescription(e.target.value);
    onDescriptionChange(question, e.target.value);
  }
  const handleSubquestionFieldChange = (subquestionIndex, field, value) => {
    onSubquestionChange(sectionIndex, subquestionIndex, field, value);
  };
  const iconMap = {
    Mal: <IconMalFace className="w-5" />,
    Regular: <IconRegularFace className="w-5" />,
    Normal: <IconNormalFace className="w-5" />,
    Bien: <IconBienFace className="w-5" />,
  };

  return (
    <div
      className={`flex ${section.showRowOptions || section.showSlider ? "flex-row" : "flex-col"
        }`}>
      <div className="flex items-start justify-between w-[100%] flex-col md:flex-row md:gap-2 px-6 md:px-8 md:py-2 border-b-[#cecece]">
        <label className="text-start py-4 md:py-0 w-full md:w-[50%] text-[#686868] font-semibold text-base leading-4 flex gap-2 items-center">
          <IconFatArrow />
          {section.title}
        </label>
        {section.binaryOptions &&
          <div
            className={`py-2 md:py-0 md:max-w-[50%] w-full flex justify-start md:justify-end gap-3 ${section.showRowOptions || section.showSlider ? "hidden" : "block"
              }`}>
            <BotonPreconsulta
              label="Sí"
              onClick={() => onQuestionActive(question, "Sí", true)}
              active={section.active}
            />
            <BotonPreconsulta
              label="No"
              onClick={() => onQuestionActive(question, "No", false)}
              active={section.active}
            />
          </div>
        }
        {section.showRowOptions && (
          <div className="flex gap-5 flex-row flex-wrap items-start justify-start md:justify-end py-1">
            {section.options?.map((option, index) => (
              <button
                key={index}
                className={`flex flex-row gap-3 items-center px-4 py-2 border-1 rounded-lg ${section.selectedOption === index ? "bg-green-300" : "bg-white"}`}
                onClick={() => onQuestionChange(question, index)}>
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
              onChange={(value) => onQuestionChange(question, value)}
            />
            <span className="h-12">
              <IconDolor />
            </span>
          </div>
        )}
      </div>
      {(section.active && section.subquestions) &&
        Object.keys(section.subquestions)?.map((subquestion, index) => (
          <PreconsultaSubquestion
            key={index}
            question={question}
            subquestion={subquestion}
            subquestionIndex={index}
            sectionIndex={sectionIndex}
            section={section.subquestions[subquestion]}
            onSubquestionChange={onSubquestionChange}
          />
        ))}
      {(section.active && !section.binaryOptions && section.options.length > 0) &&
        section.options.map((option, index) => (
          <SimpleQuestionBox
            key={index}
            index={index}
            question={question}
            label={option.label}
            selectedOption={section.selectedOption}
            onQuestionChange={onQuestionChange} />
        ))}
      {section.active && section.showTextInput && (
        <div className="animate-fade-in w-full flex justify-center">
          <textarea
            className="w-[96%] p-2 h-24 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg outline-[#a8a8a8]"
            placeholder={`Ingrese aquí una descripción`}
            // value={currentDescription}
            value={section.description}
            onChange={handleChangeDescription}
          />
        </div>
      )}
    </div>
  );
}

export default PreconsultaQuestion;
