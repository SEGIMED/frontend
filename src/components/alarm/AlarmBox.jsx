"use client";
import IconCircle from "../icons/IconCircle";

export default function AlarmBox({
  array,
  title,
  categoryIndex,
  selectedAlarms,
  handleSelect,
  isDisabled
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">
      <h2 className="text-xl font-bold text-center pb-4 mb-4 border-b-2 w-full">
        {title}
      </h2>
      <span className="flex ml-4 w-full text-start items-center justify-start text-[#686868] font-medium mb-4">
        <IconCircle className="w-3" />{" "}
        <span className="ml-4">Seleccione el cuadro según sus síntomas</span>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {array?.map((alarm, index) => {
          const isSelected = selectedAlarms[categoryIndex] === index +1 ;
          let appliedClass = "";

          if (isSelected) {
            if (alarm.color.includes("red")) {
              appliedClass = "bg-[#E73F3F] border-red-500 border-2  text-white";
            } else if (alarm.color.includes("yellow")) {
              appliedClass = "bg-[#FFC900] text-white border-2 border-yellow-500";
            } else if (alarm.color.includes("green")) {
              appliedClass = "bg-[#70C247] border-2 border-green-500  text-white";
            }
          } else {
            if (alarm.color.includes("red")) {
              appliedClass = "bg-[#FFECEC] border-2 border-red-500 text-gray-700";
            } else if (alarm.color.includes("yellow")) {
              appliedClass =
                "bg-[#FFF8DC] border-2 border-yellow-500 text-gray-700";
            } else if (alarm.color.includes("green")) {
              appliedClass =
                "bg-[#E9FFDD] border-2 border-green-500 text-gray-700";
            }
          }

          return (
            <div
              key={index}
              onClick={() => !isDisabled && handleSelect(categoryIndex, index)}
              className={`p-4 cursor-pointer transition-all duration-300 ease-in-out rounded-lg ${appliedClass}`}>
              <h3
                className={`flex font-bold mb-2 items-center justify-center gap-2 ${isSelected ? "text-white" : "text-gray-700"
                  }`}>
                {alarm.title}
              </h3>
              <ul
                className={`list-disc list-inside ${isSelected ? "text-white" : "text-gray-700"
                  }`}>
                {alarm?.description?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
