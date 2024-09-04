"use client";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";
import ModalConsultationCalendar from "@/components/modal/ModalDoctor/ModalConsultationCalendar";
import IconMas from "@/components/icons/iconMas";
import { useState } from "react";
import { CustomToolbar } from "./CustomToolbar";
import {
  dayFormat,
  mapSchedules,
  maxHour,
  minHour,
  weekdayFormat,
} from "./utils";
import ModalConsultation from "../modal/ModalDoctor/ModalConsultation";
dayjs.locale("es");

const localizer = dayjsLocalizer(dayjs); // Add this line to define the localizer

const Agenda = ({ schedules, title }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConsultationOpen, setIsModalConsultationOpen] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState({});
  const [dateSelected, setDateSelected] = useState();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectSlot = ({ start, end }) => {
    if (dayjs(start).isBefore(dayjs(), "minute")) {
      return;
    }
    setDateSelected(start);
    setIsModalOpen(true);
  };
  const handleSelectedEvent = (event) => {
    setSelectedConsulta(event);
    setIsModalConsultationOpen(true);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "#E9EFFF"; // Fondo claro
    let borderColor = "#5272E9"; // Borde izquierdo azul

    if (isSelected) {
      backgroundColor = "#dce9ff"; // Fondo claro cuando está seleccionado
      borderColor = "#77A6F7"; // Borde izquierdo azul claro cuando está seleccionado
    }

    return {
      style: {
        backgroundColor: backgroundColor,
        fontFamily: "Montserrat",
        borderLeft: `5px solid ${borderColor}`, // Borde izquierdo de 5px
        borderRadius: "5px",
        opacity: 1,
        color: "#5272E9",
        borderColor: "#5272E9",
        fontWeight: "500",
        display: "block",
        padding: "5px", // Espaciado interno
      },
    };
  };

  const handleNewAppointment = () => {
    const today = new Date();
    setDateSelected(today);
    setIsModalOpen(true);
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
  const handleViewChange = (newView) => {
    setView(newView);
  };

  const dayStyle = (date) => {
    const today = dayjs().startOf("day");
    const currentDay = dayjs(date).startOf("day");
    if (currentDay.isSame(today)) {
      return {
        style: {
          backgroundColor: "#FAFAFC",
        },
        // style: {
        //   backgroundColor: `5px solid white`,
        //   borderLeft: `5px solid #487ffa`, // Borde izquierdo de 5px
        //   borderRadius: "5px",
        //   opacity: 1,
        //   color: "black",
        //   border: "0px",
        //   display: "block",
        //   padding: "5px", // Espaciado interno
        // },
      };
    }
    if (currentDay.isBefore(today)) {
      return {
        style: {
          backgroundColor: "#FAFAFC",
        },
      };
    }
    return {};
  };

  const EventComponent = ({ event }) => {
    return (
      <div>
        <p className="text-sm font-bold">{event.title}</p>
      </div>
    );
  };
  return (
    <div
      className={` flex flex-col font-Montserrat items-center ${title ? "bg-white" : "bg-[#FAFAFC]"
        } rounded-2xl ${title ? "h-screen" : "h-full"} `}>
      {title && <p className="text-sm md:text-lg text-center">{title}</p>}

      <div className={`h-[90%] w-full rounded-2xl ${title && "bg-white"}`}>
        <Calendar
          localizer={localizer}
          events={mapSchedules(schedules)}
          formats={{
            dayFormat,
            weekdayFormat,
          }}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={handleViewChange}
          onNavigate={handleNavigation}
          date={date}
          eventPropGetter={eventStyleGetter} // Aquí se añaden los estilos
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(e) => handleSelectedEvent(e)}
          selectable
          allDayAccessor=""
          className="h-full w-full"
          dayPropGetter={dayStyle}
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
          }}
          slotPropGetter={() => ({
            style: {
              minHeight: "50px",
            },
          })}
          messages={{
            showMore: (total, remainingEvents, events) => `+${total} más`,
          }}
          firstDay={1}
          min={minHour}
          max={maxHour}
        />
      </div>
      {!title ? (
        <div className="w-full flex justify-center px-6 py-3 ">
          <button
            onClick={handleNewAppointment}
            className=" w-fit text-white font-Roboto font-bold text-xl leading-5 px-4 py-2 gap-2 bg-greenPrimary items-center rounded-3xl justify-center flex">
            {" "}
            <IconMas />
            Nueva consulta
          </button>
        </div>
      ) : null}

      {isModalOpen && (
        <ModalConsultationCalendar
          isOpen={isModalOpen}
          onClose={closeModal}
          dateSelect={dateSelected}
        />
      )}
      {isModalConsultationOpen && (
        <ModalConsultation
          consulta={selectedConsulta}
          isOpen={isModalConsultationOpen}
          readOnly={true}
          onClose={() => setIsModalConsultationOpen(false)}
        />
      )}
    </div>
  );
};

export default Agenda;
