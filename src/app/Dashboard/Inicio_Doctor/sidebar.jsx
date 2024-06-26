"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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

import { socket } from "@/utils/socketio";

export const SideDoctor = ({ search, toggleSidebar }) => {
  const pathname = usePathname();
  const avatar = "https://psicoaroha.es/wp-content/uploads/2021/12/perfil-empty.png"

  // const adjustedPathname = pathname.startsWith('/Dash') ? pathname.slice(5) : pathname;

  // reemplazar pathname por adjustedPathname
  const showSearch =
    pathname === "/Dashboard/Inicio_Doctor/Pacientes" ||
    pathname === "/Dashboard/Inicio_Doctor/Mensajes" ||
    pathname === "/Dashboard/Inicio_Doctor/Mensajes/crearMensaje" ||
    pathname === "/Dashboard/Inicio_Doctor/Historial";
  // reemplazar pathname por adjustedPathname
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const IsEvent = /^(\/inicio_Doctor\/Citas\/\d+)$/.test(pathname);
  const IsMessage = /^(\/inicio_Doctor\/Mensajes\/\d+)$/.test(pathname);

  const dispatch = useAppDispatch();

  const getUser = async (headers) => {
    const id = Cookies.get("c");
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

  const user = useAppSelector((state) => state.user);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);

  useEffect(() => {
    const token = Cookies.get("a");
    const idUser = Cookies.get("c");
    if (token) {
      getUser({ headers: { token: token } }).catch(console.error);
      getPatients({ headers: { token: token } }).catch(console.error);
      getSchedules({ headers: { token: token } }).catch(console.error);
      if (!socket.isConnected()) {
        socket.setSocket(token, dispatch);
        socket.emit("onJoin", { id: idUser });
      }
    }
  }, []);

  return (
    <div className=" flex  items-center justify-between h-[12%] border-b-2 border-b-[#cecece] p-4">
      <div className="md:hidden p-4">
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
      <div className="flex justify-center items-center gap-4 text-lg font-semibold">
        <IconCurrentRouteNav className="w-4" />
        {lastSegment === "Inicio_Doctor" ? (
          <p>Inicio</p>
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
        ) : (
          <p>{lastSegment}</p>
        )}
      </div>
      {showSearch && (
        <div
          className={`hidden md:flex justify-center items-center gap-2 border border-[#cecece] py-2 px-6 rounded-lg ${search}`}>
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Buscar pacientes"
            className="text-start text-[#808080] font-normal text-normal leading-6 outline-none"
            value={searchTerm}
          />
          <button>
            <Image src={busqueda} alt="" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center gap-4">
        <div className="w-12 h-12 flex justify-center items-center">
          <img
            src={user?.avatar !== null ? user.avatar : avatar}


            alt=""
            className="w-12 h-12 object-cover rounded-3xl "
          />
        </div>

        <div className="hidden md:flex flex-col">
          <span className="text-start ">
            {user?.name} {user?.lastname}
          </span>
          <span className="text-start text-[#808080]">Médico</span>
        </div>

        <button>
          <IconNotificationsNav
            className=" w-12"
            circle="#E73F3F"
            campaign="#B2B2B2"
          />
        </button>
      </div>
    </div>
  );
};
