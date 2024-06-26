"use client";

import { ApiSegimed } from "@/Api/ApiSegimed";
import IconArrowNextConsult from "@/components/icons/IconArrowNextConsult";
import IconCenterAtenttion from "@/components/icons/IconCenterAtenttion";
import IconClock from "@/components/icons/IconClock";
import IconClose from "@/components/icons/IconClose";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconDate from "@/components/icons/IconDate";
import IconDay from "@/components/icons/IconDay";
import IconReasonQuerie from "@/components/icons/IconReasonQuerie";
import IconTypeQueries from "@/components/icons/IconTypeQueries";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const ModalConsultation = ({ isOpen, onClose, doctorId, patientId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const handleClose = () => {
    onClose();
    reset();
  };

  const date = watch("date");
  const time = watch("time");

  const combineDateTime = (date, time) => {
    if (date && time) {
      return `${date}T${time}:00.000Z`;
    }
    return "";
  };

  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  useEffect(() => {
    const startDateTime = combineDateTime(date, time);
    if (startDateTime) {
      const startDate = new Date(startDateTime);
      const endDate = addMinutes(startDate, 30);
      const endDateTime = endDate.toISOString();

      setValue("scheduledStartTimestamp", startDateTime);
      setValue("scheduledEndTimestamp", endDateTime);
    }
    setValue("medicalSpecialty", 1);
    setValue("schedulingStatus", 1);
    setValue("patient", patientId);
    setValue("physician", doctorId);
  }, [date, time, setValue, patientId, doctorId]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { date, time, ...rest } = data;
     
      const token= Cookies.get("a")
      const headers={ headers: { token: token } }
      
      const response = await ApiSegimed.post("/schedules", rest, headers );
      
      
      if (response.data) {
        alert("cita agendada");
      }

      handleClose();
    } catch (error) {
      console.error("Error al enviar los datos:", error);

      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  });

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white rounded-lg w-[95%] h-[70%] md:w-[35rem] md:h-[35rem] flex flex-col items-center gap-5">
        <form
          onSubmit={onSubmit}
          className="h-full w-full flex flex-col justify-between">
          <div className="h-16 flex items-center justify-start gap-3 p-5 border-b-2 font-semibold">
            <IconCurrentRouteNav className="w-4" /> Agendar consulta
          </div>
          <div className="flex flex-col justify-around px-5">
            <div className="flex items-center justify-start gap-2 text-sm font-semibold">
              <IconTypeQueries /> Tipo de consultas
            </div>
            <div className="flex items-center justify-around gap-2">
              <div className="flex items-center justify-start gap-3">
                <input
                  id="consultaFisica"
                  type="radio"
                  value="1"
                  {...register("typeOfMedicalConsultation", {
                    required: {
                      value: true,
                      message: "* Este dato es requerido *",
                    },
                  })}
                />
                <label htmlFor="consultaFisica" className="">
                  Consulta Física
                </label>
              </div>

              <div className="flex items-center justify-start gap-3">
                <input
                  id="teleconsulta"
                  type="radio"
                  value="2"
                  {...register("typeOfMedicalConsultation", {
                    required: {
                      value: true,
                      message: "* Debes seleccionar una opción *",
                    },
                  })}
                />
                <label htmlFor="teleconsulta" className="">
                  Teleconsulta
                </label>
              </div>
            </div>
            {errors.typeOfMedicalConsultation && (
              <span className="text-red-500 text-sm font-medium">
                {errors.typeOfMedicalConsultation.message}
              </span>
            )}
          </div>

          <div className="border w-full" />

          <div className="flex flex-col justify-around gap-2 px-5">
            <div className="flex items-center justify-start gap-3 text-sm font-semibold">
              <IconReasonQuerie /> Motivo de consulta
            </div>
            <input
              id="reasonForConsultation"
              placeholder="Ingrese el motivo de la consulta"
              className="py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
              {...register("reasonForConsultation", {
                required: {
                  value: true,
                  message: "* ¿Cuál es el motivo de consulta? *",
                },
              })}
            />
            {errors.reasonForConsultation && (
              <span className="text-red-500 text-sm font-medium">
                {errors.reasonForConsultation.message}
              </span>
            )}
          </div>

          <div className="border w-full" />

          <div className="flex flex-col justify-around gap-2 px-5">
  <div className="flex items-center justify-start gap-3 text-sm font-semibold">
    <IconCenterAtenttion /> Centro de atención
  </div>
  <select
    id="healthCenter"
    className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${
      errors.healthCenter ? 'border-red-500' : ''
    }`}
    {...register("healthCenter", {
      required: {
        value: true,
        message: "* ¿En cuál centro de atención quieres ser atendido? *",
      },
    })}
  >
    <option value="">Seleccione el centro de atención</option>
    <option value="1">Centro Gallegos</option>
  </select>
  {errors.healthCenter && (
    <span className="text-red-500 text-sm font-medium">
      {errors.healthCenter.message}
    </span>
  )}
</div>

          <div className="border w-full" />

          <div className="flex flex-col justify-around gap-2 px-5">
            <div className="flex items-center justify-start gap-3 text-sm font-semibold">
              <IconDate /> Fecha
            </div>
            <div className="flex flex-col md:flex-row justify-around">
              <div className="flex flex-row md:flex-col justify-between gap-2">
                <label
                  htmlFor="date"
                  className="flex items-center justify-start gap-2">
                  <IconDay /> Día
                </label>
                <input
                  id="date"
                  type="date"
                  placeholder=""
                  className="w-60 p-2 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                  {...register("date", {
                    required: {
                      value: true,
                      message: "* Selecciona la fecha *",
                    },
                  })}
                />
                {errors.date && (
                  <span className="text-red-500 text-sm font-medium">
                    {errors.date.message}
                  </span>
                )}
              </div>

              <div className="flex flex-row md:flex-col justify-between gap-2">
                <label
                  htmlFor="time"
                  className="flex items-center justify-start gap-2">
                  <IconClock /> Hora
                </label>
                <input
                  id="time"
                  type="time"
                  placeholder=""
                  className="w-60 py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                  {...register("time", {
                    required: {
                      value: true,
                      message: "* Selecciona la hora *",
                    },
                  })}
                />
                {errors.time && (
                  <span className="text-red-500 text-sm font-medium">
                    {errors.time.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full p-3 border-t-2 flex justify-center items-center">
            <button
              type="submit"
              className="flex items-center justify-center gap-3 bg-[#487FFA] py-3 px-6 rounded-xl text-white">
              Continuar
              <IconArrowNextConsult />
            </button>
          </div>
        </form>
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 m-4 hover:transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
          <IconClose className="w-8" />
        </button>
      </div>
    </div>
  ) : null;
};

export default ModalConsultation;
