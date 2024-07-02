import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function PtesActivos() {
  const [dataActives, setDataActives] = useState({ activePatients: 0, inactivePatients: 0 });

  useEffect(() => {
    const getActives = async () => {
      try {
        const token = Cookies.get("a");
        const response = await ApiSegimed.get("/statistics-patient-activity", { headers: { 'token': token } });
 
        setDataActives(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getActives();
  }, []);

  const data = {
    labels: ['Activos', 'Inactivos'],
    datasets: [{
      
      backgroundColor: [
        '#70C247', // Verde para activos
        '#487FFA', // Celeste para inactivos
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
                padding: 100, // Ajustamos el padding a 100
              }
            }
          }
        }}
      />
    </div>
  );
};
