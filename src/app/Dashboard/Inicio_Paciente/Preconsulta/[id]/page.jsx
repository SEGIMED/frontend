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
import rutas from "@/utils/rutas";
import {
  updateField,
  updateSubquestion,
} from "@/redux/slices/user/preconsultaFormSlice";
import { Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SignosVitales from "@/components/preconsulta/signosVitales";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";

export default function PreconsultaPte({ params }) {
  const dispatch = useAppDispatch();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data", formData);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
  };
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-[50%]">
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
