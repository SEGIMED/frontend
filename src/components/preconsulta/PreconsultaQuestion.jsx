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

const SimpleQuestionBox = ({ question, title, index, selectedOption, onQuestionChange }) => {
  const [binaryButtonsActive, setBinaryButtonsActive] = useState({
    si: false,
    no: false,
  });

  return (
    <div className="flex md:flex-row px-4 md:pl-20 py-4 flex-col">
      <div className="self-start flex md:flex-row w-full md:w-[40%] gap-2 items-center">
        <IconCircle className="w-3" />
        <p className="text-[#686868] font-medium text-base leading-4">
          {title}
        </p>
      </div>
      <div className="grid grid-cols-2 p-4 w-[100%] md:w-[100%]  md:p-0 gap-4 items-center">
        <div key={index} className="flex gap-2 md:w-[60%] w-[90%]">
          <input
            type="checkbox"
            checked={selectedOption === index}
            onChange={() => onQuestionChange(question, index)}
          />
        </div>
      </div>
    </div>
  )
}

function PreconsultaQuestion({ question, section, sectionIndex, onQuestionActive, onSubquestionChange, onQuestionChange, onDescriptionChange }) {
  const [currentDescription, setCurrentDescription] = useState('');

  const handleChangeDescription = (e) => {
    setCurrentDescription(e.target.value);
    onDescriptionChange(question, e.target.value);
  }
  const handleSubquestionFieldChange = (subquestionIndex, field, value) => {
    onSubquestionChange(sectionIndex, subquestionIndex, field, value);
  };
  const iconMap = {
    Mal: <IconMalFace className="w-8" />,
    Regular: <IconRegularFace className="w-8" />,
    Normal: <IconNormalFace className="w-8" />,
    Bien: <IconBienFace className="w-8" />,
  };

  return (
    <div
      className={`flex ${section.showRowOptions || section.showSlider ? "flex-row" : "flex-col"
        }`}>
      <div className="flex flex-col w-[100%] justify-between md:flex-row md:gap-2 px-6 md:px-8 md:py-2 border-b-[#cecece]">
        <label className="text-start py-4 md:py-0 w-full md:w-[50%] text-[#686868] font-bold text-lg leading-4 flex gap-2 items-center">
          <IconFatArrow /> {section.title}
        </label>
        {section.binaryOptions && <div
          className={`py-2 md:py-0 flex justify-evenly md:gap-3 ${section.showRowOptions || section.showSlider ? "hidden" : "block"
            }`}>
          <BotonPreconsulta
            label="Sí"
            onClick={() => onQuestionActive(question, true)}
            active={section.active}
          />
          <BotonPreconsulta
            label="No"
            onClick={() => onQuestionActive(question, false)}
            active={section.active}
          />
        </div>}
        {section.showRowOptions && (
          <div className="md:flex grid grid-cols-2 md:flex-row md:justify-between w-full md:w-[60%] py-1">
            {section.options?.map((option, index) => (
              <button
                key={index}
                className={`flex flex-row gap-3 items-center px-4 py-4 md:py-2 border-1 rounded-xl shadow-md ${section.selectedOption === index && "bg-green-300"
                  }`}
                onClick={() => onQuestionChange(question, index)}>
                <p className="text-[#686868] font-medium text-base md:text-lg leading-4">
                  {option.label}
                </p>
                {iconMap[option.label]}
              </button>
            ))}
          </div>
        )}
        {section.showSlider && (
          <div className="items-center w-full md:w-[50%] space-x-2 flex">
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
            title={option.label}
            selectedOption={section.selectedOption}
            onQuestionChange={onQuestionChange} />
        ))}
      {section.active && section.showTextInput && (
        <div className="w-full flex justify-center">
          <textarea
            className="w-[96%] p-2 h-24 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg outline-[#a8a8a8]"
            placeholder={`Ingrese aquí una descripción`}
            value={currentDescription}
            onChange={handleChangeDescription}
          />
        </div>
      )}
    </div>
  );
}

export default PreconsultaQuestion;
