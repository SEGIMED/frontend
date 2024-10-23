import IconClinicalHistory from "@/components/icons/IconClinicalHistory";
import MedicamentoInfo from "./MedicamentoInfo";
import InputConsulta from "../../InputConsulta";
import { useState } from "react";
import IconTablillaTilde from "@/components/icons/iconTablillaTilde";
import { Button } from "@nextui-org/react";
import Elboton from "@/components/Buttons/Elboton";

const DiagnosticosInfo = ({
  diagnosticoData,
  handleDiagnosticoTratamientosChange,
  setPrescriptions,
}) => {
  // Estado local para gestionar los procedimientos cuando el array está vacío
  const [procedures, setProcedures] = useState(
    diagnosticoData.procedurePrescriptions?.length > 0
      ? diagnosticoData.procedurePrescriptions
      : [{ medicalProcedureName: "" }]
  );

  // Función para manejar el cambio de los procedimientos
  const handleProcedureChange = (index, value) => {
    const updatedProcedures = [...procedures];
    updatedProcedures[index].medicalProcedureName = value;
    setProcedures(updatedProcedures);

    // Actualizar los datos del diagnóstico en el padre
    handleDiagnosticoTratamientosChange(
      "procedurePrescriptions",
      updatedProcedures
    );
  };

  // Función para añadir un nuevo procedimiento
  const addProcedure = () => {
    setProcedures([...procedures, { medicalProcedureName: "" }]);
  };
  return (
    <div>
      <MedicamentoInfo
        setPrescriptions={setPrescriptions}
        prescriptions={diagnosticoData.prescriptions}
        handleDiagnosticoTratamientosChange={
          handleDiagnosticoTratamientosChange
        }
      />

      {/* Mostrar los procedimientos */}
      {procedures.map((procedure, index) => (
        <div key={index}>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex gap-2">
              <IconTablillaTilde className={"w-3"} />
              <span>Procedimiento {index + 1}</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && index == procedures.length - 1) {
                    addProcedure();
                  }
                }}
                value={procedure.medicalProcedureName}
                onChange={(e) => handleProcedureChange(index, e.target.value)}
                className="w-3/4 h-12 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
                placeholder="Ingrese aqui sus anotaciones"
              />
              {index == procedures.length - 1 && (
                <Elboton
                  nombre={"Agregar"}
                  className={"bg-white border-bluePrimary border-2 p-2"}
                  classNameText={"text-bluePrimary"}
                  onPress={() => {
                    addProcedure();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Botón para agregar más procedimientos */}

      <InputConsulta
        label={"Conducta terapeutica"}
        value={diagnosticoData.treatmentPlan}
        onChange={(e) =>
          handleDiagnosticoTratamientosChange("treatmentPlan", e.target.value)
        }
      />
      {/* <InputConsulta
        label={"Tratamiento no farmacológico"}
        value={diagnosticoData.treatmentNoFarmacologico}
        onChange={(e) =>
          handleDiagnosticoTratamientosChange(
            "treatmentNoFarmacologico",
            e.target.value
          )
        }
      /> */}
      <InputConsulta
        label={"Pauta de alarma"}
        value={diagnosticoData.alarmPattern}
        onChange={(e) =>
          handleDiagnosticoTratamientosChange("alarmPattern", e.target.value)
        }
      />
    </div>
  );
};
export default DiagnosticosInfo;
