import Image from "next/image";
import DataPatient from "../../consulta/info";
import circleData from "@/components/images/circleData.png";

const SignosVitales = ({ info }) => {
  return (
    <div className="bg-[#FBFBFB]">
      {info.vitalSignDetailsMedicalEvent?.map((detail, detailIndex) => (
        <div key={detailIndex}>
          <DataPatient
            title={detail.vitalSignMeasureType.name}
            info={`${detail.measure} ${detail.vitalSignMeasureType.measUnit.name}`}
          />
        </div>
      ))}

      {info.vitalSigns?.map((vital, vitalIndex) => (
        <div key={vitalIndex}>
          <DataPatient
            title={vital.measureType}
            info={`${vital.measure} ${vital.measureUnit}`}
          />
        </div>
      ))}

      <div className="flex justify-start items-center px-2  md:px-6 md:pr-10">
        <label className="flex w-[60%] md:w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
          <Image
            src={circleData}
            alt="circulo informacion"
            className="w-6 h-6"
          />
          Glucemia: ¿Tuvo valores fuera del rango normal en el último tiempo? (+
          140 mg/dl y - 80 mg/dl)
        </label>
        <div className="flex justify-end w-1/3 gap-4">
          <button className="px-4 py-1 border-2 rounded-lg border-[#DCDBDB]">
            Si
          </button>
          <button className="px-4 py-1 border-2 rounded-lg border-[#DCDBDB]">
            No
          </button>
        </div>
      </div>
      <div className="flex justify-start items-center md:gap-2 py-2 px-2  md:px-6 border-b border-b-[#cecece] md:pr-10">
        <label className="flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6 px-2 py-2">
          <Image
            src={circleData}
            alt="circulo informacion"
            className="w-6 h-6"
          />{" "}
          Escriba los últimos 4 valores mas anormales que tuvo.
        </label>
        <div className="md:flex grid grid-cols-2 justify-start w-1/2 md:gap-4 gap-1">
          <p className="px-[2px] md:px-4 text-center py-1 border-2 rounded-lg border-[#DCDBDB] w-full md:w-fit h-fit">
            -{" "}
          </p>
          <p className="px-[2px] md:px-4 text-center py-1 border-2 rounded-lg border-[#DCDBDB] w-full md:w-fit h-fit">
            -{" "}
          </p>
          <p className="px-[2px] md:px-4 text-center py-1 border-2 rounded-lg border-[#DCDBDB] w-full md:w-fit h-fit">
            -{" "}
          </p>
          <p className="px-[2px] md:px-4 text-center py-1 border-2 rounded-lg border-[#DCDBDB] w-full md:w-fit h-fit">
            -{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignosVitales;
