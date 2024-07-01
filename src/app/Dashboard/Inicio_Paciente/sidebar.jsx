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
import config from "@/components/localData/localdata";
import perfil from "@/components/images/perfil.png";
import notificacion from "@/components/images/notificacion.png";
import notificacion2 from "@/components/images/notificacion2.png";
import ruteActual from "@/components/images/ruteActual.png";
import busqueda from "@/components/images/busqueda.png";
import Cookies from "js-cookie";
import { socket } from "@/utils/socketio";
import AvatarSideBar from "@/components/avatar/avatarSideBar";
import paciente from "@/utils/paciente";

export const SidePte = ({ search, toggleSidebar }) => {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user);
  const showSearch =
    pathname === "/Inicio_Paciente/Doctores" ||
    pathname === "/Inicio_Paciente/Mensajes" ||
    pathname === "/Inicio_Paciente/Mensajes/crearMensaje" ||
    pathname === "/Inicio_Paciente/Historial";
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);

  const avatar = "https://psicoaroha.es/wp-content/uploads/2021/12/perfil-empty.png"

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
    // const userId = Number(id)
    const userId = 8
    try {
      const response = await ApiSegimed.get(`/schedules?patientId=${userId}`, headers);
      console.log(response.data);
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

  return (
    <div className=" flex  items-center justify-between h-[12%]  border-b-2 border-b-[#cecece] p-4">
      <div className="md:hidden p-4">
        <button
          className="text-[#487FFA] focus:outline-none"
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
      </div>

      <div className="flex justify-center items-center gap-2">
        <Image src={ruteActual} alt="" />
        <p className="">{segmentToShow}</p>
      </div>
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
      <div className="flex justify-center items-center gap-4">
        <div className="w-12 h-12 flex justify-center items-center">
          <AvatarSideBar avatar={user?.avatar !== null ? user.avatar : avatar} />
        </div>
        <div className=" flex-col hidden md:flex">
          <span className="text-start text-[#686868] font-normal text-lg leading-6">
            {user?.name} {user?.lastname}
          </span>
          <span className="text-start text-[#808080] font-normal text-sm leading-6">
            {user.role === 3 ? "Paciente" : ""}
          </span>
        </div>
        <button>
          <Image src={notificacion2} alt="" />
        </button>
        {/* <button className=" rounded-xl w-12 h-12 flex justify-center items-center  border border-gray-400">
                    <Image src={notificacion} alt="" />
                </button> */}
      </div>
    </div>
  );
};
