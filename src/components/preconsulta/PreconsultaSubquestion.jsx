"use client";
import IconCircle from "../icons/IconCircle";
import Cookies from "js-cookie";

export default function PreconsultaSubquestion({
  section, // Subquestion section data
  question, // Parent question key
  subquestion, // Subquestion key
  sectionIndex, // Parent question index
  subquestionIndex, // Subquestion index
  onSubquestionChange, // Handler for subquestion change
}) {
  const display = section.display ? section.display : "";
  const role = Cookies.get("b"); // Get role from cookies

  return (
    <div
      className={`animate-fade-in flex items-start md:flex-row flex-col px-4 md:pl-20 py-4`}>
      {section.title && (
        <div className="flex items-center md:flex-row md:w-[50%] gap-2">
          <IconCircle className="w-3" />
          <p className="text-[#686868] font-normal text-sm leading-4">
            {section.title}
          </p>
        </div>
      )}
      <div
        className={`md:w-[50%] flex ${
          display === "row" ? "flex-row" : "flex-col"
        } flex-wrap p-4 md:p-0 gap-4 items-start`}>
        {section.options.map((option, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              section.selectedOption === index ? "bg-blue-100" : ""
            }`} // Apply background if selected
          >
            <input
              type="checkbox"
              id={`checkbox${index}${option.label}`}
              className="h-5 w-5 cursor-pointer"
              checked={section.selectedOption === index}
              onChange={() => {
                if (role === "Paciente") {
                  onSubquestionChange(question, subquestion, index); // Trigger subquestion change handler
                }
              }}
              disabled={role !== "Paciente"} // Disable if role is not "Paciente"
            />
            <label
              htmlFor={`checkbox${index}${option.label}`}
              className={`text-[#686868] flex-1 font-normal text-sm leading-4 ${
                role !== "Paciente" ? "cursor-default" : "cursor-pointer"
              } ${
                section.selectedOption === index
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
