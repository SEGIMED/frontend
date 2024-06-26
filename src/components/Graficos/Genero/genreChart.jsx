"use client"
import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const data = {
  labels: ["Femenino", "Masculino"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
    },
  ],
};

export const GenreChart = () => {
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
        ["Femenino", 300],
        ["Masculino", 50],
      ]);

      const options = {
        is3D: true,
        colors: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        pieStartAngle: 0,
        // tooltip: {trigger: 'none'}
        // pieSliceText: 'label
        enableInteractivity: false,
        pieSliceText: "value-and-label",
        legend: { textStyle: { fontSize: 16 } },
      };

      const chart = new google.visualization.PieChart(
        document.getElementById("3d-pie-chart")
      );
      chart.draw(data, options);
    }
  }, []);

  return (
    <div>
      <div id="3d-pie-chart" style={{ width: "700px", height: "500px" }}></div>
    </div>
  );
};
