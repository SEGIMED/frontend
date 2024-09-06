import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function postPhysycalExam(data) {

    try {
        
        const response = await ApiSegimed.post(
            `/patient-physical-examination`,
            data,
          );
        
          return response
    } catch (error) {
        console.error(error.message)
    }
    
}