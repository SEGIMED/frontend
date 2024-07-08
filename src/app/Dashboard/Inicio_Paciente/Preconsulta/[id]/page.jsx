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
import { Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SignosVitales from "@/components/preconsulta/signosVitales";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";
import AnamnesisPreconsulta from "@/components/preconsulta/Anamnesis";
import TratamientoPreconsulta from "@/components/preconsulta/Tratamiento";

export default function PreconsultaPte({ params }) {
  const dispatch = useAppDispatch();
  const scheduleId = params.id
  const token = Cookies.get('a');
  const patientId = Cookies.get('c');
  const [tests, setTests] = useState({
    abnormalGlycemia: {
      title: 'Glicemia anormal',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    lastAbnormalGlycemia: {
      title: 'Última glicemia anormal',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    physicalExamination: {
      title: 'Examen físico',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    laboratoryResults: {
      title: 'Resultados de laboratorio',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    electrocardiogram: {
      title: 'Electrocardiograma',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    rxThorax: {
      title: 'RX de Torax',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    echocardiogram: {
      title: 'Ecocardiograma',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    walkTest: {
      title: 'Test de caminata',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    respiratoryFunctional: {
      title: 'Funcional respiratorio',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    tomographies: {
      title: 'Tomografías',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    rightHeartCatheterization: {
      title: 'Cateterismo cardiaco derecho',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    ccg: {
      title: 'CCG (Coronariografia)',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    resonance: {
      title: 'Resonancia',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    leftHeartCatheterization: {
      title: 'Cateterismo cardiaco izquierdo',
      file: "https:cloudinary",
      description: '',
      active: false,
    },
    otherStudies: {
      title: 'Otros estudios',
      description: ''
    },
    pendingStudies: {
      title: 'Estudios pendientes',
      description: "No one is pending :) Good patient"
    },
  },);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);

  const handleQuestionActive = (question, active) => {
    dispatch(updateActive({ question, active })); // activamos o desactivamos las subpreguntas
  };

  const handleSubquestionOption = (question, subquestion, selectedOption) => {
    dispatch(subquestionSelectedOption({ question, subquestion, selectedOption })); // guardamos la opción seleccionada de la subpregunta
  };

  const handleQuestionOption = (question, selectedOption) => {
    dispatch(questionSelectedOption({ question, selectedOption })); // guardamos la opción seleccionada
  };

  const handleDescription = (question, description) => {
    dispatch(updateDescription({ question, description })); // guardamos la descripción proporcionada
  };

  const handleVitalSign = (vitalSign, value) => {
    dispatch(updateVitalSign({ vitalSign, value })); // actualizamos los signos vitales en el estado global
  };

  const handleAnamnesis = (field, description) => {
    dispatch(updateAnamnesis({ field, description })); // actualizamos la descripción de la anamnesis en el estado global
  };

  const handleUploadTestFile = (test, file) => {
    // almacenamos los archivos subidos, en un estado local ya que en Redux no son compatible
    const studies = tests;
    setTests({ ...studies, [test]: { ...studies[test], file: file } });
  }

  const handleTestDescription = (test, testDescription) => {
    // almacenamos la descripción del estudio
    const studies = tests;
    setTests({ ...studies, [test]: { ...studies[test], description: testDescription } });
  };

  const handleTratamientoDescription = (field, item, description) => {
    dispatch(updateTratamiento({ field, item, description })); // almacenamos los distintos tratamientos en el estado global
  };

  const handleBodyChange = (name, value) => {
    dispatch(updateBodyPainLevel({ name, option: value }));
  };

  const methods = useForm();

  const handleSubmit = async (event) => {
    console.log({ ...formData, patient: patientId, appointmentSchedule: scheduleId, tests });
    /* event.preventDefault();
    try {
      if (!formData) { // si esque no se cargaron las preguntas del formulario o el paciente no seleccionó nada
        console.error('No form data to submit');
        return;
      }
      const response = await ApiSegimed.post(`/pre-consultation`, { ...formData, tests }, {
        headers: {
          token: token,
          'Content-Type': 'application/json'
        }
      });
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } */
  };

  useEffect(() => {
    const getPreConsultation = async () => {
      try {
        const res = await ApiSegimed.get(`/get-all-pateint-preconsultation?patientId=${patientId}`, {
          headers: {
            token: token,
          }
        });
        if (res) {
          console.log({ preConsultationLength: res.data.length });
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    // getPreConsultation();
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-[50%] gap-5">
        <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] ">
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
