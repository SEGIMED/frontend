"use client";

import React, { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconCircle from "@/components/icons/IconCircle";
import IconPreConsulta from "@/components/icons/iconPreconsulta";
import ButtonNext from "@/components/consulta/button";
import IconDelete from "@/components/icons/IconDelete";
import { useState } from "react";
import Elboton from "@/components/Buttons/Elboton";
import IconGuardar from "@/components/icons/iconGuardar";
import { comorbiditiesMapping } from "../utils";

export default function AntecedentesInfo({
  antecedentesData,
  onAntecedentesChange,
  comorbilitiesList,
  handleSaveAntecedentes,
}) {
  const autocompleteRef = useRef(null);
  const [comorbilitiesToShow, setComorbilitiesToShow] =
    useState(comorbilitiesList);
  const [searchTermDiagnostic, setSearchTermDiagnostic] = useState("");

  const handleRiskChange = (field, value) => {
    onAntecedentesChange(field, value);
  };

  const handleGroupHTPChange = (value) => {
    const updatedHtpGroups = antecedentesData.grupoHTP.includes(value)
      ? antecedentesData.grupoHTP.filter((item) => item !== value)
      : [...antecedentesData.grupoHTP, value];

    onAntecedentesChange("grupoHTP", updatedHtpGroups);
  };

  const handleDescriptionChange = (field, value) => {
    onAntecedentesChange(field, value);
  };

  const handleComorbilitiesChange = (value) => {
    if (value === null) return;
    let comorbilitiesToAdd = Object.keys(comorbiditiesMapping).find(
      (key) => comorbiditiesMapping[key] == value
    );
    if (!comorbilitiesToAdd) {
      comorbilitiesToAdd = value;
    }
    const updatedComorbilities = antecedentesData.Comorbilidades.includes(
      comorbilitiesToAdd
    )
      ? antecedentesData.Comorbilidades.filter(
          (item) => item != comorbilitiesToAdd
        )
      : [...antecedentesData.Comorbilidades, comorbilitiesToAdd];

    onAntecedentesChange("Comorbilidades", updatedComorbilities);
    setTimeout(() => {
      setSearchTermDiagnostic("");
      autocompleteRef.current.blur();
    }, 50);
  };

  useEffect(() => {
    if (searchTermDiagnostic.length > 0) {
      // Filtrar las comorbilidades que comienzan con el término de búsqueda
      const startsWithTerm = comorbilitiesList.filter((item) =>
        item.name.toLowerCase().startsWith(searchTermDiagnostic.toLowerCase())
      );

      // Filtrar las comorbilidades que incluyen el término pero no lo comienzan
      const includesTerm = comorbilitiesList.filter(
        (item) =>
          !item.name
            .toLowerCase()
            .startsWith(searchTermDiagnostic.toLowerCase()) &&
          item.name.toLowerCase().includes(searchTermDiagnostic.toLowerCase())
      );

      // Combinar ambas listas, primero las que comienzan y luego las que incluyen
      const filteredComorbilities = [...startsWithTerm, ...includesTerm];

      setComorbilitiesToShow(filteredComorbilities);
    } else {
      // Mostrar la lista completa si no hay término de búsqueda
      setComorbilitiesToShow(comorbilitiesList);
    }
  }, [searchTermDiagnostic, comorbilitiesList]);
  const options = {
    Bajo: "Bajo",
    "Intermedio-bajo": "Intermedio Bajo",
    "Intermedio-alto": "Intermedio Alto",
    Alto: "Alto",
  };
  const optionsGroupHTP = ["I", "II", "III", "IV", "V"];
  return (
    <div className="p-2 bg-white shadow-lg rounded-lg">
      <Accordion
        collapsible
        className="!px-0"
        selectionMode="multiple"
        defaultExpandedKeys={["antecedentes"]}>
        {/* Signos Vitales */}
        <AccordionItem
          key="antecedentes"
          title={
            <div className="flex gap-4">
              <IconCircle className={"w-3"} />
              <span>Antecedentes</span>
            </div>
          }
          classNames={{
            base: "w-full bg-white ",
            content: "bg-[#FAFAFC] border-t-2 border-gray-200",
            title: "text-lg font-medium text-gray-900 mx-auto",
          }}>
          <div className="flex flex-col gap-4">
            {/* Riesgo Cardiovascular */}
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="flex flex-row gap-1 items-center justify-center">
                <IconCurrentRouteNav className="w-[1.5rem]" />
                <label className="mb-2 text-gray-600 font-medium">
                  Riesgo Cardiovascular
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                {Object.entries(options).map(([key, label]) => (
                  <button
                    key={key}
                    className={`p-2 border rounded-lg flex items-center gap-2 ${
                      antecedentesData.riskCardiovascular === key
                        ? "bg-greenPrimary text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRiskChange("riskCardiovascular", key);
                    }}>
                    <IconPreConsulta
                      color={
                        antecedentesData.riskCardiovascular === key
                          ? "white"
                          : key === "Bajo"
                          ? "#70c247"
                          : key === "Intermedio-bajo"
                          ? "#f5e400"
                          : key === "Intermedio-Alto"
                          ? "#e73f3f"
                          : "#9e193b"
                      }
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* Riesgo Quirúrgico */}
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="flex flex-row gap-1 items-center justify-center">
                <IconCurrentRouteNav className="w-[1.5rem]" />
                <label className="mb-2 text-gray-600 font-medium">
                  Riesgo Quirúrgico
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                {Object.entries(options).map(([key, label]) => (
                  <button
                    key={key}
                    className={`p-2 border rounded-lg flex items-center gap-2 ${
                      antecedentesData.surgicalRisk === key
                        ? "bg-greenPrimary text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRiskChange("surgicalRisk", key);
                    }}>
                    <IconPreConsulta
                      color={
                        antecedentesData.surgicalRisk === key
                          ? "white"
                          : key === "Bajo"
                          ? "#70c247"
                          : key === "Intermedio-bajo"
                          ? "#f5e400"
                          : key === "Intermedio-Alto"
                          ? "#e73f3f"
                          : "#9e193b"
                      }
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* Riesgo HTP Inicial */}
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="flex flex-row gap-1 items-center justify-center">
                <IconCurrentRouteNav className="w-[1.5rem]" />
                <label className="mb-2 text-gray-600 font-medium">
                  Riesgo HTP Inicial
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                {Object.entries(options).map(([key, label]) => (
                  <button
                    key={key}
                    className={`p-2 border rounded-lg flex items-center gap-2 ${
                      antecedentesData.riskHipertensionPulmonarInicial === key
                        ? "bg-greenPrimary text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRiskChange("riskHipertensionPulmonarInicial", key);
                    }}>
                    <IconPreConsulta
                      color={
                        antecedentesData.riskHipertensionPulmonarInicial === key
                          ? "white"
                          : key === "Bajo"
                          ? "#70c247"
                          : key === "Intermedio-bajo"
                          ? "#f5e400"
                          : key === "Intermedio-Alto"
                          ? "#e73f3f"
                          : "#9e193b"
                      }
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* Riesgo HTP Final*/}
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="flex flex-row gap-1 items-center justify-center">
                <IconCurrentRouteNav className="w-[1.5rem]" />
                <label className="mb-2 text-gray-600 font-medium">
                  Riesgo HTP Final
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                {Object.entries(options).map(([key, label]) => (
                  <button
                    key={key}
                    className={`p-2 border rounded-lg flex items-center gap-2 ${
                      antecedentesData.riskHipertensionPulmonarFinal === key
                        ? "bg-greenPrimary text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRiskChange("riskHipertensionPulmonarFinal", key);
                    }}>
                    <IconPreConsulta
                      color={
                        antecedentesData.riskHipertensionPulmonarFinal === key
                          ? "white"
                          : key === "Bajo"
                          ? "#70c247"
                          : key === "Intermedio-bajo"
                          ? "#f5e400"
                          : key === "Intermedio-Alto"
                          ? "#e73f3f"
                          : "#9e193b"
                      }
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* Grupo HTP */}
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="flex flex-row gap-1 items-center justify-center">
                <IconCurrentRouteNav className="w-[1.5rem]" />
                <label className="mb-2 text-gray-600 font-medium">
                  Grupo HTP
                </label>
              </div>
              <div className="flex">
                {optionsGroupHTP?.map((htp, htpIndex) => (
                  <button
                    key={htpIndex}
                    className={`p-2 md:px-4 md:py-2 border mx-1 md:mx-2 rounded-lg border-[#D7D7D7] flex gap-2 ${
                      antecedentesData.grupoHTP.includes(htp)
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleGroupHTPChange(htp); // Cambia el estado al hacer clic en el botón
                    }}>
                    <IconPreConsulta
                      color={
                        antecedentesData.grupoHTP.includes(htp)
                          ? "#ffffff"
                          : "#808080"
                      }
                    />
                    {htp}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-1">
                <IconCurrentRouteNav className="w-[1.5rem]" />
                <label className="mb-2 text-gray-600 font-medium">
                  Comorbilidades
                </label>
              </div>
              <ButtonNext
                options={["Si", "No"]}
                name={"comorbilidades"}
                handleSelection={(value) =>
                  onAntecedentesChange("TieneComorbilidades", value)
                }
                defaultValue={
                  antecedentesData?.TieneComorbilidades ? "Si" : "No"
                }
                selectedOptions={antecedentesData?.TieneComorbilidades}
              />
            </div>
            {antecedentesData?.TieneComorbilidades == "Si" && (
              <div className="flex flex-col items-start gap-1">
                <div className="flex flex-row gap-1">
                  <IconCurrentRouteNav className="w-[1.5rem]" />
                  <label className="mb-2 text-gray-600 font-medium">
                    Seleccionar Comorbilidades
                  </label>
                </div>
                <Autocomplete
                  ref={autocompleteRef}
                  className="w-fit"
                  aria-label="comorbilidades"
                  placeholder="Escribe la comorbilidad..."
                  listboxProps={{
                    emptyContent: "No se encontraron comorbilidades",
                  }}
                  variant="bordered"
                  onInputChange={(value) => setSearchTermDiagnostic(value)}
                  inputValue={searchTermDiagnostic}
                  onSelectionChange={(value) => {
                    handleComorbilitiesChange(value);
                  }}
                  items={comorbilitiesToShow}>
                  {(comorbilitiesToShow) => (
                    <AutocompleteItem
                      key={comorbilitiesToShow.id}
                      value={comorbilitiesToShow.name}>
                      {comorbilitiesToShow.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                {antecedentesData?.Comorbilidades?.map((comorbilidad) => (
                  <div className="flex flex-row gap-2" key={comorbilidad}>
                    <IconCircle className={"w-3"} />
                    <span className="text-redPrimary text-sm">
                      {comorbilidad}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleComorbilitiesChange(comorbilidad)}>
                      <IconDelete color={"#e73f3f"} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Textareas para Antecedentes */}
            <div className="flex flex-col gap-2">
              {[
                "Antecedentes quirúrgicos",
                "Antecedentes patológicos",
                "Antecedentes no patológicos",
                "Antecedentes familiares",
                "Antecedentes de la juventud",
                "Medicación actual",
                "Alergias",
                "Vacunas",
              ].map((field, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <label className="mb-2 text-gray-600 font-medium flex items-center gap-2">
                    <IconCurrentRouteNav className="w-[1.5rem]" />
                    {field}
                  </label>
                  <textarea
                    className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
                    placeholder={`Ingrese aquí sus ${field.toLowerCase()}`}
                    value={antecedentesData[field] || ""}
                    onChange={(e) =>
                      handleDescriptionChange(field, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center p-2 bg-[#fafafc]">
            <Elboton
              nombre={"Guardar"}
              icon={<IconGuardar />}
              onPress={() => {
                handleSaveAntecedentes();
              }}
              size={"lg"}
              className={"bg-greenPrimary w-60 text-sm font-bold"}
            />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
