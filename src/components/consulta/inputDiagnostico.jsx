"use client";

import Image from "next/image";
import circleData from "@/components/images/circleData.png";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import IconConsulta from "../icons/IconConsulta";
import IconCurrentRouteNav from "../icons/IconCurrentRouteNav";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetFormState, setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import InputInfoText from "../ordenMedica/inputInfo";
import ModalModularizado from "../modal/ModalPatient/ModalModurizado";
import NewModalDrugs from "../modal/ModalDoctor/newModalDrugs";
import IconDelete from "@/components/icons/IconDelete";
import IconMessage from "@/components/icons/IconMessage";
import { validateDrug } from "@/utils/OrderValidation";


import IconClinicalHistory from "@/components/icons/IconClinicalHistory";





export default function InputDiagnostico({
  title,
  subtitle,
  subtitle2,
  subtitle3,
  defaultOpen = false,
  diagnostico,
  orden
}) {
  const { register, setValue, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [inputs, setInputs] = useState([""]); // Inicializa con un solo input vacío
  const [valueDiagnosticoSubtitle, setValueDiagnosticoSubtitle] = useState([])
  const [valueDiagnosticoSubtitle2, setValueDiagnosticoSubtitle2] = useState([])
  //diagnostico
  
  // const [orden, setOrden]=useState()
  const dispatch= useAppDispatch()
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchTermDiagnostic, setSearchTermDiagnostic] = useState([]);
  const [cie10, setCie10] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [drugsToSend, setDrugsToSend] = useState([]);
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  console.log(orden)
  console.log(drugsToSend)
  const [valueDiagnosticoSubtitlee, setValueDiagnosticoSubtitlee] = useState([])
  const handleAddNewItem = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón
    setInputs((prevInputs) => [...prevInputs, ""]); // Agrega un nuevo input vacío al array
  };

  // const handleInputChange = (index, value) => {
  //   setInputs((prevInputs) => {
  //     const newInputs = [...prevInputs];
  //     newInputs[index] = value;
  //     return newInputs;
  //   });
  //   setValue(`medications[${index}]`, value); // Guarda el valor en react-hook-form
  // };
  useEffect(() => {
    // setValueDiagnosticoSubtitle2([
    //   diagnostico?.diagnostics[0]?.diagnosticNotes,
    //   diagnostico?.medicalProcedures[0]?.medicalProcedureName,
    // ])
    // setValueDiagnosticoSubtitle3(
    //   diagnostico?.drugPrescriptions && diagnostico.drugPrescriptions.length > 0
    //     ? diagnostico.drugPrescriptions
    //     : ["", ""]

    // )
  
    setValueDiagnosticoSubtitle([
      
      diagnostico?.physicianComments,
      diagnostico?.TherapyPrescription,
      diagnostico?.medicalIndications,
      diagnostico?.medicalProcedures[diagnostico?.medicalProcedures?.length-1]?.medicalProcedureName,
      diagnostico?.alarmPattern,
    ])

   
      setValueDiagnosticoSubtitlee([
        diagnostico?.chiefComplaint
      ])
    

  },[diagnostico])
  console.log(valueDiagnosticoSubtitlee)
  console.log(valueDiagnosticoSubtitle)
  // autocomplete durgs
  useEffect(() => {
    const fetchDrugs = async () => {
        if (searchTerm.length >= 3) {
            try {
                const response = await ApiSegimed.get(`/drug-prescription/search?searchDrug=${searchTerm}`);
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

  
    // autocomplete de diagnostico
    useEffect(() => {
      const fetchCie = async () => {
          if (searchTermDiagnostic.length >= 4) {
              try {
                  const response = await ApiSegimed.get(`/cie10?search=${searchTermDiagnostic}`);

                  if (response.data) {
                      setCie10(response.data);
                  }
              } catch (error) {
                  console.error("Error fetching cie10:", error);
              }
          }

      };
      fetchCie();
  }, [searchTermDiagnostic]);
  const handleChange = (name, value) => {
    console.log(name, value)
    dispatch(setSelectedOption({ name, option: value }));
    // setOrden({ name, option: value })
    setErrors((prev) => ({ ...prev, [name]: "" }));
};

    // busca datos de la droga seleccionada
    const handleDrug = async (value) => {
      if (value !== null && value !== "new") {
          try {
              const response = await ApiSegimed.get(`/drug-prescription/search?searchCommercialId=${value}`);
              if (response.data) {

                  setSelectedId(value)
                  setSelectedDrug(response.data);
                  setIsDrugModalOpen(true);
              }
          } catch (error) {
              console.error("Error fetching drug details:", error);
          }
      } else if (value === "new") {
          setSelectedId(value)
          setIsDrugModalOpen(true);
      }
  };

  const handleDeleteDrug = (index) => {
      const updatedDrugs = drugsToSend.filter((_, i) => i !== index);
      setDrugsToSend(updatedDrugs);
  };


  const handleInputChange = (index, field, value) => {
    setDrugsToSend((prevDrugs) => {
      const updatedDrugs = [...prevDrugs];
      updatedDrugs[index].prescriptionCreation[field] = value;
      return updatedDrugs;
    });
    setErrors((prev) => ({ ...prev, [`${field}-${index}`]: "" })); // Clear specific error field
  };
  const handleToggleDetails = (index) => {
    const updatedDrugs = [...drugsToSend];
    updatedDrugs[index].showDetails = !updatedDrugs[index].showDetails;
    setDrugsToSend(updatedDrugs);
};


  // guarda los datos que llegan del modal de nueva droga
  const submitDrug = () => {
      // Crear un objeto con los valores actuales
      const drug = {
          drugName: drugs[0]?.name,
          commercialDrugName: orden.commercialDrugName,
          routeOfAdministrationId: Number(orden.routeOfAdministrationId),
          presentationId: Number(orden.presentationId),
          dose: Number(orden.dose),
          measureUnitId: Number(orden.measureUnitId),
          measureUnitId2: orden.measureUnitId2,
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
      setDrugsToSend([...drugsToSend, {
          drugDetailPresentationId: null,
          drugCreation: drug,
          prescriptionCreation: { patientId: orden.patientId }
      }]);

      // handleCloseDrugModal();
  };

  // const handleCloseDrugModal = () => {
  //     setIsDrugModalOpen(false);
  // };










  // useEffect(() => {
  //   if (diagnostico?.drugPrescriptions && diagnostico.drugPrescriptions.length > 0) {
  //     diagnostico.drugPrescriptions.forEach((drug, index) => {
  //       setValue(`medications[${index}]`, drug);
  //     });
  //     setInputs(diagnostico.drugPrescriptions);
  //   }
  // }, [diagnostico, setValue]);


  // Observa cambios en los inputs de medications
  const medicationValues = watch('medications', inputs);

  return (
    <div className="flex flex-col">
      <details open={defaultOpen}>
        <summary
          className="flex items-center justify-between h-16 gap-2 px-6 bg-white border cursor-pointer md:gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div />
          <div className="flex items-center">
            <Image src={circleData} alt="" />
            <p className="text-start text-[#5F5F5F] font-bold text-base leading-5">
              {title}
              <b className="font-semibold text-red-500">*</b>
            </p>
          </div>
          <div className={isOpen || defaultOpen === true ? "rotate-180" : ""}>
            <IconArrowDetailDown />
          </div>
        </summary>
        {subtitle2?.map((sub, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-6 py-4 md:py-2 bg-[#fafafc]"
          >
            <label className="text-start py-1 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-[1.5rem]" />
              {sub}
            </label>
            <Autocomplete
                        aria-label="diagnostic"
                        defaultItems={cie10}
                        variant="bordered"
                        onInputChange={(sub) => setSearchTermDiagnostic(sub)}
                        placeholder="Ingrese aquí el diagnóstico"
                        className=" bg-white "
                        isInvalid={errors.diagnostic ? true : false}
                        onSelectionChange={(sub) => {
                            const selectedItem = cie10.find(cie => cie.id === sub);
                            if (selectedItem) {
                                handleChange("diagnostic2", selectedItem);

                            }
                            handleChange("diagnostic", Number(sub)); // Llamar a la función original sin modificarla
                        }}
                        value={searchTerm}
                    >
                        {(cie) => <AutocompleteItem key={cie.id}>{cie.description}</AutocompleteItem>}
                    </Autocomplete>
              {/* <span className="flex m-2">
              <IconCurrentRouteNav className="w-3" /> Descripción del Diagnóstico 
                </span>   
              
              <textarea
              className="w-full h-40 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
              placeholder="Ingrese aquí sus anotaciones"
              {...register(sub)}
              defaultValue={valueDiagnosticoSubtitle2[index] || ""}
            /> */}
          </div>
        ))}
        {/* {subtitle3 && (
          <div className="flex flex-col gap-2 px-6 py-4 md:py-2 bg-[#fafafc]">
            <label className="text-start py-1 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
              <IconCurrentRouteNav className="w-[1.5rem]" />
              {subtitle3}
            </label>
            <Autocomplete
                        aria-label="drugs"
                        defaultItems={drugs}
                        variant="bordered"
                        onInputChange={(value) => setSearchTerm(value)}
                        placeholder="Escribe al menos 3 letras"
                        className="md:max-w-xs bg-white  "
                        onSelectionChange={handleDrug}
                        value={searchTerm}
                    >
                        {(drug) => <AutocompleteItem key={drug.id}>{drug.name}</AutocompleteItem>}
                    </Autocomplete>
                    

            {inputs.map((input, index) => (
              <input
                key={index}
                className="w-full md:w-1/2 h-11 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 md:py-1 outline-[#a8a8a8]"
                placeholder="Escribe el medicamento"
                value={medicationValues[index] || input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                {...register(`medications[${index}]`)}
              />
            ))}
            <button
              onClick={handleAddNewItem}
              className="w-full p-2 mt-2 text-white bg-blue-300 border-blue-300 rounded-md md:w-1/2 hover:bg-blue-400"
            >
              Agregar medicamento
            </button>
          </div>
        )} */}
{/* 
{drugsToSend.length > 0 ?
                    <div className="flex flex-col gap-2 md:px-6 py-2 px-3 bg-[#fafafc]">
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
                                {drugsToSend.map((drug, index) => (
                                    <div key={index} className="border-b">
                                        <div className="md:flex md:items-center">
                                            <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between ">  <span className="md:hidden block">Nombre:</span><p className="w-1/2">{drug.drugCreation.drugName}</p></div>
                                            <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                                                <span className="md:hidden block">Dosis:</span>
                                                <input
                                                    type="number"
                                                    onChange={(e) => handleInputChange(index, "doseMeasure", e.target.value)}
                                                    className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${errors[`doseMeasure-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                            <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                                                <span className="md:hidden block">Frecuencia:</span>
                                                <input
                                                    type="number"
                                                    onChange={(e) => handleInputChange(index, "timeMeasure", e.target.value)}
                                                    className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${errors[`timeMeasure-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                            <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                                                <span className="md:hidden block">Duración:</span>
                                                <input
                                                    onChange={(e) => handleInputChange(index, "timeMeasureType", e.target.value)}
                                                    className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${errors[`timeMeasureType-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                                                />
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
                                                    title="Indicaciones"
                                                    placeholder="Ingrese aquí cualquier otra aclaración"
                                                    onChange={(e) => handleInputChange(index, "indications", e.target.value)}
                                                    className="md:px-6 py-2 px-3 w-full md:w-1/2"
                                                    error={errors[index]?.indications} />
                                                <InputInfoText
                                                    text={true}
                                                    title="Observaciones"
                                                    placeholder="Ingrese aquí cualquier otra aclaración"
                                                    onChange={(e) => handleInputChange(index, "observations", e.target.value)}
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
                    : null} */}
                     {/* <InputInfoText
                    text={true}
                    title="Texto adicional (opcional)"
                    placeholder="Ingrese aquí cualquier otra aclaración"
                    onChange={(e) => handleChange("additionalText", e.target.value)}
                    className="md:px-6 py-2 px-3"
                /> */}
        
        {subtitle?.map((sub, index) => (
          <div key={index} className="flex flex-col gap-2 px-6 py-2 bg-[#fafafc]">
            <label className="text-start text-[#686868] py-1 font-medium text-base leading-4 flex gap-2 items-center">
              <IconConsulta />
              {sub}
            </label>
            <textarea
              className="w-full h-40 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
              placeholder="Ingrese aquí sus anotaciones"
              {...register(sub)}
              defaultValue={
             valueDiagnosticoSubtitle[index]}
            />
          </div>
        ))}
            
      </details>

      <ModalModularizado
                isOpen={isDrugModalOpen}
                // onClose={handleCloseDrugModal}
                Modals={[<NewModalDrugs handleOptionChange={handleChange} info={selectedDrug} drugs={drugs} id={selectedId} key={"modalDrugs"} error={errors} />]}
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
}
