"use client";

import Image from "next/image";
import Link from "next/link";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { ApiSegimed2 } from "@/Api/ApiSegimed2";
import { useEffect, useState } from "react";
import rutas from "@/utils/rutas";
import Cookies from "js-cookie";

import ruteActual from "../../../../../components/images/ruteActual.png";
import backChanges from "../../../../../components/images/backChanges.png";
import Consulta from "@/components/consulta/dataconsulta";
import InputConsulta from "@/components/consulta/inputconsulta";
import InputFile from "@/components/consulta/inputfile";
import SignosVitalesInfo from "@/components/consulta/signosvitales";

import config from "@/components/localData/localdata";
import InputDiagnostico from "@/components/consulta/inputDiagnostico";
import InputExam from "@/components/consulta/inputExam";

import Component from "@/components/consulta/inputCuerpo";
import { useForm, FormProvider } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import Elboton from "@/components/Buttons/Elboton";
//import IconList from "@/utils/IconsList";
import IconGuardar from "@/components/icons/iconGuardar";
import axios from "axios";


const DetallePaciente = (id) => {
  const userId = id.params.id;
  const data = {
    id: "14", // ID del registro
    patient: 8, // paciente
    appointmentSchedule: 4, // horario de la cita
    lackOfAir: true, // falta de aire
    lackOfAirAsAlways: false, // falta de aire como siempre
    lackOfAirIncremented: 1, // incremento de la falta de aire
    lackOfAirClasification: 1, // clasificación de la falta de aire
    chestPainAtRest: false, // dolor de pecho en reposo
    chestPainOnExertion: true, // dolor de pecho al esfuerzo
    chestPainOnExertionAmount: 1, // cantidad de dolor de pecho al esfuerzo
    edemaPresence: true, // presencia de edema
    edemaPresenceDescription: 1, // descripción de la presencia de edema
    feelings: 1, // sentimientos
    healthChanges: true, // cambios en la salud
    healthChangesDescription: "I feel bad :(", // descripción de los cambios en la salud
    healthWorsened: 1, // empeoramiento de la salud
    bodyPain: false, // dolor corporal
    mentalHealthAffected: true, // salud mental afectada
    mentalHealthAffectedDescription: "I feel overwhelmed", // descripción de la salud mental afectada
    energyStatus: 10, // estado de energía
    feed: 1, // alimentación
    hydrationStatus: 1, // estado de hidratación
    urineStatus: 1, // estado de la orina
    exerciseStatus: 1, // estado del ejercicio
    abnormalGlycemia: true, // glucemia anormal
    lastAbnormalGlycemia: [
      "526",
      "589",
      "600"
    ], // última glucemia anormal
    physicalExamination: "1", // examen físico
    laboratoryResults: [
      "https:cloudinary1",
      "https:cloudinary2"
    ], // resultados de laboratorio
    laboratoryResultsDescription: [
      "description1",
      "description2"
    ], // descripción de los resultados de laboratorio
    electrocardiogram: "https:cloudinary", // electrocardiograma
    electrocardiogramDescription: "decription electrocardiogram", // descripción del electrocardiograma
    rxThorax: "https:cloudinary", // radiografía de tórax
    echocardiogram: "https:cloudinary", // ecocardiograma
    walkTest: "https:cloudinary", // prueba de caminata
    respiratoryFunctional: "https:cloudinary", // función respiratoria
    tomographies: "https:cloudinary", // tomografías
    rightHeartCatheterization: "https:cloudinary", // cateterización del corazón derecho
    ccg: "https:cloudinary", // CCG
    resonance: "https:cloudinary", // resonancia
    leftHeartCatheterization: "https:cloudinary", // cateterización del corazón izquierdo
    otherStudies: [
      "other study 1",
      "other study 2"
    ], // otros estudios
    pendingStudies: "No one is pending :) Good patient", // estudios pendientes
    consultationReason: "Dolor de cabeza :(", // razón de la consulta
    importantSymptoms: "Dolor de cabeza muy fuerte por 2 días :(", // síntomas importantes
    currentMedications: [
      "medicamento1",
      "medicamento2",
      "medicamento3"
    ], // medicamentos actuales
    appointment_schedule: 4, // horario de la cita
    physical_examination: "1", // examen físico
    ProvisionalPreConsultationSchedule: {
      id: 4, // ID del programa de pre-consulta provisional
      patient: 8, // paciente
      physician: 4, // médico
      medicalSpecialty: 3, // especialidad médica
      scheduledStartTimestamp: "2024-05-09T18:00:30.509Z", // inicio programado de la cita
      scheduledEndTimestamp: "2024-05-09T18:20:43.904Z", // fin programado de la cita
      actualEndTimestamp: "2024-05-09T18:30:30.509Z", // fin real de la cita
      actualStartTimestamp: "2024-05-09T18:00:30.509Z", // inicio real de la cita
      schedulingStatus: 3, // estado de la programación
      typeOfMedicalConsultation: 2, // tipo de consulta médica
      reasonForConsultation: "Dolor de cabeza", // razón de la consulta
      healthCenter: 1, // centro de salud
      medical_specialty: 3, // especialidad médica
      scheduling_status: 3, // estado de la programación
      vitalSignDetailsScheduling: [
        {
          i: "71", // detalles de los signos vitales - índice
          p: 8, // detalles de los signos vitales - pulso
          m: 15, // detalles de los signos vitales - medida
          s: 4 // detalles de los signos vitales - estado
        }
      ]
    }
  };
  const [patient, setPatient] = useState();
  const [preconsult, setPreconsult] = useState();

  const methods = useForm();
  const formState = useAppSelector((state) => state.formSlice.selectedOptions);
  const onSubmit = (data) => console.log(data);

  console.log(patient);
  console.log(preconsult);
  useEffect(() => {
    const headers = config.headers;
    const token = Cookies.get("a");
    const fetchData = async () => {
      
      try {

        const [response1, response2] = await Promise.all([
          ApiSegimed.get(`/patient-details?id=${userId}`, {headers: { token: token },}),  
          ApiSegimed2.get(`/get-all-pateint-preconsultation?patientId=8`,{headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpZE51bWJlciI6IjQyMTE5ODU2IiwidXNlcklkVHlwZSI6IkROSSIsIm5hbWUiOiJTYW50aWFnbyIsImxhc3RuYW1lIjoiUGF6Iiwicm9sZSI6Ik3DqWRpY28iLCJ2ZXJpZmllZCI6dHJ1ZSwiYXZhdGFyIjoiaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9keWExZWtrZDUvaW1hZ2UvdXBsb2FkL3YxNzE5NTM4NTEwL25teDBzd2d3OXZwa250aXJzejI1LmF2aWYiLCJjZWxscGhvbmUiOiIyMjM1NzgxMzY5IiwiZW1haWwiOiJzYW50aXBhejEyQGdtYWlsLmNvbSIsIm5hdGlvbmFsaXR5IjoiQ29sb21iaWFuYSIsImxhc3RMb2dpbiI6IjIwMjQtMDYtMjhUMTU6MTM6MjMuMDAwWiIsImlhdCI6MTcxOTU4OTgwNiwiZXhwIjoxNzIwMTk0NjA2fQ._D5vWvsycHo9taYksesc82caWv9m9O7z3tTybHeIjrY" },}),
        ]);
        console.log(response1.data);
        console.log(response2.data);

        // Crear una promesa que se resuelve después de 1 segundo
        const delay = new Promise((resolve) => setTimeout(resolve, 100));

        // Esperar el delay
        await delay;
    
        setPreconsult(response2.data[0]);
        setPatient(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function handleSave(){
    const data = ApiSegimed.patch(`/update-patient?id=${userId}`, {headers: { token: token },})
    console.log(data);
  }
  if (!userId) {
    return <div>Cargando...</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center gap-2 px-4 py-3 border-b border-b-[#cecece]">
          <div className="flex items-center ">
            <Image src={ruteActual} alt="ruta actual" />
            <p className="text-lg font-normal leading-6 text-[#5F5F5F] ">
              Detalle de consulta
            </p>
          </div>
          <div>
            <Link href={`${rutas.Doctor}${rutas.Historial}`}>
              <button className="flex rounded-xl items-center  px-6 py-2 font-bold text-sm leading-5 bg-[#487FFA] text-white gap-1 ">
                <Image src={backChanges} alt="regresar" />
                Regresar
              </button>
            </Link>
          </div>
        </div>
        <form onChange={methods.handleSubmit(onSubmit)}>
          <Consulta title={"Datos del paciente"} paciente={patient} />
          <InputConsulta
            title={"Antecedentes"}
            risk={["Riesgo cardiovascular", "Riesgo quirúrgico"]}
            riskGroup={["Grupo HTP"]}
            groupHTP={["I", "II", "III", "IV", "V"]}
            options={["Bajo", "Medio", "Alto", " Muy Alto"]}
            subtitle={[
              "Antecedentes quirúrgicos",
              "Antecedentes patologicos",
              "Antecedentes no patologicos",
              "Antecedentes familiares",
              "Antecedentes de infancia",
              "Alergias",
              "Medicamentos actuales",
              "Vacunas",
            ]}
            paciente={patient}
          />
          <InputConsulta
            title={"Anamnesis"}
            subtitle={[
              "Motivo de consulta",
              "Evolucion de la enfermedad",
              "Sintomas importantes",
            ]}
            
            preconsult={preconsult}
          />
          <SignosVitalesInfo title={"Signos vitales"} paciente={patient} preconsult={preconsult} />
          <Component title={"Exploracion fisica"} />
          <InputExam title={"Examen fisico"} />
          {/*<InputConsulta title={"Comentarios"} subtitle={["Anotaciones"]} />*/}
          <InputFile title={"Estudios"} Links={data} />
          <InputConsulta
            title={"Evolucion"}
            subtitle={["Anotaciones de la consulta"]}
          />
          <InputDiagnostico
            title={"Diagnósticos y tratamiento"}
            subtitle={[
              "Conducta terapeutica",
              "Medicamentos",
              "Procedimientos",
            ]}
            subtitle2={["Diagnostico", "Medicamento", "Procedimiento"]}
          />
        </form>
        <div className="flex justify-center m-6">
          <Elboton
            nombre={"Guardar Cambios"}
            icon={<IconGuardar />}
            onPress={handleSave}
            size={"lg"}
            className={"bg-tertiary w-60 text-sm font-bold"}
          />
        </div>
      {/*<IconList />*/}
      </div>
    </FormProvider>
  );
};

export default DetallePaciente;
