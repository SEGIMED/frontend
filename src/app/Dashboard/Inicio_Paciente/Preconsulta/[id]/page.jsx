"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import PreconsultaPte from "../../../../../components/preconsulta/preconsulta";
import { FormDataUtil } from "@/utils/preconsultaFormato";
import { setFormData } from "@/redux/slices/user/preconsultaFormSlice";
import getPreConsultation from "@/utils/dataFetching/fetching/getPreconsultation";
import { draftFormat } from "@/utils/formatResponse";

export default function PrePte({ params }) {
  const dispatch = useAppDispatch();
  const [preconsult, setPreconsult] = useState(null);

  // Función para obtener la preconsulta desde el servidor
  const fetchPreconsultation = async (scheduleId) => {
    try {
      const response = await getPreConsultation(scheduleId);
      setPreconsult(response.data);
    
      if (response.data) {
        const formatPreconsult = draftFormat(response.data);
       
        dispatch(setFormData(formatPreconsult));
      } 
    } catch (error) {
      console.error("Este agendamiento no tiene preconsulta", error);
    }
  };

  // Se ejecuta solo al cargar el componente
  useEffect(() => {
    fetchPreconsultation(Number(params.id));
  }, []);

  
 

  return (
    <>
      <PreconsultaPte params={Number(params.id)} preconsult={preconsult} />
    </>
  );
}
