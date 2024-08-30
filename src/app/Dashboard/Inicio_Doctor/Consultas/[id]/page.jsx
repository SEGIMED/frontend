"use client"
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import ConsultaDoc from "@/components/consulta/consulta";
import { BodySection, FormDataUtil } from "@/utils/preconsultaFormato";
import { setFormData } from "@/redux/slices/user/preconsultaFormSlice";
import getPreConsultation from "@/utils/dataFetching/fetching/getPreconsultation";


export default function consultaDoc({params}){
    const [preconsult, setPreconsult] = useState();
    const dispatch=useAppDispatch()

    const fetchPreconsultation = async (scheduleId) => {
      try {
        // Primera petición utilizando el scheduleId de params - esto pide la preconsulta
  
        const response = await getPreConsultation(scheduleId)
        
        setPreconsult(response.data);
      } catch (error) {
        console.error("Este agendamiento no tiene preconsulta", error);
      }
    };


   
    useEffect(() => {
      fetchPreconsultation(Number(params.id));
      const statePreconsulta= dispatch(setFormData(FormDataUtil))
      
    }, []);

    return(
        <>
        <ConsultaDoc id={Number(params.id)} preconsult={preconsult}/>
        </>
    )
}
