"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { useAppDispatch } from "@/redux/hooks";
import { updateVitalSign } from "@/redux/slices/user/preconsultaFormSlice";

const signosKeys = [
  {
    cat: "antrophometric",
    id: 4,
    key: "Talla",
    label: "Estatura",
    unit: "cm",
    defaultValue: 180,
  },
  {
    cat: "antrophometric",
    id: 5,
    key: "Peso",
    label: "Peso",
    unit: "kg",
    defaultValue: 76,
  },
  {
    cat: "antrophometric",
    key: "IMC",
    id: 7,
    label: "Índice de masa corporal",
    unit: "kg/m2",
    defaultValue: 24.69,
  },
  {
    cat: "vitalSigns",
    id: 1,
    key: "Temperatura",
    label: "Temperatura",
    unit: "°C",
    defaultValue: 37,
  },
  // {
  //   cat: "antrophometric",
  //   key: "Perimetro Abdominal",
  //   label: "Perímetro abdominal",
  //   unit: "cm",
  //   defaultValue: "",
  // },
  {
    cat: "vitalSigns",
    id: 7,
    key: "Frecuencia Cardiaca",
    label: "Frecuencia cardíaca",
    unit: "lpm",
    defaultValue: 80,
  },
  {
    cat: "vitalSigns",
    id: 2,
    key: "Presion Arterial Sistolica",
    label: "Presión arterial sistólica",
    unit: "mmHg",
    defaultValue: 120,
  },
  {
    cat: "vitalSigns",
    id: 3,
    key: "Presion Arterial Diastolica",
    label: "Presión arterial diastólica",
    unit: "mmHg",
    defaultValue: 80,
  },
  // {
  //   cat: "vitalSigns",
  //   key: "Presion Arterial Media",
  //   label: "Presión arterial media",
  //   unit: "mmHg",
  //   defaultValue: "",
  // },
  {
    cat: "vitalSigns",
    id: 5,
    key: "Frecuencia Respiratoria",
    label: "Frecuencia respiratoria",
    unit: "rpm",
    defaultValue: 17,
  },
  {
    cat: "vitalSigns",
    id: 6,
    key: "Saturacion de Oxigeno",
    label: "Saturación de oxígeno",
    unit: "%",
    defaultValue: 80,
  },
];
export default function SignosVitales({
  vitalSigns,
  paciente,
  title,
  defaultOpen = false,
  schedulingId,
}) {
  const dispatch = useAppDispatch();
  const handleInputChange = (id, key, event) => {
    const measure = event.target.value;
    dispatch(
      updateVitalSign({
        patientId: 8,
        measureType: id,
        measure: Number(measure),
        key,
      })
    );
  };
  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary className="flex px-6 py-2 border gap-1 items-center cursor-pointer justify-center">
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
            </p>
          </div>
        </summary>

        {signosKeys.map((signo) => {
          let vital = vitalSigns?.find(
            (vitalSign) => vitalSign.key === signo.key
          );
          return (
            <div
              key={signo.key}
              className="flex justify-start items-center gap-2 md:px-8 py-1 border-b border-b-[#cecece]">
              <label className="flex w-1/2 text-start text-[#5F5F5F] font-medium text-base leading-6  px-2 md:px-6 py-2">
                <Image
                  src={circleData}
                  alt="circulo informacion"
                  className="w-6 h-6"
                />
                {signo.label}
              </label>
              <span className="w-1/5 md:w-1/4">
                {signo.value} {signo.unit}
              </span>
              {paciente ? (
                <span className="w-1/3 text-start text-[#5F5F5F] font-light text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-2 md:px-6 py-1">
                  {paciente[signo.key] || signo.defaultValue}
                </span>
              ) : (
                <input
                  type="number"
                  value={vital?.measure}
                  className="w-[20%] md:w-[8%] text-start text-[#5F5F5F] font-semibold text-base leading-6 bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg px-2 md:px-4 py-1"
                  onChange={(event) =>
                    handleInputChange(signo.id, signo.key, event)
                  }
                />
              )}
            </div>
          );
        })}
      </details>
    </div>
  );
}
