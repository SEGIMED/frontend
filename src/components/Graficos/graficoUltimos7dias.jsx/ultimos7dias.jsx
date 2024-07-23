"use client"

import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";

Chart.register(...registerables);

const getDayNames = (startDate) => {
  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  let dayNames = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(day.getDate() + i);
    dayNames.push(daysOfWeek[day.getDay()]);
  }
  return dayNames;
};

export const BarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const token= Cookies.get("a")
  useEffect(() => {
    
    const fetchData = async (headers) => {
      const response = await ApiSegimed.get('/user/login-record', headers);
      const data = response.data

      // procesa la data para conseguir los ultimos 7 dias 
      const today = new Date();
      const lastSevenDays = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        lastSevenDays.push(data[formattedDate] || 0);
      }
      lastSevenDays.reverse();

      // nombres ultimos 7 dias
      const dayNames = getDayNames(new Date(today.setDate(today.getDate() - 6)));

      setChartData({
        labels: dayNames,
        datasets: [
          {
            label: "Pacientes Activos",
            data: lastSevenDays,
            backgroundColor: "#70C247",
          },
        ],
      });
    };

    fetchData({ headers: { token: token } });
  }, []);

  return (
    <div className="w-full  h-auto lg:w-[48vw] p-5 flex items-center justify-center">
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
    </div>
  );
};


