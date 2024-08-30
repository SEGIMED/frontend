"use client";

import { ApiSegimed } from "@/Api/ApiSegimed";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Consulta from "@/components/consulta/dataconsulta";
import InputConsulta from "@/components/consulta/inputconsulta";

import SignosVitalesInfo from "@/components/consulta/signosvitales";
import InputDiagnostico from "@/components/consulta/inputDiagnostico";
import InputExam from "@/components/consulta/inputExam";

import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Elboton from "@/components/Buttons/Elboton";
import IconGuardar from "@/components/icons/iconGuardar";
import LoadingFallback from "@/components/loading/loading";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import PreconsultaQuestion from "../preconsulta/PreconsultaQuestion";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import { updateBodyPainLevel } from "@/redux/slices/user/preconsultaFormSlice";
import InputFilePreconsultation from "@/components/preconsulta/estudios";
import IdSubSystem from "@/utils/idSubSystem";
import IdHeartFailureRiskText from "@/utils/idHeartFailureRisk";
import SubNavbarConsulta from "@/components/NavDoc/subNavConsulta";
import getPatientDetail from "@/utils/dataFetching/fetching/getPatientDetail";
import patchPreconsultation from "@/utils/dataFetching/fetching/patchPreconsultation";
import getMedicalEventDetail from "@/utils/dataFetching/fetching/getMedicalEventDetail";

