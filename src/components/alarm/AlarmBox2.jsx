"use client"


import IconCircle from "../icons/IconCircle";
import IconAlarmSelected from "../icons/iconAlarmSelected";
import IconAlarmNotSelected from "../icons/iconAlarmaNotSelected";

export default function AlarmBox2({ array, title, selectedAlarms, handleSelect }) {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">
      <h2 className="text-xl font-bold text-center pb-4 mb-4 border-b-2 w-full">{title}</h2>
      <span className="flex ml-4 w-full text-start items-center justify-start text-[#686868] font-medium mb-4">
        <IconCircle /> <span className="ml-4"> Seleccione el cuadro según sus síntomas</span>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {array?.map((alarm, index) => (
          <div
            key={index}
            onClick={() => handleSelect(title, index)}
            className={`p-4 border-2 cursor-pointer transition-all duration-300 ease-in-out rounded-lg ${
              selectedAlarms[title] === index ? alarm.selectedColor : alarm.color
            } ${selectedAlarms[title] === index ? 'text-white' : ''}`}
          >
            <h3 className="flex font-bold mb-2 items-center justify-center gap-2">
              {selectedAlarms[title] === index ? <IconAlarmSelected /> : <IconAlarmNotSelected />} {alarm.title}
            </h3>
            <ul className={`list-disc list-inside ${selectedAlarms[title] === index ? 'text-white' : ''}`}>
              {alarm?.description?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
