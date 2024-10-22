"use client";

import CalcularEdad from "@/utils/calcularEdad";
import { InfoItem } from "./InfoItem";
import { Accordion, AccordionItem } from "@nextui-org/react";
import IconCircle from "@/components/icons/IconCircle";

const PatientInfo = ({ patient }) => {
  return (
    <Accordion
      collapsible
      className="!px-0 py-0"
      defaultExpandedKeys={["patientInfo"]}>
      {/* Signos Vitales */}
      <AccordionItem
        key="patientInfo"
        textValue="Informacion del Paciente"
        title={
          <div className="flex gap-4">
            <IconCircle className={"w-3"} />
            <span>Información del Paciente</span>
          </div>
        }
        classNames={{
          base: "w-full bg-white py-0",
          content: "bg-[#FAFAFC] py-0",
          title: "text-lg font-medium text-gray-900 mx-auto",
        }}>
        <div className="rounded-lg w-full overflow-hidden ">
          <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-gray-300">
            <InfoItem
              label="Nombre completo:"
              value={patient?.name + " " + patient?.lastname}
            />
            <InfoItem label="Número de documento:" value={patient?.idNumber} />
            <InfoItem label="Teléfono:" value={patient?.cellphone} />
            <InfoItem label="Edad:" value={CalcularEdad(patient?.birthDate)} />
            <InfoItem
              label="Cobertura médica:"
              value={patient?.healtCarePlan}
            />
            <InfoItem
              label="Teléfono de emergencia:"
              value={patient?.emergencyPhone}
            />
            <InfoItem label="Género:" value={patient?.catGenre?.name} />
            <InfoItem
              label="N° de cobertura médica:"
              value={patient?.healtCareNumber}
            />
            <InfoItem label="Email:" value={patient?.email} />
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default PatientInfo;
