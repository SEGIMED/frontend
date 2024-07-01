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
  const [background, setBackground] = useState();
  const [diagnostic, setDiagnostic] = useState();

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

    setDiagnostic({
      diagnostic: data.Diagnostico,
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
  const handleSave = async() =>{
    const token = Cookies.get("a");
    console.log(background);
    if(patient.backgrounds.length === 0){
      const data = await ApiSegimed.post(`/backgrounds/update-backgrounds`,{background}, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/backgrounds/update-backgrounds?id=${userId}`,{background}, {headers: { token: token },})
      console.log(data);
    }
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
          <InputFile title={"Estudios"} Links={preconsult} />
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
