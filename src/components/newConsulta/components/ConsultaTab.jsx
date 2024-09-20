"use client";

import React from "react";
import SignosVitalesInfo from "./subcomponents/SignosVitalesInfo";
import { Accordion, AccordionItem } from "@nextui-org/react";
import IconCircle from "@/components/icons/IconCircle";
import EvolucionesInfo from "./subcomponents/EvolucionesInfo";
import ExamenFisicoInfo from "./subcomponents/ExamenFisicoInfo";
import DiagnosticosInfo from "./subcomponents/DiagnosticosInfo";
import AnamnesisInfo from "./subcomponents/AnamnesisInfo";
import Elboton from "@/components/Buttons/Elboton";
import IconGuardar from "@/components/icons/iconGuardar";

const ConsultaTab = ({
  consultaData,
  handleEvolucionChange,
  handleSignosVitalesChange,
  handleExamenFisicoChange,
  handleAnamnesisChange,
  handleDiagnostic,
}) => {
  return (
    <>
      <Accordion collapsible className="!px-0" selectionMode="multiple">
        {/* Signos Vitales */}
        <AccordionItem
          key="signosVitales"
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
            signosVitales={consultaData.signosVitales}
            onSignosVitalesChange={handleSignosVitalesChange}
          />
        </AccordionItem>

        {/* Evolución */}
        <AccordionItem
          key="evoluciones"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Evoluciones</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white border-b-2 border-gray-200",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <EvolucionesInfo
            evolucion={consultaData.evolucion}
            onEvolucionChange={handleEvolucionChange}
          />
        </AccordionItem>
        {/* Examen Físico */}
        <AccordionItem
          key="examenFisico"
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
            examenFisico={consultaData.examenFisico}
            onExamenFisicoChange={handleExamenFisicoChange}
          />
        </AccordionItem>
        {/* Diagnostico y Tratamientos */}
        <AccordionItem
          key="diagnosticosTratamientos"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Diagnostico y Tratamientos</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white border-b-2 border-gray-200",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <DiagnosticosInfo />
        </AccordionItem>

        <AccordionItem
          key="anamnesis"
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
            value={consultaData.anamnesis}
            onChange={handleAnamnesisChange}
          />
        </AccordionItem>
      </Accordion>

      {/* Botón para guardar la consulta */}
      <div className="flex justify-center p-2 bg-[#fafafc]">
        <Elboton
          nombre={"Guardar"}
          icon={<IconGuardar />}
          onPress={() => {
            Swal.fire({
              icon: "success",
              title: "Exito",
              text: "Se han guardado los cambios",
              confirmButtonColor: "#487FFA",
              confirmButtonText: "Aceptar",
            });
          }}
          size={"lg"}
          className={"bg-greenPrimary w-60 text-sm font-bold"}
        />
      </div>
    </>
  );
};

export default ConsultaTab;
