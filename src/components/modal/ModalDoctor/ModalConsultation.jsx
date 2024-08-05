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
import { useState } from "react";
import Swal from "sweetalert2";

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

  const [disabled, setDisabled] = useState(false);

  const handleClose = () => {
    onClose();
    reset();
  };

  const date = watch("date");
  const time = watch("time");

  const combineDateTime = (date, time) => {
    if (date && time) {
      return `${date}T${time}:00`;
    }
    return "";
  };

  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  useEffect(() => {
    function onClose2(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (typeof window !== "undefined")
      window.addEventListener("keydown", onClose2);

    return () => {
      window.removeEventListener("keydown", onClose2);
    };
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      reset({
        patient: "",
        typeOfMedicalConsultation: "",
        reasonForConsultation: "",
        healthCenter: "",
        date: "",
        time: "",
        scheduledStartTimestamp: "",
        scheduledEndTimestamp: "",
      });
    }
  }, [isOpen, reset]);

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
      const selectedTime = new Date(
        combineDateTime(data.date, data.scheduledStartTimestamp)
      );

      // Definir los límites de tiempo
      const startLimit = new Date(data.date);
      startLimit.setHours(8, 0, 0);

      const endLimit = new Date(data.date);
      endLimit.setHours(20, 0, 0);

      // Comprobar si la hora seleccionada está dentro de los límites
      if (selectedTime < startLimit || selectedTime >= endLimit) {
        Swal.fire({
          title: "Hora no válida",
          text: "Por favor, selecciona una hora entre las 8:00 y las 20:00",
          icon: "error",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      setDisabled(true);
      const { date, time, ...rest } = data;

      const token = Cookies.get("a");
      const headers = { headers: { token: token } };
      console.log(rest);
      const response = await ApiSegimed.post("/schedules", rest, headers);

      handleClose();
      if (response.data) {
        Swal.fire({
          title: "Consulta agendada con éxito!",
          icon: "success",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      handleClose();
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        text: "Ocurrió un error al intentar agendar la consulta. Por favor, intenta nuevamente.",
      });
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

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div
        onClick={handleClickOutside}
        className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white rounded-lg w-[95%] h-[70%] md:w-[35rem] md:h-[40rem] flex flex-col items-center gap-5">
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-between w-full h-full">
          <div className="flex items-center justify-start h-16 gap-3 p-5 font-semibold border-b-2">
            <IconCurrentRouteNav className="w-4" /> Agendar consulta
          </div>
          <div className="flex flex-col justify-around px-5 pb-2">
            <div className="flex items-center justify-start gap-2 text-sm font-semibold">
              <IconTypeQueries /> Tipo de consultas
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="flex items-center justify-start gap-3 mt-2">
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
                  disabled
                  value="2"
                  {...register("typeOfMedicalConsultation", {
                    required: {
                      value: true,
                      message: "* Debes seleccionar una opción *",
                    },
                  })}
                />
                <label htmlFor="teleconsulta" className="">
                  Teleconsulta(Próximamente)
                </label>
              </div>
            </div>
            <div className="relative">
              {errors.typeOfMedicalConsultation && (
                <span className="absolute left-0 top-full mt-1 text-sm font-medium text-red-500">
                  {errors.typeOfMedicalConsultation.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full border" />

          <div className="flex flex-col justify-around gap-2  pb-2 px-5">
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
            <div className="relative">
              {errors.reasonForConsultation && (
                <span className="absolute left-0 top-full mt-1 text-sm font-medium text-red-500">
                  {errors.reasonForConsultation.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full border" />

          <div className="flex flex-col justify-around gap-2 px-5 pb-2">
            <div className="flex items-center justify-start gap-3 text-sm font-semibold">
              <IconCenterAtenttion /> Centro de atención
            </div>
            <select
              id="healthCenter"
              className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${
                errors.healthCenter ? "border-red-500" : ""
              }`}
              {...register("healthCenter", {
                required: {
                  value: true,
                  message:
                    "* ¿En cuál centro de atención quieres ser atendido? *",
                },
              })}>
              <option value="">Seleccione el centro de atención</option>
              <option value="1">Centro Gallegos</option>
            </select>
            <div className="relative">
              {errors.healthCenter && (
                <span className="absolute left-0 top-full mt-1 text-sm font-medium text-red-500">
                  {errors.healthCenter.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full border" />

          <div className="flex flex-col justify-around gap-2 px-5 pb-2">
            <div className="flex items-center justify-start gap-3 text-sm font-semibold">
              <IconDate /> Fecha
            </div>
            <div className="flex flex-col justify-around md:flex-row">
              <div className="flex flex-row justify-between gap-2 md:flex-col">
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
                <div className="relative">
                  {errors.date && (
                    <span className="absolute left-0 top-full mt-1 text-sm font-medium text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-between gap-2 md:flex-col">
                <label
                  htmlFor="time"
                  className="flex items-center justify-start gap-2">
                  <IconClock /> Hora
                </label>
                <input
                  id="time"
                  type="time"
                  min="08:00"
                  max="20:00"
                  placeholder=""
                  className="w-60 py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                  {...register("time", {
                    required: {
                      value: true,
                      message: "* Selecciona la hora *",
                    },
                  })}
                />
                <div className="relative">
                  {errors.time && (
                    <span className="absolute left-0 top-full mt-1 text-sm font-medium text-red-500">
                      {errors.time.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full p-3 border-t-2">
            <button
              disabled={disabled}
              type="submit"
              className="flex items-center justify-center gap-3 bg-[#487FFA] py-3 px-6 rounded-xl text-white">
              Continuar
              <IconArrowNextConsult />
            </button>
          </div>
        </form>
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 m-4 duration-300 ease-in-out transform hover:transition hover:scale-105 active:scale-100 active:translate-y-1">
          <IconClose className="w-8" />
        </button>
      </div>
    </div>
  ) : null;
};

export default ModalConsultation;
