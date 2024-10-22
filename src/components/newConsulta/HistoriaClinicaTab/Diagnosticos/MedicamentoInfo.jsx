import { ApiSegimed } from "@/Api/ApiSegimed";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";
import IconDelete from "@/components/icons/IconDelete";
import IconMessage from "@/components/icons/IconMessage";
import NewModalDrugs from "@/components/modal/ModalDoctor/newModalDrugs";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import { validateDrug } from "@/utils/OrderValidation";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
const MedicamentoInfo = ({
  prescriptions,
  handleDiagnosticoTratamientosChange,
  setPrescriptions,
}) => {
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [errors, setErrors] = useState({});

  const handleToggleDetails = (index) => {
    const updatedDrugs = [...prescriptions];
    updatedDrugs[index].showDetails = !updatedDrugs[index].showDetails;
    setPrescriptions(updatedDrugs);
  };
  const handleDeleteDrug = (index) => {
    const updatedDrugs = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedDrugs);
  };

  const handleInputChange = (index, field, value) => {
    const updatedDrugs = [...prescriptions];
    updatedDrugs[index][field] = value;
    setPrescriptions(updatedDrugs);
    setErrors((prev) => ({ ...prev, [`${field}-${index}`]: "" })); // Resetear error al cambiar el valor
  };
  useEffect(() => {
    const fetchDrugs = async () => {
      if (searchTerm.length >= 3) {
        try {
          const response = await ApiSegimed.get(
            `/drug-prescription/search?searchDrug=${searchTerm}`
          );
          if (response.data && response.data.length > 0) {
            setDrugs(response.data);
          } else {
            // Si no hay coincidencias, selecciona el texto que el usuario ingresó
            setSelectedDrug({ name: searchTerm });
            setDrugs([{ id: "new", name: searchTerm }]);
          }
        } catch (error) {
          console.error("Error fetching drugs:", error);
        }
      } else setDrugs([{ id: "-", name: searchTerm }]);
      setSelectedDrug(null);
    };
    fetchDrugs();
  }, [searchTerm]);
  const handleChange = (name, value) => {
    setSelectedOption({
      ...selectedOption,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDrug = async (value) => {
    if (value !== null && value !== "new") {
      try {
        const response = await ApiSegimed.get(
          `/drug-prescription/search?searchCommercialId=${value}`
        );
        if (response.data) {
          setSelectedId(value);
          setSelectedDrug(response.data);
          setIsDrugModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching drug details:", error);
      }
    } else if (value === "new") {
      setSelectedId(value);
      setIsDrugModalOpen(true);
    }
  };
  const submitDrug = () => {
    // Crear un objeto con los valores actuales
    const drug = {
      drugName: drugs[0].name,
      commercialDrugName: selectedOption.commercialDrugName,
      routeOfAdministrationId: Number(selectedOption.routeOfAdministrationId),
      presentationId: Number(selectedOption.presentationId),
      dose: Number(selectedOption.dose),
      measureUnitId: Number(selectedOption.measureUnitId),
      measureUnitId2: selectedOption.measureUnitId2,
    };

    // Validar los campos
    const validationErrors = validateDrug(drug);

    if (Object.keys(validationErrors).length > 0) {
      // Si hay errores, actualizar el estado de errores y salir
      setErrors(validationErrors);
      return;
    }

    // Limpiar el término de búsqueda y agregar el medicamento si no hay errores
    setSearchTerm("");
    //Es un nuevo medicamento para el array prescriptions
    handleDiagnosticoTratamientosChange("prescriptions", drug);
    handleCloseDrugModal();
  };

  const handleCloseDrugModal = () => {
    setIsDrugModalOpen(false);
  };
  return (
    <div className="flex flex-col gap-2 p-2">
      <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
        <IconClinicalHistory className="w-6" color={"#808080"} />
        Medicamentos
      </label>
      <Autocomplete
        aria-label="drugs"
        defaultItems={drugs}
        variant="bordered"
        onInputChange={(value) => setSearchTerm(value)}
        listboxProps={{
          emptyContent: "No se encontraron Medicamentos",
        }}
        placeholder="Escribe al menos 3 letras"
        className="md:max-w-md bg-white  "
        onSelectionChange={handleDrug}
        value={searchTerm}>
        {(drug) => (
          <AutocompleteItem key={drug.id}>{drug.name}</AutocompleteItem>
        )}
      </Autocomplete>
      {prescriptions?.length > 0 && (
        <div className="flex flex-col gap-2 py-2 bg-[#fafafc]">
          <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
            <IconClinicalHistory className="w-6" color={"#808080"} />
            Medicamentos Añadidos
          </label>
          <div className="min-w-full bg-white border rounded-lg ">
            <div className="hidden md:flex w-full">
              <p className="py-2 px-4 border-b w-[20%]">Nombre </p>
              <p className="py-2 px-4 border-b w-[20%]">Dosis</p>
              <p className="py-2 px-4 border-b w-[20%]">Frecuencia</p>
              <p className="py-2 px-4 border-b w-[20%]">Duración</p>
              <p className="py-2 px-4 border-b w-[20%] text-center">Acciones</p>
            </div>
            <div>
              {prescriptions?.map((drug, index) => (
                <div key={index} className="border-b">
                  <div className="md:flex md:items-center">
                    <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between ">
                      {" "}
                      <span className="md:hidden block">Nombre:</span>
                      <p className="w-1/2">{drug.drugName}</p>
                    </div>
                    <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                      <span className="md:hidden block">Dosis:</span>
                      <select
                        value={
                          drug.doseMeasure ? drug.doseMeasure : drug.doseMeasure
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "doseMeasure",
                            e.target.value
                          )
                        }
                        className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${
                          errors[`doseMeasure-${index}`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}>
                        <option value="">Seleccionar</option>{" "}
                        {/* Opción por defecto */}
                        <option value="1">1</option>
                        <option value="1/2">1/2</option>
                        <option value="1/3">1/3</option>
                        <option value="1/4">1/4</option>
                        <option value="1/8">1/8</option>
                        <option value="0.5">0.5</option>
                      </select>
                    </div>
                    <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                      <span className="md:hidden block">Frecuencia:</span>
                      <input
                        type="number"
                        value={
                          drug.timeMeasure ? drug.timeMeasure : drug.timeMeasure
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "timeMeasure",
                            e.target.value
                          )
                        }
                        className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${
                          errors[`timeMeasure-${index}`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                      <span className="md:hidden block">Duración:</span>
                      <select
                        value={
                          drug.timeMeasureType
                            ? drug.timeMeasureType
                            : drug.timeMeasureType
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "timeMeasureType",
                            e.target.value
                          )
                        }
                        className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${
                          errors[`timeMeasureType-${index}`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}>
                        <option value="">Seleccionar</option>{" "}
                        {/* Opción por defecto */}
                        <option value="Hs">Hs</option>
                        <option value="Min">Min</option>
                      </select>
                    </div>
                    <div className=" flex items-center justify-between md:justify-center py-2 px-4 w-full md:w-[20%] gap-4 ">
                      <span className="md:hidden block">Acciones:</span>
                      <div className="justify-center flex gap-4 w-1/2">
                        <button onClick={() => handleToggleDetails(index)}>
                          <IconMessage className={"w-8"} />
                        </button>
                        <button onClick={() => handleDeleteDrug(index)}>
                          <IconDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                  {drug.showDetails && (
                    <div className="flex flex-col md:flex-row border-b border-t">
                      <InputInfoText
                        text={true}
                        defaultValue={drug.indications ? drug.indications : ""}
                        title="Indicaciones"
                        placeholder="Ingrese aquí cualquier otra aclaración"
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "indications",
                            e.target.value
                          )
                        }
                        className="md:px-6 py-2 px-3 w-full md:w-1/2"
                        error={errors[index]?.indications}
                      />
                      <InputInfoText
                        text={true}
                        defaultValue={
                          drug.observations ? drug.observations : ""
                        }
                        title="Observaciones"
                        placeholder="Ingrese aquí cualquier otra aclaración"
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "observations",
                            e.target.value
                          )
                        }
                        className="md:px-6 py-2 px-3 w-full md:w-1/2"
                        error={errors[index]?.observations}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ModalModularizado
        isOpen={isDrugModalOpen}
        onClose={handleCloseDrugModal}
        Modals={[
          <NewModalDrugs
            handleOptionChange={handleChange}
            info={selectedDrug}
            drugs={drugs}
            id={selectedId}
            key={"modalDrugs"}
            error={errors}
          />,
        ]}
        title={"Agregar medicamento"}
        button1={"hidden"}
        button2={"bg-greenPrimary text-white block font-font-Roboto"}
        progessBar={"hidden"}
        size={"h-[39rem] md:h-fit md:w-[35rem]"}
        buttonText={{ end: `Guardar` }}
        funcion={submitDrug}
      />
    </div>
  );
};

export default MedicamentoInfo;
