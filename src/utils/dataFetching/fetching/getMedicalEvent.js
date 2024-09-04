import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function getMedicalEvent(scheduleId) {
    try {
       
        const response = await ApiSegimed.get(
          `/medical-event/get-medical-event-detail?scheduleId=${scheduleId}`
        );
        console.log("esto es medical event", response.data);
        return response
      } catch (error) {
        console.log("No se ah echo un diagnostico anteriormente:", error);
      }
    };
