"use client";

import { IconAlarmas } from "@/components/InicioPaciente/IconAlarmas";
import { IconAntecedentes } from "@/components/InicioPaciente/IconAntecedentes";
import { IconMedicamentos } from "@/components/InicioPaciente/IconMedicamentos";
import { IconSolicitudes } from "@/components/InicioPaciente/IconSolicitudes";
import { IconTurnos } from "@/components/InicioPaciente/IconTurnos";
import { IconAutoevaluacion } from "@/components/InicioPaciente/IconAutoevaluacion";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import rutas from "@/utils/rutas";

const Buttons = [
  {
    name: "Mis Turnos",
    path: "/Mis_turnos",
    icon: IconTurnos,
    backgroundColor: "bg-[#487FFA]",
  },
  {
    name: "Medicamentos",
    path: "/Medicamentos",
    icon: IconMedicamentos,
    backgroundColor: "bg-[#FF7E7E]",
  },
  {
    name: "Autoevaluación",
    path: "/Autoevaluacion",
    icon: IconAutoevaluacion,
    backgroundColor: "bg-[#FFA3ED]",
  },
  {
    name: "Alarmas",
    path: "/Alarm",
    icon: IconAlarmas,
    backgroundColor: "bg-[#875CF2]",
  },
  {
    name: "Solicitudes",
    path: "/Solicitudes",
    icon: IconSolicitudes,
    backgroundColor: "bg-[#64D594]",
  },
  {
    name: "Antecedentes",
    path: "/Antecedentes",
    icon: IconAntecedentes,
    backgroundColor: "bg-[#ECD652]",
  },
];

export default function HomePte() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter()

  return (
    <div className="h-full flex flex-col items-center gap-8 pt-8">
      <div className="flex justify-center items-center gap-2 px-4 md:py-3">
        <h2 className="text-3xl text-[#808080] font-medium">
          ¡Bienvenido{" "}
          <strong className="text-[#487FFA] font-medium">{user?.name}</strong>!
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-[85%] h-[75%]  md:w-[60%] md:h-[70%]">
        {Buttons.map((route, index) => (

          <div
            key={index} onClick={() => router.push(`${rutas.PacienteDash2}${route.path}`)}
            className={`${route.backgroundColor} rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer`}>
            <route.icon className="md:w-24 md:h-24 w-16 h-16" />
            <p className="text-lg md:text-3xl font-medium text-white">
              {route.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
