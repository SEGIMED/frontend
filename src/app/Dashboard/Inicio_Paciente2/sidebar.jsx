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
import { IconNotificaciones } from "@/components/InicioPaciente/notificaciones/IconNotificaciones";
import IconRegresar from "@/components/icons/iconRegresar";
import rutas from "@/utils/rutas";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import avatar from "@/utils/defaultAvatar";
import { resetApp } from "@/redux/rootReducer";
import { useRouter } from "next/navigation";

import ModalBoarding from "@/components/modal/ModalPatient/ModalBoarding";

import { NotificacionElement } from "@/components/InicioPaciente/notificaciones/NotificacionElement";
import { addNotifications } from "@/redux/slices/user/notifications";
import NotificacionesContainer from "@/components/InicioPaciente/notificaciones/NotificacionesContainer";

export const SidePte = ({ search }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user);
  const notifications = useAppSelector((state) => state.notifications);
  const showSearch =
    pathname === "/Inicio_Paciente/Doctores" ||
    pathname === "/Inicio_Paciente/Mensajes" ||
    pathname === "/Inicio_Paciente/Mensajes/crearMensaje" ||
    pathname === "/Inicio_Paciente/Historial";
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const lastSegmentText = pathname
    .substring(pathname.lastIndexOf("/") + 1)
    .replace(/_/g, " ");

  // console.log(lastSegment);

  const [isMobile, setIsMobile] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
  const refreshToken = Cookies.get("d");

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
      const response = await ApiSegimed.get(
        `/schedules?patientId=${id}`,
        headers
      );

      if (response.data) {
        dispatch(addSchedules(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPatientNotifications = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        `/all-notifications-patient?patientId=15`,
        headers
      );

      if (response.data) {
        dispatch(addNotifications(response.data));
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
        response1.data.anthropometricDetails?.length > 0
          ? response1.data.anthropometricDetails
          : paciente.anthropometricDetails || [],
      vitalSigns:
        response1.data.vitalSigns?.length > 0
          ? response1.data.vitalSigns
          : paciente.vitalSigns || [],
      sociodemographicDetails:
        response1.data.sociodemographicDetails ||
        paciente.sociodemographicDetails ||
        {},
      backgrounds: response1.data.backgrounds || paciente.backgrounds || {},
      patientPulmonaryHypertensionGroups:
        response1.data.patientPulmonaryHypertensionGroups?.length > 0
          ? response1.data.patientPulmonaryHypertensionGroups
          : paciente.patientPulmonaryHypertensionGroups || {},
      patientPulmonaryHypertensionRisks:
        response1.data.patientPulmonaryHypertensionRisks?.length > 0
          ? response1.data.patientPulmonaryHypertensionRisks
          : paciente.patientPulmonaryHypertensionRisks || {},
      patientCardiovascularRisks:
        response1.data.patientCardiovascularRisks?.length > 0
          ? response1.data.patientCardiovascularRisks
          : paciente.patientCardiovascularRisks || {},
      patientSurgicalRisks:
        response1.data.patientSurgicalRisks?.length > 0
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

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("a");
    Cookies.remove("b");
    Cookies.remove("c");

    socket.disconnect();

    dispatch(resetApp());

    router.push("/");

    // setTimeout(() => {
    //   // Realizar la recarga de la página para limpiar todos los datos
    //   window.location.reload(true);
    // }, 1000);
  };

  useEffect(() => {
    obtenerUbicacion();
    const idUser = Cookies.get("c");
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
    }
    if (isModalOpen) {
      router.push(`${rutas.PacienteDash}2`);
    }
    if (token) {
      getUser({ headers: { token: token } }).catch(console.error);
      getAllDoc({ headers: { token: token } }).catch(console.error);
      getSchedules({ headers: { token: token } }).catch(console.error);
      getPatientNotifications({ headers: { token: token } }).catch(
        console.error
      );
      if (!socket.isConnected()) {
        socket.setSocket(token, refreshToken, dispatch);
      }
    }
  }, []);

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
    <div className=" flex  items-center justify-between h-[12%] w-full  border-b-[1px] border-b-[#cecece] p-4 md:px-8">
      <div className="flex justify-center items-center gap-2">
        {lastSegment !== "Inicio_Paciente2" ? (
          <div>
            <Link href={`${rutas.PacienteDash}2`}>
              <button className="flex rounded-xl items-center px-6 py-2 font-bold text-sm leading-5 bg-[#487FFA] text-white gap-1">
                <IconRegresar />
                {!isMobile ? "Regresar" : null}
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
        <p className="font-semibold text-xl hidden md:block leading-6 text-[#686868]">
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
        {/* <div className="w-12 h-12 flex justify-center items-center">
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
        </div> */}

        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: user?.avatar ? user.avatar : avatar,
              }}
              className="transition-transform "
              // description={user?.role === 3 ? "Paciente" : ""}
              description={!isMobile && (user?.role === 3 ? "Paciente" : "")}
              name={
                !isMobile ? `${user?.name ?? ""} ${user?.lastname ?? ""}` : ""
              }
              // name={user ? `${user?.name} ${user?.lastname}` : ''}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem
              onPress={() => router.push(`${rutas.PacienteDash}2`)}
              key="inicio">
              Inicio
            </DropdownItem>

            <DropdownItem
              onPress={() =>
                router.push(`${rutas.PacienteDash}2${rutas.Mi_Perfil}`)
              }
              key="mi_perfil">
              Mi perfil
            </DropdownItem>

            <DropdownItem key="logout" onClick={handleLogout} color="danger">
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="flex gap-2">
          <button className="w-12 h-12 rounded-xl border-[1px] border-[#D7D7D7] flex items-center justify-center">
            <IconChat className="w-6 h-6" />
          </button>
          <button
            onClick={handleNotificationClick}
            className={`w-12 h-12 rounded-xl border-[1px] border-[#D7D7D7] flex items-center justify-center ${
              (showNotifications || unreadNotifications.length > 0) &&
              "bg-[#E73F3F]"
            }`}>
            <IconNotificaciones
              className="w-6 h-6"
              color={
                (showNotifications || unreadNotifications.length > 0) && "white"
              }
            />
          </button>
          {showNotifications && (
            <NotificacionesContainer
              handleNotificationElementClick={handleNotificationElementClick}
              handleNotificationClick={handleNotificationClick}
              unreadNotifications={unreadNotifications}
            />
          )}
        </div>
      </div>
      {/* <ModalBoarding isOpen={isModalOpen} onClose={closeModal} /> */}
    </div>
  );
};
