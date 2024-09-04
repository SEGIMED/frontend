import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function patchCardiovascularRisk(data) {
    try {
        console.log(data)
        const response = await ApiSegimed.patch(
            `/patient-update-cardiovascular-risk`,
           data);
           console.log(response)
           return response
    } catch (error) {
        console.error("No se pudo enviar la data de Cardiovascular Risk", error.message)
    }
    
}