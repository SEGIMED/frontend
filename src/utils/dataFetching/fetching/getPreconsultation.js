import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function getPreConsultation  (scheduleId) {
  
    try {
      const res = await ApiSegimed.get(
        `/get-preconsultation?scheduleId=${scheduleId}&status=1`)
        console.log(res.data)
        return res

    } catch (error){
        console.error
    }
}