import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import ExamenFisico from "@/components/clinicalHistory/NewClinicalHistory/ExamenFisico";
import { useAppSelector } from "@/redux/hooks";

const ExamenFisicoSection = () => {
  const [examenFisicoData, setExamenFisicoData] = useState([]);
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
        />
      )}
    </>
  );
};

export default ExamenFisicoSection;
