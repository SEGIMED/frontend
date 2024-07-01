import { Doughnut } from "react-chartjs-2";

export default function Alarmas() {
  const data = {
    labels: ['Respondidas', 'Sin Responder'],
    datasets: [{
      data: [10, 20],
      backgroundColor: [
        '#70C247', // Verde para respondidas
        'rgb(231, 63, 63)' // Rojo para sin responder
      ]
    }]
  };

  return (
    <div className="w-full h-full lg:w-[500px] p-5 flex items-center justify-center">
      <Doughnut 
        data={data} 
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'bottom', 
              labels: {
                usePointStyle: true, 
                padding: 100, 
              }
            }
          }
        }}
      />
    </div>
  );
};
