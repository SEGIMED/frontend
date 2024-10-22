"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import Elboton from "@/components/Buttons/Elboton";

import IconRegresar from "@/components/icons/iconRegresar";
import PreconsultaQuestion from "@/components/preconsulta/PreconsultaQuestion";
import Link from "next/link";
import rutas from "@/utils/rutas";
import {
  updateActive,
  subquestionSelectedOption,
  questionSelectedOption,
  updateDescription,
  updateVitalSign,
  updateAnamnesis,
  updateTratamiento,
  updateBodyPainLevel,
  updateGlycemia,
  updateLastGlycemia,
  updateAllFormData,
  updateFileUploaded,
  updateTestDescription,
  updateTestActive,
  updateTestSelectedOption,
  resetFormData,
} from "@/redux/slices/user/preconsultaFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InputConsulta from "../consulta/inputconsulta";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import Cookies from "js-cookie";
import IconOptions from "../icons/IconOptions";
import IconImportar from "../icons/IconImportar";
import IconExportar from "../icons/IconExportar";
import IconGuardar from "@/components/icons/iconGuardar";
import LoadingFallback from "@/components/loading/loading";
import Swal from "sweetalert2";
import getMedicalEventDetail from "@/utils/dataFetching/fetching/getMedicalEventDetail";
import postPatientStudiesOrHc from "@/utils/dataFetching/fetching/postPetientStudiesOrHc";
import postPatientBackgrounds from "@/utils/dataFetching/fetching/postPatientBackgrounds";
import getPatientDetail from "@/utils/dataFetching/fetching/getPatientDetail";
import patchPreconsultation from "@/utils/dataFetching/fetching/patchPreconsultation";
import SignosVitalesInfo from "../consulta/signosvitales";
import MenuDropDown from "../dropDown/MenuDropDown";
import DynamicTable from "../table/DynamicTable";
import ModalModularizado from "../modal/ModalPatient/ModalModurizado";
import ImportarHC from "../modal/ModalDoctor/modalImportarHC";
import FileDisplay from "../modal/ModalDoctor/modalDisplayFile";
import ImportarMultiple from "../modal/ModalDoctor/modalImportarMultiple";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function PreconsultaPte({ params, preconsult, schedule }) {
  const dispatch = useAppDispatch();
  const scheduleId = Number(params);
  const token = Cookies.get("a");
  const patientId = Number(Cookies.get("c"));
  const medicalEventId = schedule?.medicalEvent?.id;
  const [vitalSignsPreconsult, setVitalSignsPreconsult] = useState([]);
  const [glicemiaPreconsult, setGlicemiaPreconsult] = useState([]);
  const [loading, setLoading] = useState();
  const [patient, setPatient] = useState();
  const [medicalEventExist, setMedicalEventExist] = useState();
  //para importar archivos
  const [dataImportar, setDataImportar] = useState({});
  const [text, setText] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flagFile, setFlagFile] = useState(false);
  const [importaciones, setImportaciones] = useState([]);
  const [errorsImport, setErrorsImport] = useState([]);
  const [isModalOpenFile, setIsModalOpenFile] = useState(false);
  const [selectedImport, setSelectedImport] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleBodySave();
      handleQuestionary();
    }, 60000); // Guarda cada 60 segundos

    return () => {
      handleBodySave();
      handleQuestionary();
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    fetchPatientDetail(patientId);
    fetchMedicalEvent(scheduleId);
  }, []);

  //util que necesito para el cuerpo
  const getValue = (formValue, preconsultValue) =>
    formValue !== undefined && formValue !== null ? formValue : preconsultValue;

  const bodyOBJFormat = {
    patient: Number(patientId),
    patientPainMapId: Number(patientId),
    painOwnerId: Number(patientId),
    schedulingId: Number(scheduleId),
    isTherePain:
      getValue(
        preconsult?.provisionalPreConsultationPainMap?.isTherePain,
        formData?.bodySection?.isTherePain
      ) ?? null,
    painDurationId:
      getValue(
        formData?.bodySection?.painDuration,
        preconsult?.provisionalPreConsultationPainMap?.painDuration
      ) ?? null,
    painScaleId:
      getValue(
        formData?.bodySection?.painScale,
        preconsult?.provisionalPreConsultationPainMap?.painScale
      ) ?? null,
    painTypeId:
      getValue(
        formData?.bodySection?.painType,
        preconsult?.provisionalPreConsultationPainMap?.painType
      ) ?? null,
    painAreas: [
      ...((formData?.bodySection?.painAreas &&
        Object.values(formData.bodySection.painAreas)) ||
        []),
      ...((preconsult?.provisionalPreConsultationPainMap?.painAreas &&
        Object.values(
          preconsult.provisionalPreConsultationPainMap.painAreas
        )) ||
        []),
    ],
    painFrequencyId:
      getValue(
        formData?.bodySection?.painFrequency,
        preconsult?.provisionalPreConsultationPainMap?.painFrequency
      ) ?? null,
    isTakingAnalgesic:
      getValue(
        formData?.bodySection?.isTakingAnalgesic,
        preconsult?.provisionalPreConsultationPainMap?.isTakingAnalgesic
      ) ?? null,
    doesAnalgesicWorks:
      getValue(
        formData?.bodySection?.doesAnalgesicWorks,
        preconsult?.provisionalPreConsultationPainMap?.doesAnalgesicWorks
      ) ?? null,
    isWorstPainEver:
      getValue(
        formData?.bodySection?.isWorstPainEver,
        preconsult?.provisionalPreConsultationPainMap?.isWorstPainEver
      ) ?? null,
  };

  //ESTO (bodyForm) ES LO QUE SE ENVIA POR BODY , debe contener si o si patient = patientID y appointmentSchedule  = scheduleID
  const bodyForm = {
    patient: Number(patientId),
    appointmentSchedule: Number(scheduleId),
    // Questions
    lackOfAir: formData?.questions?.lackOfAir?.active,
    lackOfAirIncremented:
      formData?.questions?.lackOfAir?.subquestions?.lackOfAirIncremented
        ?.selectedOption,
    lackOfAirClasification:
      formData?.questions?.lackOfAir?.subquestions?.lackOfAirClasification
        ?.selectedOption,
    chestPainAtRest: formData?.questions?.chestPainAtRest?.active,
    chestPainOnExertion: formData?.questions?.chestPainOnExertion?.active,
    chestPainOnExertionAmount:
      formData?.questions?.chestPainOnExertion?.subquestions
        ?.chestPainOnExertionAmount?.selectedOption,
    edemaPresence: formData?.questions?.edemaPresence?.active,
    edemaPresenceDescription:
      formData?.questions?.edemaPresence?.subquestions?.edemaPresenceDescription
        ?.selectedOption,
    feelings: formData?.questions?.feelings?.selectedOption,
    healthChanges: formData?.questions?.healthChanges?.active,
    healthChangesDescription: formData?.questions?.healthChanges?.description,
    healthWorsened: formData?.questions?.healthWorsened?.selectedOption,
    mentalHealthAffected: formData?.questions?.mentalHealthAffected?.active,
    mentalHealthAffectedDescription:
      formData?.questions?.mentalHealthAffected?.description,
    energyStatus: formData?.questions?.energyStatus?.selectedOption,
    feed: formData?.questions?.feed?.selectedOption,
    hydrationStatus: formData?.questions?.hydrationStatus?.selectedOption,
    urineStatus: formData?.questions?.urineStatus?.selectedOption,
    exerciseStatus: formData?.questions?.exerciseStatus?.selectedOption,
    bodyPain: formData?.questions?.bodyPain?.selectedOption,

    //   painRecordsToUpdate: [bodyOBJFormat],
    //   ...anamnesis,
    //   updateVitalSigns:
    //   vitalSignsPreconsult.length > 0 ? vitalSignsPreconsult : null,
    // ...glicemiaPreconsult,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsLoading(true);

    const response = await patchPreconsultation(bodyForm);
    handleBodySave();

    if (response) {
      Swal.fire({
        icon: "success",
        title: "Preconsulta creada con éxito",
        text: "",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }

    //   if (available) {
    //     console.log({
    //       toCreate: bodyForm,
    //       preconsultationAlreadyExists: !!preconsultationAlreadyExists,
    //     });
    //     console.log(bodyForm, "justo antes del submit")

    //     setIsLoading(false);
    //     return;
    //   } else {
    //     Swal.fire({
    //       icon: "success",
    //       title: "La preconsulta no puede ser modificada",
    //       text: "",
    //     });
    //     setAvailable(false);
    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data", error);
    //   setIsLoading(false);
    // }
  };

  const handleQuestionActive = (question, label, active) => {
    dispatch(updateActive({ question, label, active })); // activamos o desactivamos las subpreguntas
  };

  const handleSubquestionOption = (question, subquestion, selectedOption) => {
    dispatch(
      subquestionSelectedOption({ question, subquestion, selectedOption })
    ); // guardamos la opción seleccionada de la subpregunta
  };

  const handleQuestionOption = (question, selectedOption) => {
    dispatch(questionSelectedOption({ question, selectedOption })); // guardamos la opción seleccionada
  };

  const handleDescription = (question, description) => {
    dispatch(updateDescription({ question, description })); // guardamos la descripción proporcionada
  };

  const handleBodyChange = (name, value) => {
    dispatch(updateBodyPainLevel({ name, option: value }));
  };

  const methods = useForm();

  // Loader mientras se cargan o envían los datos de la preconsulta
  if (isLoading) {
    return (
      <FormProvider {...methods}>
        <div className="flex h-full items-center justify-center my-2 bg-white">
          <LoadingFallback />
        </div>
      </FormProvider>
    );
  }

  // Si el paciente ya tuvo la consulta, entonces no puede volver a editar la preconsulta.
  // if (!available) {
  //   return (
  //     <FormProvider {...methods}>
  //       <div className="flex flex-col h-full overflow-y-auto gap-5 bg-[#fafafc]">
  //         <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] bg-white">
  //           <div className="md:w-1/2">
  //             <Link href={`${rutas.PacienteDash}${rutas.Preconsulta}`}>
  //               <Elboton
  //                 size={"lg"}
  //                 nombre={"Regresar"}
  //                 icon={<IconRegresar />}
  //               />
  //             </Link>
  //           </div>
  //           <div className="flex items-center">
  //             <p className="text-xl leading-6 text-[#5F5F5F] font-bold">
  //               Crear preconsulta
  //             </p>
  //           </div>
  //         </div>
  //         <div className="flex items-center justify-center my-2">
  //           Su preconsulta no está disponible
  //         </div>
  //       </div>
  //     </FormProvider>
  //   );
  // }

  const onSubmit = (data) => {
    const vitalSigns = [
      { id: 1344, measureType: 1, measure: Number(data["Temperatura"]) },
      {
        id: 1344,
        measureType: 2,
        measure: Number(data["Presión Arterial Sistólica"]),
      },
      {
        id: 1344,
        measureType: 3,
        measure: Number(data["Presión Arterial Diastólica"]),
      },
      {
        id: 1344,
        measureType: 5,
        measure: Number(data["Frecuencia Respiratoria"]),
      },
      {
        id: 1344,
        measureType: 6,
        measure: Number(data["Saturación de Oxígeno"]),
      },
      {
        id: 1344,
        measureType: 7,
        measure: Number(data["Frecuencia Cardiaca"]),
      },
      { id: 1344, measureType: 8, measure: Number(data["Estatura"]) },
      { id: 1344, measureType: 9, measure: Number(data["Peso"]) },
      { id: 1344, measureType: 10, measure: Number(data["IMC"]) },
    ];
    const updateVitalSigns = vitalSigns.filter(
      (sign) => sign.measure !== 0 && sign.measure !== ""
    );

    setVitalSignsPreconsult(updateVitalSigns);
    setGlicemiaPreconsult({
      lastAbnormalGlycemia:
        data["lastAbnormalGlycemia"] === ""
          ? preconsult?.lastAbnormalGlycemia
          : data["lastAbnormalGlycemia"],
    });
  };
  const necesaryData = {
    // ids
    preconsultationId: Number(preconsult?.id),
    patient: Number(patientId),
    appointmentSchedule: Number(scheduleId),
    // status
    status: "sent",
  };

  const handleBodySave = async () => {
    try {
      const data = {
        ...necesaryData,
        painRecordsToUpdate: [bodyOBJFormat],
      };

      const response = await patchPreconsultation(data);
    } catch (error) {
      console.error("No pudo cargarse la data en el servidor", error.message);
    }
  };
  const handleQuestionary = async () => {
    try {
      const response = await patchPreconsultation(bodyForm);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPatientDetail = async (userId) => {
    try {
      const response = await getPatientDetail(userId);
      setPatient(response);
    } catch (error) {
      console.log("No existe este paciente", error);
    }
  };
  const fetchMedicalEvent = async (scheduleId) => {
    try {
      const response = await getMedicalEventDetail(scheduleId);
      setMedicalEventExist(response.data);
      if (response.data) {
        setImportaciones(response.data.patientStudies);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("No se ah echo un diagnostico anteriormente:", error);
    }
  };

  //IMPORTAR ARCHIVOS
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalData = (data) => {
    setDataImportar(data);
  };
  const closeModalFile = () => {
    setIsModalOpenFile(false);
  };

  const submitModalData = async () => {
    if (!dataImportar || dataImportar.length === 0) {
      return setErrorsImport([{ message: "No hay datos para importar." }]); // Retorna el error si no hay estudios
    }

    const errors = [];

    // Validación: Iterar sobre el array dataImportar y verificar los campos
    dataImportar.forEach((item, index) => {
      let itemErrors = {}; // Errores para cada objeto

      if (!item.title) {
        itemErrors.title = `El título es requerido .`;
      }

      if (!item.study) {
        itemErrors.content = `Debe haber al menos un estudio.`;
      }
      if (!item.description) {
        itemErrors.description = `Debe haber al menos una descripción.`;
      }

      if (Object.keys(itemErrors).length > 0) {
        errors[index] = itemErrors;
      }
    });

    // Si hay errores, retornar y salir de la función
    if (errors.length > 0) {
      setErrorsImport(errors);
      return; // Salir si hay errores
    }
    const payload = {
      scheduleId: scheduleId,
      userId: patientId,
      studies: dataImportar,
    };
    console.log(payload);
    try {
      // Realizar la petición POST

      setLoading(true);
      const response = await postPatientStudiesOrHc(payload);

      setLoading(false);
      // Cerrar el modal después de la petición
      setIsModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "La importacion se realizo correctamente",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
      setIsModalOpen(false);
      Swal.fire({
        title: "Error",
        text: "No pudo realizarse la importacion, intente mas tarde",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  };
  //LISTAR LAS IMPORTACIONES !!
  const ImportacionesColumns = [
    {
      label: "Fecha",
      key: "createdAt",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "createdAt",
      showMobile: true,
      width: "w-8",
    },

    {
      label: "Titulo",
      key: "title",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Descripcion",
      key: "description",
      showMobile: false,
      width: "w-16",
    },
  ];
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full overflow-y-auto gap-5 bg-[#fafafc]">
        <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] bg-white  justify-between">
          <Link href={`${rutas.PacienteDash}${rutas.Preconsulta}`}>
            <Elboton size={"lg"} nombre={"Regresar"} icon={<IconRegresar />} />
          </Link>

          <p className="text-xl leading-6 text-[#5F5F5F] font-bold">
            Crear preconsulta
          </p>

          <MenuDropDown
            label="Importar archivo"
            icon={<IconExportar color="#487FFA" />}
            classNameButton={
              "border-[#487FFA] border-2 bg-[#FFFFFF] text-start text-[#487FFA] font-bold text-base leading-5"
            }
            categories={[
              {
                items: [
                  {
                    label: "Importar archivo",
                    onClick: () => {
                      setText(false);
                      openModal();
                      setFlagFile(true);
                    },
                    icon: <IconExportar color={"#B2B2B2"} />,
                  },
                ],
              },
            ]}
          />
        </div>
        {formData &&
          formData?.questions &&
          Object.keys(formData?.questions).map((question, index) => (
            <PreconsultaQuestion
              key={index}
              question={question}
              section={formData.questions[question]}
              sectionIndex={index}
              onQuestionActive={handleQuestionActive}
              onSubquestionChange={handleSubquestionOption}
              onQuestionChange={handleQuestionOption}
              onDescriptionChange={handleDescription}
              preconsult={preconsult}
            />
          ))}
        <div className="flex justify-center p-6 bg-[#fafafc]">
          <Elboton
            nombre={"Guardar"}
            icon={<IconGuardar />}
            onPress={() => {
              handleQuestionary;
              Swal.fire({
                icon: "success",
                title: "Datos guardados con exito",
                text: "",
                confirmButtonColor: "#487FFA",
                confirmButtonText: "Aceptar",
              });
            }}
            size={"sm"}
            className={"bg-greenPrimary w-40 text-sm font-bold"}
          />
        </div>
        <form onChange={methods.handleSubmit(onSubmit)}>
          <InputCuerpoPre
            title={"Autoevaluación"}
            onBodyChange={handleBodyChange}
            bodySection={formData?.bodySection}
            defaultOpen
            valuePreconsultation={preconsult}
          />
          <div className="flex justify-center p-6 bg-[#fafafc]">
            <Elboton
              nombre={"Guardar"}
              icon={<IconGuardar />}
              onPress={() => {
                handleBodySave;
                Swal.fire({
                  icon: "success",
                  title: "Datos guardados con exito",
                  text: "",
                  confirmButtonColor: "#487FFA",
                  confirmButtonText: "Aceptar",
                });
              }}
              size={"md"}
              className={"bg-greenPrimary w-40 text-sm font-bold"}
            />
          </div>

          {/* <InputConsulta
            title={"Anamnesis"}
            subtitle={["Motivo de consulta", "Sintomas importantes"]}
            preconsult={preconsult}
            defaultOpen
          />
          <InputConsulta
            title={"Antecedentes"}
            subtitle={[
              "Antecedentes quirúrgicos",
              "Antecedentes patologicos",
              "Antecedentes no patologicos",
              "Antecedentes familiares",
              "Antecedentes de infancia",
              "Medicación actual",
              "Alergias",
              "Vacunas",
            ]}
            defaultOpen
            paciente={patient}
          /> */}
          {/* <div className="flex justify-center p-6 bg-[#fafafc]">
            <Elboton
              nombre={"Guardar"}
              icon={<IconGuardar />}
              onPress={() => {
                anamnesisCompleto();
                Swal.fire({
                  icon: "success",
                  title: "Datos guardados con exito",
                  text: "",
                  confirmButtonColor: "#487FFA",
                  confirmButtonText: "Aceptar",
                });
              }}
              size={"md"}
              className={"bg-greenPrimary w-40 text-sm font-bold"}
            />
          </div> */}

          <DynamicTable
            title={"Lista de Importaciones"}
            rows={importaciones}
            columns={ImportacionesColumns}
            showHistoryIcon={true}
            renderDropDown={(row) => {
              return (
                <MenuDropDown
                  label="Opciones"
                  icon={<IconOptions color="white" />}
                  categories={[
                    {
                      items: [
                        {
                          label: "Ver Detalles",
                          icon: <IconOptions color={"#B2B2B2"} />,
                          onClick: () => {
                            setSelectedImport(row);
                            setFlagFile(false);
                            setIsModalOpen(true);
                          },
                        },
                        {
                          label: "Ver archivo",
                          icon: <IconImportar color={"#B2B2B2"} />,
                          onClick: () => {
                            setSelectedImport(row);
                            setIsModalOpenFile(true);
                          },
                        },
                      ].filter(Boolean),
                    },
                  ]}
                  className={"w-[40px] md:w-full lg:w-fit mx-auto"}
                />
              );
            }}
          />
        </form>
        {/* <div className="flex justify-center p-6 bg-[#fafafc]">
          <Elboton
            nombre={"Guardar Cambios"}
            icon={<IconGuardar />}
            onPress={handleSubmit}
            disabled={!enableButton}
            size={"lg"}
            className={"bg-greenPrimary w-60 text-sm font-bold"}
          />
        </div> */}
        {!flagFile ? (
          <ModalModularizado
            isOpen={isModalOpen}
            onClose={closeModal}
            Modals={[
              <ImportarHC
                key={"importar hc"}
                state={selectedImport}
                disabled={true}
              />,
            ]}
            title={"Ver detalles de importacion"}
            button1={"hidden"}
            button2={"bg-greenPrimary text-white block"}
            progessBar={"hidden"}
            size={"md:min-h-[4rem] md:w-[35rem]"}
            buttonText={{ end: `Cerrar` }}
            buttonIcon={<></>}
          />
        ) : (
          <ModalModularizado
            isOpen={isModalOpen}
            onClose={closeModal}
            Modals={[
              <ImportarMultiple
                key={"importar hc"}
                onData={handleModalData}
                errors={errorsImport}
              />,
            ]}
            title={"Importar Historia Clínica"}
            button1={"hidden"}
            button2={"bg-greenPrimary text-white block"}
            progessBar={"hidden"}
            size={" text-white max-h-[35rem] min-h-[15rem] md:w-[55rem]"}
            buttonText={{ end: `Importar` }}
            funcion={submitModalData}
            loading={loading}
          />
        )}

        <ModalModularizado
          isOpen={isModalOpenFile}
          onClose={closeModalFile}
          Modals={[<FileDisplay key={"displayFile"} state={selectedImport} />]}
          title={"Visualizacion de archivo"}
          button1={"hidden"}
          button2={"bg-greenPrimary text-white block"}
          progessBar={"hidden"}
          size={"md:min-h-[4rem] md:w-[35rem]"}
          buttonText={{ end: `Cerrar` }}
          buttonIcon={<></>}
        />
      </div>
    </FormProvider>
  );
}
