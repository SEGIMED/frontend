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

export default function PreconsultaQuestion({
  section,
  sectionIndex,
  onQuestionChange,
  onSubquestionChange,
}) {
  const handleQuestionFieldChange = (field, value) => {
    onQuestionChange(sectionIndex, field, value);
  };

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
      className={`flex ${
        section.showRowOptions || section.showSlider ? "flex-row" : "flex-col"
      }`}>
      <div className="flex flex-col w-[100%] justify-between md:flex-row md:gap-2 px-6 md:px-8 md:py-2 border-b-[#cecece]">
        <label className="text-start py-4 md:py-0 w-full md:w-[50%] text-[#686868] font-bold text-lg leading-4 flex gap-2 items-center">
          <IconFatArrow /> {section.title}
        </label>
        <div
          className={`py-2 md:py-0 flex justify-evenly md:gap-3 ${
            section.showRowOptions || section.showSlider ? "hidden" : "block"
          }`}>
          <BotonPreconsulta
            label="Sí"
            onClick={() => handleQuestionFieldChange("active", true)}
            active={section.active}
          />
          <BotonPreconsulta
            label="No"
            onClick={() => handleQuestionFieldChange("active", false)}
            active={!section.active}
          />
        </div>
        {section.showRowOptions && (
          <div className="md:flex grid grid-cols-2 md:flex-row md:justify-between w-full md:w-[60%] py-1">
            {section.options?.map((option, index) => (
              <button
                key={index}
                className={`flex flex-row gap-3 items-center px-4 py-4 md:py-2 border-1 rounded-xl shadow-md ${
                  section.selectedOption === index && "bg-green-300"
                }`}
                onClick={() =>
                  handleQuestionFieldChange("selectedOption", index)
                }>
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
              onChange={(value) =>
                handleQuestionFieldChange("selectedOption", value)
              }
            />
            <span className="h-12">
              <IconDolor />
            </span>
          </div>
        )}
      </div>
      {section.active &&
        !section.showTextInput &&
        section.subquestions?.map((subquestion, subquestionIndex) => (
          <PreconsultaSubquestion
            key={subquestionIndex}
            subquestion={subquestion}
            subquestionIndex={subquestionIndex}
            sectionIndex={sectionIndex}
            section={section}
            onSubquestionChange={onSubquestionChange}
            onQuestionChange={onQuestionChange}
          />
        ))}
      {section.showTextInput && section.active && (
        <div className="w-full flex justify-center">
          <textarea
            className="w-[96%] p-2 h-24 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg outline-[#a8a8a8]"
            placeholder={`Ingrese aquí sus anotaciones sobre el`}
            value={section.text || ""}
            onChange={(e) => handleQuestionFieldChange("text", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
