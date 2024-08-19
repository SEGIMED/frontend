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
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import ImportarHC from "@/components/modal/ModalDoctor/modalImportarHC";
import { useState } from "react";
import IconImportarDash from "@/components/icons/IconImportarDash";

export default function HomePte() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [dataImportar, setDataImportar] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Buttons = [
    {
      name: "Importar",
      path: "/Mis_turnos",
      backgroundColor: "bg-[#487FFA]",
      function: () => setIsModalOpen(true),
      icon: IconImportarDash,
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

  const handleModalData = (data) => {
    setDataImportar(data);
  };

  const submitModalData = () => {
    console.log(dataImportar);
    setIsModalOpen(false);
  };

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
            key={index} onClick={() => { route.function ? route.function() : router.push(`${rutas.PacienteDash2}${route.path}`) }}
            className={`${route.backgroundColor} rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer`}>
            <route.icon className="md:w-24 md:h-24 w-16 h-16" />
            <p className="text-lg md:text-3xl font-medium text-white">
              {route.name}
            </p>
          </div>
        ))}
      </div>
      <ModalModularizado
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Modals={[<ImportarHC key={"importar archivos"} onData={handleModalData} />]}
        title={"Importar estudios"}
        titleClassName={"text-[#686868]"}
        button1={"hidden"}
        button2={"bg-greenPrimary block"}
        progessBar={"hidden"}
        size={"h-[35rem] text-white md:h-[33rem] md:w-[35rem]"}
        buttonText={{ end: `Importar` }}
        funcion={submitModalData}
      />
    </div>
  );
}
