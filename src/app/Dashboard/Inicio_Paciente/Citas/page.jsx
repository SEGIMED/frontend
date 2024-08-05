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
import Elboton from "@/components/Buttons/Elboton";
import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import IconMas from "@/components/icons/iconMas";
import ModalConsultationCalendar from "@/components/modal/ModalDoctor/ModalConsultationCalendar";

dayjs.locale("es");

export default function Citas({ title }) {
  const localizer = dayjsLocalizer(dayjs);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = Cookies.get("c");
  const doctoresLista = useAppSelector((state) => state.doctores.doctores);

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState();
  const minHour = new Date().setHours(8, 0, 0);
  const maxHour = new Date().setHours(21, 0, 0);
  const getSchedules = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        `/schedules?patientId=${userId}`,
        headers
      );

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewAppointment = () => {
    const today = new Date();

    setDateSelected(today);
    setIsModalOpen(true);
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
  const shedules = useAppSelector((state) => state.schedules);
  function mapSchedules(appointments) {
    const myID = Number(Cookies.get("c"));

    const citas = appointments
      .filter((appointment) => {
        const startDateTime = dayjs(
          appointment.scheduledStartTimestamp
        ).toDate();
        const endDateTime = dayjs(appointment.scheduledEndTimestamp).toDate();

        // Comprobar si las horas de inicio y fin están dentro del rango permitido
        const startTime =
          startDateTime.getHours() * 60 + startDateTime.getMinutes();
        const endTime = endDateTime.getHours() * 60 + endDateTime.getMinutes();

        const minTime =
          new Date(minHour).getHours() * 60 + new Date(minHour).getMinutes();
        const maxTime =
          new Date(maxHour).getHours() * 60 + new Date(maxHour).getMinutes();

        return (
          appointment.patient === myID &&
          appointment.schedulingStatus === 1 &&
          startTime >= minTime &&
          endTime <= maxTime
        );
      })
      .map((appointment) => ({
        id: appointment.id,
        start: dayjs(appointment.scheduledStartTimestamp).toDate(),
        end: dayjs(appointment.scheduledEndTimestamp).toDate(),
        title: `${appointment.patientUser.name} ${appointment.patientUser.lastname}`,
      }));

    return citas;
  }
  function mapSchedules(appointments) {
    const myID = Number(Cookies.get("c"));
    console.log(appointments);
    const citas = appointments
      .filter(
        (appointment) =>
          appointment.patient === myID && appointment.schedulingStatus === 1
      )
      .map((appointment, index) => ({
        id: appointment.id,
        start: dayjs(appointment.scheduledStartTimestamp).toDate(),
        end: dayjs(appointment.scheduledEndTimestamp).toDate(),
        title: `${appointment.physicianThatAttend.name} ${appointment.physicianThatAttend.lastname}`,
      }));

    return citas;
  }

  const events = mapSchedules(shedules);

  const handleSelectSlot = ({ start, end }) => {
    if (dayjs(start).isBefore(dayjs(), "minute")) {
      return;
    }
    setDateSelected(start);
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
                "border border-[#DCDBDB] hidden lg:inline-block font-bold font-Roboto text-sm md:text-base py-2 px-2 md:px-4 rounded-xl transition duration-300",
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
        <div className={`flex justify-center text-lg font-semibold`}>
          {view === "day" ? formatLabel(label) : capitalizeFirstLetter(label)}
        </div>
      </div>
    );
  };

  const EventComponent = ({ event }) => {
    return (
      <div>
        <p className="text-sm font-bold">{event.title}</p>
      </div>
    );
  };
  const dayFormat = (date, culture, localizer) => {
    const formattedDate = localizer.format(date, "D MMMM", culture);
    const [day, month] = formattedDate.split(" ");
    const firstLetter = month.charAt(0).toUpperCase();
    return `${day} ${firstLetter}${month.slice(1)}`;
  };
  const weekdayFormat = (date, culture, localizer) => {
    const formattedDate = localizer.format(date, "dddd", culture);
    return `${formattedDate.charAt(0).toUpperCase()}${formattedDate.slice(1)}`;
  };
  return (
    <div
      className={` flex flex-col font-Montserrat items-center ${
        title ? "bg-white" : "bg-[#FAFAFC]"
      } rounded-2xl ${title ? "h-screen" : "h-full"} `}>
      <div className={`h-[90%] w-full rounded-2xl ${title && "bg-white"}`}>
        <Calendar
          localizer={localizer}
          events={events}
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
            className=" w-fit text-white px-4 py-2 gap-2 bg-greenPrimary items-center  rounded-3xl justify-center flex">
            {" "}
            <IconMas />
            Nueva consulta
          </button>
        </div>
      ) : null}

      <ModalConsultationCalendar
        isOpen={isModalOpen}
        onClose={closeModal}
        physician={userId}
        dateSelect={dateSelected}
        lista={doctoresLista}
        title={"Médico"}
        stateName={"doctor"}
      />
    </div>
  );
}
