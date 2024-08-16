import { ApiSegimed } from "@/Api/ApiSegimed";



export default async function getPatientDetail(id, headers) {
    try {
      const response1 = await ApiSegimed.get(`/patient-details?id=${id}`,  headers )
      const response2= await  ApiSegimed.get(`/patient/${id}`,  headers )
    
  
      const combinedData = {
        ...response1.data,
        ...response2.data,
      };
      console.log(combinedData)
      return combinedData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
