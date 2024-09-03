"use client";
import { useState, useEffect } from "react";
import IconRegresar from "@/components/icons/iconRegresar";
import rutas from "@/utils/rutas";
import { useRouter } from "next/navigation";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import IconCalendar from "@/components/icons/IconCalendar";
import IconMessage from "@/components/icons/IconMessage";
import IconArrowDetailUp from "@/components/icons/IconArrowDetailUp";
import Elboton from "@/components/Buttons/Elboton";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import Link from "next/link";
import Avatars from "@/components/avatar/avatarChat";
import Image from "next/image";
import IconAlarmBlue from "@/components/icons/iconAlarmBlue";
import IconCalendarNav from "@/components/icons/IconCalendarNav";
import IconPhone from "@/components/icons/iconPhone";
import IconMensajeBoton from "@/components/icons/IconMensajeBoton";
import IconWhatsapp from "@/components/icons/IconWhatsapp";
import { Divider } from "@nextui-org/react";
import ModalConsultation from "@/components/modal/ModalDoctor/ModalConsultation";
import Swal from "sweetalert2";
import ModalShowPhoneAlarm from "@/components/alarm/ModalShowPhoneAlarm";
import { isUserUsingMobile } from "@/utils/checkMobile";

const AlarmSelector = (id) => {
  const alarmId = id.params.id;
  const [selectedAlarm, setSelectedAlarm] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalPhone, setIsShowModalPhone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRevaluatedAlarm, setIsRevaluatedAlarm] = useState(false);
  const router = useRouter();
  const userId = Cookies.get("c");
  console.log(isRevaluatedAlarm);
  const handlePreAction = (next) => {
    if (isRevaluatedAlarm) {
      next();
      return;
    }
    Swal.fire({
      title: "Reevaluar la prioridad de la alarma?",
      input: "select",
      inputOptions: {
        Baja: "Baja",
        Media: "Media",
        Alta: "Alta",
      },
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Si",
      showLoaderOnConfirm: true,
      cancelButtonText: "No",
      preConfirm: async (physician_priority) => {
        try {
          const body = {
            physician_priority,
          };
          await ApiSegimed.patch(`/edit-alarm-event/${selectedAlarm.id}`, body);
        } catch (error) {
          Swal.showValidationMessage(`
            Fallo al actualizar: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(() => {
      setIsRevaluatedAlarm(true);
      if (next) next();
    });
  };
  const handleSchedule = () => {
    setIsModalOpen(true);
  };
  const handleMessage = () => {
    router.push(`${rutas.Doctor}${rutas.Mensajes}/${selectedAlarm.patient.id}`);
  };
  const handleCall = () => {
    if (!isMobile) {
      setIsShowModalPhone(true);
    }
    window.location.href = `tel:${selectedAlarm.patient.cellphone}`;
    handleEndAction();
  };
  const handleWhatsapp = () => {
    const whatsappUrl = `https://wa.me/${selectedAlarm.patient.cellphone}`;
    window.open(whatsappUrl, "_blank");
    handleEndAction();
  };
  const handleClinicalHistory = () => {
    router.push(
      `${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${selectedAlarm.patient.id}`
    );
  };
  const handleEndAction = () => {
    Swal.fire({
      icon: "success",
      title: "Dar como resuelta la alarma?",
      confirmButtonText: "Si",
      showCancelButton: true,
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        handleResolveAlarm();
      }
    });
  };
  const handleResolveAlarm = async () => {
    const body = { solved: true };
    try {
      const response = await ApiSegimed.patch(
        `/edit-alarm-event/${selectedAlarm.id}`,
        body
      );
      if (response.data) {
        await Swal.fire({
          title: "Alarma resuelta",
          icon: "success",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        });
        router.push(`${rutas.Doctor}${rutas.Alarm}`);
      }
    } catch (error) {
      console.error("Error al intentar actualizar la alarma:", error);
    }
  };

  const getClassificationColor = (classification) => {
    switch (classification?.toLowerCase()) {
      case "alta":
        return "bg-redPrimary";
      case "media":
        return "bg-yellow-500";
      case "baja":
        return "bg-greenPrimary";
      default:
        return "bg-borderGray";
    }
  };

  useEffect(() => {
    const getAlarm = async () => {
      const response = await ApiSegimed.get(
        `/alarms-by-patient?alarmId=${alarmId}`
      );

      setSelectedAlarm(response.data);
    };
    getAlarm();
  }, []);
  console.log(isMobile);
  useEffect(() => {
    setIsMobile(isUserUsingMobile());
  }, []);

  return (
    <div className="w-full h-full px-4 overflow-y-auto bg-[#FAFAFC]">
      <div className="w-full h-[8%] flex justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
        {/* <Ordenar /> */}
        <Elboton
          nombre={"Regresar"}
          icon={<IconArrowLeft iconColor={"white"} />}
          href={`${rutas.Doctor}${rutas.Alarm}`}
        />
        <h1 className="font-bold md:text-xl hidden md:block">
          Resolver Alarma
        </h1>
        <div></div>
      </div>
      <div className="lg:flex-row flex flex-col lg:justify-between h-[92%]">
        <div className="w-full lg:w-[45%] space-y-6 p-4">
          <div className="flex gap-4 items-center">
            <img
              alt={"Avatar del paciente"}
              src={
                selectedAlarm?.patient.avatar ||
                "https://res.cloudinary.com/dya1ekkd5/image/upload/v1718858700/qelavq2pd0lv2z4nk0hw.jpg"
              }
              className="rounded-full w-16 h-16"
            />
            <div className="flex flex-col gap-1 items-start">
              <h2 className="text-lg font-bold">
                {selectedAlarm?.patient.name +
                  " " +
                  selectedAlarm?.patient.lastname}
              </h2>
              <div
                className={`${getClassificationColor(
                  selectedAlarm?.ia_priority
                )} flex text-white px-2 py-1 items-center rounded-lg`}>
                <IconAlarmBlue color={"white"} className={"w-6"} />
                <span>{selectedAlarm?.ia_priority}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 ">Resumen</h3>
            <p className="text-textPrimary">
              {selectedAlarm?.alarm_description}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 ">Opinión de la IA</h3>
            <p className="text-textPrimary">{selectedAlarm?.ia_evaluation}</p>
          </div>
          <div className="flex flex-col lg:justify-around border-t lg:pt-4 gap-4 w-full">
            <div className="flex lg:flex-row flex-col items-center gap-4">
              <Elboton
                onPress={() => handlePreAction(handleSchedule)}
                className={
                  "bg-white border-1 border-greenPrimary w-full lg:w-1/2"
                }
                classNameText={"text-greenPrimary"}
                nombre={"Agendar Consulta"}
                icon={<IconCalendarNav className={"w-5"} color={"#70c247"} />}
              />
              <Elboton
                onPress={handleClinicalHistory}
                nombre={"Ver Historial Clínico"}
                icon={
                  <IconClinicalHistory className={"w-5"} color={"#70c247"} />
                }
                className={
                  "bg-white border-1 border-greenPrimary w-full lg:w-1/2"
                }
                classNameText={"text-greenPrimary"}
              />
            </div>
            <div className="flex lg:flex-row flex-col gap-2">
              <Elboton
                onPress={() => handlePreAction(handleMessage)}
                className={"bg-greenPrimary w-full lg:w-1/3"}
                nombre={"Mensaje"}
                icon={<IconMensajeBoton color={"white"} className={"w-10"} />}
              />
              <Elboton
                onPress={() => handlePreAction(handleCall)}
                className={"bg-greenPrimary w-full lg:w-1/3"}
                nombre={"Llamar"}
                icon={<IconPhone color={"white"} className={"w-10"} />}
              />
              <Elboton
                onPress={() => handlePreAction(handleWhatsapp)}
                className={"bg-greenPrimary w-full lg:w-1/3"}
                nombre={"Whatsapp"}
                icon={<IconWhatsapp className={"w-10"} />}
              />
            </div>
          </div>
        </div>
        <Divider orientation="vertical" className="h-full hidden lg:block" />
        <div className="lg:w-[55%] p-5 hidden lg:block overflow-y-auto h-full">
          <div>
            {selectedAlarm?.chat_history.map((chat, index) => (
              <div
                key={index}
                className={`p-1 animate-fade-in font-poppins flex flex-col ${
                  chat.role != "bot"
                    ? "justify-end items-end"
                    : "justify-start items-start"
                }`}>
                <span className={`font-medium text-bluePrimary`}>
                  {chat.role == "bot" ? "Segibot" : selectedAlarm.patient.name}
                </span>
                <span
                  className={`p-2 relative w-fit max-w-[85%] rounded-xl font-medium shadow-sm ${
                    chat.role != "bot"
                      ? "rounded-tr-none bg-[#487FFA] text-white right-5 md:right-0"
                      : "rounded-tl-none bg-white border text-bluePrimary border-bluePrimary left-5 md:left-0"
                  }`}>
                  {chat.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalConsultation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reason={selectedAlarm?.alarm_description}
        doctorId={userId}
        patientId={selectedAlarm?.patient.id}
        callback={handleEndAction}
      />
      <ModalShowPhoneAlarm
        cellphone={selectedAlarm?.patient.cellphone}
        isOpen={showModalPhone}
        onClose={() => {
          setIsShowModalPhone(false);
          handleEndAction();
        }}
      />
    </div>
  );
};
export default AlarmSelector;
