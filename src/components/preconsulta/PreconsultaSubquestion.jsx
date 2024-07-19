import IconCircle from "../icons/IconCircle";

export default function PreconsultaSubquestion({
  section,
  question,
  subquestion,
  sectionIndex,
  subquestionIndex,
  onSubquestionChange,
}) {
  const display = section.display ? section.display : '';
  return (
    <div className={`animate-fade-in flex items-start md:flex-row px-4 md:pl-20 py-4`}>
      {section.title && <div className="flex items-center md:flex-row w-[50%] gap-2">
        <IconCircle className="w-3" />
        <p className="text-[#686868] font-normal text-sm leading-4">
          {section.title}
        </p>
      </div>}
      <div
        className={`w-[50%] flex ${display === 'row' ? 'flex-row' : 'flex-col'} flex-wrap p-4 md:p-0 gap-4 items-start`}>
        {section.options.map((option, index) => (
          <div key={index} className="flex items-start gap-2">
            <input
              type="checkbox"
              id={`checkbox${index}${option.label}`}
              className="h-5 w-5 cursor-pointer"
              checked={section.selectedOption === index}
              onChange={() => onSubquestionChange(question, subquestion, index)}
            />
            <label htmlFor={`checkbox${index}${option.label}`} className="text-[#686868] cursor-pointer flex-1 font-normal text-sm leading-4">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
