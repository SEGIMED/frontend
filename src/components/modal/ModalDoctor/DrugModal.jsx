import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconArrowNextConsult from "@/components/icons/IconArrowNextConsult";
import IconClose from "@/components/icons/IconClose";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconReasonQuerie from "@/components/icons/IconReasonQuerie";
import IconCircle from "@/components/icons/IconCircle";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedOption as setSelectedOptionAction } from "@/redux/slices/doctor/formConsulta";

const DrugModal = ({ isOpen, onClose, selectedOption }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    "Vía de administración": "",
    Dosis: "",
    "Unidad de medida": "",
    "Cantidad al dia": "",
  });

  const getMedicationName = (value) => {
    switch (value) {
      case "1":
        return "Losartan";
      case "4":
        return "Ácido Fenofíbrico";
      default:
        return "Medicamento Desconocido";
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (name, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    register(name, { value });
  };

  const onSubmit = (data) => {
    console.log(data);
    handleClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div onClick={handleClose} className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white rounded-lg w-[95%] h-[70%] md:w-[40rem] md:h-[32rem] flex flex-col items-center gap-5">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex items-center justify-start h-16 gap-3 p-5 font-semibold border-b-2">
            <IconCurrentRouteNav className="w-[1.5rem]" /> Nuevo medicamento HTP
          </div>
          <div className="bg-[#fafafc] h-full flex flex-col gap-4 py-3">
            <div className="flex flex-col justify-around gap-2 px-5">
              <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                <div className="flex items-center justify-center w-6 h-6">
                  <IconCircle className="w-2" />
                </div>
                Monodroga
              </div>
              <div
                id="reasonForConsultation"
                className="py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
              >
                {getMedicationName(selectedOption)}
              </div>
            </div>
            <div className="flex flex-col justify-around gap-2 px-5">
              <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                <IconReasonQuerie /> Vía de administración
              </div>
              <select
                className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg w-80 `}
                {...register("Vía de administración")}
                onChange={(e) => handleInputChange("Vía de administración", e.target.value)}
              >
                <option value="">Seleccione vía de administración</option>
                <option value="Boca">Boca</option>
              </select>
            </div>
            <div className="flex flex-row w-80">
              <div className="w-full border" />
              <div className="flex flex-col justify-around w-40 gap-2 pl-5">
                <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                  <IconReasonQuerie /> Dosis
                </div>
                <input
                  placeholder="Ingrese la dosis"
                  className="py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
                  {...register("Dosis")}
                  onChange={(e) => handleInputChange("Dosis", e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-around gap-2 px-5">
                <div className="flex items-center justify-start h-5 gap-3 text-sm font-semibold"></div>
                <select
                  className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg w-40  `}
                  {...register("Unidad de medida")}
                  onChange={(e) => handleInputChange("Unidad de medida", e.target.value)}
                >
                  <option value="">Seleccione unidad de medida</option>
                  <option value="Gramos">Gramos</option>
                  <option value="Ampollas">Ampollas</option>
                  <option value="Gotas">Gotas</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-around gap-2 px-5">
              <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                <IconReasonQuerie /> Cuantas tomas por día:
              </div>
              <select
                className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg w-80 `}
                {...register("Cantidad al dia")}
                onChange={(e) => handleInputChange("Cantidad al dia", e.target.value)}
              >
                <option value="">Seleccione vía de administración</option>
                <option value="datos">datos</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center w-full p-3 border-t-2">
            <button
              onClick={handleSubmit(onSubmit)}
              className="flex items-center justify-center gap-3 px-6 py-3 text-white bg-greenPrimary rounded-lg"
            >
              Guardar
              <IconArrowNextConsult />
            </button>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 m-4 duration-300 ease-in-out transform hover:transition hover:scale-105 active:scale-100 active:translate-y-1"
        >
          <IconClose className="w-8" />
        </button>
      </div>
    </div>
  ) : null;
};

export default DrugModal;
