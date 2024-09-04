import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function getSchedule (scheduleId){
    try {
        const response = await ApiSegimed.get (`/schedules?id=${scheduleId}`)
        return response        
    } catch (error) {
        console.error(error.message)
    }
}