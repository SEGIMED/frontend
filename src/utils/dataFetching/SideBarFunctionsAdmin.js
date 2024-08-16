"use client"
import { useAppDispatch } from "@/redux/hooks"
import getAllUsers from "./fetching/getAllUsers"
import { addAllUsers } from "@/redux/slices/user/allUsers"
import getPatientDetail from "./fetching/getPatientDetail"
import { adduser } from "@/redux/slices/user/user"

export default function UseDataFetchingAdmin (){
    const dispatch=useAppDispatch()

    const allUsers= async  (headers)=>{
        const response= await getAllUsers(headers)
        if(response.data) dispatch(addAllUsers(response.data))
    }
    const getPatientD= async (id,headers)=>{
        
        const response= await getPatientDetail(id,headers)
        
        dispatch(adduser(response))
    }



    return {
        allUsers,
        getPatientD,
    }
}