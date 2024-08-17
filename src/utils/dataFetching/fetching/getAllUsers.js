

import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function getAllUsers(headers) {
    
    try {
        const response = await ApiSegimed.get("/user/getAllUsers",headers);
      
        return response
    } catch (error) {
        console.error(error);
    }
}