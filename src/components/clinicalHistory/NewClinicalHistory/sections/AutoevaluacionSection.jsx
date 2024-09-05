import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import ClincalCuerpo from "@/components/clinicalHistory/NewClinicalHistory/cuerpo";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";

const AutoevaluacionSection = () => {
  const [autoevaluacionData, setAutoevaluacionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.clinicalHistory.user);

  useEffect(() => {
    const fetchAutoevaluacionData = async () => {
      try {
        const response = await ApiSegimed("/self-evaluation-event/pain-map", {
          params: { patientId: user.userId },
        });
        setAutoevaluacionData(response.data);
      } catch (error) {
        console.error("Error fetching evoluciones data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutoevaluacionData();
  }, [user.userId]);

  const CommonColumns = [
    {
      label: "Fecha",
      key: "date",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "date",
      showMobile: true,
      width: "w-8",
    },
    // {
    //   label: "Grupo HTP",
    //   key: "htp",
    //   showMobile: true,
    //   width: "w-16",
    // },
    {
      label: "Centro de atencion ",
      key: "attendancePlace",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Motivo de consulta",
      key: "reasonForConsultation",
      showMobile: false,
      width: "w-16",
    },
  ];

  const AutoevaluacionContent = (row) => <ClincalCuerpo info={row} />;
  AutoevaluacionContent.displayName = "AutoevaluacionContent";

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <DynamicTable
          title="Autoevaluación"
          rows={autoevaluacionData}
          columns={CommonColumns}
          renderCustomContent={AutoevaluacionContent}
          textError="No se encontró autoevaluación disponible."
          clickable={true}
        />
      )}
    </>
  );
};

export default AutoevaluacionSection;
