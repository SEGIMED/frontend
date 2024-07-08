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

export default function HomeDoc() {
  const user = useAppSelector((state) => state.user);

  const [currentChart, setCurrentChart] = useState(0);
  const dataAlarms = useAppSelector((state) => state.alarms);
  
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
    <div className="h-full flex flex-col p-10 bg-[#FAFAFC] overflow-y-scroll">
      <h2 className="text-2xl">
        ¡Bienvenido {user?.name} {user?.lastname}!
      </h2>

      <div className="grid-cols-2 gap-2 grid lg:flex justify-between py-10">
        <Link href={`${rutas.Doctor}${rutas.Pacientes}`}>
          <div className=" bg-gradient-to-br w-[100%] from-[#729EFF] via-[#2060ED] to-[#729EFF] flex justify-center items-center gap-3 text-white text-xl rounded-3xl lg:w-60 h-24">
            <IconAdminButtons className="w-[25%] md:w-12" />
            <div className="text-[16px] flex flex-col">
              {/* <span>Nuevo</span> */}
              <span>Pacientes</span>
            </div>
          </div>
        </Link>

        <Link href={`${rutas.Doctor}${rutas.Citas}`}>
          <div className=" bg-gradient-to-br w-[100%] from-[#729EFF] via-[#2060ED] to-[#729EFF] flex justify-center items-center gap-3 text-white text-xl rounded-3xl lg:w-60 h-24">
            <IconDashAgenda className="w-[25%] md:w-14" />
            <div className="text-[16px] lg:text-lg flex flex-col items-center">
              <span>Mi</span>
              <span>Agenda</span>
            </div>
          </div>
        </Link>

        <Link href={`${rutas.Doctor}${rutas.Historial}`}>
          <div className=" bg-gradient-to-br w-[100%] from-[#729EFF] via-[#2060ED] to-[#729EFF] flex justify-center items-center gap-3 text-white text-xl rounded-3xl lg:w-60 h-24">
            <IconDashAgenda className="w-[25%] md:w-14" />
            <div className="text-[16px] lg:text-lg flex flex-col items-center">
              <span>Agenda</span>
              <span>General</span>
            </div>
          </div>
        </Link>

        <Link href={`${rutas.Doctor}${rutas.Historial}`}>
          <div className=" bg-gradient-to-br w-[100%] from-[#729EFF] via-[#2060ED] to-[#729EFF] flex justify-center items-center gap-3 text-white text-xl rounded-3xl lg:w-60 h-24">
            <IconHomeCitas className="w-[20%] md:w-12" />
            <span className="text-[16px] lg:text-lg">Pendientes</span>
          </div>
        </Link>
      </div>

      <div className="text-[16px] lg:text-lg flex flex-col">
        <div className="flex items-center text-xl gap-3">
          <IconCurrentRouteNav className="w-4" />
          Pacientes
        </div>

        <div className="grid-cols-2 gap-2 grid lg:py-5 lg:flex justify-between">
          <div className="w-full bg-[#875CF2] flex flex-col justify-around gap-3 px-3 md:px-8 py-5 text-white text-xl rounded-3xl lg:w-60 h-40">
            <div className="h-full w-full flex items-center justify-center gap-2">
              <IconNewUsers className="w-[40%] md:w-12" />
              <span className="text-6xl md:text-7xl font-semibold ml-2">6</span>
              <IconArrowUp className="hidden md:block" />
            </div>
            <p className="font-semibold text-center">Nuevos</p>
          </div>

          <div className="w-full bg-[#64D594] flex flex-col justify-around gap-3 md:px-8 px-3 py-5 text-white text-xl rounded-3xl lg:w-60 h-40">
            <div className="h-full w-full flex items-center justify-center gap-2">
              <IconActiveUsers className="w-[40%] md:w-12" />
              <span className="text-6xl md:text-7xl font-semibold ml-2">4</span>
              <IconArrowUp className="hidden md:block" />
            </div>
            <p className="font-semibold text-center">Activos</p>
          </div>

          <div className="w-full bg-[#ECD652] flex flex-col justify-around gap-3 md:px-8 px-3 py-5 text-white text-xl rounded-3xl lg:w-60 h-40">
            <div className="h-full w-full flex items-center justify-center gap-2">
              <IconInactiveUsers className="w-[40%] md:w-12" />
              <span className="text-6xl md:text-7xl font-semibold ml-2"> {dataAlarms?.inactiveAlarms}</span>
              <IconArrowUp className="hidden md:block" />
            </div>
            <p className="font-semibold text-center">Alarmas Inactivos</p>
          </div>

          <div className="w-full bg-[#FF7E7E] flex flex-col justify-around gap-3 md:px-8 px-3 py-5 text-white text-xl rounded-3xl lg:w-60 h-40">
            <div className="h-full w-full flex items-center justify-center gap-2">
              <IconAlarmUsers className="w-[42%] md:w-12" />
              <span className="text-6xl md:text-7xl font-semibold ml-2">{dataAlarms?.activeAlarms}</span>
              <IconArrowUp className="hidden md:block" />
            </div>
            <p className="font-semibold text-center">Alarmas Activas</p>
          </div>
        </div>
      </div>
      <div className="h-fit w-full bg-white border border-[#DCDBDB] rounded-2xl my-5  flex flex-col">
        <div className="flex justify-between items-center p-5">
          <Elboton onPress={handlePreviousChart} nombre={"Anterior"} />
          <span className="text-lg leading-6" >Pacientes nuevos en los últimos 7 días</span>
          <Elboton onPress={handleNextChart} nombre={"Siguiente"} />
          {/* <button onClick={handlePreviousChart}>Anterior</button>
            <button onClick={handleNextChart}>Siguiente</button> */}
        </div>
        {/* <div className="flex-grow flex items-center justify-center " > */}

        {charts[currentChart]}
        {/* </div> */}
      </div>
      <div className="h-full w-full bg-white border border-[#DCDBDB] rounded-2xl mt-5">
        <ProximasConsultas />
      </div>
    </div>
  );
}
