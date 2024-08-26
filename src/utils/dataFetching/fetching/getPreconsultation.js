import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function getPreConsultation  (scheduleId) {
  
    try {
      const res = await ApiSegimed.get(
        `/get-preconsultation?scheduleId=${scheduleId}&status=1`)
       
        return res

    } catch (error){
        console.error
    }
}