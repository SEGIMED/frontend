"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SignosVitalesInfo from "./SignosVitalesInfo";
import IconCircle from "@/components/icons/IconCircle";
import EvolucionesInfo from "./EvolucionesInfo";
import ExamenFisicoInfo from "./ExamenFisicoInfo";
import DiagnosticosInfo from "./Diagnosticos/DiagnosticosInfo";
import AnamnesisInfo from "./AnamnesisInfo";
import Elboton from "@/components/Buttons/Elboton";
import IconGuardar from "@/components/icons/iconGuardar";

const ConsultaTab = ({
  setPrescriptions,
  consultaData,
  handleEvolucionChange,
  handleSignosVitalesChange,
  handleExamenFisicoChange,
  handleAnamnesisChange,
  handleDiagnosticoTratamientosChange,
  handleSaveConsulta,
  handleSaveConsultaPermanent,
}) => {
  return (
    <>
      <Accordion
        collapsible
        className="!px-0"
        selectionMode="multiple"
        defaultExpandedKeys={["anamnesis"]}>
        <AccordionItem
          key="anamnesis"
          textValue="Anamnesis"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Anamnesis</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white border-b-2 border-gray-200",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <AnamnesisInfo
            value={consultaData.anamnesis.historyOfPresentIllness}
            onChange={handleAnamnesisChange}
          />
        </AccordionItem>

        {/* Signos Vitales */}
        <AccordionItem
          key="signosVitales"
          textValue="Signos Vitales"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Signos Vitales</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white ",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <SignosVitalesInfo
            saveSignosVitales={handleSaveConsultaPermanent}
            signosVitales={consultaData.signosVitales}
            onSignosVitalesChange={handleSignosVitalesChange}
          />
        </AccordionItem>

        {/* Evolución */}
        <AccordionItem
          key="evolucion"
          textValue="Evolución"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Evolución</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white border-b-2 border-gray-200",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <EvolucionesInfo
            saveEvoluciones={handleSaveConsultaPermanent}
            evolucion={consultaData.evolucion}
            onEvolucionChange={handleEvolucionChange}
          />
        </AccordionItem>
        {/* Examen Físico */}
        <AccordionItem
          key="examenFisico"
          textValue="Examen Físico"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Examen Físico</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white border-b-2 border-gray-200",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <ExamenFisicoInfo
            saveExamenFisico={handleSaveConsultaPermanent}
            examenFisico={consultaData.examenFisico}
            onExamenFisicoChange={handleExamenFisicoChange}
          />
        </AccordionItem>
        {/* Diagnostico y Tratamientos */}
        <AccordionItem
          key="diagnosticosTratamientos"
          textValue="Diagnostico y Tratamientos"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Tratamientos</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white border-b-2 border-gray-200",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <DiagnosticosInfo
            saveDiagnosticos={handleSaveConsultaPermanent}
            setPrescriptions={setPrescriptions}
            diagnosticoData={consultaData.diagnosticoTratamientos}
            handleDiagnosticoTratamientosChange={
              handleDiagnosticoTratamientosChange
            }
          />
        </AccordionItem>
      </Accordion>

      {/* Botón para guardar la consulta */}
      <div className="flex justify-center p-2 bg-[#fafafc]">
        <Elboton
          nombre={"Guardar"}
          icon={<IconGuardar />}
          onPress={() => {
            handleSaveConsulta();
          }}
          size={"lg"}
          className={"bg-greenPrimary w-60 text-sm font-bold"}
        />
      </div>
    </>
  );
};

export default ConsultaTab;
