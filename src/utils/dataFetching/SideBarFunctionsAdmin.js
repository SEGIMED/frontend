"use client"
import { useAppDispatch } from "@/redux/hooks"
import getAllUsers from "./fetching/getAllUsers"
import { addAllUsers } from "@/redux/slices/user/allUsers"

export default function UseDataFetchingAdmin (){
    const dispatch=useAppDispatch()
    const allUsers= async  (headers)=>{
        const response= await getAllUsers(headers)
        if(response.data)dispatch(addAllUsers(response.data))
    }




    return {
        allUsers
    }
}