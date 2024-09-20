"use client";

import { InfoItem } from "./subcomponents/InfoItem";

const PatientInfo = ({ patient }) => {
  return (
    <div className="border border-gray-300 rounded-lg w-full overflow-hidden">
      <div className="grid grid-cols-3 divide-x divide-gray-300">
        <div className="flex flex-col divide-y divide-dotted divide-gray-300">
          <InfoItem label="Nombre completo:" value="Juan Perez" />
          <InfoItem label="Número de documento:" value="20.444.123" />
          <InfoItem label="Teléfono:" value="1160216789" />
        </div>
        <div className="flex flex-col divide-y divide-dotted divide-gray-300">
          <InfoItem label="Edad:" value="25" />
          <InfoItem label="Cobertura médica:" value="Swiss Medical" />
          <InfoItem label="Teléfono de emergencia:" value="1160216789" />
        </div>
        <div className="flex flex-col divide-y divide-dotted divide-gray-300">
          <InfoItem label="Género:" value="Masculino" />
          <InfoItem label="N° de cobertura médica:" value="123456789" />
          <InfoItem label="Email:" value="juanperez@gmail.com" />
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
