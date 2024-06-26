"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import LogoSegimed from "../logo/LogoSegimed";
import IconOut from "../icons/iconOut";
import IconMessageNav from "../icons/IconMessageNav";
import IconCalendarNav from "../icons/IconCalendarNav";
import IconPatientNav from "../icons/IconPatientNav";
import IconRecordNav from "../icons/IconRecordNav";
import IconCube from "../icons/IconCube";
import IconDoctorNav from "../icons/IconDoctorNav";
import Estadistica from "../icons/IconEstadistica";
import AlarmDash from "../icons/IconAlarmDash";
import Interconsulta from "../icons/IconInterconsulta";
import SoporteTecnico from "../icons/IconSoporte";
import Sugerencias from "../icons/IconSugerencias";
import rutas from "@/utils/rutas";
import { socket } from "@/utils/socketio";
import { useAppDispatch } from "@/redux/hooks";
import { resetApp } from "@/redux/rootReducer";
import Elboton from "../Buttons/Elboton";

export const NavDoctor = ({ toggleSidebar, isOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Cookies.remove("a");
    Cookies.remove("b");
    Cookies.remove("c");

    socket.disconnect();

    dispatch(resetApp());

    router.push("/");
  };

  return (
    <div>
      <div
        className={`flex ${
          isOpen ? "lg:relative block fixed inset-0 z-50" : "hidden"
        } md:flex`}>
        <div className="h-screen w-[60%] px-4 md:w-64 md:px-6 py-5 bg-white border-r-2 border-[#cecece] flex flex-col justify-between">
          <div className="flex flex-col justify-center gap-5 ">
            <Link href={`${rutas.Doctor}`} className="block">
              <LogoSegimed className="w-40 md:w-full" />
            </Link>
            <div className="justify-center">
              <ul className="flex flex-col gap-4">
                <Link
                  onClick={toggleSidebar}
                  href={rutas.Doctor}
                  className={`flex items-center gap-4 ${
                    pathname === rutas.Doctor ? "text-[#487FFA]" : ""
                  }`}>
                  <IconCube
                    className="w-5"
                    iconColor={`${
                      pathname === rutas.Doctor ? "#487FFA" : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Tablero</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Mi_Perfil}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Mi_Perfil}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <IconDoctorNav
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Mi_Perfil}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Mi perfil</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Historial}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Historial}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <IconRecordNav
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Historial}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Consultas</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Mensajes}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Mensajes}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <IconMessageNav
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Mensajes}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Chats</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Citas}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Citas}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <IconCalendarNav
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Citas}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Mi Agenda</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Estadisticas}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Estadisticas}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <Estadistica
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Estadisticas}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Estadísticas</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Alarm}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Alarm}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <AlarmDash
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Alarm}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Alarmas</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Interconsultas}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Interconsultas}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <Interconsulta
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Interconsultas}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Interconsultas</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Pacientes}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Pacientes}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <IconPatientNav
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Pacientes}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Pacientes</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Soporte_tecnico}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Soporte_tecnico}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <SoporteTecnico
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Soporte_tecnico}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Soporte tecnico</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.Doctor}${rutas.Sugerencias}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.Doctor}${rutas.Sugerencias}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <Sugerencias
                    className="w-6"
                    color={`${
                      pathname === `${rutas.Doctor}${rutas.Sugerencias}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Sugerencias</li>
                </Link>
              </ul>
            </div>
          </div>
          {/* <button
            className="w-full flex items-center justify-center gap-3 text-white bg-[#487FFA] p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1"
            onClick={handleLogout}>
            
            Cerrar sesión
          </button> */}
          <Elboton icon={<IconOut />} nombre={"Cerrar sesión"} onPress={handleLogout}/>
        </div>
        <div
          className="flex-1 bg-black opacity-50"
          onClick={toggleSidebar}></div>
      </div>
    </div>
  );
};
