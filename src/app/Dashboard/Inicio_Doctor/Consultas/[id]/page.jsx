"use client"
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import ConsultaDoc from "@/components/consulta/consulta";
import { BodySection, FormDataUtil } from "@/utils/preconsultaFormato";
import { setFormData } from "@/redux/slices/user/preconsultaFormSlice";
import getPreConsultation from "@/utils/dataFetching/fetching/getPreconsultation";
import { draftFormat } from "@/utils/formatResponse";


export default function consultaDoc({params}){
    const [preconsult, setPreconsult] = useState();
    const dispatch=useAppDispatch()

    const fetchPreconsultation = async (scheduleId) => {
      try {
        const response = await getPreConsultation(scheduleId);
        setPreconsult(response.data);
        console.log(response.data)
       
        if (response.data) {
          const formatPreconsult = draftFormat(response.data);
         
          dispatch(setFormData(formatPreconsult));
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
