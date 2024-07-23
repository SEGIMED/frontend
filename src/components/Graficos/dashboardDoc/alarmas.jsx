import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function Alarmas() {
  const [dataAlarms, setDataAlarms] = useState({  });

  useEffect(() => {
    const getActives = async () => {
      try {
        const token = Cookies.get("a");
        const response = await ApiSegimed.get("/alarms-by-patient", { headers: { 'token': token } });
       
        const actives = response.data?.priorityCounts?.Activas
        const inactives = response.data?.priorityCounts?.Inactivas
       
        setDataAlarms({ actives, inactives });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getActives();
  }, []);

 
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
    <div className="w-full h-full lg:w-[530px] p-5 flex items-center justify-center">
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

