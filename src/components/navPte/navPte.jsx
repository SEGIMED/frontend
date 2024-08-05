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

import AlarmDash from "../icons/IconAlarmDash";
import Sugerencias from "../icons/IconSugerencias";
import rutas from "@/utils/rutas";
import { socket } from "@/utils/socketio";
import { resetApp } from "@/redux/rootReducer";
import { useDispatch } from "react-redux";

import IconPreConsulta from "../icons/iconPreconsulta";
import Elboton from "../Buttons/Elboton";

export const NavPte = ({ toggleSidebar, isOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    socket.disconnect();

    dispatch(resetApp());

    router.push("/");
    Cookies.remove("a");
    Cookies.remove("b");
    Cookies.remove("c");
    Cookies.remove("d");
    setTimeout(() => {
      // Realizar la recarga de la página para limpiar todos los datos
      window.location.reload(true);
    }, 1000);
  };

  return (
    <div>
      <div
        className={`flex ${isOpen ? "lg:relative block fixed inset-0 z-50" : "hidden"
          } lg:flex`}>
        <div className="h-screen overflow-y-auto gap-4 w-[60%] px-4 md:w-72 md:px-6 py-8 bg-white border-r-[1px] border-[#D7D7D7] flex flex-col justify-between">
          <div className="flex flex-col justify-center gap-5">
            <Link href={`${rutas.PacienteDash}`} className="block">
              <LogoSegimed className="w-40 md:w-[80%]" />
            </Link>
            <div className="justify-center">
              <ul className="flex flex-col gap-3 md:gap-4">
                <Link
                  onClick={toggleSidebar}
                  href={rutas.PacienteDash}
                  className={`flex items-center gap-4 ${pathname === rutas.PacienteDash ? "text-[#487FFA]" : ""
                    }`}>
                  <IconCube
                    className="w-5"
                    iconColor={`${pathname === rutas.PacienteDash ? "#487FFA" : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Tablero</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Mi_Perfil}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Mi_Perfil}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <IconDoctorNav
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Mi_Perfil}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Mi perfil</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Antecedentes}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Antecedentes}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <IconDoctorNav
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Antecedentes}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Antecedentes</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Preconsulta}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Preconsulta}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <IconPreConsulta
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Preconsulta}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Preconsultas</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Historial}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Historial}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <IconRecordNav
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Historial}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Consultas</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Mensajes}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Mensajes}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <IconMessageNav
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Mensajes}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Chats</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Citas}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Citas}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <IconCalendarNav
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Citas}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Mi Agenda</li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Doctores}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Doctores}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <IconPatientNav
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Doctores}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Médicos</li>
                </Link>

                {/* <Link
                  href={`${rutas.PacienteDash}${rutas.Tratamientos}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Tratamientos}`
                      ? "text-[#487FFA]"
                      : ""
                    }`}>
                  <IconTratamiento
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Tratamientos}`
                        ? "#487FFA"
                        : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Tratamientos</li>
                </Link> */}
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Alarm}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Alarm}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <AlarmDash
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Alarm}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Alarmas</li>
                </Link>
                {/* <Link
                  href={`${rutas.PacienteDash}${rutas.Soporte_tecnico}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.PacienteDash}${rutas.Soporte_tecnico}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <SoporteTecnico
                    className="w-6"
                    color={`${
                      pathname ===
                      `${rutas.PacienteDash}${rutas.Soporte_tecnico}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg md:text-md">Soporte tecnico</li>
                </Link> */}
                <Link
                  onClick={toggleSidebar}
                  href={`${rutas.PacienteDash}${rutas.Sugerencias}`}
                  className={`flex items-center gap-4 ${pathname === `${rutas.PacienteDash}${rutas.Sugerencias}`
                    ? "text-[#487FFA]"
                    : ""
                    }`}>
                  <Sugerencias
                    className="w-6"
                    color={`${pathname === `${rutas.PacienteDash}${rutas.Sugerencias}`
                      ? "#487FFA"
                      : "#B2B2B2"
                      }`}
                  />
                  <li className="text-lg md:text-md">Sugerencias</li>
                </Link>
                {/* <Link
                  href={`${rutas.PacienteDash}${rutas.Configuracion}`}
                  className={`flex items-center gap-4 ${
                    pathname === `${rutas.PacienteDash}${rutas.Configuracion}`
                      ? "text-[#487FFA]"
                      : ""
                  }`}>
                  <IconConfig
                    className="w-6"
                    color={`${
                      pathname === `${rutas.PacienteDash}${rutas.Configuracion}`
                        ? "#487FFA"
                        : "#B2B2B2"
                    }`}
                  />
                  <li className="text-lg lg:text-md">Configuracion</li>
                </Link> */}
                <Elboton
                  icon={<IconOut />}
                  className={"font-bold h-[52px] flex sm:hidden text-[15px]"}
                  nombre={"Cerrar sesión"}
                  onPress={handleLogout}
                />
              </ul>
            </div>
          </div>
          {/* <button
            className="w-full flex items-center justify-center gap-3 text-white bg-[#487FFA] p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1"
            onClick={handleLogout}>
            <IconOut />
            Cerrar sesión
          </button> */}
          <Elboton
            icon={<IconOut />}
            className={
              "font-bold min-h-[45px] h-[52px] hidden sm:flex text-[15px]"
            }
            nombre={"Cerrar sesión"}
            onPress={handleLogout}
          />
        </div>
        <div
          className="flex-1 bg-black opacity-50"
          onClick={toggleSidebar}></div>
      </div>
    </div>
  );
};
