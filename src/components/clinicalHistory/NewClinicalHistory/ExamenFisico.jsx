import InputInfo from "./components/InputInfo";

const ExamenFisico = ({ info }) => {
  return (
    <div className="md:p-5 bg-[#f5f4f4] p-2">
      {info.appSch?.physicalAppointment?.map((examen, index) => (
        <div key={index}>
          <InputInfo
            title={examen?.catPhysicalSubsystem?.name}
            info={examen?.description}
          />
        </div>
      ))}
    </div>
  );
};

export default ExamenFisico;
