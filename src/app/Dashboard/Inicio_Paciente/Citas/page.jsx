"use client";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import { addSchedules } from "@/redux/slices/doctor/schedules";
import { useRouter } from "next/navigation";

dayjs.locale("es");

export default function Citas() {
  const localizer = dayjsLocalizer(dayjs);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");

  const getSchedules = async (headers) => {
    try {
      const response = await ApiSegimed.get("/schedules", headers);

      if (response.data) {
        dispatch(addSchedules(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("a");
    if (token) {
      getSchedules({ headers: { token: token } });
    }
  }, []);

  const shedules = useAppSelector((state) => state.schedules);

  function mapSchedules(appointments) {
    const myID = Number(Cookies.get("c"));
    const citas = appointments
      .filter((appointment) => appointment.patient === myID)
      .map((appointment, index) => ({
        id: appointment.id,
        start: dayjs(appointment.scheduledStartTimestamp).toDate(),
        end: dayjs(appointment.scheduledEndTimestamp).toDate(),
        title: `evento ${index + 1}`,
      }));

    return citas;
  }

  const events = mapSchedules(shedules);

  const handleView = (newView) => {
    setView(newView);
  };

  const handleNavigation = (newDate, action) => {
    switch (action) {
      case "PREV":
        setDate(dayjs(newDate).subtract(1, "month").toDate());
        break;
      case "NEXT":
        setDate(dayjs(newDate).add(1, "month").toDate());
        break;
      case "TODAY":
        setDate(new Date());
        break;
      default:
        setDate(newDate);
        break;
    }
  };

  const dayStyle = (date) => {
    const today = dayjs().startOf("day");
    const currentDay = dayjs(date).startOf("day");
    if (currentDay.isSame(today)) {
      return {
        style: {
          backgroundColor: "#A0C4FF",
        },
      };
    }
    return {};
  };

  const CustomToolbar = ({ label, onNavigate, onView, view }) => {
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
      <div className="flex flex-col mb-2 rounded-xl gap-2">
        <div className="flex justify-between items-center bg-white rounded-lg p-2">
          <div className="space-x-4">
            <button
              className="bg-[#487FFA] text-white font-bold py-2 px-4 rounded-xl"
              onClick={() => onNavigate("PREV")}>
              Anterior
            </button>
          </div>
          <div className="space-x-4 hidden md:block">
            <button
              className={clsx(
                "border border-[#DCDBDB] font-bold py-2 px-4 rounded-xl hover:bg-[#70C247] hover:text-white transition duration-300",
                {
                  "bg-[#70C247] text-white": view === "month",
                  "bg-[#FAFAFC] text-[#5F5F5F]": view !== "month",
                }
              )}
              onClick={() => onView("month")}>
              Mes
            </button>
            <button
              className={clsx(
                "border border-[#DCDBDB] font-bold py-2 px-4 rounded-xl hover:bg-[#70C247] hover:text-white transition duration-300",
                {
                  "bg-[#70C247] text-white": view === "week",
                  "bg-[#FAFAFC] text-[#5F5F5F]": view !== "week",
                }
              )}
              onClick={() => onView("week")}>
              Semana
            </button>
            <button
              className={clsx(
                "border border-[#DCDBDB] font-bold py-2 px-4 rounded-xl hover:bg-[#70C247] hover:text-white transition duration-300",
                {
                  "bg-[#70C247] text-white": view === "day",
                  "bg-[#FAFAFC] text-[#5F5F5F]": view !== "day",
                }
              )}
              onClick={() => onView("day")}>
              Día
            </button>
          </div>
          <div>
            <button
              className="bg-[#487FFA] text-white font-bold py-2 px-4 rounded-xl"
              onClick={() => onNavigate("NEXT")}>
              Siguiente
            </button>
          </div>
        </div>
        <div className="flex justify-center text-lg font-semibold">
          {view === "day" ? formatLabel(label) : capitalizeFirstLetter(label)}
        </div>
      </div>
    );
  };

  return (
    <div className=" h-full flex flex-col items-center bg-[#FAFAFC]">
      <div className="h-full w-full md:px-10 py-5">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={handleView}
          onNavigate={handleNavigation}
          date={date}
          dayPropGetter={dayStyle}
          components={{
            toolbar: CustomToolbar,
          }}
          firstDay={1}
        />
      </div>
    </div>
  );
}
