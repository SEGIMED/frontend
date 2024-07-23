"use client";
import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

Chart.register(...registerables);

export const GenreChart = () => {
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



//EJEMPLOS DE USO PARA dataArray
// const Array = [
//   { label: 'nombres', value: valor de la data(Number), color: (si no es en rgb tiene comportamiento inesperado) },
//   { label: 'nombres', value: valor de la data(Number), color: (si no es en rgb tiene comportamiento inesperado) },
// ];

// const dataActives = [
//   { label: 'Inactivos', value: activity?.inactivePatients, color: 'rgb(54, 162, 235)' },
//   { label: 'Activos', value: activity?.activePatients, color: 'rgb(112, 194, 71)' },
// ];


//IMP!!! SI O SI VA CON UN chartId, o se pisan las datas y da un comportamiento inesperado, es para condicionar al useEffect

export const GooglePieChart = ({ dataArray, chartId }) => {
  const chartRef = useRef(null);
  const [legendData, setLegendData] = useState([]);

  useEffect(() => {
    // Load the Google Charts script
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.onload = () => {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);
    };
    document.head.appendChild(script);

    // Draw the chart
    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ...dataArray.map(item => [item?.label, Number(item?.value)])
      ]);

      const options = {
        is3D: true,
        colors: dataArray.map(item => item?.color),
        pieStartAngle: 0,
        enableInteractivity: false,
        tooltip: {
          trigger: 'none', // Desactivar tooltips
        },
        pieSliceText: 'label-and-value',
        legend: {
          position: 'none', // Eliminar leyenda del gráfico
        },
      };

      const chart = new google.visualization.PieChart(
        chartRef.current
      );
      chart.draw(data, options);

      // Crear datos para la leyenda personalizada
      const legendData = dataArray.map(item => ({
        label: item?.label,
        value: item?.value,
        color: item?.color,
      }));
      setLegendData(legendData);
    }
  }, [dataArray]);

  return (
    <div style={{ width: '100%', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
      <div
        id={chartId}
        ref={chartRef}
        style={{
          width: '100%',
          height: '500px',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {legendData.map((item, index) => (
          <div key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: item.color,
                marginRight: '8px',
                borderRadius: '50%',
              }}
            ></span>
            <span style={{ fontSize: '14px', textAlign: 'center' }}>
              {item.label} {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};