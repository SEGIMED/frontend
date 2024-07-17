"use client"
import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

Chart.register(...registerables);




export const GenreChart = () => {
  const [dataGenre, setDataGenre] = useState({ women: 0, men: 0});

  useEffect(() => {
    const getGenre = async () => {
      try {
        const token = Cookies.get("a");
        const response = await ApiSegimed.get("/statistics-genre", { headers: { 'token': token } });
        
        setDataGenre(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getGenre();
  }, []);

  
const data = {
  labels: ["Femenino", "Masculino"],
  datasets: [
    {
      label: "Distribución de géneros",
      data: [dataGenre.women, dataGenre.men],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
    },
  ],
};


  return (
    <div className="w-full">
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                usePointStyle: true, // Utiliza un estilo redondeado para las etiquetas
                padding: 5, // Aumenta el espaciado entre las etiquetas y el gráfico
              },
            },
          },
        }}
      />
    </div>
  );
};

export const GooglePieChart = () => {
  const [dataGenre, setDataGenre] = useState({ women: 0, men: 0 });

  useEffect(() => {
    const getGenre = async () => {
      try {
        const token = Cookies.get("a");
        const response = await ApiSegimed.get("/statistics-genre", {
          headers: { token: token },
        });
        setDataGenre(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getGenre();
  }, []);

  useEffect(() => {
    // Load the Google Charts script
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.onload = () => {
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
    };
    document.head.appendChild(script);

    // Draw the chart
    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ["Color", "Votes"],
        ["Femenino", Number(dataGenre.women)],
        ["Masculino", Number(dataGenre.men)],
      ]);

      const options = {
        is3D: true,
        colors: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        pieStartAngle: 0,
        enableInteractivity: false,
        pieSliceText: "value-and-label",
        legend: { textStyle: { fontSize: 16 } },
      };

      const chart = new google.visualization.PieChart(
        document.getElementById("3d-pie-chart")
      );
      chart.draw(data, options);
    }
  }, [dataGenre]); // Dependencia añadida para que se actualice cuando dataGenre cambie

  return (
    <div>
      <div id="3d-pie-chart" style={{ width: "700px", height: "500px" }}></div>
    </div>
  );
};
