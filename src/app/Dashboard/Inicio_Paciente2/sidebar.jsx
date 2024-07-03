"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import { adduser } from "@/redux/slices/user/user";
import { getAllDoctores } from "@/redux/slices/doctor/allDoctores";
import { addSchedules } from "@/redux/slices/doctor/schedules";
import { ApiSegimed } from "@/Api/ApiSegimed";
import busqueda from "@/components/images/busqueda.png";
import Cookies from "js-cookie";
import { socket } from "@/utils/socketio";
import AvatarSideBar from "@/components/avatar/avatarSideBar";
import paciente from "@/utils/paciente";
import LogoSegimed from "@/components/logo/LogoSegimed";
import { IconChat } from "@/components/InicioPaciente/IconChat";
import { IconNotificaciones } from "@/components/InicioPaciente/IconNotificaciones";
import IconRegresar from "@/components/icons/iconRegresar";
import rutas from "@/utils/rutas";
import { NotificacionElement } from "@/components/InicioPaciente/NotificacionElement";

export const SidePte = ({ search, toggleSidebar }) => {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user);
  const showSearch =
    pathname === "/Inicio_Paciente/Doctores" ||
    pathname === "/Inicio_Paciente/Mensajes" ||
    pathname === "/Inicio_Paciente/Mensajes/crearMensaje" ||
    pathname === "/Inicio_Paciente/Historial";
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const lastSegmentText = pathname
    .substring(pathname.lastIndexOf("/") + 1)
    .replace(/_/g, " ");

  console.log(lastSegment);

  const avatar =
    "https://psicoaroha.es/wp-content/uploads/2021/12/perfil-empty.png";

  // Obteniendo la parte de la ruta antes del último segmento
  const pathBeforeLastSegment = pathname.substring(
    0,
    pathname.lastIndexOf("/")
  );

  // Obteniendo el segmento a mostrar
  const segmentToShow = lastSegment.match(/^\d+$/)
    ? pathBeforeLastSegment.substring(
        pathBeforeLastSegment.lastIndexOf("/") + 1
      )
    : lastSegment;

  const dispatch = useAppDispatch();
  const id = Cookies.get("c");
  const token = Cookies.get("a");

  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  const obtenerUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(mostrarUbicacion, mostrarError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const mostrarUbicacion = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLatitud(lat);
    setLongitud(lon);
    enviarUbicacion(lat, lon); // Llama a la función para enviar la ubicación al servidor
  };

  const mostrarError = (error) => {
    console.error("Error al obtener la ubicación:", error);
  };

  const enviarUbicacion = async (lat, lon) => {
    try {
      const headers = { headers: { token: token } };
      const body = {
        geolocation: JSON.stringify([lat, lon]),
        patientId: Number(id),
      };

      const response = await ApiSegimed.patch(
        "/update-full-patient",
        body,
        headers
      );
    } catch (error) {
      console.error("Error de red:", error);
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

  const getUser = async (headers) => {
    const response1 = await ApiSegimed.get(
      `/patient-details?id=${id}`,
      headers
    );
    const response2 = await ApiSegimed.get(`/patient/${id}`, headers);
    // const response1= await ApiSegimed.get("/patient-details?id=8", headers);
    const combinedData = {
      ...response1.data,
      ...response2.data,
      anthropometricDetails:
        response1.data.anthropometricDetails.length > 0
          ? response1.data.anthropometricDetails
          : paciente.anthropometricDetails || [],
      vitalSigns:
        response1.data.vitalSigns.length > 0
          ? response1.data.vitalSigns
          : paciente.vitalSigns || [],
      sociodemographicDetails:
        response1.data.sociodemographicDetails ||
        paciente.sociodemographicDetails ||
        {},
      backgrounds: response1.data.backgrounds || paciente.backgrounds || {},
      patientPulmonaryHypertensionGroups:
        response1.data.patientPulmonaryHypertensionGroups.length > 0
          ? response1.data.patientPulmonaryHypertensionGroups
          : paciente.patientPulmonaryHypertensionGroups || {},
      patientPulmonaryHypertensionRisks:
        response1.data.patientPulmonaryHypertensionRisks.length > 0
          ? response1.data.patientPulmonaryHypertensionRisks
          : paciente.patientPulmonaryHypertensionRisks || {},
      patientCardiovascularRisks:
        response1.data.patientCardiovascularRisks.length > 0
          ? response1.data.patientCardiovascularRisks
          : paciente.patientCardiovascularRisks || {},
      patientSurgicalRisks:
        response1.data.patientSurgicalRisks.length > 0
          ? response1.data.patientSurgicalRisks
          : paciente.patientSurgicalRisks || {},
      lastMedicalEventDate:
        response1.data.lastMedicalEventDate ||
        paciente.lastMedicalEventDate ||
        null,
      currentPhysician:
        response1.data.currentPhysician || paciente.currentPhysician || {},
      cellphone: response1.data.cellphone || paciente.cellphone || null,
      currentLocationCity:
        response1.data.currentLocationCity ||
        paciente.currentLocationCity ||
        null,
      currentLocationCountry:
        response1.data.currentLocationCountry ||
        paciente.currentLocationCountry ||
        null,
      lastLogin: response1.data.lastLogin || paciente.lastLogin || null,
    };
    dispatch(adduser(combinedData));
    // dispatch(adduser({ ...response1.data, ...response2.data, ...paciente }));
  };
  // console.log(user)
  const getAllDoc = async (headers) => {
    const response = await ApiSegimed.get("/all-physicians", headers);
    if (response.data) {
      dispatch(getAllDoctores(response.data));
    }
  };

  useEffect(() => {
    obtenerUbicacion();
    const idUser = Cookies.get("c");

    if (token) {
      getUser({ headers: { token: token } }).catch(console.error);
      getAllDoc({ headers: { token: token } }).catch(console.error);
      getSchedules({ headers: { token: token } }).catch(console.error);
      if (!socket.isConnected()) {
        socket.setSocket(token, dispatch);
      }
    }
  }, []);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  const Notificaciones = [
    {
      text: "Su turno con el Dr. Tomas Vanegas fue postergado para el dia 19/7/2024 a las 14:30 hs",
      id: 1,
      leida: false,
    },
    {
      text: "Su turno con el Dr. Tomas Vanegas fue postergado para el dia 19/7/2024 a las 18:30 hs",
      id: 2,
    },
    {
      text: "Su turno con el Dr. Tomas Vanegas fue postergado para el dia 19/7/2024 a las 20:30 hs",
      id: 3,
    },
    {
      text: "Su turno con el Dr. Tomas Vanegas fue postergado para el dia 19/7/2024 a las 20:30 hs",
      id: 3,
    },
    {
      text: "Su turno con el Dr. Tomas Vanegas fue postergado para el dia 19/7/2024 a las 20:30 hs",
      id: 4,
    },
    {
      text: "Su turno con el Dr. Tomas Vanegas fue postergado para el dia 19/7/2024 a las 20:30 hs",
      id: 5,
    },
  ];
  return (
    <div className=" flex  items-center justify-between h-[12%]  border-b-[1px] border-b-[#cecece] p-4 md:px-8">
      <div className="flex justify-center items-center gap-2">
        {lastSegment !== "Inicio_Paciente2" ? (
          <div>
            <Link href={`${rutas.PacienteDash}2`}>
              <button className="flex rounded-xl items-center px-6 py-2 font-bold text-sm leading-5 bg-[#487FFA] text-white gap-1">
                <IconRegresar /> Regresar
              </button>
            </Link>
          </div>
        ) : (
          <Link href={`${rutas.PacienteDash}2`}>
            <LogoSegimed className="w-[60%]" />
          </Link>
        )}
      </div>
      {lastSegment !== "Inicio_Paciente2" ? (
        <p className="font-semibold text-xl leading-6 text-[#686868]">
          {lastSegmentText}
        </p>
      ) : null}

      {showSearch && (
        <div
          className={`flex justify-center items-center gap-2 border border-[#cecece] py-2 px-6 rounded-lg ${search}`}>
          <input
            type="text"
            placeholder="Buscar doctores"
            className="text-start text-[#808080] font-normal text-normal leading-6 outline-none"
          />
          <button>
            <Image src={busqueda} alt="" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center gap-5">
        <div className="w-12 h-12 flex justify-center items-center">
          <Link href={`${rutas.PacienteDash}2${rutas.Mi_Perfil}`}>
            <AvatarSideBar
              avatar={user?.avatar !== null ? user.avatar : avatar}
            />
          </Link>
        </div>
        <div className=" flex-col hidden md:flex">
          <span className="text-start text-[#686868] font-normal text-lg leading-6">
            {user?.name} {user?.lastname}
          </span>
          <span className="text-start text-[#808080] font-normal text-sm leading-6">
            {user.role === 3 ? "Paciente" : ""}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="w-12 h-12 rounded-xl border-[1px] border-[#D7D7D7] flex items-center justify-center">
            <IconChat className="w-6 h-6" />
          </button>
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
                  {Notificaciones.map((notificacion) => (
                    <NotificacionElement
                      key={notificacion.id}
                      notificacion={notificacion}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
