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
  const [patient, setPatient] = useState();
  const [preconsult, setPreconsult] = useState();
  const [physicalExamination, setPhysicalExamination] = useState();
  const [background, setBackground] = useState();
  const [diagnostic, setDiagnostic] = useState();
  const [medicalIndications, setMedicalIndications] = useState();
  const [drugPrescription, setDrugPrescription] = useState();
  const [procedurePrescription, setProcedurePrescription] = useState();
  const [terapy, setTerapy] = useState();
  const [selectedRisk, setSelectedRisk] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  
  const methods = useForm();
  const formState = useAppSelector((state) => state.formSlice.selectedOptions);

  const onSubmit = (data) => {
    console.log(data);
    setBackground({
      id: patient.backgrounds.id,
      allergicBackground: data["Alergias"],
      familyBackground: data["Antecedentes familiares"],
      medicalEvent: data["Anotaciones de la consulta"],
      nonPathologicBackground: data["Antecedentes no patologicos"],
      pathologicBackground: data["Antecedentes patologicos"],
      pediatricBackground: data["Antecedentes de infancia"],
      pharmacologicalBackground: data["Medicamentos actuales"],
      surgicalBackground: data["Antecedentes quirúrgicos"],
      vaccinationBackground: data["Vacunas"]
    })
    setPhysicalExamination({
    physicalSubsystemId:2 , /// data["selectSubsistema"],
    description: data["inputSubsistema"],
    medicalEventId: 5 /// id del medical event
    })
    setDiagnostic({
    patientId:8,  /// id del paciente 
    diseaseId:3,  /// id de la enferemedad ---> (hipertension pulmonar) referenciada catalogo disease
    diagnosticNotes: data["Diagnostico"],
    medicalEventId :5
    })
    setMedicalIndications({
    patientId: 8,
    description: data["Tratamientos no farmacológicos"],
    medicalEventId:5
    })
    setProcedurePrescription({
    patientId: 8,
    medicalProcedureId: 4,
    medicalEvent: 5
    })
    setDrugPrescription({
    diagnosticNotes: data["Procedimientos"],
    patientId: 8,  /// ID del paciente
    drugId: 1, // id del medicamento ---> (Losartan) referenciado en el catalogo drug 
    prescribedDose: data["Medicamentos"],
    quantity: 60, // cantidad de tabletas etc
    medicalEventId : 5
    })

    setTerapy({
    patientId: 8,
    therapyId: 2,
    description: data["Conducta terapeutica"],
    quantity: 10,
    medicalEvent: 2
    })

  }
  
  console.log(background);
  console.log(patient);
  console.log(preconsult);
  useEffect(() => {
    const headers = config.headers;
    const token = Cookies.get("a");
    const fetchData = async () => {

      try {

        const [response1, response2, response3] = await Promise.all([
          ApiSegimed.get(`/patient-details?id=${userId}`, {headers: { token: token },}),  
          ApiSegimed2.get(`/get-all-pateint-preconsultation?patientId=8`,{headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpZE51bWJlciI6IjQyMTE5ODU2IiwidXNlcklkVHlwZSI6IkROSSIsIm5hbWUiOiJTYW50aWFnbyIsImxhc3RuYW1lIjoiUGF6Iiwicm9sZSI6Ik3DqWRpY28iLCJ2ZXJpZmllZCI6dHJ1ZSwiYXZhdGFyIjoiaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9keWExZWtrZDUvaW1hZ2UvdXBsb2FkL3YxNzE5NTM4NTEwL25teDBzd2d3OXZwa250aXJzejI1LmF2aWYiLCJjZWxscGhvbmUiOiIyMjM1NzgxMzY5IiwiZW1haWwiOiJzYW50aXBhejEyQGdtYWlsLmNvbSIsIm5hdGlvbmFsaXR5IjoiQ29sb21iaWFuYSIsImxhc3RMb2dpbiI6IjIwMjQtMDYtMjhUMTU6MTM6MjMuMDAwWiIsImlhdCI6MTcxOTU4OTgwNiwiZXhwIjoxNzIwMTk0NjA2fQ._D5vWvsycHo9taYksesc82caWv9m9O7z3tTybHeIjrY" },}),
          //ApiSegimed.get(`/vital-signs/create-vital-sign?id=${userId}`, {headers: { token: token },}),
        ]);
        console.log(response1.data);
        console.log(response2.data);
        //console.log(response3.data);
    
        setPreconsult(response2.data[0]);
        setPatient(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSave = async() =>{
    const token = Cookies.get("a");

    if(patient.backgrounds.length === 0){
      const data = await ApiSegimed.post(`/backgrounds/update-backgrounds`,{background}, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/backgrounds/update-backgrounds?id=${userId}`,{background}, {headers: { token: token },})
      console.log(data);
    }
    const response1 = await ApiSegimed.post(`/patient-physical-examination`,physicalExamination, {headers: { token: token },})
    console.log(response1);

    const response2 = await ApiSegimed.post(`/patient-diagnostic`,diagnostic, {headers: { token: token },})
    console.log(response2);  

    const response3 = await ApiSegimed.post(`/medical-indications/new-indication`,medicalIndications, {headers: { token: token },})
    console.log(response3);  
   
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
            options={["Bajo", "Moderado", "Alto", " Muy Alto"]}
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
            onRiskChange={setSelectedRisk}
            onGroupChange={setSelectedGroup}
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
          <InputFile title={"Estudios"} Links={preconsult} />
          <InputConsulta
            title={"Evolucion"}
            subtitle={["Anotaciones de la consulta"]}
          />
          <InputDiagnostico
            title={"Diagnósticos y tratamiento"}
            subtitle={[
              "Conducta terapeutica",
              "Tratamientos no farmacológicos",
              "Pauta de alarma",
            ]}
            subtitle2={["Diagnostico", "Medicamentos", "Procedimientos",]}
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
