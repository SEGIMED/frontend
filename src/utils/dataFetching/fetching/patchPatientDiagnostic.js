import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function patchPatientDiagnostic(data) {
    try {
        const response= await ApiSegimed.patch(
            `/patient-update-diagnostic`,
            data)
        return response
    } catch (error) {
        console.error(error.message)
    }
    
}