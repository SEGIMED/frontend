import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function patchPhysicalExam(userId,data) {
    try {
        
        const response = await ApiSegimed.patch(
            `/patient-physical-examination?id=${userId}`,
            data
          );
        
          return response
    } catch (error) {
        console.error(error.message)
    }
    
}