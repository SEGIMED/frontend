"use client"

import { ApiSegimed } from "@/Api/ApiSegimed";


export default async function getAllUsers(headers) {
    
    try {
        const response = await ApiSegimed.get("/user/getAllUsers", headers);
        console.log(response)
        return response
    } catch (error) {
        console.error(error);
    }
}