import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import Diagnosticos from "@/components/clinicalHistory/NewClinicalHistory/Diagnosticos";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";

const DiagnosticosSection = () => {
  const [diagnosticosData, setDiagnosticosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.clinicalHistory.user);

  useEffect(() => {
    const fetchDiagnosticosData = async () => {
      try {
        const response = await ApiSegimed("/medical-history/diagnostics", {
          params: { patientId: user.id },
        });
        setDiagnosticosData(response.data);
      } catch (error) {
        console.error("Error fetching evoluciones data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosticosData();
  }, [user.id]);

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
    // {
    //   label: "Médico",
    //   key: "physician.name",
    //   showMobile: true,
    //   width: "w-16",
    // },
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

  const DiagnosticosContent = (row) => <Diagnosticos info={row} />;
  DiagnosticosContent.displayName = "DiagnosticosContent";

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <DynamicTable
          title="Diagnosticos y tratamientos"
          rows={diagnosticosData}
          columns={CommonColumns}
          renderCustomContent={DiagnosticosContent}
          textError="No se encontraron diagnósticos y tratamientos disponibles."
          clickable={true}
        />
      )}
    </>
  );
};

export default DiagnosticosSection;
