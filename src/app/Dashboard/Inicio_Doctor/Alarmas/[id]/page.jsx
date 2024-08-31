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

const AlarmSelector = (id) => {
  const alarmId = id.params.id;
  const [selectedAlarm, setSelectedAlarm] = useState();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const router = useRouter();
  const token = Cookies.get("a");

  useEffect(() => {
    const getAlarm = async () => {
      const response = await ApiSegimed.get(
        `/alarms-by-patient?alarmId=${alarmId}`,
        { headers: { token: token } }
      );
      setSelectedAlarm(response.data);
    };
    getAlarm();
  }, []);

  const getClassificationColor = (classification) => {
    switch (classification?.toLowerCase()) {
      case "alta":
        return "bg-red-500";
      case "media":
        return "bg-yellow-500";
      case "baja":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full h-full px-4 overflow-y-auto bg-[#FAFAFC]">
      <div className="lg:flex-row flex flex-col lg:justify-between h-[60%]">
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <Elboton
              href={`${rutas.Doctor}${rutas.Alarm}`}
              size={"sm"}
              nombre={"Atras"}
              icon={<IconRegresar />}
            />
            <h2 className="text-2xl font-bold">
              {selectedAlarm?.patientName +
                " " +
                selectedAlarm?.patientLastname}
            </h2>
          </div>
          <div className="flex justify-around items-center">
            <span
              className={`inline-block ${getClassificationColor(
                selectedAlarm?.ia_priority
              )} text-white mt-2 px-2 py-1 rounded`}>
              {selectedAlarm?.ia_priority.toUpperCase()}
            </span>
            <Elboton
              nombre={"Ver Historial Clínico"}
              icon={<IconClinicalHistory color={"white"} />}
              size={"md"}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 ">Resumen</h3>
            <p className="text-textPrimary">{selectedAlarm?.ia_evaluation}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 ">Opinión de la IA</h3>
            <p className="text-textPrimary">{selectedAlarm?.ia_evaluation}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div
            className="flex w-full"
            onClick={() => setIsChatVisible((state) => !state)}>
            <span>{isChatVisible ? "Ocultar Chat" : "Mostrar Chat"}</span>
            <IconArrowDetailUp />
          </div>
          {isChatVisible && (
            <div className="h-[200px]  lg:h-full overflow-y-auto">
              {selectedAlarm?.chat_history.map((chat, index) => (
                <div key={index}>
                  <span
                    className={`${
                      chat.role == "bot" ? "font-semibold" : "font-bold"
                    }`}>
                    {chat.role == "bot" ? "Segibot" : selectedAlarm.patientName}
                    :{" "}
                  </span>
                  <span className="">{chat.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-around border-t pt-4 gap-2">
        <Elboton
          className={"bg-greenPrimary"}
          nombre={"Chat"}
          icon={<IconMessage color={"white"} className={"w-10"} />}
        />
        <Elboton
          className={"bg-greenPrimary"}
          nombre={"Llamar"}
          icon={<IconMessage color={"white"} className={"w-10"} />}
        />
        <Elboton
          className={"bg-greenPrimary"}
          nombre={"Agendar Consulta"}
          icon={<IconCalendar className={"w-10"} />}
        />
        <Elboton
          className={"bg-greenPrimary"}
          nombre={"Whatsapp"}
          icon={<IconMessage color={"white"} className={"w-10"} />}
        />
      </div>
    </div>
  );
};
export default AlarmSelector;
