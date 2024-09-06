import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";

const ConsultasSection = () => {
  const [consultasData, setConsultasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.clinicalHistory.user);

  useEffect(() => {
    const fetchConsultasData = async () => {
      try {
        const response = await ApiSegimed("/medical-history/consultation", {
          params: { patientId: user.id },
        });
        setConsultasData(response.data);
      } catch (error) {
        console.error("Error fetching evoluciones data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultasData();
  }, []);

  const ConsultasColumns = [
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
      key: "appSch.patientUser.userHpGroups",
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

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <DynamicTable
          title="Consultas"
          rows={consultasData}
          columns={ConsultasColumns}
          textError="No se encontraron consultas disponibles."
        />
      )}
    </>
  );
};

export default ConsultasSection;
