import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function postPatientStudiesOrHc(payload) {
    console.log(payload)
    try {
        const response = await ApiSegimed.post('/patient-studies', payload);

        return response
    } catch (error) {

        console.error('Error al enviar los datos:', error.message);
    }
}