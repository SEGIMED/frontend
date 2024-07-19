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

export default function Estadisticas() {
  const lastSegmentTextToShow = PathnameShow()
  const dispatch = useAppDispatch();

  const getEstadisticas = async (headers) => {
    try {
      const response = await ApiSegimed.get(`/schedules`, headers);
      if (response.data) {
        dispatch(addEstadisticas(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("a");
    if (token) {
      getEstadisticas({ token: token });
    }
  }, []);

  const estadisticas = useAppSelector((state) => state.estadisticas);

  const [is3D, setIs3D] = useState(false);

  const toggleChartType = () => {
    setIs3D((prevIs3D) => !prevIs3D);
  };

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
            <div className="w-full">
              <IconAlertas className="h-full" />
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Actividad de pacientes (última semana)
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
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Alarmas en las últimas 24 horas
          </p>
          <div className="flex items-center justify-center">
            <div className="w-full ">
              <IconTorta className="w-full" />
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
              <GooglePieChart/>
              {/* {is3D ? <GooglePieChart /> : <GenreChart />} */}
              <div className="flex justify-center mt-4">
                {/* <Elboton
                  onPress={toggleChartType}
                  size={"sm"}
                  nombre={is3D ? "Normal" : "3D"}
                /> */}
              </div>
              {/* <button onClick={toggleChartType}>Mostrar {is3D ? 'Normal' : '3D'}</button> */}
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

      <div className="flex flex-col md:grid md:grid-cols-2 gap-10">
        <div className="w-full flex flex-col items-center gap-10">
          <div className="w-full bg-white p-5 rounded-lg">
            <p className="flex items-center justify-start text-2xl gap-3">
              <IconCurrentRouteNav className="w-4" />
              Clase funcional
            </p>
            <div className="flex items-center justify-center">
              <div className="w-full ">
                <IconTorta className="w-full" />
              </div>
            </div>
          </div>
          <div className="w-full bg-white p-5 rounded-lg">
            <p className="flex items-center justify-start text-2xl gap-3">
              <IconCurrentRouteNav className="w-4" />
              Centros de atención
            </p>
            <div className="flex items-center justify-center">
              <div className="w-full ">
                <IconTorta className="w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Distribución geográfica
          </p>
          <div className="w-full h-full pt-10">
            <div className="w-full h-full">
              <IconMapa className="h-[38rem]" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Pacientes hospitalizados
          </p>
          <div className="flex items-center justify-center">
            <div className="w-full ">
              <IconTorta className="w-full" />
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Pacientes fallecidos
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
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Porcentaje de mortalidad (mes)
          </p>
          <div className="flex items-center justify-center">
            <div className="w-full ">
              <IconTorta className="w-full" />
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-5 rounded-lg">
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Porcentaje de mortalidad (año)
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
          <p className="flex items-center justify-start text-2xl gap-3">
            <IconCurrentRouteNav className="w-4" />
            Grupo etareo
          </p>
          <div className="flex items-center justify-center">
            <div className="w-full ">
              <IconTorta className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
