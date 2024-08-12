import InputInfo from "./components/InputInfo";

const AnamnesisComponent = ({ info }) => {
  return (
    <div className="md:p-5 flex flex-col gap-2 bg-[#fafafc] ">
      <InputInfo
        title={"Evolución de la enfermedad"}
        info={info?.historyOfPresentIllness}
      />
      <InputInfo title={"Motivo de consulta"} info={info?.chiefComplaint} />
      <InputInfo title={"Síntomas importantes"} info={info?.reviewOfSystems} />
    </div>
  );
};

export default AnamnesisComponent;
