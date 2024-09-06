import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import SignosVitales from "@/components/clinicalHistory/NewClinicalHistory/SignosVitales";
import { useAppSelector } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";

const SignosVitalesSection = () => {
  const [signosVitalesData, setSignosVitalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.clinicalHistory.user);

  useEffect(() => {
    const fetchSignosVitalesData = async () => {
      try {
        const response = await ApiSegimed("/medical-history/vital-signs", {
          params: { patientId: user.id },
        });
        setSignosVitalesData(response.data);
      } catch (error) {
        console.error("Error fetching evoluciones data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSignosVitalesData();
  }, []);

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
      label: "Centro de Atención",
      key: "appSch.attendancePlace.alias",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Motivo de Consulta ",
      key: "appSch.reasonForConsultation",
      showMobile: false,
      width: "w-16",
    },
  ];

  const SignosVitalesContent = (row) => <SignosVitales info={row} />;
  SignosVitalesContent.displayName = "SignosVitalesContent";

  return (
    <>
      {loading ? (
        <SkeletonList count={8} />
      ) : (
        <DynamicTable
          title="Signos Vitales"
          rows={signosVitalesData}
          columns={CommonColumns}
          renderCustomContent={SignosVitalesContent}
          textError="No se encontraron signos vitales disponibles."
          clickable={true}
        />
      )}
    </>
  );
};

export default SignosVitalesSection;
