"use client";

import Elboton from "@/components/Buttons/Elboton";
import InputDiagnostico from "@/components/consulta/inputDiagnostico";
import InputConsulta from "@/components/consulta/inputconsulta";
import InputFile from "@/components/consulta/inputfile";
import IconRegresar from "@/components/icons/iconRegresar";
import PreconsultaQuestion from "@/components/preconsulta/PreconsultaQuestion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  updateField,
  updateSubquestion,
} from "@/redux/slices/user/preconsultaFormSlice";
import { Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SignosVitales from "@/components/preconsulta/signosVitales";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function PreconsultaPte({ params }) {
  const dispatch = useAppDispatch();
  const scheduleId = params.id
  const token = Cookies.get('a');
  const patientId = Cookies.get('c');
  const [preConsultationQuestions, setPreConsultationQuestions] = useState(null);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);
  const handleQuestionChange = (sectionIndex, field, value) => {
    dispatch(updateField({ sectionIndex, field, value }));
  };
  console.log(useAppSelector((state) => state.preconsultaForm));
  const handleSubquestionChange = (
    sectionIndex,
    subquestionIndex,
    field,
    value
  ) => {
    dispatch(
      updateSubquestion({ sectionIndex, subquestionIndex, field, value })
    );
  };

  const methods = useForm();
  // function transformFormData(formData) {
  //   const transformedData = {
  //     patient: 8, // Presumed static value; replace with dynamic data if necessary
  //     appointmentSchedule: 4, // Presumed static value; replace as needed
  //   };

  //   // Iterate through the questions array within the formData object
  //   formData.questions.forEach((question) => {
  //     // Handle the main question fields based on 'active' status
  //     if (question.field !== undefined) {
  //       if (question.active && question.selectedOption !== null) {
  //         transformedData[question.field] =
  //           question.selectedOption === 0 ? false : true;
  //       } else if (question.active && question.selectedOption === null) {
  //         transformedData[question.field] = true;
  //       } else {
  //         transformedData[question.field] = false;
  //       }
  //     }

  //     // Handle subquestions if any
  //     question.subquestions?.forEach((subquestion) => {
  //       if (subquestion.field !== undefined) {
  //         if (question.active && subquestion.selectedOption !== null) {
  //           // Assume that the subquestion's 'selectedOption' directly gives us the needed index or boolean value
  //           transformedData[subquestion.field] = subquestion.selectedOption;
  //         } else {
  //           transformedData[subquestion.field] = false; // Set to false if parent question is not active or no option selected
  //         }
  //       }
  //     });
  //   });

  //   // Return the transformed data which now includes fields set based on 'active' status and selected options
  //   return transformedData;
  // }
  // const handleSelectOption = (index) => {
  //   const newQuestionsData = [...questionsData];
  //   newQuestionsData[index].selectedOption =
  //     !newQuestionsData[index].selectedOption;
  //   setQuestionsData(newQuestionsData);
  // };

  // const handleShowOptions = (title, value) => {
  //   const newQuestionsData = [...questionsData];
  //   const index = newQuestionsData.findIndex(
  //     (question) => question.title === title
  //   );
  //   newQuestionsData[index].showOptions = value;
  //   setQuestionsData(newQuestionsData);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    try {
      if (!formData || !preConsultationQuestions) { // si esque no se cargaron las preguntas del formulario o el paciente no seleccionó nada
        console.error('No form data to submit');
        return;
      }
      const formDataBody = {
        patient: patientId,
        appointmentSchedule: scheduleId,
        // Questions
        lackOfAir: preConsultationQuestions.lackOfAir.active,
        lackOfAirAsAlways: false, // quedó obsoleto
        lackOfAirIncremented: preConsultationQuestions.lackOfAir.subquestions[0].selectedOption,
        lackOfAirClasification: preConsultationQuestions.lackOfAir.subquestions[1].selectedOption,
        chestPainAtRest: preConsultationQuestions.chestPainAtRest.active,
        chestPainOnExertion: preConsultationQuestions.chestPainOnExertion.active,
        chestPainOnExertionAmount: preConsultationQuestions.chestPainOnExertion.selectedOption,
        edemaPresence: preConsultationQuestions.edemaPresence.active,
        edemaPresenceDescription: preConsultationQuestions.edemaPresence.selectedOption,
        feelings: preConsultationQuestions.feelings.selectedOption,
        healthChanges: preConsultationQuestions.healthChanges.active,
        healthChangesDescription: preConsultationQuestions.healthChanges.text,
        healthWorsened: preConsultationQuestions.healthWorsened.selectedOption,
        bodyPain: preConsultationQuestions.bodyPain.active,
        mentalHealthAffected: preConsultationQuestions.mentalHealthAffected.active,
        mentalHealthAffectedDescription: preConsultationQuestions.mentalHealthAffected.text,
        energyStatus: preConsultationQuestions.energyStatus.selectedOption,
        feed: preConsultationQuestions.feed.selectedOption,
        hydrationStatus: preConsultationQuestions.hydrationStatus.selectedOption,
        urineStatus: preConsultationQuestions.urineStatus.selectedOption,
        exerciseStatus: preConsultationQuestions.exerciseStatus.selectedOption,
        //
        /* abnormalGlycemia: true,
        lastAbnormalGlycemia: [526, 589, 600],
        physicalExamination: 1,
        laboratoryResults: [
          "https:cloudinary1",
          "https:cloudinary2"],
        laboratoryResultsDescription: [
          "description1",
          "description2"],
        electrocardiogram: "https:cloudinary",
        electrocardiogramDescription: "decription electrocardiogram",
        rxThorax: "https:cloudinary",
        echocardiogram: "https:cloudinary",
        walkTest: "https:cloudinary",
        respiratoryFunctional: "https:cloudinary",
        tomographies: "https:cloudinary",
        rightHeartCatheterization: "https:cloudinary",
        ccg: "https:cloudinary",
        resonance: "https:cloudinary",
        leftHeartCatheterization: "https:cloudinary",
        otherStudies: [
          "other study 1",
          "other study 2"
        ],
        pendingStudies: "No one is pending :) Good patient",
        consultationReason: "Dolor de cabeza :(",
        importantSymptoms: "Dolor de cabeza muy fuerte por 2 días :(",
        currentMedications: [
          "medicamento1",
          "medicamento2",
          "medicamento3"
        ], */
      }
      console.log(formDataBody);
      /* const response = await ApiSegimed.post(`/pre-consultation`, formDataBody, {
        headers: {
          token: token,
          'Content-Type': 'application/json'
        }
      }); */
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  /* useEffect(() => {
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
    const questionList = () => {
      let object = {};
      formData?.questions.forEach(question => {
        object = { ...object, [question.field]: question };
      });
      setPreConsultationQuestions(object);
    }
    questionList();
    getPreConsultation();
  }, []);
  console.log(preConsultationQuestions); */

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-[50%]">
        <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] ">
          <div className="md:w-1/2">
            <Link href={``}>
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
        {formData.questions.map((section, sectionIndex) => (
          <PreconsultaQuestion
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            onQuestionChange={handleQuestionChange}
            onSubquestionChange={handleSubquestionChange}
          />
        ))}
        <SignosVitales
          title={"Signos vitales"}
          paciente={null}
          vitalSigns={formData?.vitalSigns}
          defaultOpen
        />
        <InputCuerpoPre title={"Exploracion fisica"} defaultOpen />
        {/* <InputFile title={"Estudios"} defaultOpen /> */}
        <InputConsulta
          title={"Anamnesis"}
          subtitle={["Motivo de consulta", "Sintomas"]}
          defaultOpen
        />
        <InputDiagnostico
          title={"Tratamiento"}
          subtitle={["Medicamentos"]}
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
