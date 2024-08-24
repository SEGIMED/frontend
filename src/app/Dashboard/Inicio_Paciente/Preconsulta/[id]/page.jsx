"use client"
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import PreconsultaPte from "../../../../../components/preconsulta/preconsulta";
import { FormDataUtil } from "@/utils/preconsultaFormato";
import { setFormData } from "@/redux/slices/user/preconsultaFormSlice";


export default function PrePte ({params}){
    
    const dispatch=useAppDispatch()
    
    useEffect(() => {
       const statePreconsulta= dispatch(setFormData(FormDataUtil))
      
    }, []);
    return(
        <>
        <PreconsultaPte params={Number(params.id)}/>
        </>
    )
}