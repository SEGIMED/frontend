import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function patchPreconsultation(data){
    
    try {
        const response= await ApiSegimed.patch(`/update-pre-consultation`, data);
       
        return response
    } catch (error) {
        console.error(error.message)
    }
}