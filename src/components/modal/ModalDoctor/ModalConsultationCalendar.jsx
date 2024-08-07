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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ModalConsultationCalendar = ({
  isOpen,
  onClose,
  dateSelect,
  lista,
  title,
  stateName,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const selectTime = watch("time");
  const role = Cookies.get("b");
  const userId = Number(Cookies.get("c"));
  const combineDateTime = (date, time) =>
    date && time ? `${date}T${time}:00` : "";

  const addMinutes = (date, minutes) =>
    new Date(date.getTime() + minutes * 60000);

  useEffect(() => {
    if (dateSelect) {
      const formattedDate = formatDate(new Date(dateSelect));
      setDate(formattedDate);
      setValue("date", formattedDate);
      const formattedTime = getHourFromDateString(dateSelect);
      setTime(formattedTime);
      setValue("time", formattedTime);
    }
  }, [dateSelect, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset({
        patient: "",
        physician: "",
        typeOfMedicalConsultation: "",
        reasonForConsultation: "",
        healthCenter: "",
        date: "",
        time: "",
        scheduledStartTimestamp: "",
        scheduledEndTimestamp: "",
      });
      setDate("");
      setTime("");
    }
  }, [isOpen, reset]);
  useEffect(() => {
    const startDateTime = combineDateTime(date, selectTime);
    if (startDateTime) {
      const startDate = new Date(startDateTime);
      const endDate = addMinutes(startDate, 30);
      setValue("scheduledStartTimestamp", startDateTime);
      setValue("scheduledEndTimestamp", endDate.toISOString());
    }
    setValue("medicalSpecialty", 1);
    setValue("schedulingStatus", 1);
  }, [setValue, selectTime, date]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getHourFromDateString = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  const onSubmit = async (data) => {
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
      if (role == "Paciente") {
        data.patient = userId;
      } else {
        data.physician = userId;
      }
      const payload = data;
      const response = await ApiSegimed.post("/schedules", payload);

      if (response.data) {
        if (role !== "Paciente") {
          Swal.fire({
            title: "Consulta agendada con éxito!",
            icon: "success",
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
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
      console.error("Error al enviar los datos:", error);
      Swal.fire({
        title: "Error al agendar la consulta",
        text: "Ocurrió un error al intentar agendar la consulta. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setDisabled(false);
    }
  };
  const handleClose = () => onClose();

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white rounded-lg w-[95%] md:w-[35rem] max-h-[93%] flex flex-col gap-5 overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full">
          <div className="flex items-center justify-between p-3 border-b-2 font-semibold">
            <div className="flex items-center gap-3">
              <IconCurrentRouteNav className="w-4" />
              <p>Agendar consulta</p>
            </div>
            <button
              onClick={handleClose}
              className="transition-transform transform hover:scale-105 active:scale-100 active:translate-y-1">
              <IconClose className="w-8" />
            </button>
          </div>
          <div className="p-3 flex flex-col gap-3 justify-center items-center ">
            <div className="flex flex-col gap-2 ">
              <label className="flex items-center gap-3 text-sm font-semibold">
                <IconCenterAtenttion /> {title}
              </label>
              <select
                id={stateName}
                className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${
                  errors.patient ? "border-red-500" : ""
                }`}
                {...register(stateName, {
                  required: `*Debe elegir un ${title} *`,
                })}>
                <option value="">{`Seleccione un ${title} `}</option>
                {lista.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.name} {paciente.lastname}
                  </option>
                ))}
              </select>
              {errors.patient && (
                <span className="text-red-500 text-sm">
                  {errors.patient.message}
                </span>
              )}
              <div className="border w-full" />
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 text-sm font-semibold">
                  <IconTypeQueries /> Tipo de consultas
                </label>
                <div className="flex gap-3 justify-around items-center">
                  <label className="flex items-center gap-3">
                    <input
                      id="consultaFisica"
                      type="radio"
                      value="1"
                      {...register("typeOfMedicalConsultation", {
                        required: "* Este dato es requerido *",
                      })}
                    />
                    Consulta Física
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      id="teleconsulta"
                      disabled
                      type="radio"
                      value="2"
                      {...register("typeOfMedicalConsultation", {
                        required: "* Debes seleccionar una opción *",
                      })}
                    />
                    Teleconsulta(Próximamente)
                  </label>
                </div>
                {errors.typeOfMedicalConsultation && (
                  <span className="text-red-500 text-sm">
                    {errors.typeOfMedicalConsultation.message}
                  </span>
                )}
              </div>
              <div className="border w-full" />
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 text-sm font-semibold">
                  <IconReasonQuerie /> Motivo de consulta
                </label>
                <input
                  id="reasonForConsultation"
                  placeholder="Ingrese el motivo de la consulta"
                  className="py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg"
                  {...register("reasonForConsultation", {
                    required: "* ¿Cuál es el motivo de consulta? *",
                  })}
                />
                {errors.reasonForConsultation && (
                  <span className="text-red-500 text-sm">
                    {errors.reasonForConsultation.message}
                  </span>
                )}
              </div>
              <div className="border w-full" />
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 text-sm font-semibold">
                  <IconCenterAtenttion /> Centro de atención
                </label>
                <select
                  id="healthCenter"
                  className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${
                    errors.healthCenter ? "border-red-500" : ""
                  }`}
                  {...register("healthCenter", {
                    required:
                      "* ¿En cuál centro de atención quieres ser atendido? *",
                  })}>
                  <option value="">Seleccione el centro de atención</option>
                  <option value="1">Centro Gallegos</option>
                </select>
                {errors.healthCenter && (
                  <span className="text-red-500 text-sm">
                    {errors.healthCenter.message}
                  </span>
                )}
              </div>
              <div className="border w-full" />
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 text-sm font-semibold">
                  <IconDate /> Fecha
                </label>
                <div className="flex  md:flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="flex items-center gap-2">
                      <IconDay /> Día
                    </label>
                    <input
                      id="date"
                      type="date"
                      defaultValue={date}
                      className=" md:w-60 w-full p-2 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                      // disabled
                    />
                    {errors.date && (
                      <span className="text-red-500 text-sm">
                        {errors.date.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="flex items-center gap-2">
                      <IconClock /> Hora
                    </label>
                    <input
                      id="time"
                      type="time"
                      min="08:00"
                      max="20:00"
                      defaultValue={time}
                      className=" md:w-60 w-full py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                      {...register("time", {
                        required: "* Selecciona la hora *",
                      })}
                    />
                    {errors.time && (
                      <span className="text-red-500 text-sm">
                        {errors.time.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 border-t-2 flex justify-center">
            <button
              disabled={disabled}
              type="submit"
              className="flex items-center gap-3 bg-greenPrimary py-3 px-6 rounded-xl text-white">
              Continuar <IconArrowNextConsult />
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ModalConsultationCalendar;
