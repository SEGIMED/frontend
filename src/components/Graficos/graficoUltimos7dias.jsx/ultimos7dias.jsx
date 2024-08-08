"use client";

import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";

Chart.register(...registerables);

const getDayNames = (startDate) => {
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  let dayNames = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(day.getDate() + i);
    dayNames.push(daysOfWeek[day.getDay()]);
  }
  return dayNames;
};

const BarChart = ({ data }) => {
  const [chartData, setChartData] = useState(null); // Inicializa como null

  useEffect(() => {
    if (data) {
      // Procesa la data para conseguir los últimos 7 días
      const today = new Date();
      const lastSevenDays = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0];
        lastSevenDays.push(data[formattedDate] || 0);
      }
      lastSevenDays.reverse();

      // Nombres últimos 7 días
      const dayNames = getDayNames(
        new Date(today.setDate(today.getDate() - 6))
      );

      // Establece chartData solo si hay datos
      setChartData({
        labels: dayNames,
        datasets: [
          {
            label: "Pacientes Nuevos",
            data: lastSevenDays,
            backgroundColor: "#70C247",
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="w-full h-auto lg:w-[48vw] p-5 flex items-center justify-center">
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full p-5 text-gray-500">
          No hay información disponible
        </div>
      )}
    </div>
  );
};

export default BarChart;
