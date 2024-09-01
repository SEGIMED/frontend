import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import Evoluciones from "@/components/clinicalHistory/NewClinicalHistory/Evoluciones2";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";

const EvolucionesSection = () => {
  const [evolucionesData, setEvolucionesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.clinicalHistory.user);
  useEffect(() => {
    // Fetch data logic here
    const fetchEvolucionesData = async () => {
      try {
        // Simulate a data fetch
        const response = await ApiSegimed("/medical-history/evolution", {
          params: { patientId: user.userId },
        });
        setEvolucionesData(response.data);
      } catch (error) {
        console.error("Error fetching evoluciones data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolucionesData();
  }, [user.userId]);
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

  const EvolucionesComponent = (row) => <Evoluciones info={row} />;
  EvolucionesComponent.displayName = "EvolucionesComponent";

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <DynamicTable
          title="Evoluciones"
          rows={evolucionesData}
          columns={CommonColumns}
          renderCustomContent={EvolucionesComponent}
          textError="No se encontraron evoluciones disponibles."
          clickable={true}
        />
      )}
    </>
  );
};

export default EvolucionesSection;
