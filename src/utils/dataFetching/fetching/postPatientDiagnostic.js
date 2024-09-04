import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function postPatientDiagnostic(data) {
    try {
        console.log(data)
        const response = await ApiSegimed.post(`/patient-diagnostic`, data)
        console.log(response)
    } catch (error) {
        console.error(error.message)
        
    }
}