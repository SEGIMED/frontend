import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import ExamenFisico from "@/components/clinicalHistory/NewClinicalHistory/ExamenFisico";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";

const ExamenFisicoSection = () => {
  const [examenFisicoData, setExamenFisicoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.clinicalHistory.user);

  useEffect(() => {
    const fetchExamenFisicoData = async () => {
      try {
        const response = await ApiSegimed("/patient-physical-examination", {
          params: { patientId: user.userId },
        });
        setExamenFisicoData(response.data);
      } catch (error) {
        console.error("Error fetching evoluciones data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamenFisicoData();
  }, [user.userId]);

  const CommonColumns = [
    {
      label: "Fecha",
      key: "appSch.scheduledStartTimestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "appSch.scheduledStartTimestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Grupo HTP",
      key: "htp",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Centro de atencion ",
      key: "appSch.attendancePlace.alias",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Motivo de consulta",
      key: "appSch.reasonForConsultation",
      showMobile: false,
      width: "w-16",
    },
  ];
  const ExamenFisicoContent = (row) => <ExamenFisico info={row} />;
  ExamenFisicoContent.displayName = "ExamenFisicoContent";

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <DynamicTable
          title="Examen Físico"
          rows={examenFisicoData}
          columns={CommonColumns}
          renderCustomContent={ExamenFisicoContent}
          textError="No se encontró examen físico disponible."
          clickable={true}
        />
      )}
    </>
  );
};

export default ExamenFisicoSection;
