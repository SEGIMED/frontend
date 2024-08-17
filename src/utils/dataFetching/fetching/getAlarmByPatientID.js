import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function getAlarmByPatientId (id) {
    
    try {   
        const response = await ApiSegimed.get(`/alarms-by-patient/${id}`);
        
         return response.data.alarms    
        
    } catch (error) {
        console.error(error)
    }
  };

  