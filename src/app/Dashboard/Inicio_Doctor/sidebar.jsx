"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";

import busqueda from "@/components/images/busqueda.png";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconNotificationsNav from "@/components/icons/IconNotificationsNav";

import { adduser } from "@/redux/slices/user/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAllPatients } from "@/redux/slices/doctor/allPatients";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import { addSchedules } from "@/redux/slices/doctor/schedules";
import avatar from "@/utils/defaultAvatar";
import { resetApp } from "@/redux/rootReducer";

import { socket } from "@/utils/socketio";
import { addAlarms } from "@/redux/slices/alarms/alarms";
import { addActivePtes } from "@/redux/slices/activePtes/activePtes";
import { NotificacionElement } from "@/components/InicioPaciente/NotificacionElement";
import { IconNotificaciones } from "@/components/InicioPaciente/IconNotificaciones";
import { addNotifications } from "@/redux/slices/user/notifications";
import Swal from "sweetalert2";

export const SideDoctor = ({ search, toggleSidebar }) => {
  const pathname = usePathname();
  const notifications = useAppSelector((state) => state.notifications);
  const user = useAppSelector((state) => state.user);
  // const adjustedPathname = pathname.startsWith('/Dash') ? pathname.slice(5) : pathname;
  const id = Cookies.get("c");
  const token = Cookies.get("a");
  const refreshToken = Cookies.get("d");

  // reemplazar pathname por adjustedPathname
  const showSearch =
    pathname === "/Dashboard/Inicio_Doctor/Pacientes" ||
    // pathname === "/Dashboard/Inicio_Doctor/Mensajes" ||
    pathname === "/Dashboard/Inicio_Doctor/Mensajes/crearMensaje" ||
    pathname === "/Dashboard/Inicio_Doctor/Historial" ||
    pathname === "/Dashboard/Inicio_Doctor/Historial/HistorialR";
  // reemplazar pathname por adjustedPathname
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const IsEvent = /^(\/inicio_Doctor\/Citas\/\d+)$/.test(pathname);
  const IsMessage = /^(\/inicio_Doctor\/Mensajes\/\d+)$/.test(pathname);

  const lastSegmentText = pathname
    .substring(pathname.lastIndexOf("/") + 1)
    .replace(/_/g, " ");

  const segments = pathname.split("/");
  const secondLastSegment =
    segments.length > 1 ? segments[segments.length - 2] : "";
  const formattedSegment = secondLastSegment.replace(/_/g, " ");

  const dispatch = useAppDispatch();

  const router = useRouter(); // Use the useRouter hook

  const getUser = async (headers) => {
    const response = await ApiSegimed.get(`/physician-info?id=${id}`, headers);
    // const response = await ApiSegimed.get(`/physician-info?id=4`, headers);

    if (response.data) {
      dispatch(adduser(response.data));
    }
  };
  const getPatients = async (headers) => {
    const response = await ApiSegimed.get(`/patients`, headers);
    if (response.data) {
      const pacientesFormateados = response.data.map((paciente) => {
        const fechaFormateada = new Date(paciente.lastLogin)
          .toLocaleString()
          .replace(/\,/g, " -");
        return { ...paciente, lastLogin: fechaFormateada };
      });
      dispatch(setAllPatients(pacientesFormateados));
    }
  };
  const getDoctorNotifications = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        `/all-notifications-physician?physicianId=` + id,
        headers
      );

      if (response.data) {
        dispatch(addNotifications(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };
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

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  // const getActivesAlarm = async (headers) => {
  //   try {
  //     const response = await ApiSegimed.get("/alarms-by-patient", headers);

  //     const actives = response.data.filter(
  //       (alarm) => alarm.solved === false
  //     ).length;
  //     const inactives = response.data.filter(
  //       (alarm) => alarm.solved === true
  //     ).length;
  //     const data = {
  //       activeAlarms: Number(actives),
  //       inactiveAlarms: Number(inactives),
  //     };

  //     dispatch(addAlarms(data));
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const getActivesAlarms = async (headers) => {
    try {
      const response = await ApiSegimed.get("/alarms-by-patient", headers);

      const actives = response.data?.alarms?.filter(
        (alarm) => alarm.solved === false
      ).length;
      const inactives = response.data?.alarms?.filter(
        (alarm) => alarm.solved === true
      ).length;
      const data = {
        activeAlarms: Number(actives),
        inactiveAlarms: Number(inactives),
      };

      dispatch(addAlarms(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getActivesPacientes = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        "/statistics-patient-activity",
        headers
      );

      dispatch(addActivePtes(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("a");
    const idUser = Cookies.get("c");
    const rol = Cookies.get("b");

    if (rol !== "Médico") {
      Cookies.remove("a");
      Cookies.remove("b");
      Cookies.remove("c");
      Cookies.remove("d");

      dispatch(resetApp());

      router.push("/");

      setTimeout(() => {
        // Realizar la recarga de la página para limpiar todos los datos
        window.location.reload(true);
      }, 2000);
      return;
    }

    if (token) {
      getUser().catch(console.error);
      getPatients().catch(console.error);
      getSchedules().catch(console.error);
      getActivesAlarms().catch(console.error);
      getActivesPacientes().catch(console.error);
      getDoctorNotifications().catch(console.error);
      if (!socket.isConnected()) {
        socket.setSocket(token, refreshToken, dispatch);
        socket.emit("onJoin", { id: idUser });
      }
    }
  }, []);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadNotifications = notifications?.filter(
    (notificacion) => !notificacion.state
  );
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationElementClick = (id) => {
    try {
      ApiSegimed.patch("/notification-seen", null, {
        params: {
          notification_Id: id,
        },
        headers: {
          token: token,
        },
      }).then((response) => {
        if (response.data) {
          dispatch(
            addNotifications(
              notifications.map((notificacion) =>
                notificacion._id === id
                  ? { ...notificacion, state: true }
                  : notificacion
              )
            )
          );
          Swal.fire({
            icon: "success",
            title: "Notificación leída",
            showConfirmButton: false,
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="md:pl-10 md:pr-16 flex bg-[#FAFAFC] items-center justify-between h-[12%] border-b-[1px] border-b-[#D7D7D7] p-4">
      <div className="lg:hidden p-4">
        <button
          className="text-[#B2B2B2] p-2 border rounded-lg focus:outline-none"
          onClick={toggleSidebar}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>{" "}
      <div className="flex items-center justify-center gap-4 text-lg font-semibold">
        <IconCurrentRouteNav className="hidden w-4 md:block" />
        {lastSegment === "Inicio_Doctor" ? (
          <p>Tablero</p>
        ) : lastSegment === "Mi_perfil" ? (
          <p>Mi Perfil</p>
        ) : lastSegment === "Citas" ? (
          <p>Mi Agenda</p>
        ) : lastSegment === "Soporte_tecnico" ? (
          <p>Soporte Técnico</p>
        ) : IsEvent ? (
          <p>Evento</p>
        ) : IsMessage ? (
          <p>Mensaje</p>
        ) : isNaN(lastSegment) ? (
          <p>{lastSegmentText}</p>
        ) : (
          <p>{formattedSegment}</p>
        )}
      </div>
      {showSearch && (
        <div
          className={`hidden md:flex justify-center items-center gap-2 border border-[#cecece] py-2 px-6 rounded-lg ${search}`}>
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Buscar pacientes"
            className="text-start text-[#808080] bg-[#FAFAFC] font-normal text-normal leading-6 outline-none"
            value={searchTerm}
          />
          <button>
            <Image src={busqueda} alt="" />
          </button>
        </div>
      )}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center w-12 h-12">
          <img
            src={user?.avatar !== null ? user.avatar : avatar}
            alt=""
            className="object-cover w-12 h-12 rounded-3xl "
          />
        </div>

        <div className="flex-col hidden md:flex">
          <span className="text-start ">
            {user?.name} {user?.lastname}
          </span>
          <span className="text-start text-[#808080]">Médico</span>
        </div>

        <button
          onClick={handleNotificationClick}
          className={`w-12 h-12 rounded-xl border-[1px] border-[#D7D7D7] flex items-center justify-center ${
            showNotifications && "bg-[#E73F3F]"
          }`}>
          <IconNotificaciones
            className="w-6 h-6"
            color={showNotifications && "white"}
          />
        </button>
        {showNotifications && (
          <div
            onClick={handleNotificationClick}
            className="fixed top-0 left-0 w-screen h-screen z-40">
            <div
              onClick={(e) => e.stopPropagation()}
              className="fixed flex flex-col gap-2 bg-red w-[90%] md:w-[30%] h-fit max-h-[55%] md:max-h-[50%] shadow-lg bg-white rounded-2xl px-4 z-50 top-[10%] right-[5%] md:right-[2%]">
              <p className="text-2xl text-bluePrimary font-semibold py-2">
                Notificaciones
              </p>
              <div className="w-full flex flex-col gap-4 max-h-[80%] overflow-y-auto">
                {unreadNotifications && unreadNotifications.length > 0 ? (
                  unreadNotifications.map((notificacion) => (
                    <NotificacionElement
                      key={notificacion._id}
                      notificacion={notificacion}
                      onClick={() =>
                        handleNotificationElementClick(notificacion._id)
                      }
                    />
                  ))
                ) : (
                  <p className="text-lg text-[#5F5F5F] text-center py-2">
                    No hay notificaciones por leer
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
