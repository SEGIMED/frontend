"use client"
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import PreconsultaPte from "../../../../../components/preconsulta/preconsulta";
import { FormDataUtil } from "@/utils/preconsultaFormato";
import { setFormData } from "@/redux/slices/user/preconsultaFormSlice";


export default function PrePte ({params}){
    console.log(params.id)
    const dispatch=useAppDispatch()
    console.log(FormDataUtil)
    useEffect(() => {
       const statePreconsulta= dispatch(setFormData(FormDataUtil))
       console.log(statePreconsulta) 
    }, []);
    return(
        <>
        <PreconsultaPte params={Number(params.id)}/>
        </>
    )
}