import { ApiSegimed } from "@/Api/ApiSegimed";

export default async function htpGroup(data) {
    try {
       
        const response = await ApiSegimed.post(`/patient-new-hp-group`, data);
     
        // const  response2 = await ApiSegimed.patch(`/patient-update-hp-group`, data);
       
        // console.log(response2)
        return response
    } catch (error) {
        console.error(error.message)
    }
}