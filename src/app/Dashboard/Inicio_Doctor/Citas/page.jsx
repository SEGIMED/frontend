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
import ModalConsultationCalendar from "@/components/modal/ModalDoctor/ModalConsultationCalendar";
import { PathnameShow } from "@/components/pathname/path";
import Elboton from "@/components/Buttons/Elboton";
import IconNext from "@/components/icons/IconNext";
import IconPrev from "@/components/icons/IconPrev";

dayjs.locale("es");

export default function Citas({ title }) {
  const localizer = dayjsLocalizer(dayjs);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const lastSegmentTextToShow = PathnameShow();

  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState();
  const [view, setView] = useState("month");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const eventStyle = (event) => ({
  //     style:{
  //         backgroundColor: event.color,
  //         // border: "#5F5F5F 2px solid",
  //         color: "#5F5F5F",
  //         fontWeight: "bold",
  //         boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)"

  //     },
  // })

  const handleSelectSlot = ({ start, end }) => {
    setDateSelected(start);
    setIsModalOpen(true);
  };

  const userId = Cookies.get("c");

  const shedules = useAppSelector((state) => state.schedules);

  function mapSchedules(appointments) {
    const myID = Number(Cookies.get("c"));

    const citas = appointments
      .filter((appointment) => appointment.physician === myID)
      .map((appointment) => ({
        id: appointment.id,
        start: dayjs(appointment.scheduledStartTimestamp).toDate(),
        end: dayjs(appointment.scheduledEndTimestamp).toDate(),
        title: `${appointment.reasonForConsultation}`,
      }));

    return citas;
  }

  const events = mapSchedules(shedules);

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

  const handleViewChange = (newView) => {
    setView(newView);
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
      <div className={"flex flex-col rounded-xl gap-2 py-1 bg-white"}>
        <title>{lastSegmentTextToShow}</title>
        {title && <p className="text-sm md:text-lg text-center">{title}</p>}
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
                "border border-[#DCDBDB] font-bold font-Roboto py-2 text-sm md:text-base px-2 md:px-4 rounded-xl transition duration-300",
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
                "border border-[#DCDBDB] font-bold font-Roboto text-sm md:text-base py-2 px-2 md:px-4 rounded-xl transition duration-300",
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
                "border  border-[#DCDBDB] font-bold font-Roboto text-sm md:text-base py-2 px-2 md:px-4 rounded-xl transition duration-300",
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
      </div>
    );
  };

  return (
    <div className=" flex flex-col items-center bg-[#FAFAFC] rounded-2xl h-screen">
      <div className={`h-[90%] w-full rounded-2xl ${title && "bg-white"}`}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={handleViewChange}
          onNavigate={handleNavigation}
          date={date}
          onSelectSlot={handleSelectSlot}
          selectable
          className="h-full w-full"
          dayPropGetter={dayStyle}
          components={{
            toolbar: CustomToolbar,
          }}
          firstDay={1}
        />
      </div>
      <ModalConsultationCalendar
        isOpen={isModalOpen}
        onClose={closeModal}
        physician={userId}
        dateSelect={dateSelected}
      />
    </div>
  );
}
