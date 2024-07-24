"use client";

import Ordenar from "@/components/Buttons/Ordenar";
import rutas from "@/utils/rutas";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import IconAlarmBlue from "@/components/icons/iconAlarmBlue";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useState, useEffect } from "react";
import TableAlarmPte from "@/components/alarm/tableAlarmPte";
import IconAlarmRed from "@/components/icons/iconAlarmRed";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";

// Modal
import Alarm1 from "@/components/modal/alarm/alarm1";
import Alarm2 from "@/components/modal/alarm/alarm2";
import Alarm3 from "@/components/modal/alarm/alarm3";
import { useAppSelector } from "@/redux/hooks";
import AsociarMedico from "@/components/asociarMedico/AsociarMedico";
import NotFound from "@/components/notFound/notFound";

const Modals = [
  <Alarm1 key={"alarma 1"} />,
  <Alarm2 key={"alarma 2"} />,
  <Alarm3 key={"alarma 3"} />,
];

export default function AlarmPte() {
  // Filter the patients with active alarm status
  const [alarms, setAlarms] = useState([]);
  const [sortResolvedFirst, setSortResolvedFirst] = useState(true);
  const myId = Cookies.get("c");
  const token = Cookies.get("a");
  const user = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getMyAlarms = async () => {
    const headers = { headers: { token: token } };
    const response = await ApiSegimed.get(`/alarms-by-patient`, headers);

    setAlarms(response.data.alarms);
  };

  const router = useRouter();
  const myID = Cookies.get("c");

  useEffect(() => {
    getMyAlarms();
  }, []);

  const UnsolvedAlarmas = alarms?.filter(
    (alarm) => alarm.patient === Number(myId) && alarm.solved === false
  );

  // const unsolvedAlarms = misAlarmas.filter((a, b) => {
  //   if (sortResolvedFirst) {
  //     return a.solved === "resolved" ? -1 : 1;
  //   } else {
  //     return a.solved === "resolved" ? 1 : -1;
  //   }
  // });

  //Falta lógica para mostrar el botón de asociar médico
  // if (user?.treatingPhysician === null) {
  //   return <AsociarMedico text="crear alarmas" />;
  // }
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-b-[#cecece] px-2 md:px-4 py-2 bg-white sticky top-0 z-20 lg:z-50">
        {/* <Ordenar funcion={handleSortToggle} /> */}

        <button
          className=" flex text-sm md:text-base items-center px-2 md:px-4 py-2 bg-white rounded-xl g text-[#487FFA] 
                    font-bold border-solid border-[#487FFA] border-3"
          onClick={() => {
            router.push(`${rutas.PacienteDash}${rutas.Alarm}/resueltas`);
          }}>
          <IconAlarmBlue className="w-6 hidden md:block" color={"#487FFA"} />{" "}
          Resueltas
        </button>

        <h1 className="font-bold text-center">Listado de Alarmas</h1>
        <button
          className="flex text-sm md:text-base items-center px-2 py-2 bg-[#E73F3F] rounded-xl  text-white
          font-bold border-solid border-red-600 border-3"
          onClick={() => {
            setIsModalOpen(true);
          }}>
          <IconAlarmBlue className="w-6 hidden md:block" color={"white"} />{" "}
          Crear Alarma
        </button>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-7 items-center border-b border-b-[#cecece] text-center md:text-start p-2 bg-white static md:sticky top-14 z-10 md:z-4 ">
        <p className="font-bold text-[#5F5F5F]">Prioridad</p>
        <p className="font-bold text-[#5F5F5F]">Fecha</p>
        <p className="font-bold text-[#5F5F5F]">Hora</p>
        <p className="font-bold text-[#5F5F5F]">HTP</p>
        <p className="font-bold text-[#5F5F5F] hidden md:block">Status</p>
      </div>
      <div className="overflow-auto h-full">
        {UnsolvedAlarmas.length === 0 ? (
          <NotFound text="No hay alarmas" />
        ) : (
          <TableAlarmPte paciente={UnsolvedAlarmas} />
        )}
      </div>
      <ModalModularizado
        isOpen={isModalOpen}
        onClose={closeModal}
        Modals={Modals}
        title={"Importante"}
        ruta={`${rutas.PacienteDash}${rutas.Alarm}/${myID}`}
        button1={"hidden"}
        button2={"bg-greenPrimary block"}
        progessBar={"hidden"}
        size={"h-[36rem] md:h-[27rem] md:w-[33rem]"}
        buttonText={{ end: `Aceptar y continuar`, start: `Continuar` }}
      />
    </div>
  );
}
