"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import PreconsultaPte from "../../../../../components/preconsulta/preconsulta";
import { FormDataUtil } from "@/utils/preconsultaFormato";
import { setFormData } from "@/redux/slices/user/preconsultaFormSlice";
import getPreConsultation from "@/utils/dataFetching/fetching/getPreconsultation";
import { DraftFormat } from "@/utils/formatResponse";
import getSchedule from "@/utils/dataFetching/fetching/getSchedule";

export default function PrePte({ params }) {
  const dispatch = useAppDispatch();
  const [preconsult, setPreconsult] = useState(null);
  const [schedule, setSchedule]=useState()
  // Función para obtener la preconsulta desde el servidor
  const fetchPreconsultation = async (scheduleId) => {
    try {
      const response = await getPreConsultation(scheduleId);
      setPreconsult(response.data);
    
      if (response.data) {
        const formatPreconsult = DraftFormat(response.data);
       
        dispatch(setFormData(formatPreconsult));
      } else {
        dispatch(FormDataUtil)
      }
    } catch (error) {
      console.error("Este agendamiento no tiene preconsulta", error);
    }
  };
  const fetchSchedule= async (scheduleId)=>{
    try {
        const response= await getSchedule(scheduleId)
        
        if (response.data) setSchedule(response.data[0])
    } catch (error) {
        console.error(error.message)
    }
  }


  // Se ejecuta solo al cargar el componente
  useEffect(() => {
    fetchPreconsultation(Number(params.id));
    fetchSchedule(Number(params.id));
  }, []);

  
 

  return (
    <>
      <PreconsultaPte params={Number(params.id)} preconsult={preconsult} schedule={schedule} />
    </>
  );
}
