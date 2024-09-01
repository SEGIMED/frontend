"use client";
import React from "react";
import Datos from "@/components/clinicalHistory/NewClinicalHistory/Datos";
import { useAppSelector } from "@/redux/hooks";
import ConsultasSection from "@/components/clinicalHistory/NewClinicalHistory/sections/ConsultasSection";
import EvolucionesSection from "@/components/clinicalHistory/NewClinicalHistory/sections/EvolucionesSection";
import AnamnesisSection from "@/components/clinicalHistory/NewClinicalHistory/sections/AnamnesisSection";
import AutoevaluacionSection from "@/components/clinicalHistory/NewClinicalHistory/sections/AutoevaluacionSection";
import ExamenFisicoSection from "@/components/clinicalHistory/NewClinicalHistory/sections/ExamenFisicoSection";
import SignosVitalesSection from "@/components/clinicalHistory/NewClinicalHistory/sections/SignosVitalesSection";
import DiagnosticosSection from "@/components/clinicalHistory/NewClinicalHistory/sections/DiagnosticosSection";
import ImportacionesSection from "@/components/clinicalHistory/NewClinicalHistory/sections/ImportacionesSection";

const Page = () => {
  const tabSelected = useAppSelector((state) => state.clinicalHistory.tab);

  const renderTabContent = () => {
    switch (tabSelected) {
      case "Consultas":
        return <ConsultasSection />;
      case "Evoluciones":
        return <EvolucionesSection />;
      case "Anamnesis":
        return <AnamnesisSection />;
      case "Autoevaluación":
        return <AutoevaluacionSection />;
      case "Examen Físico":
        return <ExamenFisicoSection />;
      case "Signos Vitales":
        return <SignosVitalesSection />;
      case "Diagnosticos y tratamientos":
        return <DiagnosticosSection />;
      case "HC Importados":
        return <ImportacionesSection />;
      case "Datos":
        return <Datos />;
      default:
        return <div>No se encontró información disponible.</div>;
    }
  };

  return <div>{renderTabContent()}</div>;
};

export default Page;
