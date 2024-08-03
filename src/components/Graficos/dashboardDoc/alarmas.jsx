import { Doughnut } from "react-chartjs-2";

const Alarmas = ({ dataAlarms }) => {
  const data = {
    labels: ['Respondidas', 'Sin Responder'],
    datasets: [{
      data: [dataAlarms.inactives, dataAlarms.actives],
      backgroundColor: [
        '#70C247', // Verde para respondidas
        'rgb(231, 63, 63)' // Rojo para sin responder
      ]
    }]
  };

  return (
    <div className="w-full h-auto lg:w-[25vw] p-5 flex items-center justify-center">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 20,
              }
            }
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20
            }
          }
        }}
      />
    </div>
  );
};

export default Alarmas;
