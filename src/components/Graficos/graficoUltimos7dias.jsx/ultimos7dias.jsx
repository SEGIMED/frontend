import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomData = () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push(getRandomInt(1, 10));
  }
  return data;
};

const data = {
  labels: [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ],
  datasets: [
    {
      label: "Valor",
      data: getRandomData(),
      backgroundColor: "#70C247",
    },
  ],
};

export const BarChart = () => {
  return (
    <div className="w-full h-full lg:w-[940px]  p-5 flex items-center justify-center">
      <Bar
        data={data}
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
