"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import PreconsultaPte from "../../../../../components/preconsulta/preconsulta";
import { FormDataUtil } from "@/utils/preconsultaFormato";
import { setFormData } from "@/redux/slices/user/preconsultaFormSlice";
import getPreConsultation from "@/utils/dataFetching/fetching/getPreconsultation";
import { DraftFormat } from "@/utils/formatResponse";
import getSchedule from "@/utils/dataFetching/fetching/getSchedule";
import PreconsultaInfo from "@/components/newConsulta/PreconsultaTab/PreconsultaInfo";
import LoadingFallback from "@/components/loading/loading";

export default function PrePte({ params }) {
  const [preconsult, setPreconsult] = useState(null);
  const [schedule, setSchedule] = useState();
  const [loading, setLoading] = useState(false);
  const fetchSchedule = async (scheduleId) => {
    try {
      setLoading(true);
      const response = await getSchedule(scheduleId);

      if (response.data) setSchedule(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Se ejecuta solo al cargar el componente
  useEffect(() => {
    fetchSchedule(Number(params.id));
  }, []);

  return (
    <>
      {schedule ? (
        <PreconsultaInfo
          medicalEventId={schedule?.medicalEvent?.id}
          scheduleId={schedule?.id}
          showSignosVitales={false}
        />
      ) : (
        <div className="flex justify-center items-center">
          <LoadingFallback className="w-10 h-10" />
        </div>
      )}

      {/* <PreconsultaPte params={Number(params.id)} preconsult={preconsult} schedule={schedule} /> */}
    </>
  );
}
