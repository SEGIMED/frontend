"use client";


import { ApiSegimed } from "@/Api/ApiSegimed";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Consulta from "@/components/consulta/dataconsulta";
import InputConsulta from "@/components/consulta/inputconsulta";
import InputFile from "@/components/consulta/inputfile";
import SignosVitalesInfo from "@/components/consulta/signosvitales";
import InputDiagnostico from "@/components/consulta/inputDiagnostico";
import InputExam from "@/components/consulta/inputExam";
import Component from "@/components/consulta/inputCuerpo";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Elboton from "@/components/Buttons/Elboton";
import IconGuardar from "@/components/icons/iconGuardar";
import LoadingFallback from "@/components/loading/loading";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import IdDrug from "@/utils/IdDrug";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import { updateBodyPainLevel } from "@/redux/slices/user/preconsultaFormSlice";
import InputFilePreconsultation from "@/components/preconsulta/estudios";
import IdSubSystem from "@/utils/idSubSystem";
import IdHeartFailureRiskText from "@/utils/idHeartFailureRisk";
import SubNavbarConsulta from "@/components/NavDoc/subNavConsulta";
import { ApiSegimed2 } from "@/Api/ApiSegimed2";
import { usePathname } from "next/navigation";

const DetallePaciente = (id) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname= usePathname()
  const token = Cookies.get("a");
  const userId = Cookies.get("patientId");
  console.log(userId);
  const scheduleId = id.params.id; // id de agendamiento

  const [medicalEventId, setMedicalEventId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState();
  const [preconsult, setPreconsult] = useState();
  console.log(preconsult);
  const [physicalExamination, setPhysicalExamination] = useState();
  const [physicalExaminationPatch, setPhysicalExaminationPatch] = useState();
  const [preconsultPhysical, setPreconsultPhysical] = useState();
  const [cardiovascularRisk, setCardiovascularRisk] = useState();
  const [surgicalRisk, setSurgicalRisk] = useState();
  const [hpGroup, setHpGroup] = useState();
  const [background, setBackground] = useState();
  const [backgroundPatch, setBackgroundPatch] = useState();
  const [diagnostic, setDiagnostic] = useState();
  const [selectedRisk, setSelectedRisk] = useState();
  const [selectedRisk2, setSelectedRisk2] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [heartFailureRisk, setHeartFailureRisk] = useState();
  const [medicalEvent, setMedicalEvent] = useState();
  const [medicalEventExist, setMedicalEventExist] = useState();
  const [medicalEventPatch, setMedicalEventPatch] = useState();
  const [tests, setTests] = useState({});
  const [handleNav, setHandleNav] = useState("");

  const methods = useForm();
  const formState = useAppSelector((state) => state.formSlice.selectedOptions);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);

  console.log(hpGroup);
  console.log(patient);
  const bodyOBJFormat = {
    painOwnerId: Number(userId),
    schedulingId: Number(scheduleId),
    medicalEventId: null,
    isTherePain: formData.bodySection?.selectedOptions?.pain || null,
    painDurationId: formData.bodySection?.selectedOptions?.painTime || null,
    painScaleId: formData.bodySection?.selectedOptions?.painLevel || null,
    painTypeId: formData.bodySection?.selectedOptions?.painType || null,
    painAreas: formData.bodySection?.painAreas
      ? Object.values(formData.bodySection.painAreas)
      : null,
    painFrequencyId: formData.bodySection?.painFrequency || null,
    isTakingAnalgesic: formData.bodySection?.isTakingAnalgesic || null,
    doesAnalgesicWorks: formData.bodySection?.doesAnalgesicWorks || null,
    isWorstPainEver: formData.bodySection?.isWorstPainEver || null,
  };
  useEffect(() => {
    setCardiovascularRisk({
      patientId: Number(userId),
      riskId: selectedRisk,
    });
  }, [selectedRisk]);
  useEffect(() => {
    setSurgicalRisk({
      patientId: Number(userId),
      surgicalRiskId: selectedRisk2,
    });
  }, [selectedRisk2]);
  useEffect(() => {
    setHpGroup({
      patientId: Number(userId),
      hpGroupId: selectedGroup,
    });
  }, [selectedGroup]);
  useEffect(() => {
    //clase funcional
    setHeartFailureRisk({
      patientId: Number(userId),
      heartFailureClassificationId: IdHeartFailureRiskText(
        formState.HeartFailureRisk
      ),
    });
  }, [formState]);

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

  useEffect(() => {
    setTests({
      laboratoryResults: {
        title: "Resultados de laboratorio",
        file: preconsult?.laboratoryResults || null,
        description: "",
        active: false,
      },
      electrocardiogram: {
        title: "Electrocardiograma",
        file: preconsult?.electrocardiogram || null,
        description: "",
        active: false,
      },
      rxThorax: {
        title: "RX de Torax",
        file: preconsult?.rxThorax || null,
        description: "",
        active: false,
      },
      echocardiogram: {
        title: "Ecocardiograma",
        file: preconsult?.echocardiogram || null,
        description: "",
        active: false,
      },
      walkTest: {
        title: "Test de caminata",
        file: preconsult?.walkTest || null,
        description: "",
        active: false,
      },
      respiratoryFunctional: {
        title: "Funcional respiratorio",
        file: preconsult?.respiratoryFunctional || null,
        description: "",
        active: false,
      },
      tomographies: {
        title: "Tomografías",
        file: preconsult?.tomographies || null,
        description: "",
        active: false,
      },
      rightHeartCatheterization: {
        title: "Cateterismo cardiaco derecho",
        file: preconsult?.rightHeartCatheterization || null,
        description: "",
        active: false,
      },
      ccg: {
        title: "CCG (Coronariografia)",
        file: preconsult?.ccg || null,
        description: "",
        active: false,
      },
      resonance: {
        title: "Resonancia",
        file: preconsult?.resonance || null,
        description: "",
        active: false,
      },
      leftHeartCatheterization: {
        title: "Cateterismo cardiaco izquierdo",
        file: preconsult?.leftHeartCatheterization || null,
        description: "",
        active: false,
      },
      otherStudies: {
        title: "Otros estudios",
        file: preconsult?.otherStudies || null,
        description: "",
      },
      pendingStudies: {
        title: "Estudios pendientes",
        description: preconsult?.pendingStudies || "",
      },
    });
  }, [preconsult]);
  
  const onSubmit = (data) => {
    console.log(data);
    //Antecedentes
    setBackground({
      patientId: Number(userId),
      medicalEventId: Number(medicalEventId),
      allergicBackground:
        data["Alergias"] === ""
          ? ""
          : data["Alergias"],
      familyBackground:
        data["Antecedentes familiares"] === ""
          ? ""
          : data["Antecedentes familiares"],
      nonPathologicBackground:
        data["Antecedentes no patologicos"] === ""
          ? ""
          : data["Antecedentes no patologicos"],
      pathologicBackground:
        data["Antecedentes patologicos"] === ""
          ? ""
          : data["Antecedentes patologicos"],
      pediatricBackground:
        data["Antecedentes de infancia"] === ""
          ? ""
          : data["Antecedentes de infancia"],
      pharmacologicalBackground:
        data["Medicación actual"] === ""
          ? ""
          : data["Medicación actual"],
      surgicalBackground:
        data["Antecedentes quirúrgicos"] === ""
          ? ""
          : data["Antecedentes quirúrgicos"],
      vaccinationBackground:
        data["Vacunas"] === ""
          ? ""
          : data["Vacunas"],
      schedulingId: Number(scheduleId),
    });
    if(patient.backgrounds){
    const backgroundPatch = {
      id: Number(patient.backgrounds.id),
    };
    
    // Función para agregar campos condicionalmente al objeto
    const addBackgroundField = (field, fieldName) => {
      if (data[field] && data[field] !== "") {
        backgroundPatch[fieldName] = data[field];
      }
    };
    
    // Agregar cada campo condicionalmente
    addBackgroundField("Alergias", "allergicBackground");
    addBackgroundField("Antecedentes familiares", "familyBackground");
    addBackgroundField("Antecedentes no patologicos", "nonPathologicBackground");
    addBackgroundField("Antecedentes patologicos", "pathologicBackground");
    addBackgroundField("Antecedentes de infancia", "pediatricBackground");
    addBackgroundField("Medicación actual", "pharmacologicalBackground");
    addBackgroundField("Antecedentes quirúrgicos", "surgicalBackground");
    addBackgroundField("Vacunas", "vaccinationBackground");
    
    // Llamar a setBackgroundPatch con el objeto construido dinámicamente
    setBackgroundPatch(backgroundPatch);
}
    //preconsulta
    setPreconsultPhysical({
      patient: Number(userId),
      appointmentSchedule: Number(scheduleId),
      //exploracion fisica
      painRecordsToCreate: [bodyOBJFormat],
      //estudios
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
      //anamnesis sin evolucion de la enfermedad
      consultationReason:
        data["Motivo de consulta"] === ""
          ? preconsult?.consultationReason
          : data["Motivo de consulta"],
      importantSymptoms:
        data["Sintomas importantes"] === ""
          ? preconsult?.importantSymptoms
          : data["Sintomas importantes"],
      //vital signs
      abnormalGlycemia:
        data["glucemiaElevada"] === ""
          ? preconsult?.abnormalGlycemia
          : data["glucemiaElevada"],
      lastAbnormalGlycemia:
        data["lastAbnormalGlycemia"] === ""
          ? preconsult?.lastAbnormalGlycemia
          : data["lastAbnormalGlycemia"],
      // se tiene que aplicar una logica que cambia segun el patch o el post
      vitalSignsToCreate: [
        {
          patientId: userId,
          measureType: 1,
          measure: data["Temperatura"],
          schedulingId: null,
          medicalEventId: 4,
        },
        {
          patientId: userId,
          measureType: 2,
          measure: data["Presión Arterial Sistólica"],
          schedulingId: null,
          medicalEventId: 4,
        },
        {
          patientId: Number(userId), // id del paciente
          measureType: 3, // id del parametro "frecuencia cardiaca" en el catalogo vital signs
          measure: data["Presión Arterial Diastólica"], // medida introducida por el médico o paciente,
          schedulingId: null, /// id del scheduling si se crea en preconsulta
          medicalEventId: 4, /// id del medical event si se crea durante medical event
        },
        {
          patientId: userId,
          measureType: 5,
          measure: data["Frecuencia Respiratoria"],
          schedulingId: null,
          medicalEventId: 4,
        },
        {
          patientId: userId,
          measureType: 6,
          measure: data["Saturación de Oxígeno"],
          schedulingId: null,
          medicalEventId: 4,
        },
        {
          patientId: userId,
          measureType: 7,
          measure: data["Frecuencia Cardiaca"],
          schedulingId: null,
          medicalEventId: 4,
        },
        {
          patientId: userId,
          measureType: 8,
          measure: data["Talla"],
          schedulingId: null,
          medicalEventId: 4,
        },
        {
          patientId: userId,
          measureType: 7,
          measure: data["Temperatura"],
          schedulingId: null,
          medicalEventId: 4,
        },
        {
          patientId: userId,
          measureType: 7,
          measure: data["Perímetro Abdominal"],
          schedulingId: null,
          medicalEventId: 4,
        },
        {
          patientId: userId,
          measureType: 10,
          measure: data["IMC"],
          schedulingId: null,
          medicalEventId: 4,
        },
      ],
    });
    setPhysicalExamination({
      physicalSubsystemId: IdSubSystem(formState.selectSubsistema), //tienen que modificar el catalogo
      description: data["inputSubsistema"] ? data["inputSubsistema"] : "",
      medicalEventId: Number(medicalEventId),
    });
    if(medicalEventExist?.physicalExaminations[0]?.id){
    setPhysicalExaminationPatch({
      physicalSubsystemId: IdSubSystem(formState.selectSubsistema), //tienen que modificar el catalogo
      description: data["inputSubsistema"] ? data["inputSubsistema"] : "",
      id: Number(medicalEventExist.physicalExaminations[0].id),
    });}
    setDiagnostic({
      patientId: Number(userId),
      diseaseId: 3,
      diagnosticNotes: data["Diagnostico"],
      medicalEventId: 5,
      drugId: data["selectDrug"] ? IdDrug(data["selectDrug"]) : "",
      prescribedDose: null,
      quantityDrug: 60,
      medicalProcedureId: 4,
      //diagnosticNotes: data["Procedimientos"],
      therapyId: 2,
      descriptionTherapy: data["Conducta terapeutica"],
      quantityTherapy: 10,
      descriptionIndication: data["Tratamientos no farmacológicos"],
    });
    // en revision por el backend
    
    setMedicalEvent({
      physicianComments: data["Anotaciones de la consulta"] ? data["Anotaciones de la consulta"] : null, ///evolucion
      schedulingId: Number(scheduleId), /// el id del agendamiento
      chiefComplaint: data["Motivo de consulta"] ? data["Motivo de consulta"] : null, // motivo de consulta
      historyOfPresentIllness: data["Evolucion de la enfermedad"] ? data["Evolucion de la enfermedad"] : null, /// enfermedad actual
      reviewOfSystems: data["Sintomas importantes"] || null, /// revision por sistemas o sintomas
      treatmentPlan: null, /// plan de tratamiento
      pendingDiagnosticTest: null, // test pendientes
      alarmPattern: data["Pauta de alarma"] ? data["Pauta de alarma"] : null, // patron de alarma
    });
    setMedicalEventPatch({
      id: Number(medicalEventExist?.id),
    });
      const medicalEventPatch = {
        id: Number(medicalEventExist?.medicalEventId),
      };
      
      // Función para agregar campos condicionalmente al objeto
      const addMedicalEventField = (field, fieldName) => {
        if (data[field] && data[field] !== "") {
          medicalEventPatch[fieldName] = data[field];
        }
      };
      
      // Agregar cada campo condicionalmente
      addMedicalEventField("Anotaciones de la consulta", "physicianComments");
      addMedicalEventField("Evolucion de la enfermedad", "historyOfPresentIllness");
      addMedicalEventField("Pauta de alarma", "alarmPattern");
      addMedicalEventField("Sintomas importantes", "reviewOfSystems");
      addMedicalEventField("Motivo de consulta", "chiefComplaint");
      addMedicalEventField("Tratamientos no farmacológicos", "treatmentPlan");
      
      // Llamar a setMedicalEventPatch con el objeto construido dinámicamente
      setMedicalEventPatch(medicalEventPatch);
  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primera petición utilizando el scheduleId de params - esto pide la preconsulta
       
          const response1 = await ApiSegimed.get(
            `/get-preconsultation?scheduleId=${scheduleId}`,
            { headers: { token: token } }
          );
        console.log("estoe es preconsulta",response1)
        setPreconsult(response1.data);
      } catch (error) {
          console.log("Este agendamiento no tiene preconsulta", error);
      };}
      const fetchData2 = async () => {
      try {  
      // Segunda petición utilizando el userId de la primera respuesta - esto pide el paciente
      const response2 = await ApiSegimed.get(
        `/patient-details?id=${userId}`,
        { headers: { token: token } }
      );
      setPatient(response2.data);
      } catch (error) {
      console.log("No existe este paciente", error);
      };
      };  
      const fetchData3 = async () => {   
      try {
            // Tercera petición utilizando el scheduleId de params - esto pide el historial medico para saber siya hay diagnostico
            const response3 = await ApiSegimed.get(
              `/medical-event/get-medical-event-detail?scheduleId=${scheduleId}`,
              { headers: { token: token} }
            );
            console.log("esto es medical event",response3.data);
            setMedicalEventExist(response3);
            setMedicalEventId(response3.data.medicalEventId);
      } catch (error) {
            console.log("No se ah echo un diagnostico anteriormente:", error);

            try {
              const medicalEventPrevisional = {
                  physicianComments: "-", ///evolucion
                  schedulingId: Number(scheduleId), /// el id del agendamiento
                  chiefComplaint: "-",// motivo de consulta
                  historyOfPresentIllness: "-", /// enfermedad actual
                  reviewOfSystems: "-", /// revision por sistemas o sintomas
                  treatmentPlan: "-", /// plan de tratamiento
                  pendingDiagnosticTest : "-", // test pendientes
                  alarmPattern: "-" // patron de alarma
              }
              // Cuarta petición se hacer un previsional de diagnostico para obtener el id de medical event
              const response4 = await ApiSegimed.post(
                `/medical-event/create-event`,medicalEventPrevisional,
                { headers: { token: token } }
              );
              console.log(response4.data.medicalEvent.id);
              setMedicalEventId(response4.data.medicalEvent.id);
              
            } catch (error) {
              console.log("No se ah realizado el previsional de diagnostico:", error);
          }  }
      }
      console.log(medicalEvent);

    fetchData();
    fetchData2();
    fetchData3();
  }, []);
  const handleBodyChange = (name, value) => {
    dispatch(updateBodyPainLevel({ name, option: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    const responses = [];
  
    // Ruta de antecedentes
    console.log(background);
    let response1;
    if(background!==undefined){
    if (patient?.backgrounds?.length === 0 || patient?.backgrounds === null) {
      response1 = await ApiSegimed.post(`/backgrounds/create-backgrounds`, background, { headers: { token: token } });
    } else {
      response1 = await ApiSegimed.patch(`/backgrounds/update-backgrounds?id=${userId}`, backgroundPatch, { headers: { token: token } });
    }}
    if(response1 !== undefined){responses.push(response1);}
  
    // Riesgo cardiovascular
    let response2;
    if (patient?.patientCardiovascularRisks === null && cardiovascularRisk.riskId > 0) {
      response2 = await ApiSegimed.post(`/patient-new-cardiovascular-risk`, cardiovascularRisk, { headers: { token: token } });
    } else if(cardiovascularRisk.riskId > 0){
      response2 = await ApiSegimed.patch(`/patient-update-cardiovascular-risk`, cardiovascularRisk, { headers: { token: token } });
    }
    if(response2 !== undefined){responses.push(response2);}
  
    // Riesgo quirúrgico
    let response3;
    if (patient?.patientSurgicalRisks === null && surgicalRisk.surgicalRiskId > 0) {
      response3 = await ApiSegimed.post(`/patient-new-surgical-risk`, surgicalRisk, { headers: { token: token } });
    } else if (surgicalRisk.surgicalRiskId > 0) {
      response3 = await ApiSegimed.patch(`/patient-update-surgical-risk`, surgicalRisk, { headers: { token: token } });
    }
    if(response3 !== undefined){responses.push(response3);}
  
    // Grupo de hipertensión pulmonar
    let response4;
    if (patient?.patientPulmonaryHypertensionGroups === null && hpGroup.hpGroupId > 0) {
      response4 = await ApiSegimed.post(`/patient-new-hp-group`, hpGroup, { headers: { token: token } });
    } else if(hpGroup.hpGroupId > 0){
      response4 = await ApiSegimed.patch(`/patient-update-hp-group`, hpGroup, { headers: { token: token } });
    }
    if(response4 !== undefined){responses.push(response4);}
  
    // Examen físico
    let response5;
    console.log(physicalExamination);
    if(!physicalExamination?.physicalSubsystemId === 0){
    if(medicalEventExist?.physicalExaminations?.length === 0 || medicalEventExist?.physicalExaminations === null) {
      response5 = await ApiSegimed.post(`/patient-physical-examination`, physicalExamination, { headers: { token: token } });
    } else {
      response5 = await ApiSegimed.patch(`/patient-physical-examination?id=${userId}`, physicalExaminationPatch, { headers: { token: token } });
    }}
    if(response5 !== undefined){responses.push(response5);}
  
    // Riesgo de insuficiencia cardíaca
    let response6;
    if(patient?.patientPulmonaryHypertensionRisks === null && heartFailureRisk.heartFailureRiskId > 0) {
      response6 = await ApiSegimed.post(`/patient-new-nyha-classification`, heartFailureRisk, { headers: { token: token } });
    } else if(heartFailureRisk.heartFailureRiskId > 0) {
      response6 = await ApiSegimed.patch(`/patient-update-nyha-classification`, heartFailureRisk, { headers: { token: token } });
    }
    if(response6 !== undefined){responses.push(response6);}
  
    // Preconsulta
    let response7;
    if (preconsult?.length === 0) {
      response7 = await ApiSegimed.post(`/pre-consultation`, preconsultPhysical, { headers: { token: token } });
    } else {
      response7 = await ApiSegimed.patch(`/update-pre-consultation`, preconsultPhysical, { headers: { token: token } });
    }
    if(response7 !== undefined){responses.push(response7);}
  
    // Diagnóstico
    let response8;
    if(diagnostic !== undefined){
      response8 = await ApiSegimed.post(`/patient-diagnostic`, diagnostic, { headers: { token: token } });
    }
    if(response8 !== undefined){responses.push(response8);}
  
    // Evento médico
    /*let response9; //no se hace post por q para que funcione se precrea el medical event
    console.log(response9);
    if(medicalEvent !== undefined){
      if(medicalEvent.alarmPattern === null || medicalEvent.pendingDiagnosticTest === null || medicalEvent.treatmentPlan === null || medicalEvent.reviewOfSystems === null || medicalEvent.historyOfPresentIllness === null || medicalEvent.physicianComments === null || medicalEvent.chiefComplaint === null){
        if(medicalEvent.alarmPattern === null && medicalEvent.pendingDiagnosticTest === null && medicalEvent.treatmentPlan === null && medicalEvent.reviewOfSystems === null && medicalEvent.historyOfPresentIllness === null && medicalEvent.physicianComments === null && medicalEvent.chiefComplaint === null){
          console.log("object vacio");
        } else {
          response9 = await ApiSegimed.post(`/medical-event/create-event`, medicalEvent, { headers: { token: token } });
        }
      }
    }
    if(response9 !== undefined){ responses.push(response9);}
    */
   // solo post

    let response9;
    console.log(medicalEventPatch);
    if(medicalEventPatch !== undefined){
      if(medicalEvent.alarmPattern === null || medicalEvent.pendingDiagnosticTest === null || medicalEvent.treatmentPlan === null || medicalEvent.reviewOfSystems === null || medicalEvent.historyOfPresentIllness === null || medicalEvent.physicianComments === null || medicalEvent.chiefComplaint === null){
        if(medicalEvent.alarmPattern === null && medicalEvent.pendingDiagnosticTest === null && medicalEvent.treatmentPlan === null && medicalEvent.reviewOfSystems === null && medicalEvent.historyOfPresentIllness === null && medicalEvent.physicianComments === null && medicalEvent.chiefComplaint === null){
          console.log("object vacio");
        } else {
          response9 = await ApiSegimed.patch(`/medical-event/update-event`, medicalEventPatch, { headers: { token: token } });
        }
      }
    }
    if(response9 !== undefined){ responses.push(response9);}
    // Verificar todas las respuestas
    const allSuccessful = responses.every(response => response?.status === 200);

    console.log(allSuccessful);
    if (allSuccessful) {
      const data = await ApiSegimed.patch(`/schedule/${scheduleId}`, { schedulingStatus: 2 }, { headers: { token: token } });
      console.log(data);
      //setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "Se ha creado la consulta",
      });
      //router.push(`/Dashboard/Inicio_Doctor/Consultas`);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error ",
        text: "Error al crear la consulta",
      });
    }
  };

  const handleClic = (title) => {
    if (handleNav === title) {
      setHandleNav("");
    }else{
    setHandleNav(title);
  }
  };
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full overflow-y-auto bg-[#fafafc]">
        <SubNavbarConsulta handleClic={handleClic}/>
        {loading === false ? (
          <form onChange={methods.handleSubmit(onSubmit)}>
            <Consulta title={"Datos del paciente"} paciente={patient} defaultOpen = {handleNav === "datos del paciente" ? true : false}/>
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
                "Medicación actual",
                "Alergias",
                "Vacunas",
              ]}
              defaultOpen = {handleNav === "antecedentes" ? true : false}
              paciente={patient}
              onRiskChange={setSelectedRisk}
              onRiskChange2={setSelectedRisk2}
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
              defaultOpen = {handleNav === "anamnesis" ? true : false}
            />
            <SignosVitalesInfo
              title={"Signos vitales"}
              paciente={patient}
              preconsult={preconsult}
              defaultOpen = {handleNav === "signos vitales" ? true : false}
            />
            <InputCuerpoPre
            title={"Exploracion fisica"}
            onBodyChange={handleBodyChange}
            defaultOpen = {handleNav === "exploracion fisica" ? true : false}
            />
            <InputExam title={"Examen fisico"} 
            defaultOpen = {handleNav === "examen fisico" ? true : false}
            />
            {/*<InputConsulta title={"Comentarios"} subtitle={["Anotaciones"]} />*/}
            {/*<InputFile title={"Estudios"} Links={preconsult} />*/}
            <InputFilePreconsultation
              title={"Estudios"}
              onUploadFile={handleUploadTestFile}
              onDescriptionChange={handleTestDescription}
              onTestActive={handleTestActive}
              onTestSelectedOption={handleTestSelectedOption}
              tests={tests}
              defaultOpen = {handleNav === "estudios" ? true : false}
            />
            <InputConsulta
              title={"Evolucion"}
              subtitle={["Anotaciones sobre la consulta"]}
              defaultOpen = {handleNav === "evolucion" ? true : false}
            />
            <InputDiagnostico
              title={"Diagnósticos y tratamiento"}
              subtitle={[
                "Conducta terapeutica",
                "Tratamientos no farmacológicos",
                "Pauta de alarma",
              ]}
              defaultOpen = {handleNav === "diagnostico y tratamientos"  ? true : false}
              subtitle2={["Diagnostico","Procedimientos"]}
              subtitle3={"Medicamentos"}
            />
          </form>
        ) : (
          <div className="flex items-center justify-center h-20">
            <LoadingFallback />
          </div>
        )}
        <div className="flex justify-center p-6 bg-[#fafafc]">
          <Elboton
            nombre={"Guardar Cambios"}
            icon={<IconGuardar />}
            onPress={handleSave}
            size={"lg"}
            className={"bg-greenPrimary w-60 text-sm font-bold"}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default DetallePaciente;
