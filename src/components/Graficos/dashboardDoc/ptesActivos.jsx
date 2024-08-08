import { Doughnut } from "react-chartjs-2";

const PtesActivos = ({ dataActives }) => {
  // Define default data if no data is passed
  const data = {
    labels: ['Activos', 'Inactivos'],
    datasets: [{
      data: [
        dataActives?.activePatients || 0,
        dataActives?.inactivePatients || 0
      ],
      backgroundColor: [
        '#70C247', // Verde para activos
        '#487FFA', // Celeste para inactivos
      ]
    }]
  };

  return (
    <div className="w-full h-auto lg:w-[25vw] p-5 flex items-center justify-center">
      {dataActives ? (
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
      ) : (
        <div className="flex items-center justify-center w-full h-full p-5 text-gray-500">
          No hay información disponible
        </div>
      )}
    </div>
  );
};

export default PtesActivos;
