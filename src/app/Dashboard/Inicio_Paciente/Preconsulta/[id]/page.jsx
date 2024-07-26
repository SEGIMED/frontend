"use client";

import Elboton from "@/components/Buttons/Elboton";
import InputFilePreconsultation from "@/components/preconsulta/estudios";
import IconRegresar from "@/components/icons/iconRegresar";
import PreconsultaQuestion from "@/components/preconsulta/PreconsultaQuestion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import rutas from "@/utils/rutas";
import {
  updateActive, subquestionSelectedOption, questionSelectedOption, updateDescription, updateVitalSign, updateAnamnesis, updateTratamiento, updateBodyPainLevel, updateGlycemia, updateLastGlycemia, updateAllFormData, updateFileUploaded, updateTestDescription, updateTestActive, updateTestSelectedOption,
} from "@/redux/slices/user/preconsultaFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SignosVitales from "@/components/preconsulta/signosVitales";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";
import AnamnesisPreconsulta from "@/components/preconsulta/Anamnesis";
import TratamientoPreconsulta from "@/components/preconsulta/Tratamiento";
import IconGuardar from "@/components/icons/iconGuardar";
import LoadingFallback from "@/components/loading/loading";
import Swal from "sweetalert2";

export default function PreconsultaPte({ params }) {
  const dispatch = useAppDispatch();
  const scheduleId = params.id;
  const token = Cookies.get("a");
  const patientId = Cookies.get("c");
  const [enable, setEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [preconsultationAlreadyExists, setPreconsultationAlreadyExists] =
    useState(null);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);
  const [tests, setTests] = useState({
    laboratoryResults: {
      title: "Resultados de laboratorio",
      file: null,
      description: "",
      active: null,
    },
    electrocardiogram: {
      title: "Electrocardiograma",
      file: null,
      description: "",
      active: null,
    },
    rxThorax: {
      title: "RX de Torax",
      file: null,
      description: "",
      active: null,
    },
    echocardiogram: {
      title: "Ecocardiograma",
      file: null,
      description: "",
      active: null,
    },
    walkTest: {
      title: "Test de caminata",
      file: null,
      description: "",
      active: null,
    },
    respiratoryFunctional: {
      title: "Funcional respiratorio",
      file: null,
      description: "",
      active: null,
    },
    tomographies: {
      title: "Tomografías",
      file: null,
      description: "",
      active: null,
    },
    rightHeartCatheterization: {
      title: "Cateterismo cardiaco derecho",
      file: null,
      description: "",
      active: null,
    },
    ccg: {
      title: "CCG (Coronariografia)",
      file: null,
      description: "",
      active: null,
    },
    resonance: {
      title: "Resonancia",
      file: null,
      description: "",
      active: null,
    },
    leftHeartCatheterization: {
      title: "Cateterismo cardiaco izquierdo",
      file: null,
      description: "",
      active: null,
    },
    otherStudies: {
      title: "Otros estudios",
      file: null,
      description: "",
    },
    pendingStudies: {
      title: "Estudios pendientes",
      description: "",
    },
  });

  useEffect(() => {
    setEnable(true);
    if (enable) {
      localStorage.setItem('preconsultationDraft', JSON.stringify({ ...formData, tests }));
    }
  }, [formData]);

  useEffect(() => {
    setIsLoading(true);
    const draft = JSON.parse(localStorage.getItem('preconsultationDraft'));
    if (draft) {
      dispatch(updateAllFormData({ draft }));
      console.log({ draft });
    }
    setIsLoading(false);
    // const getPreConsultation = async () => {
    //   try {
    //     setIsLoading(true);
    //     const res = await ApiSegimed.get(
    //       `/get-preconsultation?scheduleId=${scheduleId}`,
    //       {
    //         headers: {
    //           token: token,
    //         },
    //       }
    //     );
    //     if (res) {
    //       setPreconsultationAlreadyExists(res.data);
    //       setDisabledButton(true);
    //       console.log({ setPreconsultationAlreadyExists: true, preconsultation: res.data });
    //     }
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.log('NUEVA PRECONSULTA');
    //     console.error("Error fetching data", error);
    //     setIsLoading(false);
    //   }
    // };
    // getPreConsultation();
  }, []);

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

  const handleVitalSign = (vitalSign, value, active, key) => {
    if (vitalSign === "abnormalGlycemia") {
      dispatch(updateGlycemia({ vitalSign, active }));
    }
    if (vitalSign === "lastAbnormalGlycemia") {
      console.log({ vitalSign, key, value });
      dispatch(updateLastGlycemia({ vitalSign, key, value }));
    } else {
      dispatch(
        updateVitalSign({
          vitalSign,
          value,
          number: Number(patientId),
          schedulingId: Number(scheduleId),
        })
      ); // actualizamos los signos vitales en el estado global
    }
  };

  const handleAnamnesis = (field, description) => {
    dispatch(updateAnamnesis({ field, description })); // actualizamos la descripción de la anamnesis en el estado global
  };

  const handleUploadTestFile = (test, file) => {
    const studies = tests;
    // dispatch(updateFileUploaded({ test, file }));
    setTests({ ...studies, [test]: { ...studies[test], file: file } });
  };

  const handleTestDescription = (test, testDescription) => {
    // almacenamos la descripción del estudio
    dispatch(updateTestDescription({ test, testDescription }));
    const studies = tests;
    setTests({
      ...studies,
      [test]: { ...studies[test], description: testDescription },
    });
  };

  const handleTestActive = (test, active) => {
    // para los campos binarios
    dispatch(updateTestActive({ test, active }));
    const studies = tests;
    setTests({ ...studies, [test]: { ...studies[test], active: active } });
  };

  const handleTestSelectedOption = (test, value) => {
    dispatch(updateTestSelectedOption({ test, value }));
    const studies = tests;
    setTests({
      ...studies,
      [test]: { ...studies[test], selectedOption: value },
    });
  };

  const handleTratamientoDescription = (field, item, description) => {
    dispatch(updateTratamiento({ field, item, description })); // almacenamos los distintos tratamientos en el estado global
  };

  const handleBodyChange = (name, value) => {
    dispatch(updateBodyPainLevel({ name, option: value }));
  };

  const methods = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const bodyOBJFormat = {
      patient: Number(patientId),
      patientPainMapId: Number(patientId),
      painOwnerId: Number(patientId),
      schedulingId: Number(scheduleId),
      isTherePain: formData.bodySection.isTherePain,
      painDurationId: formData.bodySection.painDuration,
      painScaleId: formData.bodySection.painScale,
      painTypeId: formData.bodySection.painType,
      painAreas: formData.bodySection.painAreas
        ? Object.values(formData.bodySection.painAreas)
        : [],
      painFrequencyId: formData.bodySection.painFrequency,
      isTakingAnalgesic: formData.bodySection.isTakingAnalgesic,
      doesAnalgesicWorks: formData.bodySection.doesAnalgesicWorks,
      isWorstPainEver: formData.bodySection.isWorstPainEver,
    };
    const vitalSignFormat = [
      formData.vitalSigns.height,
      formData.vitalSigns.weight,
      formData.vitalSigns.IMC,
      formData.vitalSigns.temperature,
      formData.vitalSigns.Heart_Rate,
      formData.vitalSigns.Systolic_Blood_Pressure,
      formData.vitalSigns.Diastolic_Blood_Pressure,
      formData.vitalSigns.Breathing_frequency,
      formData.vitalSigns.Oxygen_saturation,
    ];
    const bodyForm = {
      patient: Number(patientId),
      appointmentSchedule: Number(scheduleId),
      // Questions
      lackOfAir: formData.questions.lackOfAir.active,
      lackOfAirIncremented: formData.questions.lackOfAir.subquestions.lackOfAirIncremented.selectedOption,
      lackOfAirClasification: formData.questions.lackOfAir.subquestions.lackOfAirClasification.selectedOption,
      chestPainAtRest: formData.questions.chestPainAtRest.active,
      chestPainOnExertion: formData.questions.chestPainOnExertion.active,
      chestPainOnExertionAmount: formData.questions.chestPainOnExertion.subquestions.chestPainOnExertionAmount.selectedOption,
      edemaPresence: formData.questions.edemaPresence.active,
      edemaPresenceDescription: formData.questions.edemaPresence.subquestions.edemaPresenceDescription.selectedOption,
      feelings: formData.questions.feelings.selectedOption,
      healthChanges: formData.questions.healthChanges.active,
      healthChangesDescription: formData.questions.healthChanges.description,
      healthWorsened: formData.questions.healthWorsened.selectedOption,
      mentalHealthAffected: formData.questions.mentalHealthAffected.active,
      mentalHealthAffectedDescription: formData.questions.mentalHealthAffected.description,
      energyStatus: formData.questions.energyStatus.selectedOption,
      feed: formData.questions.feed.selectedOption,
      hydrationStatus: formData.questions.hydrationStatus.selectedOption,
      urineStatus: formData.questions.urineStatus.selectedOption,
      exerciseStatus: formData.questions.exerciseStatus.selectedOption,
      // Estudios
      laboratoryResults: tests.laboratoryResults.file,
      laboratoryResultsDescription: tests.laboratoryResults.description,
      electrocardiogram: tests.electrocardiogram.file,
      electrocardiogramDescription: tests.electrocardiogram.description,
      rxThorax: tests.rxThorax.file,
      echocardiogram: tests.echocardiogram.file,
      walkTest: tests.walkTest.file,
      respiratoryFunctional: tests.respiratoryFunctional.file,
      tomographies: tests.tomographies.file,
      rightHeartCatheterization: tests.rightHeartCatheterization.file,
      ccg: tests.ccg.file,
      resonance: tests.resonance.file,
      leftHeartCatheterization: tests.leftHeartCatheterization.file,
      otherStudies: tests.otherStudies.file,
      pendingStudies: tests.pendingStudies.description,
      // Anamnesis
      consultationReason: formData.anamnesis.consultationReason.description,
      importantSymptoms: formData.anamnesis.importantSymptoms.description,
      // Tratamiento
      currentMedications: formData.tratamiento.currentMedications
        ?.selectedOptions
        ? Object.values(formData.tratamiento.currentMedications.selectedOptions)
        : null,
      // Signos vitales
      abnormalGlycemia: formData.vitalSigns.abnormalGlycemia.active,
      lastAbnormalGlycemia: Object.keys(
        formData.vitalSigns.lastAbnormalGlycemia.options
      ).length
        ? Object.values(formData.vitalSigns.lastAbnormalGlycemia.options)
        : null,
      vitalSignsToCreate: vitalSignFormat,
      // painRecordsToCreate
      painRecordsToCreate: [bodyOBJFormat],
    };
    try {
      if (!bodyForm) {
        console.error("No form data to submit");
        setIsLoading(false);
        return;
      }
      const isBodyCompleted = Object.values(bodyOBJFormat).some(
        (item) => item === null
      );
      const isVitalSignCompleted = vitalSignFormat.some(
        (item) => item.measure === null
      );
      if (isBodyCompleted || isVitalSignCompleted) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debe completar la información del cuerpo y los signos vitales",
        });
        setIsLoading(false);
        return;
      }
      if (!preconsultationAlreadyExists) {
        console.log({
          toCreate: bodyForm,
          preconsultationAlreadyExists: !!preconsultationAlreadyExists,
        });
        const response = await ApiSegimed.post(`/pre-consultation`, bodyForm, {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Preconsulta creada con éxito",
            text: "",
          });
          localStorage.removeItem('preconsultationDraft'); // ya no necesitamos recupera el borrador de la preconsulta
          console.log({ resupuestaCreate: response.data });
        }
        setIsLoading(false);
        setPreconsultationAlreadyExists(true);
        return;
      } else {
        console.log({
          toUpdate: {
            ...bodyForm,
            updateVitalSigns: bodyForm.vitalSignsToCreate,
          },
          preconsultationAlreadyExists: !!preconsultationAlreadyExists,
        });
        const response = await ApiSegimed.patch(
          `/update-pre-consultation`,
          { ...bodyForm, updateVitalSigns: bodyForm.vitalSignsToCreate },
          {
            headers: {
              token: token,
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
          console.log({ resupuestaPatch: response.data });
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <FormProvider {...methods}>
        <div className="flex h-full items-center justify-center my-2 bg-white">
          <LoadingFallback />
        </div>
      </FormProvider>
    );
  }

  if (preconsultationAlreadyExists) {
    return (
      <FormProvider {...methods}>
        <div className="flex flex-col h-full overflow-y-auto gap-5 bg-[#fafafc]">
          <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] bg-white">
            <div className="md:w-1/2">
              <Link href={`${rutas.PacienteDash}${rutas.Preconsulta}`}>
                <Elboton
                  size={"lg"}
                  nombre={"Regresar"}
                  icon={<IconRegresar />}
                />
              </Link>
            </div>
            <div className="flex items-center">
              <p className="text-xl leading-6 text-[#5F5F5F] font-bold">
                Crear preconsulta
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center my-2">
            Su preconsulta ya fue enviada
          </div>
        </div>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full overflow-y-auto gap-5 bg-[#fafafc]">
        <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] bg-white">
          <div className="md:w-1/2">
            <Link href={`${rutas.PacienteDash}${rutas.Preconsulta}`}>
              <Elboton
                size={"lg"}
                nombre={"Regresar"}
                icon={<IconRegresar />}
              />
            </Link>
          </div>
          <div className="flex items-center">
            <p className="text-xl leading-6 text-[#5F5F5F] font-bold">
              Crear preconsulta
            </p>
          </div>
        </div>
        {Object.keys(formData?.questions).map((question, index) => (
          <PreconsultaQuestion
            key={index}
            question={question}
            section={formData.questions[question]}
            sectionIndex={index}
            onQuestionActive={handleQuestionActive}
            onSubquestionChange={handleSubquestionOption}
            onQuestionChange={handleQuestionOption}
            onDescriptionChange={handleDescription}
          />
        ))}
        <SignosVitales
          title={"Signos vitales"}
          vitalSigns={formData?.vitalSigns}
          onVitalSignChange={handleVitalSign}
          defaultOpen
        />
        <InputCuerpoPre
          title={"Exploracion fisica"}
          onBodyChange={handleBodyChange}
          bodySection={formData?.bodySection}
          defaultOpen
        />
        <InputFilePreconsultation
          title={"Estudios"}
          onUploadFile={handleUploadTestFile}
          onDescriptionChange={handleTestDescription}
          onTestActive={handleTestActive}
          onTestSelectedOption={handleTestSelectedOption}
          tests={formData.tests}
          defaultOpen
        />
        <AnamnesisPreconsulta
          title={"Anamnesis"}
          onAnamnesisChange={handleAnamnesis}
          anamnesis={formData.anamnesis}
          defaultOpen
        />
        <TratamientoPreconsulta
          title={"Tratamiento"}
          onTratamientoChange={handleTratamientoDescription}
          tratamiento={formData.tratamiento}
          defaultOpen
        />
        <div className="flex justify-center p-6 bg-[#fafafc]">
          <Elboton
            nombre={"Guardar Cambios"}
            icon={<IconGuardar />}
            onPress={handleSubmit}
            disabled={disabledButton}
            size={"lg"}
            className={"bg-greenPrimary w-60 text-sm font-bold"}
          />
        </div>
      </div>
    </FormProvider>
  );
}
