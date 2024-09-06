import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import AnamnesisComponent from "@/components/clinicalHistory/NewClinicalHistory/Anamnesis";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";

const AnamnesisSection = () => {
  const [anamnesisData, setAnamnesisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.clinicalHistory.user);

  useEffect(() => {
    const fetchAnamnesisData = async () => {
      try {
        const response = await ApiSegimed("/medical-history/anamnesis", {
          params: { userId: user.id },
        });
        setAnamnesisData(response.data);
      } catch (error) {
        console.error("Error fetching evoluciones data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnamnesisData();
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

  const AnamnesisContent = (row) => <AnamnesisComponent info={row} />;
  AnamnesisContent.displayName = "AnamnesisContent";

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <DynamicTable
          title="Anamnesis"
          rows={anamnesisData}
          columns={CommonColumns}
          renderCustomContent={AnamnesisContent}
          textError="No se encontró anamnesis disponible."
          clickable={true}
        />
      )}
    </>
  );
};

export default AnamnesisSection;
