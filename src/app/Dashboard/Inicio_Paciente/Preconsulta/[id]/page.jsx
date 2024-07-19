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
  updateActive,
  subquestionSelectedOption,
  questionSelectedOption,
  updateDescription,
  updateVitalSign,
  updateAnamnesis,
  updateTratamiento,
  updateBodyPainLevel,
} from "@/redux/slices/user/preconsultaFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SignosVitales from "@/components/preconsulta/signosVitales";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";
import AnamnesisPreconsulta from "@/components/preconsulta/Anamnesis";
import TratamientoPreconsulta from "@/components/preconsulta/Tratamiento";

export default function PreconsultaPte({ params }) {
  const dispatch = useAppDispatch();
  const scheduleId = params.id;
  const token = Cookies.get("a");
  const patientId = Cookies.get("c");
  const [tests, setTests] = useState({
    abnormalGlycemia: {
      title: "Glicemia anormal",
      binaryOptions: true,
      description: '',
      active: null,
    },
    lastAbnormalGlycemia: {
      title: "Última glicemia anormal",
      selectedOption: null,
      description: '',
      active: null,
    },
    laboratoryResults: {
      title: "Resultados de laboratorio",
      file: null,
      description: '',
      active: null,
    },
    electrocardiogram: {
      title: "Electrocardiograma",
      file: null,
      description: '',
      active: null,
    },
    rxThorax: {
      title: "RX de Torax",
      file: null,
      description: '',
      active: null,
    },
    echocardiogram: {
      title: "Ecocardiograma",
      file: null,
      description: '',
      active: null,
    },
    walkTest: {
      title: "Test de caminata",
      file: null,
      description: '',
      active: null,
    },
    respiratoryFunctional: {
      title: "Funcional respiratorio",
      file: null,
      description: '',
      active: null,
    },
    tomographies: {
      title: "Tomografías",
      file: null,
      description: '',
      active: null,
    },
    rightHeartCatheterization: {
      title: "Cateterismo cardiaco derecho",
      file: null,
      description: '',
      active: null,
    },
    ccg: {
      title: "CCG (Coronariografia)",
      file: null,
      description: '',
      active: null,
    },
    resonance: {
      title: "Resonancia",
      file: null,
      description: '',
      active: null,
    },
    leftHeartCatheterization: {
      title: "Cateterismo cardiaco izquierdo",
      file: null,
      description: '',
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
  const formData = useAppSelector((state) => state.preconsultaForm.formData);

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

  const handleVitalSign = (vitalSign, value) => {
    dispatch(updateVitalSign({ vitalSign, value, number: Number(patientId), schedulingId: Number(scheduleId) })); // actualizamos los signos vitales en el estado global
  };

  const handleAnamnesis = (field, description) => {
    dispatch(updateAnamnesis({ field, description })); // actualizamos la descripción de la anamnesis en el estado global
  };

  const handleUploadTestFile = (test, file) => {
    // almacenamos los archivos subidos, en un estado local ya que en Redux no son compatible
    const studies = tests;
    setTests({ ...studies, [test]: { ...studies[test], file: file } });
  };

  const handleTestDescription = (test, testDescription) => {
    // almacenamos la descripción del estudio
    const studies = tests;
    setTests({
      ...studies,
      [test]: { ...studies[test], description: testDescription },
    });
  };

  const handleTestActive = (test, active) => {
    // para los campos binarios
    const studies = tests;
    setTests({ ...studies, [test]: { ...studies[test], active: active } });
  };

  const handleTestSelectedOption = (test, value) => {
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
    const bodyOBJFormat = {
      painOwnerId: Number(patientId),
      schedulingId: Number(scheduleId),
      medicalEventId: null,
      isTherePain: formData.bodySection.isTherePain,
      painDurationId: formData.bodySection.painDuration,
      painScaleId: formData.bodySection.painScale,
      painTypeId: formData.bodySection.painType,
      painAreas: formData.bodySection.painAreas ? Object.values(formData.bodySection.painAreas) : null,
      painFrequencyId: formData.bodySection.painFrequency,
      isTakingAnalgesic: formData.bodySection.isTakingAnalgesic,
      doesAnalgesicWorks: formData.bodySection.doesAnalgesicWorks,
      isWorstPainEver: formData.bodySection.isWorstPainEver,
    }
    const bodyForm = {
      patient: Number(patientId),
      appointmentSchedule: Number(scheduleId),
      // Questions
      lackOfAir: formData.questions.lackOfAir.active,
      lackOfAirIncremented:
        formData.questions.lackOfAir.subquestions.lackOfAirIncremented
          .selectedOption,
      lackOfAirClasification:
        formData.questions.lackOfAir.subquestions.lackOfAirClasification
          .selectedOption,
      chestPainAtRest: formData.questions.chestPainAtRest.active,
      chestPainOnExertion: formData.questions.chestPainOnExertion.active,
      chestPainOnExertionAmount:
        formData.questions.chestPainOnExertion.subquestions
          .chestPainOnExertionAmount.selectedOption,
      edemaPresence: formData.questions.edemaPresence.active,
      edemaPresenceDescription:
        formData.questions.edemaPresence.subquestions.edemaPresenceDescription
          .selectedOption,
      feelings: formData.questions.feelings.selectedOption,
      healthChanges: formData.questions.healthChanges.active,
      healthChangesDescription: formData.questions.healthChanges.description,
      healthWorsened: formData.questions.healthWorsened.selectedOption,
      mentalHealthAffected: formData.questions.mentalHealthAffected.active,
      mentalHealthAffectedDescription:
        formData.questions.mentalHealthAffected.description,
      energyStatus: formData.questions.energyStatus.selectedOption,
      feed: formData.questions.feed.selectedOption,
      hydrationStatus: formData.questions.hydrationStatus.selectedOption,
      urineStatus: formData.questions.urineStatus.selectedOption,
      exerciseStatus: formData.questions.exerciseStatus.selectedOption,
      // Estudios
      abnormalGlycemia: tests.abnormalGlycemia.active,
      lastAbnormalGlycemia: tests.lastAbnormalGlycemia.selectedOption,
      // physicalExamination: tests.physicalExamination.file,
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
      currentMedications: formData.tratamiento.currentMedications?.selectedOptions ? Object.values(formData.tratamiento.currentMedications.selectedOptions) : null,
      // Signos vitales
      vitalSignsToCreate: Object.values(formData.vitalSigns),
      // painRecordsToCreate
      painRecordsToCreate: [bodyOBJFormat],
    };
    console.log(bodyForm);
    try {
      if (!bodyForm) {
        console.error("No form data to submit");
        return;
      }
      const response = await ApiSegimed.post(`/pre-consultation`, bodyForm, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    const getPreConsultation = async () => {
      try {
        const res = await ApiSegimed.get(
          `/get-all-pateint-preconsultation?patientId=${patientId}`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (res) {
          console.log({ preConsultationLength: res.data.length });
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    // getPreConsultation();
  }, []);

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
        {Object.keys(formData.questions).map((question, index) => (
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
          defaultOpen
        />
        <InputFilePreconsultation
          title={"Estudios"}
          onUploadFile={handleUploadTestFile}
          onDescriptionChange={handleTestDescription}
          onTestActive={handleTestActive}
          onTestSelectedOption={handleTestSelectedOption}
          tests={tests}
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
        <button
          className="bg-[#0A6EAA] mt-4 w-1/5 mx-auto text-white text-lg font-bold rounded-lg px-2 py-4"
          onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </FormProvider>
  );
}
