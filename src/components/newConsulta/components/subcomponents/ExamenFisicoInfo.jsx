"use client";

import React from "react";
import ButtonNext from "@/components/consulta/button";
import DropNext from "@/components/consulta/dropdown";
import IconArrowDetailDown from "@/components/icons/IconArrowDetailDown";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import { Select, SelectItem } from "@nextui-org/react";

export default function ExamenFisicoInfo({
  examenFisico,
  onExamenFisicoChange,
}) {
  const handleSubsistemas = (value) => {
    onExamenFisicoChange("useSubsystems", value === "Si");
  };

  const handleOptionChange = (selectedOption) => {
    onExamenFisicoChange("selectedSubsystem", selectedOption.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col items-center justify-center w-full px-2 py-2 bg-[#fafafc]">
        <div>
          <ButtonNext
            text={"¿Usar subsistemas?"}
            options={["Si", "No"]}
            name={"subsistemas"}
            handleSelection={(value) => handleSubsistemas(value)}
            defaultValue={examenFisico?.useSubsystems ? "Si" : "No"}
          />
        </div>
        {/* Select para seleccionar subsistema */}
        {examenFisico.useSubsystems && (
          <div className="w-full max-w-md mt-4">
            {/* Select de NextUI para seleccionar el subsistema */}
            <Select
              placeholder="Seleccione un subsistema"
              value={examenFisico.selectedSubsystem || ""}
              onValueChange={handleOptionChange}
              onChange={handleOptionChange}
              className="w-full">
              <SelectItem key="Sistema Cardiovascular">
                Sistema Cardiovascular
              </SelectItem>
              <SelectItem key="Sistema Respiratorio">
                Sistema Respiratorio
              </SelectItem>
              <SelectItem key="Sistema Neurológico">
                Sistema Neurológico
              </SelectItem>
              <SelectItem key="Sistema Digestivo">Sistema Digestivo</SelectItem>
              <SelectItem key="Sistema Osteomuscular">
                Sistema Osteomuscular
              </SelectItem>
              <SelectItem key="Sistema Endocrino">Sistema Endocrino</SelectItem>
              <SelectItem key="Sistema Reproductor y Urológico">
                Sistema Reproductor y Urológico
              </SelectItem>
              <SelectItem key="Sistema Oftalmológico">
                Sistema Oftalmológico
              </SelectItem>
              <SelectItem key="ORL">ORL</SelectItem>
              <SelectItem key="Piel y Faneras">Piel y Faneras</SelectItem>
              <SelectItem key="Otros">Otros</SelectItem>
            </Select>
          </div>
        )}
        {examenFisico.useSubsystems && examenFisico.selectedSubsystem && (
          <div className="text-start text-[#686868] items-center font-medium text-base leading-4 flex gap-2 w-full py-2">
            <IconCurrentRouteNav className="w-[1.5rem]" />
            {examenFisico.selectedSubsystem}
          </div>
        )}
        <div className="flex flex-col w-full gap-2 py-2 ">
          <textarea
            className="w-full h-20 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-3 py-3 outline-[#a8a8a8]"
            placeholder="Describa toda la información posible"
            value={examenFisico.description || ""}
            onChange={(e) =>
              onExamenFisicoChange("description", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}
