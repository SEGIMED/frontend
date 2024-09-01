import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import ClincalCuerpo from "@/components/clinicalHistory/NewClinicalHistory/cuerpo";
import { useAppSelector } from "@/redux/hooks";

const AutoevaluacionSection = () => {
  const [autoevaluacionData, setAutoevaluacionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.clinicalHistory.user);

  useEffect(() => {
    const fetchAnamnesisData = async () => {
      try {
        const response = await fetch("/api/anamnesis", {
          params: { userId: user.id },
        });
        const data = await response.json();
        setAnamnesisData(data);
      } catch (error) {
        console.error("Error fetching anamnesis data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnamnesisData();
  }, [user.id]);

  const CommonColumns = [
    {
      label: "Fecha",
      key: "timestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "timestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Médico",
      key: "physician.name",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Centro de atencion",
      key: "attendancePlace.alias",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Motivo de consulta",
      key: "chiefComplaint",
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
        />
      )}
    </>
  );
};

export default AutoevaluacionSection;
