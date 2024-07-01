

import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";


Chart.register(...registerables);

export default function Alarmas() {
//   const [dataALams, setDataAlarms] = useState({ activePatients: 0, inactivePatients: 0 });

//   useEffect(() => {
//     const getActives = async () => {
//       try {
//         const token = Cookies.get("a");
//         const response = await ApiSegimed.get("/statistics-patient-activity", { headers: { 'token': token } });
//        
//         setDataActives(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     getActives();
//   }, []);

  const data = {
    labels: ['Respondidas', 'Sin Responder'],
    datasets: [{
      data: [10, 20],
      backgroundColor: [
        '#70C247', // Verde para activos
        "rgb(231, 63, 63)"
      ]
    }]
  };

  return (
    <div className="w-full h-full lg:w-[550px]  p-5 flex items-center justify-center">
      <Doughnut data={data} options={{
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