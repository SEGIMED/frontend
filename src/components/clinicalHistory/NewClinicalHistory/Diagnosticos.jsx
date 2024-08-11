import InputInfo from "./components/InputInfo";

const Diagnosticos = ({ info }) => {
  const formattedDrugs = info.drugPrescriptions?.join(", ") || " - ";
  const formattedProcedures = info.medicalProcedure?.join(", ") || " - ";

  return (
    <div className="md:p-4 p-2 bg-[#f5f4f4]">
      <InputInfo
        title="Diagnósticos"
        info={info.diagnostics?.map((d) => d.diagnosticNotes)}
      />
      <InputInfo title="Medicamentos" info={formattedDrugs} />
      <InputInfo title="Procedimientos" info={formattedProcedures} />
      {/* <InputInfo title='Conducta terapeutica' info={info.medicalProcedures} /> */}
      <InputInfo
        title="Tratamiento no farmacológico"
        info={info.treatmentPlan || " - "}
      />
      <InputInfo title="Pauta de alarma" info={info.alarmPattern || " - "} />
    </div>
  );
};

export default Diagnosticos;
