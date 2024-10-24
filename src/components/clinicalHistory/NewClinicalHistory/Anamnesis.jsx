import InputInfo from "./components/InputInfo";

const AnamnesisComponent = ({ info }) => {
  return (
    <div className="md:p-5 flex flex-col gap-2 bg-[#fafafc] ">
      <InputInfo title={"Evolución de la enfermedad"} info={info?.historyOfPresentIllness} />
      <div className="md:hidden block">
        <InputInfo
          title={"Motivo de consulta"}
          info={info?.chiefComplaint || info?.appSch?.reasonForConsultation}
        />
      </div>


    </div>
  );
};

export default AnamnesisComponent;
