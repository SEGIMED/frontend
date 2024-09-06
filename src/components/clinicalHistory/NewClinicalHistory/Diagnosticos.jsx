import InputInfo from "./components/InputInfo";

const Diagnosticos = ({ info }) => {
  const formattedDrugs = info.drugPrescriptions?.join(", ") || " - ";
  const formattedProcedures =
    info.procedurePrescriptions
      ?.map((p) => p.medicalProcedureName)
      .join(", ") || " - ";

  return (
    <div className="md:p-4 p-2 bg-[#f5f4f4]">
      <InputInfo
        title="Diagnósticos"
        info={info?.diagnosedDisease?.description}
      />
      {/* <InputInfo title="Medicamentos" info={formattedDrugs} /> */}
      <InputInfo title="Procedimientos" info={formattedProcedures} />
      {/* <InputInfo title='Conducta terapeutica' info={info.medicalProcedures} /> */}
      <InputInfo
        title="Tratamiento no farmacológico"
        info={info.medicalIndications?.map((d) => d.description)}
      />
      <InputInfo title="Pauta de alarma" info={info.alarmPattern || " - "} />
    </div>
  );
};

export default Diagnosticos;
