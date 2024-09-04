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

import SkeletonList from "@/components/skeletons/HistorialSkeleton"; // Asegúrate de tener este componente

export default function Estadisticas() {
  const lastSegmentTextToShow = PathnameShow();
  const dispatch = useAppDispatch();
  const alarmsData = useAppSelector((state) => state.alarms);
  const [alarm, setAlarm] = useState({});
  const [dataGenre, setDataGenre] = useState({});
  const [activity, setActivity] = useState({});
  const [general, setGeneral] = useState({});

  const [loading, setLoading] = useState(true); // Estado para saber si los datos están cargando

  const getActivity = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        `/statistics-patient-activity`,
        headers
      );
      setActivity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGenreEstadistica = async (headers) => {
    try {
      const response = await ApiSegimed.get("/statistics-genre", headers);
      setDataGenre(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generalEstadistica = async (headers) => {
    try {
      const response = await ApiSegimed.get("statistics-general", headers);
      setGeneral(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("a");
    if (token) {
      const fetchData = async () => {
        await Promise.all([
          getActivity({ headers: { token } }),
          getGenreEstadistica({ headers: { token } }),
          generalEstadistica({ headers: { token } }),
        ]);
        setLoading(false); // Oculta el esqueleto una vez que los datos han sido cargados
      };
      fetchData();
    }
  }, []);

  const isEmptyData = (data) => {
    // Verifica si los datos están vacíos o si todos los valores son cero
    if (!data || data.length === 0) {
      return true;
    }

    // Verifica si todos los valores en los datos son cero
    return data.every((item) => item.value === 0);
  };
  const dataGenres = [
    { label: "Femenino", value: dataGenre?.women, color: "rgb(239, 43, 125)" },
    { label: "Masculino", value: dataGenre?.men, color: "rgb(1, 167, 157)" },
  ];

  const dataActives = [
    {
      label: "Inactivos",
      value: activity?.inactivePatients,
      color: "rgb(54, 162, 235)",
    },
    {
      label: "Activos",
      value: activity?.activePatients,
      color: "rgb(112, 194, 71)",
    },
  ];

  const dataAlarmsLast24 = [
    {
      label: "Sin responder",
      value: general?.last24hsAlarmStatistics?.activeAlarms,
      color: "rgb(231, 63, 63)",
    },
    {
      label: "Respondidas",
      value: general?.last24hsAlarmStatistics?.solvedAlarms,
      color: "rgb(112, 194, 71)",
    },
  ];

  const dataDeathLastYear = [
    {
      label: "Fallecidos",
      value: general?.yearDeathRateStatistics?.dead,
      color: "rgb(231, 63, 63)",
    },
    {
      label: "Pacientes totales",
      value: general?.yearDeathRateStatistics?.alive,
      color: "rgb(112, 194, 71)",
    },
  ];

  const dataDeathLastMonth = [
    {
      label: "Fallecidos",
      value: general?.monthDeathRateStatistics?.dead,
      color: "rgb(231, 63, 63)",
    },
    {
      label: "Pacientes totales",
      value: general?.monthDeathRateStatistics?.alive,
      color: "rgb(112, 194, 71)",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#FAFAFC] px-4 md:pl-10 md:pr-8 pt-5 md:pb-40 gap-4 md:gap-10 text-lg overflow-y-auto">
        <SkeletonList count={10} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FAFAFC] px-4 md:pl-10 md:pr-8 pt-5 md:pb-40 gap-4 md:gap-10 text-lg overflow-y-auto">
      <title>{lastSegmentTextToShow}</title>
      <div className="w-full flex-col md:flex-row flex  justify-center gap-4 md:gap-10">
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-[1.5rem]" />
            Alarmas activas
          </p>
          <div className="flex items-center justify-center ">
            <div className="flex w-full mt-10 gap-2 md:gap-10">
              <div className="w-full text-small flex flex-col items-center">
                <IconAlarmRed className={"w-20 md:w-40"} />
                <div className="text-xs md:text-lg whitespace-nowrap">
                  Prioridad alta
                </div>
                <div className=" text-4xl  md:text-7xl">
                  {alarmsData?.highAlarms}
                </div>
              </div>

              <div className="w-full md:text-small flex flex-col items-center ">
                <IconAlarmYellow className={"w-20 md:w-40"} />
                <div className="text-xs md:text-lg whitespace-nowrap">
                  Prioridad media
                </div>
                <div className=" text-4xl  md:text-7xl">
                  {alarmsData?.mediumAlarms}
                </div>
              </div>

              <div className="w-full text-small flex flex-col items-center ">
                <IconAlarmGreen className={"w-20 md:w-40"} />
                <div className="text-xs md:text-lg whitespace-nowrap">
                  Prioridad baja
                </div>
                <div className="text-4xl  md:text-7xl">
                  {alarmsData?.lowAlarms}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-[1.5rem]" />
            Actividad de pacientes (última semana)
          </p>
          <div className="flex items-center  w-full min-h-56    md:h-[700px]  justify-center">
            {isEmptyData(dataActives) ? (
              <div className="text-center text-gray-500">
                No hay información disponible
              </div>
            ) : (
              <div className="md:w-full">
                <GooglePieChart
                  dataArray={dataActives}
                  chartId="activity-chart"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full bg-white p-5 rounded-lg ">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-[1.5rem]" />
            Alarmas en las últimas 24 horas
          </p>
          <div className="flex  items-center w-full  min-h-56  md:h-[700px] justify-center">
            {isEmptyData(dataAlarmsLast24) ? (
              <div className="text-center text-gray-500">
                No hay información disponible
              </div>
            ) : (
              <div className="md:w-full h-full ">
                <GooglePieChart
                  dataArray={dataAlarmsLast24}
                  chartId="alarm24-chart"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-[1.5rem]" />
            Distribución de géneros
          </p>
          <div className="flex items-center   min-h-56   md:h-[700px]  justify-center">
            {isEmptyData(dataGenres) ? (
              <div className="md:w-full text-center text-gray-500">
                No hay información disponible
              </div>
            ) : (
              <div className="md:w-full">
                <GooglePieChart dataArray={dataGenres} chartId="genre-chart" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3 mb-8">
            <IconCurrentRouteNav className="w-[1.5rem]" />
            Pacientes Fallecidos (último mes)
          </p>
          <div className="flex items-center   md:h-[700px]  justify-center">
            {isEmptyData(dataDeathLastMonth) ? (
              <div className="text-center text-gray-500">
                No hay información disponible
              </div>
            ) : (
              <div className="md:w-full">
                <GooglePieChart
                  dataArray={dataDeathLastMonth}
                  chartId="monthDeath-chart"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-[1.5rem]" />
            Pacientes Fallecidos (último año)
          </p>
          <div className="flex items-center  w-full   md:h-[700px]  justify-center">
            {isEmptyData(dataDeathLastYear) ? (
              <div className="text-center text-gray-500">
                No hay información disponible
              </div>
            ) : (
              <div className="md:w-full">
                <GooglePieChart
                  dataArray={dataDeathLastYear}
                  chartId="monthYear-chart"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
