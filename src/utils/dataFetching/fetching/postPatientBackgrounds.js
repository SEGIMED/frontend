import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function postPatientBackgrounds( data) {
    try {
       
        const response = await ApiSegimed.post(
            `/backgrounds/create-backgrounds`,
            data);
           
            return response
    } catch (error) {
        console.error("No se pudo enviar la data de backgrounds", error.message)
    }
}