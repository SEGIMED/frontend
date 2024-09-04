"use client"
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import ConsultaDoc from "@/components/consulta/consulta";
import { FormDataUtil } from "@/utils/preconsultaFormato";
import { setFormData } from "@/redux/slices/user/preconsultaFormSlice";
import getPreConsultation from "@/utils/dataFetching/fetching/getPreconsultation";
import { DraftFormat } from "@/utils/formatResponse";


export default function ConsultaDocc({params}){
    const [preconsult, setPreconsult] = useState();
    const dispatch= useAppDispatch()

    const fetchPreconsultation = async (scheduleId) => {
      try {
        const response = await getPreConsultation(scheduleId);
        setPreconsult(response.data);
        
       
        if (response.data) {
          const formatPreconsult = DraftFormat(response.data);
         
          dispatch(setFormData(formatPreconsult));
        }else {
          dispatch(FormDataUtil)
        }
      } catch (error) {
        console.error("Este agendamiento no tiene preconsulta", error);
      }
    };

   
    useEffect(() => {
      fetchPreconsultation(Number(params.id));
     
      
    }, []);
   
    return(
        <>
        <ConsultaDoc id={Number(params.id)} preconsult={preconsult}/>
        </>
    )
}
