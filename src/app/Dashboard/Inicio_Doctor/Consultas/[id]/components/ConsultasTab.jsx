// app/components/tabs/ConsultaTab.jsx
"use client";

import React from "react";
import SignosVitales from "./subcomponents/SignosVitales";
import Evolucion from "./subcomponents/Evolucion";

const ConsultaTab = ({
  consultaData,
  onConsultaDataChange,
  patient,
  params,
}) => {
  return (
    <div className="space-y-6 p-4">
      <SignosVitales
        data={consultaData.signosVitales}
        onChange={(data) => onConsultaDataChange("signosVitales", data)}
      />
      <Evolucion
        data={consultaData.evolucion}
        onChange={(data) => onConsultaDataChange("evolucion", data)}
      />
      {/* <ExamenFisico
        data={consultaData.examenFisico}
        onChange={(data) => onConsultaDataChange("examenFisico", data)}
      />
      <DiagnosticoTratamientos
        data={consultaData.diagnosticoTratamientos}
        onChange={(data) =>
          onConsultaDataChange("diagnosticoTratamientos", data)
        }
      />
      <Anamnesis
        data={consultaData.anamnesis}
        onChange={(data) => onConsultaDataChange("anamnesis", data)}
      /> */}
    </div>
  );
};

export default ConsultaTab;
