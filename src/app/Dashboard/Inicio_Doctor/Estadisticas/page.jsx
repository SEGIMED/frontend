"use client";

import { ApiSegimed } from "@/Api/ApiSegimed";
import Elboton from "@/components/Buttons/Elboton";
import {
  GenreChart,
  GooglePieChart,
} from "@/components/Graficos/Genero/genreChart";
import { PathnameShow } from "@/components/pathname/path";

import IconAlertas from "@/components/icons/IconAlertas";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconMapa from "@/components/icons/IconMapa";
import IconTorta from "@/components/icons/IconTorta";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addEstadisticas } from "@/redux/slices/doctor/estadisticas";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import IconAlarmGreen from "@/components/icons/iconAlarmGreen";
import IconAlarmYellow from "@/components/icons/IconAlarmYellow";
import IconAlarmRed from "@/components/icons/iconAlarmRed";

export default function Estadisticas() {
  const lastSegmentTextToShow = PathnameShow()
  const dispatch = useAppDispatch();
  const [alarm, setAlarm]= useState({})
  const [dataGenre, setDataGenre]=useState({})
  const [activity, setActiviy]=useState({})
  const [general, setGeneral]=useState({})

  const getActivity = async (headers) => {
    try {
      const response = await ApiSegimed.get(`/statistics-patient-activity`, headers);
     
      setActiviy(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  const getAlarmsEstadistica= async (headers)=>{
    try {
      const response= await ApiSegimed.get("alarms-by-patient",headers)
      
      setAlarm(response.data.priorityCounts)
    } catch (error) {
      console.error(error)
    }
  } 
  const getGenreEstadistica = async (headers) => {
      try {
        
        const response = await ApiSegimed.get("/statistics-genre", 
          headers);
        
        setDataGenre(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
  const generalEstadistica = async (headers) => {
    try {
     const response = await ApiSegimed.get("statistics-general", headers)
     
     setGeneral(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const token = Cookies.get("a");
    if (token) {
      getActivity({ headers: { token: token } });
      getAlarmsEstadistica({ headers: { token: token } });
      getGenreEstadistica({ headers: { token: token } });
      generalEstadistica({ headers: { token: token } });
    }
  }, []);
  
  console.log(general)


  const dataGenres = [
    { label: 'Femenino', value: dataGenre?.women, color: 'rgb(239, 43, 125)' },
    { label: 'Masculino', value: dataGenre?.men, color: 'rgb(1, 167, 157)' },
  ];

  const dataActives = [
    { label: 'Inactivos', value: activity?.inactivePatients, color: 'rgb(54, 162, 235)' },
    { label: 'Activos', value: activity?.activePatients, color: 'rgb(112, 194, 71)' },
  ];
  
  const dataAlarmsLast24=[
    {label:"Sin responder", value:general?.last24hsAlarmStatistics?.activeAlarms, color: "rgb(231, 63, 63)"  },
    {label:"Respondidas", value:general?.last24hsAlarmStatistics?.solvedAlarms, color: "rgb(112, 194, 71)"  }
  ]
  return (
    <div className="flex flex-col h-full bg-[#FAFAFC] px-4 md:pl-10 md:pr-8 pt-5 md:pb-40 gap-4 md:gap-10 text-lg overflow-y-auto">
      <title>{lastSegmentTextToShow}</title>
      <div className="w-full flex-col md:flex-row flex items-center justify-center gap-4 md:gap-10">
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Alarmas activas
          </p>
          <div className="flex items-center justify-center">
            <div className="flex w-full mt-10 gap-10">
              <div className="w-full text-small flex flex-col items-center ">
                <IconAlarmRed />
                prioridad alta
                <div className=" text-4xl  md:text-7xl">{alarm?.Alta}</div>
              </div>

              <div className="w-full text-small flex flex-col items-center ">
                <IconAlarmYellow />
                prioridad media
                <div className=" text-4xl  md:text-7xl">{alarm?.Media}</div>
              </div>

              <div className="w-full text-small flex flex-col items-center ">
                <IconAlarmGreen />
                prioridad baja
                <div className="text-4xl  md:text-7xl">{alarm?.Baja}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Actividad de pacientes (última semana)
          </p>
          <div className="flex items-center justify-center">
            <div className="md:w-full ">
              <GooglePieChart dataArray={dataActives} chartId="activity-chart" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Alarmas en las últimas 24 horas
          </p>
          <div className="flex items-center justify-center">
            <div className="md:w-full ">
            <GooglePieChart dataArray={dataAlarmsLast24} chartId="alarm24-chart" />
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Datos completados de pacientes
          </p>
          <div className="flex items-center justify-center">
            <div className="w-full ">
              <IconTorta className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3 mb-8">
            <IconCurrentRouteNav className="w-4" />
            Distribución de géneros
          </p>
          <div className="flex  items-center justify-center">
            <div className="md:w-full ">
              <GooglePieChart dataArray={dataGenres} chartId="genre-chart" />
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Riesgo de pacientes ESC 2022
          </p>
          <div className="flex items-center justify-center">
            <div className="w-full ">
              <IconTorta className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

