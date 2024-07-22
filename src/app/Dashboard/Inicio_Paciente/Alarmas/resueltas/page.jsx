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
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconRegresar from "@/components/icons/iconRegresar";

export default function AlarmPte() {
  // Filter the patients with active alarm status
  const [alarms, setAlarms] = useState([]);
  const [sortResolvedFirst, setSortResolvedFirst] = useState(true);
  const myId = Cookies.get("c");
  const token = Cookies.get("a");

  const getMyAlarms = async () => {
    const headers = { headers: { token: token } };
    const response = await ApiSegimed.get(`/alarms-by-patient`, headers);

    setAlarms(response.data);
  };

  const router = useRouter();
  const myID = Cookies.get("c");

  const UnsolvedAlarmas = alarms.filter(
    (alarm) => alarm.patient === Number(myId) && alarm.solved === true
  );

  useEffect(() => {
    getMyAlarms();
  }, []);

  // const unsolvedAlarms = misAlarmas.filter((a, b) => {
  //   if (sortResolvedFirst) {
  //     return a.solved === "resolved" ? -1 : 1;
  //   } else {
  //     return a.solved === "resolved" ? 1 : -1;
  //   }
  // });

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-b-[#cecece] pl-5 pr-6 py-2 bg-white sticky top-0 z-20 lg:z-50">
        {/* <Ordenar funcion={handleSortToggle} /> */}

        <button
          className="flex items-center px-4 py-2 bg-white rounded-xl g text-[#487FFA] 
                    font-bold border-solid border-[#487FFA] border-3"
          onClick={() => {
            router.push(`${rutas.PacienteDash}${rutas.Alarm}/resueltas`);
          }}>
          <IconAlarmBlue /> Resueltas
        </button>

        <h1 className="font-bold gap-2 ml-2">Listado de Alarmas</h1>
        <button
          // className="flex items-center px-2 py-2 bg-white rounded-xl  text-[#487FFA]
          //           font-bold border-solid border-[#487FFA] border-3"
          className="flex items-center px-4 py-2 bg-blue-400 rounded-xl  text-white
          font-bold border-solid border-blue-4000 border-3"
          onClick={() => {
            router.push(`${rutas.PacienteDash}${rutas.Alarm}`);
          }}>
          <IconRegresar /> Regresar
        </button>
      </div>
      <div className="grid grid-cols-5 items-center border-b border-b-[#cecece] p-2 text-center md:text-start bg-white sticky top-10 z-20 lg:z-50">
        <p className="font-bold text-[#5F5F5F]">Prioridad</p>
        <p className="font-bold text-[#5F5F5F]">Hora</p>
        <p className="font-bold text-[#5F5F5F]">Fecha</p>
        <p className="font-bold text-[#5F5F5F]">Paciente</p>
        <p className="font-bold text-[#5F5F5F]">Status</p>
      </div>
      <div className="overflow-auto h-full">
        <TableAlarmPte paciente={UnsolvedAlarmas} />
      </div>
    </div>
  );
}
