import InputInfo from "./components/InputInfo";

const Diagnosticos = ({ info }) => {
  const formattedProcedures =
    info.procedurePrescriptions
      ?.map((p) => p.medicalProcedureName)
      .join(", ") || " - ";

  const formattedNonPharmaTreatment =
    info.medicalIndications?.map((d) => d.description).join(", ") || " - ";

  return (
    <div className="md:p-4 p-2 bg-[#f5f4f4]">
      {/* Map de diagnósticos para mostrar un InputInfo por cada diagnóstico */}
      {info.medicalEventDiagnostics?.map((diagnostic, index) => (
        <InputInfo
          key={index}
          title={`Diagnóstico ${index + 1}`}
          info={diagnostic.cie10subCategory?.description || " - "}
        />
      ))}

      {/* <InputInfo title="Medicamentos" info={formattedDrugs} /> */}
      <InputInfo title="Procedimientos" info={formattedProcedures} />
      {/* <InputInfo title="Conducta terapéutica" info={info.medicalProcedures} /> */}
      <InputInfo
        title="Tratamiento no farmacológico"
        info={formattedNonPharmaTreatment}
      />
      <InputInfo title="Pauta de alarma" info={info.alarmPattern || " - "} />
    </div>
  );
};

export default Diagnosticos;
