import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function patchHTPRisk(data) {
    try {
        console.log(data)
        const response = await ApiSegimed.patch(
            `/patient-update-hp-risk`,
            data
          );
          console.log(response)
          return response
        
    } catch (error) {
        console.error("No se pudo enviar la data de HTP Risk", error.message)
    }   
}