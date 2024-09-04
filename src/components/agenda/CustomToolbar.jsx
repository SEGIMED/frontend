import Elboton from "../Buttons/Elboton";
import IconNext from "../icons/IconNext";
import IconPrev from "../icons/IconPrev";
import clsx from "clsx";

export const CustomToolbar = ({ label, onNavigate, onView, view, title }) => {
  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatLabel = (label) => {
    const dateParts = label.split(" ");
    const [day, month, number] = dateParts;

    return `
        ${day.charAt(0).toUpperCase() + day.slice(1)},
        ${number} de
        ${month.charAt(0).toUpperCase() + month.slice(1)}`;
  };

  return (
    <div className={"flex flex-col rounded-lg gap-2 py-1 bg-white"}>
      <div className="flex justify-between items-center rounded-lg sm:px-10 py-1">
        <div className="space-x-1 md:space-x-4">
          <Elboton
            className="px-2 xs:px-4"
            icon={<IconPrev color="white" />}
            onPress={() => onNavigate("PREV")}
            nombre={"Anterior"}
          />
        </div>
        <div className="space-x-1 md:space-x-4">
          <button
            className={clsx(
              "border border-[#DCDBDB] font-bold font-Roboto py-2 text-sm md:text-base px-2 md:px-4 rounded-lg transition duration-300",
              {
                "bg-bluePrimary text-white": view === "day",
                "bg-[#FAFAFC] text-[#5F5F5F]": view !== "day",
              }
            )}
            onClick={() => onView("day")}>
            Día
          </button>
          <button
            className={clsx(
              "border border-[#DCDBDB] hidden lg:inline-block font-bold font-Roboto text-sm md:text-base py-2 px-2 md:px-4 rounded-lg transition duration-300",
              {
                "bg-bluePrimary text-white": view === "week",
                "bg-[#FAFAFC] text-[#5F5F5F]": view !== "week",
              }
            )}
            onClick={() => onView("week")}>
            Semana
          </button>
          <button
            className={clsx(
              "border  border-[#DCDBDB] font-bold font-Roboto text-sm md:text-base py-2 px-2 md:px-4 rounded-lg transition duration-300",
              {
                "bg-bluePrimary text-white": view === "month",
                "bg-[#FAFAFC] text-[#5F5F5F]": view !== "month",
              }
            )}
            onClick={() => onView("month")}>
            Mes
          </button>
        </div>
        <div>
          <Elboton
            className="px-2 xs:px-4"
            icon2={<IconNext color="white" />}
            onPress={() => onNavigate("NEXT")}
            nombre={"Siguiente"}
          />
        </div>
      </div>
      <div className={`flex justify-center text-lg font-semibold`}>
        {view === "day" ? formatLabel(label) : capitalizeFirstLetter(label)}
      </div>
    </div>
  );
};
