"use client";

import Image from "next/image";
import Link from "next/link";
import { ApiSegimed } from "@/Api/ApiSegimed";
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
import IconGuardar from "@/components/icons/iconGuardar";
import LoadingFallback from "@/components/loading/loading";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


const DetallePaciente = (id) => {
  const [loading, setLoading] = useState(false);
  const userId = id.params.id;
  const [patient, setPatient] = useState();
  const [preconsult, setPreconsult] = useState();
  const [physicalExamination, setPhysicalExamination] = useState({
    physicalSubsystemId:null,
    description: "",
    medicalEventId: null
    });
  const [vitalSigns, setVitalSigns] = useState();
  const [cardiovascularRisk, setCardiovascularRisk] = useState();
  const [surgicalRisk, setSurgicalRisk] = useState();
  const [hpGroup, setHpGroup] = useState();
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
  const router = useRouter();
  const onSubmit = (data) => {
    console.log(data);
    console.log(selectedRisk);
    console.log(physicalExamination);
    setCardiovascularRisk({
      patientId: userId, // id del paciente
      riskId: 1  //// id a actualizar el riesgo cardiovascular del catalogo  cardiovascular risk
    })
    setSurgicalRisk({
      patientId: userId, // id del paciente
      surgicalRiskId: 3 //// id a actualizar del riesgo quirurgico del catalogo cat surgycal risk 
    })
    setHpGroup({
      patientId: userId,  /// id del paciente 
      hpGroupId: 3 //// id del grupo a actualizar --> obtenido del cat pulmonary hypertension group 
    })
    setBackground({
      id: patient?.backgrounds?.id || null,
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

    setVitalSigns([{
      patientId: userId, // id del paciente
      measureType: 7, // id del parametro "frecuencia cardiaca" en el catalogo vital signs
      measure: data["Presión Arterial Diastólica"], // medida introducida por el médico o paciente,
      schedulingId:null , /// id del scheduling si se crea en preconsulta
      medicalEventId:4 /// id del medical event si se crea durante medical event
    },
    {
      patientId: userId, 
      measureType: 7, 
      measure: data["Presión Arterial Sistólica"], 
      schedulingId:null , 
      medicalEventId:4 
    },
    {
      patientId: userId, 
      measureType: 7, 
      measure: data["Saturación de Oxígeno"], 
      schedulingId:null , 
      medicalEventId:4
    },
    {
      patientId: userId,
      measureType: 7, 
      measure: data["Temperatura"], 
      schedulingId:null , 
      medicalEventId:4 
    },
    {
      patientId: userId, 
      measureType: 7, 
      measure: data["Frecuencia Respiratoria"],
      schedulingId:null , 
      medicalEventId:4 
    },
    {
      patientId: userId,
      measureType: 7, 
      measure: data["Frecuencia Cardiaca"],
      schedulingId:null , 
      medicalEventId:4 
    }])
    setPhysicalExamination({
    physicalSubsystemId:2 , /// data["selectSubsistema"],
    description: data["inputSubsistema"] ? data["inputSubsistema"] : "",
    medicalEventId: 5 /// id del medical event
    })
    setDiagnostic({
    patientId: userId,  /// id del paciente 
    diseaseId:3,  /// id de la enferemedad ---> (hipertension pulmonar) referenciada catalogo disease
    diagnosticNotes: data["Diagnostico"],
    medicalEventId:5
    })
    setMedicalIndications({
    patientId: userId,
    description: data["Tratamientos no farmacológicos"],
    medicalEventId:5
    })
    setProcedurePrescription({
    patientId: userId,
    medicalProcedureId: 4,
    medicalEvent: 5
    //diagnosticNotes: data["Procedimientos"],
    })
    setDrugPrescription({
    patientId: userId,  /// ID del paciente
    drugId: 1, // id del medicamento ---> (Losartan) referenciado en el catalogo drug 
    prescribedDose: data["Medicamentos"],
    quantity: 60, // cantidad de tabletas etc
    medicalEventId : 5
    })
    setTerapy({
    patientId: userId,
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
          ApiSegimed.get(`/get-all-pateint-preconsultation?patientId=${userId}`,{headers: { token: token },}),
        ]);
        console.log(response1.data);
        console.log(response2.data);
    
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
    setLoading(true);
    if(patient?.backgrounds?.length === 0){
      const data = await ApiSegimed.post(`/backgrounds/update-backgrounds`,{background}, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/backgrounds/update-backgrounds?id=${userId}`,{background}, {headers: { token: token },})
      console.log(data);
    }
    
    if(patient?.patientCardiovascularRisks[0]?.length === 0){
      const data = await ApiSegimed.post(`/patient-new-cardiovascular-risk`,{cardiovascularRisk}, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/patient-update-cardiovascular-risk`,{cardiovascularRisk}, {headers: { token: token },})
      console.log(data);
    }

    if(patient?.patientSurgicalRisks[0]?.length === 0){
      const data = await ApiSegimed.post(`/patient-new-surgical-risk`,{surgicalRisk}, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/patient-update-surgical-risk`,{surgicalRisk}, {headers: { token: token },})
      console.log(data);
    }

    if(patient?.patientPulmonaryHypertensionGroups[0]?.length === 0){
      const data = await ApiSegimed.post(`/patient-new-hp-group`,{hpGroup}, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/patient-update-hp-group`,{hpGroup}, {headers: { token: token },})
      console.log(data);
    }

    /*if(patient.vitalSigns.length === 0){
      const data = await ApiSegimed.post(`/vital-signs/create-vital-sign`,vitalSigns, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/vital-signs/update-vital-sign`,vitalSigns, {headers: { token: token },})
      console.log(data);
    }*/
    /*let response1;
    if(physicalExamination?.description === ""){
      response1 = await ApiSegimed.post(`/patient-physical-examination`,physicalExamination, {headers: { token: token },})
    }else {
    response1 = await ApiSegimed.patch(`/patient-physical-examination?id=${userId}`,physicalExamination, {headers: { token: token },})
    }
    console.log(response1);*/



    
    const response2 = await ApiSegimed.post(`/patient-diagnostic`,diagnostic, {headers: { token: token },})
    console.log(response2);

    const response3 = await ApiSegimed.post(`/procedure/create-procedure-prescription`,procedurePrescription, {headers: { token: token },})
    console.log(response3); 

    const response4 = await ApiSegimed.post(`/drug-prescription/create-drug-prescription`,drugPrescription, {headers: { token: token },})
    console.log(response4); 

    //const response5 = await ApiSegimed.post(`/therapy/create-therapy-prescription`,terapy, {headers: { token: token },})
    //console.log(response5); tiene un error la ruta

    const response6 = await ApiSegimed.post(`/medical-indications/new-indication`,medicalIndications, {headers: { token: token },})
    console.log(response6);  

    //pautas de alarma
    if(/*response1.status === 200 && */ response2.status === 200 && response3.status === 200 && response4.status === 200 && response6.status === 200){
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "Se ha creado la consulta",
      })
      router.push(`/Dashboard/Inicio_Doctor/Historial`);
    }else{
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error ",
        text: "Error al crear la consulta",
      })
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
        {loading===false ? (
          <form onChange={methods.handleSubmit(onSubmit)}>
          <Consulta title={"Datos del paciente"} paciente={patient} />
          <InputConsulta
            title={"Antecedentes"}
            risk={["Riesgo cardiovascular"]}
            risk2={["Riesgo quirúrgico"]}
            riskGroup={["Grupo HTP"]}
            groupHTP={["I", "II", "III", "IV", "V"]}
            options={["Bajo", "Moderado", "Alto", " Muy Alto"]}
            options2={["Bajo", "Moderado", "Alto"]}
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
        </form>):(<div className="flex items-center justify-center h-20"><LoadingFallback /></div>)}
        <div className="flex justify-center m-6">
          <Elboton
            nombre={"Guardar Cambios"}
            icon={<IconGuardar />}
            onPress={handleSave}
            size={"lg"}
            className={"bg-green-500 w-60 text-sm font-bold"}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default DetallePaciente;
