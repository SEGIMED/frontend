import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function patchMedicalEvent(data) {
    
    try {
        console.log(data)
        const response =ApiSegimed.patch(`/medical-event/update-event`, data)
        console.log(response)
        return response    
    } catch (error) {
        console.error(error.message)
    }
    
}