import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function postPatientDiagnostic(data) {
    try {
        
        const response = await ApiSegimed.post(`/patient-diagnostic`, data)
        
    } catch (error) {
        console.error(error.message)

    }
}