import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function patchMedicalEvent(data) {
    
    try {
       
        const response =await ApiSegimed.patch(`/medical-event/update-event`, data)
       
        return response    
    } catch (error) {
        console.error(error.message)
    }
    
}