export default function ConsultaDoc ({id, preconsult}) {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = Cookies.get("a");
  const medicalEventId =Number(Cookies.get("medicalEventId")) ;
  const userId =Number(Cookies.get("patientId"));
  const scheduleId = Number(id); // id de agendamiento
  const [medicalEventExist, setMedicalEventExist] = useState();
  const [handleNav, setHandleNav] = useState("Preconsulta");
  const [cardiovascularRisk, setCardiovascularRisk] = useState();
  const [htpRisk, setHTPRisk] = useState();
  const [hpGroup, setHpGroup] = useState();
  const [vitalSignsPreconsult, setVitalSignsPreconsult] = useState([]);
  const [glicemiaPreconsult, setGlicemiaPreconsult] = useState([])


  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState();
  
  const [physicalExamination, setPhysicalExamination] = useState();
  const [physicalExaminationPatch, setPhysicalExaminationPatch] = useState();


  const [background, setBackground] = useState();
  const [backgroundPatch, setBackgroundPatch] = useState();
  const [diagnostic, setDiagnostic] = useState();
  const [diagnosticPatch, setDiagnosticPatch] = useState();
  const [selectedRisk, setSelectedRisk] = useState();
  const [selectedRisk2, setSelectedRisk2] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [heartFailureRisk, setHeartFailureRisk] = useState();

  const [medicalEventPatch, setMedicalEventPatch] = useState();
  const [tests, setTests] = useState({});
  

  const [restOfPreconsult, setRestOfPreconsult] = useState([]);
  const methods = useForm();
  const formState = useAppSelector((state) => state.formSlice.selectedOptions);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);
   

  //FUNCIONES PARA PRECONSULTA
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

  const getValue = (formValue, preconsultValue) =>
    formValue !== undefined && formValue !== null ? formValue : preconsultValue;

  const bodyOBJFormat = {
    patient: Number(userId),
    patientPainMapId: Number(userId),
    painOwnerId: Number(userId),
    schedulingId: Number(scheduleId),
    isTherePain:
      getValue(
        preconsult?.provisionalPreConsultationPainMap?.isTherePain,
        formData?.bodySection?.isTherePain
       
      ) ?? null,
    painDurationId:
      getValue(
        formData?.bodySection?.painDuration,
        preconsult?.provisionalPreConsultationPainMap?.painDuration
      ) ?? null,
    painScaleId:
      getValue(
        formData?.bodySection?.painScale,
        preconsult?.provisionalPreConsultationPainMap?.painScale
      ) ?? null,
    painTypeId:
      getValue(
        formData?.bodySection?.painType,
        preconsult?.provisionalPreConsultationPainMap?.painType
      ) ?? null,
    painAreas: [
      ...((formData?.bodySection?.painAreas &&
        Object.values(formData.bodySection.painAreas)) ||
        []),
      ...((preconsult?.provisionalPreConsultationPainMap?.painAreas &&
        Object.values(
          preconsult.provisionalPreConsultationPainMap.painAreas
        )) ||
        []),
    ],
    painFrequencyId:
      getValue(
        formData?.bodySection?.painFrequency,
        preconsult?.provisionalPreConsultationPainMap?.painFrequency
      ) ?? null,
    isTakingAnalgesic:
      getValue(
        formData?.bodySection?.isTakingAnalgesic,
        preconsult?.provisionalPreConsultationPainMap?.isTakingAnalgesic
      ) ?? null,
    doesAnalgesicWorks:
      getValue(
        formData?.bodySection?.doesAnalgesicWorks,
        preconsult?.provisionalPreConsultationPainMap?.doesAnalgesicWorks
      ) ?? null,
    isWorstPainEver:
      getValue(
        formData?.bodySection?.isWorstPainEver,
        preconsult?.provisionalPreConsultationPainMap?.isWorstPainEver
      ) ?? null,
  };

  console.log(preconsult, "esto es preconsulta para ver que patch se hizo")
  console.log(bodyOBJFormat, "para ver el formato")
  
  useEffect(() => {
    setCardiovascularRisk({
      patientId: Number(userId),
      riskId: selectedRisk,
    });
    
  }, [selectedRisk]);
  useEffect(() => {
    setHTPRisk({
      patientId: Number(userId),
      pulmonaryHypertensionRiskId: selectedRisk2,
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
      pulmonaryHypertensionRiskId: IdHeartFailureRiskText(
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

  const preconsultPhysical = {
    // ids
    preconsultationId: Number(preconsult?.id),
    patient: Number(userId),
    appointmentSchedule: Number(scheduleId),
    // status
    status: "sent",
    // exploracion fisica
    painRecordsToUpdate: [bodyOBJFormat],
    // estudios
    laboratoryResults: tests.laboratoryResults?.file || null,
    laboratoryResultsDescription: tests.laboratoryResults?.description || "",
    electrocardiogram: tests.electrocardiogram?.file || null,
    electrocardiogramDescription: tests.electrocardiogram?.description || "",
    rxThorax: tests.rxThorax?.file || null,
    echocardiogram: tests.echocardiogram?.file || null,
    walkTest: tests.walkTest?.file || null,
    respiratoryFunctional: tests.respiratoryFunctional?.file || null,
    tomographies: tests.tomographies?.file || null,
    rightHeartCatheterization: tests.rightHeartCatheterization?.file || null,
    ccg: tests.ccg?.file || null,
    resonance: tests.resonance?.file || null,
    leftHeartCatheterization: tests.leftHeartCatheterization?.file || null,
    otherStudies: tests.otherStudies?.file || null,
    pendingStudies: tests.pendingStudies?.description || "",
    // se tiene que aplicar una logica que cambia segun el patch o el post
    updateVitalSigns:
      vitalSignsPreconsult.length > 0 ? vitalSignsPreconsult : null,
    ...restOfPreconsult,
  };

  
  const onSubmit = (data) => {
    //Antecedentes
    setBackground({
      patientId: Number(userId),
      medicalEventId: Number(medicalEventId),
      allergicBackground: data["Alergias"] === "" ? "" : data["Alergias"],
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
        data["Medicación actual"] === "" ? "" : data["Medicación actual"],
      surgicalBackground:
        data["Antecedentes quirúrgicos"] === ""
          ? ""
          : data["Antecedentes quirúrgicos"],
      vaccinationBackground: data["Vacunas"] === "" ? "" : data["Vacunas"],
      schedulingId: Number(scheduleId),
    });
    if (patient?.backgrounds) {
      const backgroundPatch = {
        id: Number(patient?.backgrounds?.id),
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
      addBackgroundField(
        "Antecedentes no patologicos",
        "nonPathologicBackground"
      );
      addBackgroundField("Antecedentes patologicos", "pathologicBackground");
      addBackgroundField("Antecedentes de infancia", "pediatricBackground");
      addBackgroundField("Medicación actual", "pharmacologicalBackground");
      addBackgroundField("Antecedentes quirúrgicos", "surgicalBackground");
      addBackgroundField("Vacunas", "vaccinationBackground");

      // Llamar a setBackgroundPatch con el objeto construido dinámicamente
      setBackgroundPatch(backgroundPatch);
    }
    //preconsulta
    const vitalSigns = [
      {  measureType: 1, measure: Number(data["Temperatura"]) },
      {
        
        measureType: 2,
        measure: Number(data["Presión Arterial Sistólica"]),
      },
      {
       
        measureType: 3,
        measure: Number(data["Presión Arterial Diastólica"]),
      },
      {
        
        measureType: 5,
        measure: Number(data["Frecuencia Respiratoria"]),
      },
      {
        
        measureType: 6,
        measure: Number(data["Saturación de Oxígeno"]),
      },
      {
        
        measureType: 7,
        measure: Number(data["Frecuencia Cardiaca"]),
      },
      {  measureType: 8, measure: Number(data["Estatura"]) },
      {  measureType: 9, measure: Number(data["Peso"]) },
      {  measureType: 10, measure: Number(data["IMC"]) },
    ];
    const updateVitalSigns = vitalSigns.filter(
      (sign) => sign.measure !== 0 && sign.measure !== ""
    );
    console.log("aca se guardan los signos vitales", updateVitalSigns )
    setVitalSignsPreconsult(updateVitalSigns);
    setRestOfPreconsult({
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
      abnormalGlycemia: data["abnormalGlycemia"],
      lastAbnormalGlycemia:
        data["lastAbnormalGlycemia"] === ""
          ? preconsult?.lastAbnormalGlycemia
          : data["lastAbnormalGlycemia"],
    });

    setGlicemiaPreconsult({
      lastAbnormalGlycemia:
        data["lastAbnormalGlycemia"] === ""
          ? preconsult?.lastAbnormalGlycemia
          : data["lastAbnormalGlycemia"],
    })

    setPhysicalExamination({
      physicalSubsystemId: IdSubSystem(formState.selectSubsistema), //tienen que modificar el catalogo
      description: data["inputSubsistema"] ? data["inputSubsistema"] : "",
      medicalEventId: Number(medicalEventId),
    });

    if (medicalEventExist?.patientPhysicalExaminations[0]?.id) {
      setPhysicalExaminationPatch({
        physicalSubsystemId: IdSubSystem(formState.selectSubsistema), //tienen que modificar el catalogo
        description: data["inputSubsistema"] ? data["inputSubsistema"] : "",
        id: Number(medicalEventExist.patientPhysicalExaminations[0].id),
      });
    }
    if (
      data["Diagnostico"] !== "" &&
      data["medications"] !== "" &&
      data["Procedimientos"] !== "" &&
      data["Conducta terapeutica"] !== "" &&
      data["Tratamientos no farmacológicos"] !== ""
    ) {
      setDiagnostic({
        patientId: Number(userId),
        diseaseId: 3,
        diagnosticNotes: data["Diagnostico"],
        medicalEventId: Number(medicalEventId),
        drugId: null,
        drugName: data["medications"],
        prescribedDose: null,
        quantityDrug: null,
        medicalProcedureId: null,
        medicalProcedureName: data["Procedimientos"]
          ? data["Procedimientos"]
          : null,
        therapyId: null,
        descriptionTherapy: data["Conducta terapeutica"], // donde aparece en medical event
        quantityTherapy: null,
        descriptionIndication: data["Tratamientos no farmacológicos"],
      });
    }

    setDiagnosticPatch(
      //diagnosticPatch
      {
        id: Number(medicalEventExist?.patientDiagnostics[0]?.id), // id del diagnostico - obligatorio
        diseaseId: 3,
        diagnosticNotes:
          data["Diagnostico"] !== ""
            ? data["Diagnostico"]
            : medicalEventExist?.patientDiagnostics[0]?.diagnosticNotes || "", // Si está vacío, usa el valor del diagnóstico existente
        medicalEventId: Number(medicalEventId),
        drugId: null,
        drugName:
          data["medications"] !== ""
            ? data["medications"]
            : medicalEventExist?.drugPrescriptions || "", // Si está vacío, usa el valor de la receta existente
        quantityDrug: null,
        medicalProcedureId: null,
        medicalProcedureName:
          data["Procedimientos"] !== ""
            ? data["Procedimientos"]
            : medicalEventExist?.procedurePrescriptions?.[0]?.medicalProcedureName ||
              null, // Usa el valor del procedimiento existente si está vacío
        therapyId: null,
        therapyDescription:
          data["Conducta terapeutica"] !== ""
            ? data["Conducta terapeutica"]
            : medicalEventExist?.TherapyPrescription || null, // Usa la terapia existente si está vacío
        quantityTherapy: null,
        descriptionIndication: "Tratamientos no farmacológicos",
      }
    );


    // patch medical event
    const medicalEvent = {
      id: Number(medicalEventId),
    };

    // Función para agregar campos condicionalmente al objeto
    const medicalEventPatch = {};
    medicalEventPatch.id = medicalEvent.id;
    const addMedicalEventField = (field, fieldName) => {
      if (data[field] && data[field] !== "") {
        medicalEventPatch[fieldName] = data[field];
      }
    };

    // Agregar cada campo condicionalmente
    addMedicalEventField("Anotaciones de la consulta", "physicianComments");
    addMedicalEventField(
      "Evolucion de la enfermedad",
      "historyOfPresentIllness"
    );
    addMedicalEventField("Pauta de alarma", "alarmPattern");
    addMedicalEventField("Sintomas importantes", "reviewOfSystems");
    addMedicalEventField("Motivo de consulta", "chiefComplaint");
    addMedicalEventField("Tratamientos no farmacológicos", "treatmentPlan");

    // Llamar a setMedicalEventPatch con el objeto construido dinámicamente
    setMedicalEventPatch(medicalEventPatch);
  };
  

  //GETS de la data que necesito T_T
  const fetchPatientDetail = async (userId) => {
    try {
      const response= await getPatientDetail(userId)
      setPatient(response);
    } catch (error) {
      console.log("No existe este paciente", error);
    }
  };
  
  const fetchMedicalEvent = async (scheduleId) => {
    try {
      
      const response =await  getMedicalEventDetail(scheduleId)
      setMedicalEventExist(response.data);
    } catch (error) {
      console.log("No se ah echo un diagnostico anteriormente:", error);
    }
  };

  //-------------------------------------------------------------------------------
  //Handles que necesito para patch de data 
  const necesaryData= {
    // ids
   preconsultationId: Number(preconsult?.id),
   patient: Number(userId),
   appointmentSchedule: Number(scheduleId),
   // status
   status: "sent"
    }
  const handleSaveVitalSigns = async ()=>{
    try {
      const data= {
       ...necesaryData,
        updateVitalSigns:
      vitalSignsPreconsult.length > 0 ? vitalSignsPreconsult : null,
    ...glicemiaPreconsult,
      }
      
      const response= await patchPreconsultation(data)
      
    } catch (error) {
      console.error("No pudo cargarse la data de signos vitales en el servidor", error.message)
    }
  }
  const handleBodySave = async ()=>{
    try {
        const data= {
         ...necesaryData,
         painRecordsToUpdate: [bodyOBJFormat],
        }
        
        const response= await patchPreconsultation(data)
        
        
      } catch (error) {
        console.error("No pudo cargarse la data en el servidor", error.message)
      }
    

  }

  useEffect(() => {
 
    fetchPatientDetail(userId);
    fetchMedicalEvent(scheduleId);
  }, []);
  console.log(medicalEventExist)
  const handleBodyChange = (name, value) => {
    dispatch(updateBodyPainLevel({ name, option: value }));
  };

  

  const handleSave = async () => {
    setLoading(true);
    const responses = [];
    // Ruta de antecedentes - funciona patch y post
    let response1;
    if (background !== undefined) {
      if (patient?.backgrounds?.length === 0 || patient?.backgrounds === null) {
        response1 = await ApiSegimed.post(
          `/backgrounds/create-backgrounds`,
          background,
          { headers: { token: token } }
        );
      } else {
        response1 = await ApiSegimed.patch(
          `/backgrounds/update-backgrounds?id=${userId}`,
          backgroundPatch,
          { headers: { token: token } }
        );
      }
    }
    if (response1 !== undefined) {
      responses.push(response1);
    }

    // Riesgo cardiovascular - funciona patch y post
    let response2;
    if (
      patient?.patientCardiovascularRisks === null &&
      cardiovascularRisk.riskId > 0
    ) {
      response2 = await ApiSegimed.post(
        `/patient-new-cardiovascular-risk`,
        cardiovascularRisk,
        { headers: { token: token } }
      );
    } else if (cardiovascularRisk.riskId > 0) {
      response2 = await ApiSegimed.patch(
        `/patient-update-cardiovascular-risk`,
        cardiovascularRisk,
        { headers: { token: token } }
      );
    }
    if (response2 !== undefined) {
      responses.push(response2);
    }

    // Riesgo quirúrgico - funciona patch y post
    let response3;
    if(
      htpRisk.pulmonaryHypertensionRiskId > 0
    )  {
      response3 = await ApiSegimed.patch(
        `/patient-update-surgical-risk`,
        htpRisk
      );
    }
    if (response3 !== undefined) {
      responses.push(response3);
    }

    // Grupo de hipertensión pulmonar - funciona patch y post

    let response4;
    if (
      patient?.patientPulmonaryHypertensionGroups === null &&
      hpGroup.hpGroupId > 0
    ) {
      response4 = await ApiSegimed.post(`/patient-new-hp-group`, hpGroup, {
        headers: { token: token },
      });
    } else if (hpGroup.hpGroupId > 0) {
      response4 = await ApiSegimed.patch(`/patient-update-hp-group`, hpGroup, {
        headers: { token: token },
      });
    }
    if (response4 !== undefined) {
      responses.push(response4);
    }

    // Examen físico - funciona patch y post
    let response5;
    if (
      medicalEventExist?.physicalExaminations?.length === 0 &&
      physicalExamination?.physicalSubsystemId !== 0 &&
      physicalExamination !== undefined
    ) {
      response5 = await ApiSegimed.post(
        `/patient-physical-examination`,
        physicalExamination,
        { headers: { token: token } }
      );
    } else if (
      physicalExaminationPatch?.physicalSubsystemId !== 0 &&
      physicalExaminationPatch !== undefined
    ) {
      response5 = await ApiSegimed.patch(
        `/patient-physical-examination?id=${userId}`,
        physicalExaminationPatch,
        { headers: { token: token } }
      );
    }
    if (response5 !== undefined) {
      responses.push(response5);
    }

    // Riesgo de insuficiencia cardíaca -  - funciona mal arreglar
    /*
    let response6;
    console.log(heartFailureRisk);
    if (
      patient?.patientPulmonaryHypertensionRisks === null &&
      heartFailureRisk.pulmonaryHypertensionRiskId > 0
    ) {
      response6 = await ApiSegimed.post(
        `/patient-new-hp-risk`,
        heartFailureRisk,
        { headers: { token: token } }
      );
    } else if (heartFailureRisk.pulmonaryHypertensionRiskId > 0) {
      response6 = await ApiSegimed.patch(
        `/patient-update-hp-risk`,
        heartFailureRisk,
        { headers: { token: token } }
      );
    }
    if (response6 !== undefined) {
      responses.push(response6);
    }
      */

    // Preconsulta
    let response7;
    console.log(preconsultPhysical, "antes del patch en preconsulPhysical")
    if (preconsultPhysical) {
      response7 = await ApiSegimed.patch(
        `/update-pre-consultation`,
        preconsultPhysical,
        { headers: { token: token } }
      );
    }
    if (response7 !== undefined) {
      console.log(response7, "response")
      console.log(response7.data, "ver response")
      responses.push(response7);
    }
    // Diagnóstico // postea pero no lo patchea
    console.log(diagnostic);
    console.log(
      "xdxdxd",
      diagnostic !== undefined && medicalEventExist?.diagnostics?.length === 0
    );
    let response8;
    if (
      diagnostic !== undefined &&
      medicalEventExist?.diagnostics?.length === 0
    ) {
      response8 = await ApiSegimed.post(`/patient-diagnostic`, diagnostic, {
        headers: { token: token },
      });
    } else if (diagnosticPatch !== undefined) {
      response8 = await ApiSegimed.patch(
        `/patient-update-diagnostic`,
        diagnosticPatch,
        { headers: { token: token } }
      );
    }

    if (response8 !== undefined) {
      responses.push(response8);
    }
    console.log(response8);
    // Evento medico - funciona patch pero no modifica tratament plan
    let response9;
    if (medicalEventPatch !== undefined) {
      response9 = await ApiSegimed.patch(
        `/medical-event/update-event`,
        medicalEventPatch,
        { headers: { token: token } }
      );
    }
    if (response9 !== undefined) {
      responses.push(response9);
    }
    // Verificar todas las respuestas
    const allSuccessful = responses.every(
      (response) => response?.status === 200
    );

    if (allSuccessful) {
      // const data = await ApiSegimed.patch(
      //   `/schedule/${scheduleId}`,
      //   { schedulingStatus: 2 },
      //   { headers: { token: token } }
      // );
      setLoading(true);
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "Se ha creado la consulta",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
      // router.push(`/Dashboard/Inicio_Doctor/Consultas`);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error ",
        text: "Error al crear la consulta",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  };


  //SELECT DE CONSULTA
  const handleClic = (title) => {
    if (handleNav === title) {
      setHandleNav("");
    } else {
      setHandleNav(title);
    }
  };
  
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full overflow-y-auto bg-[#fafafc]">
        <SubNavbarConsulta handleClic={handleClic} />

        
        
        {loading === false ? (
          <form onChange={methods.handleSubmit(onSubmit)}>

          {/* PRECONSULTA */}

           {(handleNav === "Preconsulta" || "") && formData && formData.questions && (
            Object.keys(formData.questions).map((question, index) => (
            <PreconsultaQuestion
            key={index}
            question={question}
            section={formData.questions[question]}
            sectionIndex={index}
            onQuestionActive={handleQuestionActive}
            onSubquestionChange={handleSubquestionOption}
            onQuestionChange={handleQuestionOption}
            onDescriptionChange={handleDescription}
            preconsult={preconsult}
            />
             ))
            )}
           
           {/* ANAMNESIS Y ANTECEDENTES */}

            {handleNav ==="Anamnesis" &&
            <div>
            <Consulta
            title={"Datos del paciente"}
            paciente={patient}
            defaultOpen
            />
            <InputConsulta
            title={"Anamnesis"}
            subtitle={[
              "Motivo de consulta",
              "Evolucion de la enfermedad",
              "Sintomas importantes",
            ]}
            preconsult={preconsult}
            diagnostico={medicalEventExist}
            defaultOpen
            />
            <InputConsulta
            title={"Antecedentes"}
            risk={["Riesgo cardiovascular"]}
            risk2={["Riesgo Hipertensión Pulmonar"]}
            riskGroup={["Grupo HTP"]}
            groupHTP={["I", "II", "III", "IV", "V"]}
            options={["Bajo", "Moderado", "Alto", "Muy alto"]}
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
            defaultOpen
            paciente={patient}
            onRiskChange={setSelectedRisk}
            onRiskChange2={setSelectedRisk2}
            onGroupChange={setSelectedGroup}
            />
            </div> 
            }
            
            

            {/* ACA ESTA SIGNOS VITALES , ANTROPOMETRICOS Y GLICEMIA TODO LO DE EXAMEN FISICO  */}

            {handleNav === "ExamenFisico" &&
            <dvi>
               <SignosVitalesInfo
              title={"Signos vitales"}
              preconsult={preconsult}
              paciente={patient}
              defaultOpen
             
            />
            
            <div className="flex justify-center p-6 bg-[#fafafc]">
            <Elboton
            nombre={"Guardar"}
            icon={<IconGuardar/>}
            onPress={handleSaveVitalSigns}
            size={"sm"}
            className={"bg-greenPrimary w-40 text-sm font-bold"}
            />
            </div>


            <InputCuerpoPre
              title={"Exploracion fisica"}
              onBodyChange={handleBodyChange}
              bodySection={formData?.bodySection}
              defaultOpen
              valuePreconsultation={preconsult}
            />
            <div className="flex justify-center p-6 bg-[#fafafc]">
            <Elboton
            nombre={"Guardar"}
            icon={<IconGuardar/>}
            onPress={handleBodySave}
            size={"sm"}
            className={"bg-greenPrimary w-40 text-sm font-bold"}
            />
            </div>

            <InputExam
              title={"Examen fisico"}
              defaultOpen
              diagnostico={medicalEventExist}
            />
              
              </dvi>}
           

              {/*  DIAGNOSTICO Y TRATAMIENTO CON EVOLUCION */}
            {handleNav === "DiagnosticoyTratamiento" &&
            <div>
              <InputConsulta
              title={"Evolucion"}
              diagnostico={medicalEventExist}
              subtitle={["Anotaciones sobre la consulta"]}
              defaultOpen
            />
            <InputDiagnostico
              diagnostico={medicalEventExist}
              title={"Diagnósticos y tratamiento"}
              subtitle={[
                "Conducta terapeutica",
                "Tratamientos no farmacológicos",
                "Pauta de alarma",
              ]}
              defaultOpen
              subtitle2={["Diagnostico", "Procedimientos"]}
              subtitle3={"Medicamentos"}
            />
              </div>}
          
            {/* ESTUDIOS */}
            {handleNav === "Estudios" &&
            <InputFilePreconsultation
            title={"Estudios"}
            onUploadFile={handleUploadTestFile}
            onDescriptionChange={handleTestDescription}
            onTestActive={handleTestActive}
            onTestSelectedOption={handleTestSelectedOption}
            tests={tests}
            defaultOpen
          />
            }
            




            
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

