import IconCircle from "../icons/IconCircle";

export default function PreconsultaSubquestion({
  section,
  question,
  subquestion,
  sectionIndex,
  subquestionIndex,
  onSubquestionChange,
}) {
  return (
    <div
      className={`flex md:flex-row px-4 md:pl-20 py-4 ${subquestion.options?.length > 0 ? "flex-col" : "flex-row"
        } `}>
      <div className="self-start flex md:flex-row w-full md:w-[40%] gap-2 items-center">
        <IconCircle className="w-3" />
        <p className="text-[#686868] font-medium text-base leading-4">
          {subquestion.title}
        </p>
      </div>
      <div
        className={`${section.options?.length > 0
          ? "grid grid-cols-2 p-4 w-[100%] md:w-[100%]  md:p-0"
          : "flex-row w-[20%]"
          } gap-4 items-center `}>
        {section.options.map((option, index) => (
          <div key={index} className="flex gap-2 md:w-[60%] w-[90%]">
            <input
              type="checkbox"
              checked={section.selectedOption === index}
              onChange={() => onSubquestionChange(question, subquestion, index)}
            />
            <p className="text-[#686868] font-medium text-base leading-4">
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
