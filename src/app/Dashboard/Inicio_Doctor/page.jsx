"use client";

import Link from "next/link";
import IconAdminButtons from "@/components/icons/iconDashAdminButtons";
import IconHomeCitas from "@/components/icons/inconDashHomeCitas";
import rutas from "@/utils/rutas";
import IconDashAgenda from "@/components/icons/IconDashAgenda";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconAlarmUsers from "@/components/icons/IconAlarmUsers";
import IconNewUsers from "@/components/icons/IconNewUsers";
import IconInactiveUsers from "@/components/icons/IconInactiveUsers";
import IconActiveUsers from "@/components/icons/IconActiveUsers";
import IconArrowUp from "@/components/icons/IconArrowUp";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import PtesActivos from "@/components/Graficos/dashboardDoc/ptesActivos";

import Elboton from "@/components/Buttons/Elboton";
import Alarmas from "@/components/Graficos/dashboardDoc/alarmas";
import { BarChart } from "@/components/Graficos/graficoUltimos7dias.jsx/ultimos7dias";
import ProximasConsultas from "@/components/dashDoc/proximaConsulta";
import Citas from "./Citas/page";
import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";

export default function HomeDoc() {
  const user = useAppSelector((state) => state.user);

  const [currentChart, setCurrentChart] = useState(0);
  const dataAlarms = useAppSelector((state) => state.alarms);
  const dataPtesGrafic = useAppSelector((state) => state.activePtes);

  console.log(dataPtesGrafic);

  const handlePreviousChart = () => {
    setCurrentChart((prev) => (prev === 0 ? charts.length - 1 : prev - 1));
  };

  const handleNextChart = () => {
    setCurrentChart((prev) => (prev === charts.length - 1 ? 0 : prev + 1));
  };

  const charts = [
    <div key={0} className=" flex-grow flex items-center justify-center h-100%">
      <BarChart />
    </div>,
    <div key={1} className="flex-grow flex items-center justify-center h-100% ">
      <PtesActivos />
    </div>,
    <div key={2} className="flex-grow flex items-center justify-center h-100% ">
      <Alarmas />
    </div>,
  ]; // Agrega aquí todos los componentes de gráfico que desees mostrar
  return (
    <div className="h-full flex flex-col gap-8 p-3 xs:p-6 md:p-10 bg-[#FAFAFC] md:overflow-y-scroll">
      <h2 className="text-2xl">
        ¡Bienvenido {user?.name} {user?.lastname}!
      </h2>

      <div className="grid-cols-2 gap-4 grid lg:flex w-full">
        <Link
          href={`${rutas.Doctor}${rutas.Pacientes}`}
          className="w-full lg:w-1/4">
          <div className=" bg-gradient-to-br w-[100%] bg-bluePrimary flex justify-center items-center gap-1 xs:gap-3 text-white text-xl rounded-3xl  h-24">
            <IconAdminButtons className="w-[25%] md:w-12" />
            <span className="text-[16px] lg:text-2xl font-semibold">
              Pacientes
            </span>
          </div>
        </Link>

        <Link
          href={`${rutas.Doctor}${rutas.Citas}`}
          className="w-full lg:w-1/4">
          <div className=" bg-gradient-to-br w-[100%] bg-bluePrimary flex justify-center items-center gap-1 xs:gap-3 text-white text-xl rounded-3xl  h-24">
            <IconDashAgenda className="w-[25%] md:w-14" />
            <div className="text-[16px] lg:text-2xl font-semibold flex flex-col items-center">
              <span>Agenda</span>
              <span>General</span>
            </div>
          </div>
        </Link>

        <Link
          href={`${rutas.Doctor}${rutas.Historial}`}
          className="w-full lg:w-1/4">
          <div className=" bg-gradient-to-br w-[100%] bg-bluePrimary flex justify-center items-center gap-1 xs:gap-3 text-white text-xl rounded-3xl  h-24">
            <IconDashAgenda className="w-[25%] md:w-14" />
            <div className="text-[16px] lg:text-2xl font-semibold flex flex-col items-center">
              <span>Ordenes</span>
              <span>Medicas</span>
            </div>
          </div>
        </Link>

        <Link
          href={`${rutas.Doctor}${rutas.Historial}`}
          className="w-full lg:w-1/4">
          <div className=" bg-gradient-to-br w-[100%] bg-bluePrimary flex justify-center items-center gap-1 xs:gap-3 text-white text-xl rounded-3xl  h-24">
            <IconHomeCitas className="w-[20%] md:w-12" />
            <span className="text-[16px] lg:text-2xl font-semibold">
              Pendientes
            </span>
          </div>
        </Link>
      </div>

      <div className="text-[16px] lg:text-lg flex flex-col">
        <div className="flex items-center text-xl gap-3">
          <IconCurrentRouteNav className="w-4" />
          Pacientes
        </div>

        <div className="grid-cols-2 gap-4 grid lg:py-5 lg:flex">
          <div className="w-full bg-[#875CF2] flex flex-col justify-around gap-3 px-3 md:px-8 py-5 text-white text-xl rounded-3xl lg:w-1/4 h-40">
            <div className="h-full w-full flex items-center justify-start md:justify-center lg:justify-start  gap-2">
              <IconNewUsers className="w-[40%] md:w-12" color="white" />
              <span className="text-4xl xs:text-6xl md:text-7xl font-semibold ml-2">
                6
              </span>
              <IconArrowUp className="hidden md:block" />
            </div>
            <p className="font-semibold text-start md:text-center lg:text-start">
              Nuevos
            </p>
          </div>

          <div className="w-full bg-[#64D594] flex flex-col justify-around gap-3 md:px-8 px-3 py-5 text-white text-xl rounded-3xl lg:w-1/4 h-40">
            <div className="h-full w-full flex items-center justify-start md:justify-center lg:justify-start gap-2">
              <IconActiveUsers className="w-[40%] md:w-12" color="white" />
              <span className="text-4xl xs:text-6xl md:text-7xl font-semibold ml-2">
                {dataPtesGrafic?.activePatients}
              </span>
              <IconArrowUp className="hidden md:block" />
            </div>
            <p className="font-semibold text-start md:text-center lg:text-start">
              Activos
            </p>
          </div>

          <div className="w-full bg-[#ECD652] flex flex-col justify-around gap-3 md:px-8 px-3 py-5 text-white text-xl rounded-3xl lg:w-1/4 h-40">
            <div className="h-full w-full flex items-center justify-start md:justify-center lg:justify-start gap-2">
              <IconInactiveUsers className="w-[40%] md:w-12" color="white" />
              <span className="text-4xl xs:text-5xl md:text-6xl font-semibold ml-2">
                {dataAlarms?.inactiveAlarms}
              </span>
              <IconArrowUp className="hidden md:block" />
            </div>
            <p className="font-semibold text-start md:text-center lg:text-start">
              Alarmas Inactivos
            </p>
          </div>

          <div className="w-full bg-[#FF7E7E] flex flex-col justify-around gap-3 md:px-8 px-3 py-5 text-white text-xl rounded-3xl lg:w-1/4 h-40">
            <div className="h-full w-full flex items-center justify-start md:justify-center lg:justify-start gap-2">
              <IconAlarmUsers className="w-[40%] md:w-12" color="white" />
              <span className="text-4xl xs:text-5xl md:text-6xl font-semibold ml-2">
                {dataAlarms?.activeAlarms}
              </span>
              <IconArrowUp className="hidden md:block" />
            </div>
            <p className="font-semibold text-start md:text-center lg:text-start">
              Alarmas Activas
            </p>
          </div>
        </div>
      </div>
      <div className="h-fit w-full bg-white border border-[#DCDBDB] rounded-2xl flex flex-col">
        <div className="flex justify-between items-center p-2 xs:p-5">
          <Elboton
            onPress={handlePreviousChart}
            nombre={"Anterior"}
            icon={<IconPrev color="white" />}
          />
          <span className="text-sm xs:text-lg text-center leading-6">
            Pacientes nuevos en los últimos 7 días
          </span>
          <Elboton
            onPress={handleNextChart}
            nombre={"Siguiente"}
            icon2={<IconNext color="white" />}
          />
          {/* <button onClick={handlePreviousChart}>Anterior</button>
            <button onClick={handleNextChart}>Siguiente</button> */}
        </div>
        {/* <div className="flex-grow flex items-center justify-center " > */}

        {charts[currentChart]}
        {/* </div> */}
      </div>
      <div className="h-fit w-full border border-[#DCDBDB] rounded-2xl px-1 xs:px-5 py-2 bg-white">
        <Citas title={"Mi agenda"} />
      </div>
      <ProximasConsultas />
    </div>
  );
}
