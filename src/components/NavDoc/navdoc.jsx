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
import Sugerencias from "../icons/IconSugerencias";
import rutas from "@/utils/rutas";
import { socket } from "@/utils/socketio";
import { useAppDispatch } from "@/redux/hooks";
import { resetApp } from "@/redux/rootReducer";
import Elboton from "../Buttons/Elboton";
import IconEducacion from "../icons/IconEducacion";

export const NavDoctor = ({ toggleSidebar, isOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    try {
      socket.disconnect();
    } catch (e) {
      console.log(e);
    }
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
    <div
      className={`flex ${
        isOpen ? "lg:relative block fixed inset-0 z-50" : "hidden"
      } lg:flex`}>
      <div className="h-screen overflow-y-auto gap-2  w-[60%] px-4 md:w-72 md:px-6 md:border-r-[1px] md:border-[#D7D7D7] py-8 bg-white  flex flex-col justify-between shadow-lg md:shadow-none">
        <div className="flex flex-col justify-center gap-4 sm:gap-10 ">
          <Link href={`${rutas.Doctor}`} className="block">
            <LogoSegimed className="w-40 md:w-[80%]" />
          </Link>
          <ul className="flex flex-col gap-3 md:gap-4">
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
              href={`${rutas.Doctor}${rutas.Consultas}`}
              className={`flex items-center gap-4 ${
                pathname === `${rutas.Doctor}${rutas.Consultas}`
                  ? "text-[#487FFA]"
                  : ""
              }`}>
              <IconRecordNav
                className="w-6"
                color={`${
                  pathname === `${rutas.Doctor}${rutas.Consultas}`
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
              href={`${rutas.Doctor}${rutas.Mi_Agenda}`}
              className={`flex items-center gap-4 ${
                pathname === `${rutas.Doctor}${rutas.Mi_Agenda}`
                  ? "text-[#487FFA]"
                  : ""
              }`}>
              <IconCalendarNav
                className="w-6"
                color={`${
                  pathname === `${rutas.Doctor}${rutas.Mi_Agenda}`
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
            {/* <Link
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
                </Link> */}
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
            {/* <Link
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
                </Link> */}
            <Link
              onClick={toggleSidebar}
              href={`https://circulacionpulmonar.com/`}
              target="_blank"
              className={`flex items-center gap-4`}>
              <IconEducacion className="w-6" />
              <li className="text-lg md:text-md">Educación</li>
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
            <Elboton
              icon={<IconOut />}
              className={"font-bold h-[52px] flex sm:hidden text-[15px]"}
              nombre={"Cerrar sesión"}
              onPress={handleLogout}
            />
          </ul>
        </div>
        <Elboton
          icon={<IconOut />}
          className={
            "font-bold min-h-[45px] h-[52px] hidden sm:flex text-[15px]"
          }
          nombre={"Cerrar sesión"}
          onPress={handleLogout}
        />
      </div>
      <div className="flex-1 bg-black opacity-50" onClick={toggleSidebar}></div>
    </div>
  );
};
