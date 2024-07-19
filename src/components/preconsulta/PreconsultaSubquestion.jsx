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
      className={`animate-fade-in flex md:flex-row px-4 md:pl-20 py-4 ${section.options?.length > 0 ? "flex-col" : "flex-row"
        } `}>
      <div className="flex items-start md:flex-row w-[50%] gap-2">
        <IconCircle className="w-3" />
        {section.title && <p className="text-[#686868] font-medium text-base leading-4">
          hola
        </p>}
      </div>
      <div
        className={`${section.options?.length > 0
          ? "w-[50%] flex flex-row flex-wrap p-4 md:p-0"
          : "flex-row w-[20%]"
          } gap-4 items-start `}>
        {section.options.map((option, index) => (
          <div key={index} className="flex items-start gap-2">
            <input
              type="checkbox"
              id={`checkbox${index}${option.label}`}
              className="h-6 w-6 cursor-pointer border-gray-300 rounded"
              checked={section.selectedOption === index}
              onChange={() => onSubquestionChange(question, subquestion, index)}
            />
            <label for={`checkbox${index}${option.label}`} className="text-[#686868] cursor-pointer flex-1 font-medium text-base leading-4">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
