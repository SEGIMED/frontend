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
import { useRouter } from "next/navigation";
import { healthCenterSwitch } from "@/utils/healthCenters";
import Elboton from "@/components/Buttons/Elboton";
import IconCheckGreenBoton from "@/components/icons/IconCheckGreen";
import IconCancel from "@/components/icons/iconCancel";
import IconCheckBoton from "@/components/icons/iconCheckBoton";
import IconPatientNav from "@/components/icons/IconPatientNav";

const ModalConsultation = ({
  isOpen,
  onClose,
  doctorId,
  patientId,
  reason,
  callback,
  readOnly = false,
  consulta,
}) => {
  const role = Cookies.get("b");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      reasonForConsultation: reason,
    },
  });
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

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
    if (isOpen) {
      if (consulta) {
        reset({
          reasonForConsultation: reason || consulta?.reasonForConsultation,
          typeOfMedicalConsultation: consulta?.typeOfMedicalConsultation,
          healthCenter: consulta?.healthCenter,
          date: new Date(consulta?.scheduledStartTimestamp)
            .toISOString()
            .split("T")[0],
          time: formatTime(consulta?.scheduledStartTimestamp),
        });
      }
    } else {
      reset();
    }
  }, [isOpen, reason, consulta, reset]);

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

  const formatTime = (timestamp) => {
    let date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0"); // "HH"
    const minutes = date.getMinutes().toString().padStart(2, "0"); // "MM"
    return `${hours}:${minutes}`; // "HH:MM"
  };
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

      const response = await ApiSegimed.post("/schedules", rest);

      handleClose();
      if (response.data) {
        if (role !== "Paciente") {
          Swal.fire({
            title: "Consulta agendada con éxito!",
            icon: "success",
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
          }).then(() => {
            if (callback) callback();
          });
        } else {
          Swal.fire({
            title: "Se ha solicitado la consulta con éxito",
            icon: "success",
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
            text: "En menos de 24 horas recibirás una respuesta a tu solicitud.",
          });
        }
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
    } finally {
      setDisabled(false);
    }
  });

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
  const handleApproveConsulta = async () => {
    Swal.fire({
      icon: "question",
      title: "Esta seguro de esta acción",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiSegimed.patch(`/schedule/${consulta.id}`, {
            schedulingStatus: 1,
            IsApproved: true,
          });
          Swal.fire({
            icon: "success",
            title: "La consulta ha sido aceptada",
          }).then(() => handleClose());
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Fallo al aceptar la consulta",
            text: error.msg,
          });
        }
      }
    });
  };
  const handleDismissConsulta = async () => {
    Swal.fire({
      icon: "question",
      title: "Esta seguro de esta acción",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiSegimed.patch(`/schedule/${consulta.id}`, {
            schedulingStatus: 3,
          });
          Swal.fire({
            icon: "success",
            title: "La consulta ha sido cancelada",
          }).then(() => handleClose());
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Fallo al cancelar la consulta",
            text: error.msg,
          });
        }
      }
    });
  };
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div
        onClick={handleClickOutside}
        className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white rounded-lg w-[95%] md:w-[35rem] max-h-[93%] flex flex-col gap-5 overflow-auto">
        <form onSubmit={onSubmit} className="flex flex-col h-full">
          <div className="flex items-center justify-between p-3 border-b-2 font-semibold">
            <div className="flex items-center gap-3">
              <IconCurrentRouteNav className="w-4" />
              {consulta ? (
                <p>Solicitud de consulta</p>
              ) : (
                <p>Agendar consulta</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="transition-transform transform hover:scale-105 active:scale-100 active:translate-y-1">
              <IconClose className="w-8" />
            </button>
          </div>
          {consulta && (
            <div className="flex flex-col justify-around gap-2  py-2 px-5">
              <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                <IconPatientNav className={"w-5"} color={"black"} /> Paciente
              </div>
              <span className="py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg">
                {consulta.patientUser.name +
                  " " +
                  consulta.patientUser.lastname}
              </span>
            </div>
          )}
          <div className="flex flex-col justify-around px-5 pb-2">
            <div className="flex items-center justify-start gap-2 text-sm font-semibold">
              <IconTypeQueries /> Tipo de consultas
            </div>
            <div className="flex items-center  justify-around gap-2">
              <div className="flex items-center justify-start gap-3 mt-1">
                <input
                  id="consultaFisica"
                  type="radio"
                  value="1"
                  readOnly={readOnly}
                  checked={consulta && consulta?.typeOfMedicalConsultation == 1}
                  {...register("typeOfMedicalConsultation")}
                />
                <label htmlFor="consultaFisica" className="">
                  Consulta Física
                </label>
              </div>

              <div className="flex items-center justify-start gap-3 mt-1">
                <input
                  id="teleconsulta"
                  type="radio"
                  disabled
                  value="2"
                  checked={consulta && consulta?.typeOfMedicalConsultation == 2}
                  {...register("typeOfMedicalConsultation")}
                />
                <label htmlFor="teleconsulta" className="">
                  Teleconsulta
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

          <div className="flex flex-col justify-around gap-2  py-2 px-5">
            <div className="flex items-center justify-start gap-3 text-sm font-semibold">
              <IconReasonQuerie /> Motivo de consulta
            </div>
            <input
              id="reasonForConsultation"
              placeholder="Ingrese el motivo de la consulta"
              className="py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
              disabled={readOnly}
              {...register("reasonForConsultation")}
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

          <div className="flex flex-col justify-around gap-2 px-5 py-2">
            <div className="flex items-center justify-start gap-3 text-sm font-semibold">
              <IconCenterAtenttion /> Centro de atención
            </div>
            {readOnly ? (
              <span className="py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg">
                {healthCenterSwitch(consulta.healthCenter)}
              </span>
            ) : (
              <select
                id="healthCenter"
                className={` py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${
                  errors.healthCenter ? "border-red-500" : ""
                }`}
                {...register("healthCenter")}>
                <option value="">Seleccione el centro de atención</option>
                <option value="1">Centro Gallego</option>
              </select>
            )}
            <div className="relative">
              {errors.healthCenter && (
                <span className="absolute left-0 top-full mt-1 text-sm font-medium text-red-500">
                  {errors.healthCenter.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full border" />

          <div className="flex flex-col justify-around gap-2 px-5 py-2">
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
                  disabled={readOnly}
                  {...register("date")}
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
                  placeholder=""
                  className="w-60 py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                  disabled={readOnly}
                  {...register("time")}
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

          {!readOnly && (
            <div className="flex items-center justify-center w-full p-3 border-t-2">
              <button
                disabled={disabled}
                type="submit"
                className="flex items-center justify-center gap-3 bg-[#487FFA] py-3 px-6 rounded-xl text-white">
                Continuar
                <IconArrowNextConsult />
              </button>
            </div>
          )}
          {consulta && (
            <div className="flex justify-center gap-4 border-t-2 p-3">
              <Elboton
                nombre={"Aprobar"}
                onPress={handleApproveConsulta}
                icon2={<IconCheckBoton className={"w-6"} color={"white"} />}
                className={"bg-greenPrimary"}
              />
              <Elboton
                onPress={handleDismissConsulta}
                nombre={"Rechazar"}
                icon2={<IconCancel className={"w-6"} color={"white"} />}
                className={"bg-redPrimary"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  ) : null;
};

export default ModalConsultation;
