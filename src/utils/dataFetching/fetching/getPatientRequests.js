import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function getPatientRequests(id) {
    try {
        const response = await ApiSegimed.get(`/patient-medical-request?patientId=${id}`);
        console.log(response.data)
        if(response.data) return response.data
    } catch (error) {
        console.error("Error fetching patient requests:", error);
    }
};
