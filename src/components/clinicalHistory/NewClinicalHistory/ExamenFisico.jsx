import InputInfo from "./components/InputInfo";

const ExamenFisico = ({ info }) => {
  return (
    <div className="md:p-5 bg-[#f5f4f4] p-2">
      {info.physicalExaminations?.map((examen, index) => (
        <div key={index}>
          <InputInfo
            title={examen.physicalSubsystem}
            info={examen?.description}
          />
        </div>
      ))}
    </div>
  );
};

export default ExamenFisico;
