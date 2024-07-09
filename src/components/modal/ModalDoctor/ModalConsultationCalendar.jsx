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
import { useAppSelector } from "@/redux/hooks";

const ModalConsultationCalendar = ({ isOpen, onClose, physician, dateSelect }) => {
    const listaPacientes = useAppSelector(state => state.allPatients.patients);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const [disabled, setDisabled] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const selectTime = watch("time");


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
        // Reset form when isOpen becomes false
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
            setDate("");
            setTime("");
        }
    }, [isOpen, reset]);

    useEffect(() => {
        const startDateTime = combineDateTime(date, selectTime);
        console.log('1', startDateTime);
        // console.log(new Date(startDateTime));
        if (startDateTime) {
            const startDate = new Date(startDateTime);
            console.log('2', startDate);
            const endDate = addMinutes(startDate, 30);
            const endDateTime = endDate.toISOString();

            setValue("scheduledStartTimestamp", startDateTime);
            setValue("scheduledEndTimestamp", endDateTime);
        }
        setValue("medicalSpecialty", 1);
        setValue("schedulingStatus", 1);
    }, [setValue, selectTime, date]);

    const formatDate = (date) => {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };

    const getHourFromDateString = (dateString) => {
        const date = new Date(dateString);
        const hour = date.getHours();
        const minutes = date.getMinutes();

        const formattedHour = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        return formattedHour;
    };

    const onSubmit = async (data) => {
        try {
            setDisabled(true)
            const token = Cookies.get("a");
            const headers = { headers: { token: token } };
            const dataSend = { ...data, physician };
            console.log(dataSend);
            const response = await ApiSegimed.post("/schedules", dataSend, headers);

            if (response.data) {
                alert("Cita agendada correctamente");
                handleClose();
            }
        } catch (error) {
            setDisabled(false)
            console.error("Error al enviar los datos:", error);

            if (error.response) {
                console.error("Error response:", error.response.data);
            } else if (error.request) {
                console.error("Error request:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
        }
    };

    const handleClose = () => {
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div onClick={handleClose} className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-50 bg-white rounded-lg w-[95%] h-[70%] md:w-[35rem] md:h-[35rem] flex flex-col items-center gap-5">
                <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full flex flex-col justify-between">
                    <div className="h-16 flex items-center justify-start gap-3 p-5 border-b-2 font-semibold">
                        <IconCurrentRouteNav className="w-4" /> Agendar consulta
                    </div>
                    <div className="flex flex-col justify-around px-5">

                        <div className="flex flex-col justify-around gap-2">
                            <div className="flex items-center justify-start gap-3 text-sm font-semibold">
                                <IconCenterAtenttion /> Paciente
                            </div>
                            <select
                                id="patient"
                                className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${errors.patientId ? "border-red-500" : ""
                                    }`}
                                {...register("patient", {
                                    required: {
                                        value: true,
                                        message: "*Debe elegir un paciente *",
                                    },
                                })}
                            >   <option value="">Seleccione un paciente</option>
                                {listaPacientes.map((paciente) => {
                                    return (<option key={paciente.id} value={paciente.id}>{paciente.name} {paciente.lastname}</option>)
                                })}


                            </select>
                            {errors.patientId && (
                                <span className="text-red-500 text-sm font-medium">
                                    {errors.patientId.message}
                                </span>
                            )}
                        </div>

                        <div className="border w-full" />
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
                            className={`py-2 px-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg ${errors.healthCenter ? "border-red-500" : ""
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
                                <label htmlFor="date" className="flex items-center justify-start gap-2">
                                    <IconDay /> Día
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    placeholder=""
                                    className="w-60 p-2 bg-[#FBFBFB] border border-[#DCDBDB] rounded"
                                    disabled
                                />
                                {errors.date && (
                                    <span className="text-red-500 text-sm font-medium">
                                        {errors.date.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-row md:flex-col justify-between gap-2">
                                <label htmlFor="time" className="flex items-center justify-start gap-2">
                                    <IconClock /> Hora
                                </label>
                                <input
                                    id="time"
                                    type="time"
                                    defaultValue={time}
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
                            disabled={disabled}
                            type="submit"
                            className="flex items-center justify-center gap-3 bg-[#487FFA] py-3 px-6 rounded-xl text-white"
                        >
                            Continuar <IconArrowNextConsult />
                        </button>
                    </div>
                </form>
                <button
                    onClick={handleClose}
                    className="absolute top-0 right-0 m-4 hover:transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1"
                >
                    <IconClose className="w-8" />
                </button>
            </div>
        </div>
    ) : null;
};

export default ModalConsultationCalendar;
