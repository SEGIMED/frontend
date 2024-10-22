"use client";
import Elboton from "@/components/Buttons/Elboton";
import IconCircle from "@/components/icons/IconCircle";
import IconGuardar from "@/components/icons/iconGuardar";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import PreconsultaQuestion from "@/components/preconsulta/PreconsultaQuestion";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import SignosVitalesInfo from "../HistoriaClinicaTab/SignosVitalesInfo";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconExportar from "@/components/icons/IconExportar";
import Link from "next/link";
import IconRegresar from "@/components/icons/iconRegresar";
import rutas from "@/utils/rutas";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import ImportarMultiple from "@/components/modal/ModalDoctor/modalImportarMultiple";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import postPatientStudiesOrHc from "@/utils/dataFetching/fetching/postPetientStudiesOrHc";
import { ApiSegimed } from "@/Api/ApiSegimed";
import {
  formatPainMapData,
  formatPreconsultationData,
  formatPreconsultationGetData,
  mapFunctionalClass,
  vitalSignsMapping,
} from "../utils";

const PreconsultaInfo = ({
  medicalEventId,
  scheduleId,
  showSignosVitales,
  isReadOnly = false,
}) => {
  const [formData, setFormData] = useState({
    questions: {
      lackOfAir: {
        title: "¿Tiene falta de aire (Disnea)?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
        subquestions: {
          lackOfAirIncremented: {
            title: "Se ha incrementado en las últimas:",
            display: "row",
            selectedOption: null,
            options: [
              { label: "Horas" },
              { label: "Días" },
              { label: "Semanas" },
            ],
          },
          lackOfAirClasification: {
            title: "Califique su falta de aire",
            selectedOption: null,
            orientation: "column",
            options: [
              {
                label:
                  "Puedo caminar a paso rápido más de 10 cuadras sin parar.",
              },
              {
                label:
                  "Puedo caminar a paso rápido menos de 5 cuadras sin parar.",
              },
              {
                label:
                  "No puedo caminar más de 3 cuadras, solo realizo tareas domésticas, uso oxígeno eventualmente.",
              },
              {
                label:
                  "No puedo caminar ni una cuadra, tampoco realizar tareas domésticas con normalidad, me hace falta el aire aunque esté en reposo, uso oxígeno todo el tiempo.",
              },
            ],
          },
        },
      },
      chestPainAtRest: {
        title: "¿Tiene dolor de pecho en reposo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
      },
      chestPainOnExertion: {
        title: "¿Tiene dolor de pecho al hacer esfuerzos físicos?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
        subquestions: {
          chestPainOnExertionAmount: {
            selectedOption: null,
            options: [
              { label: "Con poco esfuerzo físico" },
              { label: "Con esfuerzo físico moderado" },
              { label: "Con esfuerzo físico intenso" },
            ],
          },
        },
      },
      edemaPresence: {
        title: "¿Ha notado edemas (hinchazón) o aumento del edema previo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
        subquestions: {
          edemaPresenceDescription: {
            selectedOption: null,
            options: [
              { label: "Hinchazón en los pies" },
              { label: "Hinchazón por debajo de las rodillas" },
              { label: "Hinchazón de las rodillas a la cadera" },
              { label: "Hinchazón general" },
            ],
          },
        },
      },
      feelings: {
        title: "¿Cómo se encuentra el día de hoy?",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: "",
        options: [
          { label: "Mal" },
          { label: "Regular" },
          { label: "Normal" },
          { label: "Bien" },
        ],
      },
      healthChanges: {
        title: "¿Ha notado algún cambio en su salud?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: "",
      },
      healthWorsened: {
        title: "Siente que su salud se ha empeorado en las últimas:",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: "",
        options: [
          { label: "Horas" },
          { label: "Días" },
          { label: "Semanas" },
          { label: "No empeoró" },
        ],
      },
      bodyPain: {
        title: "¿Tiene alguna dolencia en su cuerpo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
      },
      // mentalHealthAffected: {
      //   title: "¿Su salud mental está afectada?",
      //   active: null,
      //   binaryOptions: true,
      //   selectedOption: null,
      //   showTextInput: true,
      //   description: "",
      // },
      energyStatus: {
        title: "Califique su estado de energía - Fatiga",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showSlider: true,
        description: "",
      },
      feed: {
        title: "Califique su alimentación",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: "",
        options: [
          { label: "Nada saludable" },
          { label: "Poco saludable" },
          { label: "Saludable" },
          { label: "Muy saludable" },
        ],
      },
      hydrationStatus: {
        title: "Califique su hidratación diaria (todos los líquidos ingeridos)",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: "",
        options: [
          { label: "Poca ingesta < de 1.5 litros (menos de 5 vasos aprox.)" },
          { label: "Normal 1.5 a 2 litros (5 a 8 vasos aprox.)" },
          { label: "Mucha ingesta > a 2.5 litros (> de 8 vasos aprox.)" },
        ],
      },
      urineStatus: {
        title: "Califique su estado de orina (diuresis)",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: "",
        options: [
          { label: "Orino normal (entre 500 ml y 1 litro al día)" },
          {
            label:
              "He notado una disminución del 50% o menos de 1 litro al día",
          },
          { label: "Orino poco (menos de medio litro o 500 ml al día)" },
          { label: "Casi nada (menos de 1 vaso al día)" },
          { label: "Nada" },
        ],
      },
      exerciseStatus: {
        title: "Califique su estado de ejercicio físico",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: "",
        options: [
          {
            label:
              "Ninguno: no puedo, no quiero, no recomendado por el médico, contraindicado.",
          },
          {
            label:
              "Bajo: camino poco, realizo tareas domésticas, trabajo con poca actividad física. Camino menos de 10 mil pasos al día o menos de 7.5 km día.",
          },
          {
            label:
              "Moderado: Camino más de 10 mil pasos o 7.5 km al día. Al menos 150 minutos de actividad física a la semana (caminar, trotar, nadar, yoga, baile, pesas, bicicleta, etc.)",
          },
          {
            label:
              "Intenso: Más de 150 minutos a la semana de actividad intensa o más de 300 minutos de actividad moderada. (Deportista aficionado, bien entrenado o competidor)",
          },
        ],
      },
    },
    bodySection: {
      isTherePain: null,
      painDuration: null,
      painScale: null,
      painType: null,
      painAreas: [],
      painFrequency: null,
      isTakingAnalgesic: null,
      doesAnalgesicWorks: null,
      isWorstPainEver: null,
    },
    signosVitales: {
      height: "",
      weight: "",
      bmi: "",
      temperature: "",
      heartRate: "",
      systolicBP: "",
      diastolicBP: "",
      respiratoryRate: "",
      oxygenSaturation: "",
      classFunctional: "",
      glucoseAbnormal: false,
      abnormalGlucoseValues: ["", "", "", ""],
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState(false);
  const [loading, setLoading] = useState();
  const [dataImportar, setDataImportar] = useState({
    data: [],
    errors: [],
  });
  const patientId = Number(Cookies.get("c"));
  // Función para obtener la preconsulta desde el servidor
  const fetchPreconsultation = async () => {
    try {
      setLoading(true);
      const response = await ApiSegimed.get(
        `/medical-event/preconsultation?id=${medicalEventId}`
      );

      if (response.data) {
        const { questions, bodySection } = formatPreconsultationGetData(
          response?.data.appSch.ProvisionalPreConsultation,
          response?.data.patientPainMap
        );

        setFormData({
          ...formData,
          questions,
          bodySection,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (medicalEventId) {
      fetchPreconsultation();
    }
  }, []);

  // Handle the change of selected option for a question
  const onQuestionChange = (questionKey, newValue) => {
    if (isReadOnly) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: {
        ...prevFormData.questions,
        [questionKey]: {
          ...prevFormData.questions[questionKey],
          selectedOption: newValue,
        },
      },
    }));
  };

  // Handle the change of subquestions
  const onSubquestionChange = (questionKey, subquestionKey, newValue) => {
    if (isReadOnly) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: {
        ...prevFormData.questions,
        [questionKey]: {
          ...prevFormData.questions[questionKey],
          subquestions: {
            ...prevFormData.questions[questionKey].subquestions,
            [subquestionKey]: {
              ...prevFormData.questions[questionKey].subquestions[
                subquestionKey
              ],
              selectedOption: newValue,
            },
          },
        },
      },
    }));
  };

  // Handle the change of description for a question
  const onDescriptionChange = (questionKey, newDescription) => {
    if (isReadOnly) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: {
        ...prevFormData.questions,
        [questionKey]: {
          ...prevFormData.questions[questionKey],
          description: newDescription,
        },
      },
    }));
  };
  const onQuestionActive = (questionKey, newActiveState) => {
    if (isReadOnly) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: {
        ...prevFormData.questions,
        [questionKey]: {
          ...prevFormData.questions[questionKey],
          active: newActiveState, // Update the active state (true or false)
        },
      },
    }));
  };
  const handleBodyChange = (name, value) => {
    if (isReadOnly) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      bodySection: {
        ...prevFormData.bodySection,
        [name]: value,
      },
    }));
  };

  const handleSignosVitalesChange = (key, value) => {
    if (isReadOnly) return;
    setFormData((prev) => ({
      ...prev,
      signosVitales: {
        ...prev.signosVitales,
        [key]: value,
      },
    }));
  };
  useEffect(() => {
    const { height, weight } = formData.signosVitales;
    if (height && weight) {
      const heightNum = parseFloat(height);
      const weightNum = parseFloat(weight);
      if (heightNum > 0 && weightNum > 0) {
        const bmi = (weightNum / (heightNum / 100) ** 2).toFixed(2);
        setFormData((prev) => ({
          ...prev,
          signosVitales: {
            ...prev.signosVitales,
            bmi,
          },
        }));
      }
    }
  }, [formData.signosVitales.height, formData.signosVitales.weight]);

  //IMPORTAR ARCHIVOS
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalData = (data) => {
    setDataImportar({
      data: data,
      errors: [],
    });
  };

  // <-- Guardar secciones -->
  //Importacion
  const submitModalData = async () => {
    if (!dataImportar.data || dataImportar.data.length === 0) {
      return setDataImportar({
        ...dataImportar,
        errors: [{ message: "No hay datos para importar." }],
      }); // Retorna el error si no hay estudios
    }

    const errors = [];

    // Validación: Iterar sobre el array dataImportar y verificar los campos
    dataImportar.data.forEach((item, index) => {
      let itemErrors = {}; // Errores para cada objeto

      if (!item.title) {
        itemErrors.title = `El título es requerido.`;
      }

      if (!item.study) {
        itemErrors.study = `Debe haber al menos un estudio.`;
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
      console.log(errors);
      setDataImportar({
        ...dataImportar,
        errors: errors,
      });
      return; // Salir si hay errores
    }

    const payload = {
      scheduleId: scheduleId,
      userId: patientId,
      studies: dataImportar.data,
    };
    try {
      // Realizar la petición POST
      await postPatientStudiesOrHc(payload);
      // Cerrar el modal después de la petición
      setIsModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La importación se realizó correctamente",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
      setIsModalOpen(false);
      Swal.fire({
        title: "Error",
        text: "No pudo realizarse la importación, intente más tarde",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  };
  //Signos vitales
  const handleSaveSignosVitales = async () => {
    try {
      let vitalSigns = [];
      Object.keys(vitalSignsMapping).forEach((key) => {
        if (formData.signosVitales[key]) {
          vitalSigns.push({
            measureType: vitalSignsMapping[key],
            measure: parseFloat(formData.signosVitales[key]),
          });
        }
      });
      const data = {
        vitalSigns: vitalSigns,
        glycemia: formData.signosVitales.abnormalGlucoseValues.map((value) =>
          parseFloat(value)
        ),
        abnormalGlycemia: formData.signosVitales.glucoseAbnormal,
      };
      // Lógica para enviar los datos al backend
      // Por ejemplo, utilizando fetch:
      await ApiSegimed.patch(`/pre-consultation?id=${medicalEventId}`, data);

      // Suponiendo que la llamada es exitosa
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Se han guardado los signos vitales correctamente.",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("No pudo cargarse la data en el servidor", error.message);
    }
  };
  //Preguntas
  const handleQuestionsSave = async () => {
    try {
      await ApiSegimed.patch(
        `/pre-consultation?id=${medicalEventId}`,
        formatPreconsultationData(formData.questions)
      );
      Swal.fire({
        icon: "success",
        title: "Datos guardados con exito",
        text: "",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No pudo guardarse los datos, intente más tarde",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  };
  //Cuerpo
  const handleBodySave = async () => {
    const painMapFormatted = formatPainMapData(formData.bodySection);
    try {
      await ApiSegimed.patch(
        `/pre-consultation?id=${medicalEventId}`,
        painMapFormatted
      );
      Swal.fire({
        icon: "success",
        title: "Datos guardados con exito",
        text: "",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No pudo guardarse los datos, intente más tarde",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  };
  return (
    <div>
      {isReadOnly ? (
        <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] bg-white  justify-between">
          <p className="text-xl leading-6 text-[#5F5F5F] font-bold text-center mx-auto">
            Preconsulta
          </p>
        </div>
      ) : (
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
                      openModal("import");
                    },
                    icon: <IconExportar color={"#B2B2B2"} />,
                  },
                ],
              },
            ]}
          />
        </div>
      )}
      {formData.questions &&
        Object.keys(formData.questions).map((question, index) => (
          <PreconsultaQuestion
            key={index}
            question={question}
            section={formData.questions[question]}
            sectionIndex={index}
            onQuestionChange={onQuestionChange}
            onSubquestionChange={onSubquestionChange}
            onDescriptionChange={onDescriptionChange}
            onQuestionActive={onQuestionActive}
          />
        ))}
      {!isReadOnly && (
        <div className="flex justify-center p-6 bg-[#fafafc]">
          <Elboton
            nombre={"Guardar"}
            icon={<IconGuardar />}
            onPress={() => {
              handleQuestionsSave();
            }}
            size={"md"}
            className={"bg-greenPrimary w-40 text-sm font-bold"}
          />
        </div>
      )}
      <InputCuerpoPre
        title={"Autoevaluación"}
        onBodyChange={handleBodyChange}
        bodySection={formData?.bodySection}
        defaultOpen
        valuePreconsultation={formData.bodySection}
        isReadOnly={isReadOnly}
      />
      {!isReadOnly && (
        <div className="flex justify-center p-6 bg-[#fafafc]">
          <Elboton
            nombre={"Guardar"}
            icon={<IconGuardar />}
            onPress={() => {
              handleBodySave();
            }}
            size={"md"}
            className={"bg-greenPrimary w-40 text-sm font-bold"}
          />
        </div>
      )}
      {showSignosVitales && (
        <Accordion
          collapsible
          className="!px-0"
          selectionMode="multiple"
          defaultExpandedKeys={["signosVitales"]}>
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
              signosVitales={formData?.signosVitales}
              onSignosVitalesChange={handleSignosVitalesChange}
              showClassFunctional={false}
            />
            <div className="flex justify-center p-6 bg-[#fafafc]">
              <Elboton
                nombre={"Guardar"}
                icon={<IconGuardar />}
                onPress={() => {
                  handleSaveSignosVitales();
                }}
                size={"md"}
                className={"bg-greenPrimary w-40 text-sm font-bold"}
              />
            </div>
          </AccordionItem>
        </Accordion>
      )}
      <ModalModularizado
        isOpen={isModalOpen}
        onClose={closeModal}
        Modals={[
          <ImportarMultiple
            key={"importar hc"}
            onData={handleModalData}
            errors={dataImportar.errors}
          />,
        ]}
        title={"Importar Historia Clínica"}
        button1={"hidden"}
        button2={"bg-greenPrimary text-white block"}
        progessBar={"hidden"}
        size={" text-white max-h-[35rem] min-h-[15rem] md:w-[55rem]"}
        buttonText={{ end: `Importar` }}
        funcion={submitModalData}
      />
    </div>
  );
};

export default PreconsultaInfo;
