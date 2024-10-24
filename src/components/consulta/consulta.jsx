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
import { subquestionSelectedOption } from "@/redux/slices/user/preconsultaFormSlice";

import IdSubSystem from "@/utils/idSubSystem";
import IdHeartFailureRiskText from "@/utils/idHeartFailureRisk";
import SubNavbarConsulta from "@/components/NavDoc/subNavConsulta";
import getPatientDetail from "@/utils/dataFetching/fetching/getPatientDetail";
import patchPreconsultation from "@/utils/dataFetching/fetching/patchPreconsultation";
import getMedicalEventDetail from "@/utils/dataFetching/fetching/getMedicalEventDetail";
import IconExportar from "../icons/IconExportar";
import IconEditar from "../icons/iconEditar";
import IconOptions from "../icons/IconOptions";
import IconImportar from "../icons/IconImportar";
import MenuDropDown from "../dropDown/MenuDropDown";
import postPatientStudiesOrHc from "@/utils/dataFetching/fetching/postPetientStudiesOrHc";
import ModalModularizado from "../modal/ModalPatient/ModalModurizado";
import ImportarHC from "../modal/ModalDoctor/modalImportarHC";
import DynamicTable from "../table/DynamicTable";
import FileDisplay from "../modal/ModalDoctor/modalDisplayFile";
import SkeletonList from "../skeletons/HistorialSkeleton";
import patchPatientBackgrounds from "@/utils/dataFetching/fetching/postPatientBackgrounds";
import patchHTPRisk from "@/utils/dataFetching/fetching/patchHTPRisk";
import patchCardiovascularRisk from "@/utils/dataFetching/fetching/patchCardiovascularRisk";
import postPatientBackgrounds from "@/utils/dataFetching/fetching/postPatientBackgrounds";
import postPatientDiagnostic from "@/utils/dataFetching/fetching/postPatientDiagnostic";
import postPhysycalExam from "@/utils/dataFetching/fetching/postPatientPhysycalExam";
import patchPhysicalExam from "@/utils/dataFetching/fetching/patchPhysycalExam";
import patchPatientDiagnostic from "@/utils/dataFetching/fetching/patchPatientDiagnostic";
import patchMedicalEvent from "@/utils/dataFetching/fetching/patchMedicalEvent";
import htpGroup from "@/utils/dataFetching/fetching/htpGroup";
import ImportarMultiple from "../modal/ModalDoctor/modalImportarMultiple";



export default function ConsultaDoc({ id, preconsult }) {

  const orden = useAppSelector((state) => state.formSlice.selectedOptions);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = Cookies.get("a");
  const medicalEventId = Number(Cookies.get("medicalEventId"));
  const userId = Number(Cookies.get("patientId"));
  const scheduleId = Number(id); // id de agendamiento
  const [medicalEventExist, setMedicalEventExist] = useState();
  const [handleNav, setHandleNav] = useState("Anamnesis");



  //vital signs y glicemia
  const [vitalSignsPreconsult, setVitalSignsPreconsult] = useState([]);
  const [glicemiaPreconsult, setGlicemiaPreconsult] = useState([])
  const [flagVital, setFlagVital] = useState(false)

  const [flagBody, setFlagBody] = useState(false)
  //anamnesis y background
  const [anamnesis, setAnamnesis] = useState([]);
  const [background, setBackground] = useState();

  //risk y htp group
  const [cardiovascularRisk, setCardiovascularRisk] = useState();
  const [htpRisk, setHTPRisk] = useState();
  const [hpGroup, setHpGroup] = useState();
  const [selectedRisk, setSelectedRisk] = useState();
  const [selectedRisk2, setSelectedRisk2] = useState();

  //para importar archivos 
  const [dataImportar, setDataImportar] = useState({});
  const [errorsImport, setErrorsImport] = useState([]);
  const [text, setText] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flagFile, setFlagFile] = useState(false)
  const [importaciones, setImportaciones] = useState([])
  const [isModalOpenFile, setIsModalOpenFile] = useState(false);
  const [selectedImport, setSelectedImport] = useState({});

  //loading!!!
  const [isLoading, setIsLoading] = useState(true)

  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState();

  const [physicalExamination, setPhysicalExamination] = useState();
  const [physicalExaminationPatch, setPhysicalExaminationPatch] = useState();


  //diagnostic
  const [diagnostic, setDiagnostic] = useState();
  const [restofDiag, setRestofDiag] = useState()

  const [backgroundPatch, setBackgroundPatch] = useState();

  const [diagnosticPatch, setDiagnosticPatch] = useState();

  const [selectedGroup, setSelectedGroup] = useState();
  const [heartFailureRisk, setHeartFailureRisk] = useState();

  const [medicalEventPatch, setMedicalEventPatch] = useState();




  const methods = useForm();
  const formState = useAppSelector((state) => state.formSlice.selectedOptions);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);



  useEffect(() => {

    const intervalId = setInterval(() => {
      // handleAnamnesisSave()
      // handleBackgroundSave()
      handlePhysicalExam()
      handleDiagnostic()
      anamnesisCompleto()
      console.log("se ejecuto el autosave")
    }, 60000); // Guarda cada 60 segundos

    return () => {
      // handleAnamnesisSave()
      // handleBackgroundSave()
      handlePhysicalExam()
      handleDiagnostic()
      anamnesisCompleto()

      clearInterval(intervalId);

    };
  }, []);


  //UTIL NECESARIO PARA AUTOEVALUACION!!!
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




  useEffect(() => {
    setCardiovascularRisk({
      patientId: Number(userId),
      riskId: Number(selectedRisk),
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
      hpGroupId: [selectedGroup],
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
    // laboratoryResults: tests.laboratoryResults?.file || null,
    // laboratoryResultsDescription: tests.laboratoryResults?.description || "",
    // electrocardiogram: tests.electrocardiogram?.file || null,
    // electrocardiogramDescription: tests.electrocardiogram?.description || "",
    // rxThorax: tests.rxThorax?.file || null,
    // echocardiogram: tests.echocardiogram?.file || null,
    // walkTest: tests.walkTest?.file || null,
    // respiratoryFunctional: tests.respiratoryFunctional?.file || null,
    // tomographies: tests.tomographies?.file || null,
    // rightHeartCatheterization: tests.rightHeartCatheterization?.file || null,
    // ccg: tests.ccg?.file || null,
    // resonance: tests.resonance?.file || null,
    // leftHeartCatheterization: tests.leftHeartCatheterization?.file || null,
    // otherStudies: tests.otherStudies?.file || null,
    // pendingStudies: tests.pendingStudies?.description || "",
    // se tiene que aplicar una logica que cambia segun el patch o el post
    updateVitalSigns:
      vitalSignsPreconsult.length > 0 ? vitalSignsPreconsult : null,
  };


  const onSubmit = (data) => {
    //Antecedentes
    setBackground({
      patientId: Number(userId),
      medicalEventId: Number(medicalEventId),
      schedulingId: Number(scheduleId),
      allergicBackground: data["Alergias"],
      familyBackground:
        data["Antecedentes familiares"],
      nonPathologicBackground:
        data["Antecedentes no patologicos"],
      pathologicBackground:
        data["Antecedentes patologicos"],
      pediatricBackground:
        data["Antecedentes de juventud"],
      pharmacologicalBackground:
        data["Medicación actual"],
      surgicalBackground:
        data["Antecedentes quirúrgicos"],
      vaccinationBackground: data["Vacunas"],

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
      addBackgroundField("Antecedentes de juventud", "pediatricBackground");
      addBackgroundField("Medicación actual", "pharmacologicalBackground");
      addBackgroundField("Antecedentes quirúrgicos", "surgicalBackground");
      addBackgroundField("Vacunas", "vaccinationBackground");

      // Llamar a setBackgroundPatch con el objeto construido dinámicamente
      setBackgroundPatch(backgroundPatch);
    }
    //preconsulta
    const vitalSigns = [
      { measureType: 1, measure: Number(data["Temperatura"]) },
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
      { measureType: 8, measure: Number(data["Estatura"]) },
      { measureType: 9, measure: Number(data["Peso"]) },
      { measureType: 10, measure: Number(data["IMC"]) },
    ];
    const updateVitalSigns = vitalSigns.filter(
      (sign) => sign.measure !== 0 && sign.measure !== ""
    );

    setVitalSignsPreconsult(updateVitalSigns);
    setAnamnesis({
      //anamnesis sin evolucion de la enfermedad
      consultationReason:
        data["Motivo de consulta"] === ""
          ? preconsult?.consultationReason
          : data["Motivo de consulta"],
      importantSymptoms:
        data["Sintomas importantes"] === ""
          ? preconsult?.importantSymptoms
          : data["Sintomas importantes"],
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



    setDiagnostic({
      patientId: Number(userId),
      medicalEventId: Number(medicalEventId),
      medicalProcedureName: data["Procedimientos"],
      descriptionIndication: data["Tratamientos no farmacológicos"],
    });

    setRestofDiag({
      id: Number(medicalEventId),
      treatmentPlan: data["Conducta terapeutica"],
      chiefComplaint: data["Evolucion"],
      historyOfPresentIllness: data["Evolucion"],
      alarmPattern: data["Pautas de alarma"],
      diagnostic: orden?.diagnostic,
      physicianComments: data["Descripción del Diagnóstico"],
      diagnosticNotes: data["Descripción del Diagnóstico"],
    })





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
      // "Evolucion de la enfermedad",
      "Anotaciones de la consulta",
      "historyOfPresentIllness"
    );
    addMedicalEventField(
      // "Evolucion de la enfermedad",
      "Anotaciones de la consulta",
      "chiefComplaint"
    );
    addMedicalEventField("Pauta de alarma", "alarmPattern");
    // addMedicalEventField("Sintomas importantes", "reviewOfSystems");
    // addMedicalEventField("Motivo de consulta", "chiefComplaint");
    addMedicalEventField("Tratamientos no farmacológicos", "treatmentPlan");

    // Llamar a setMedicalEventPatch con el objeto construido dinámicamente
    setMedicalEventPatch(medicalEventPatch);
  };


  //GETS de la data que necesito T_T
  const fetchPatientDetail = async (userId) => {
    try {
      const response = await getPatientDetail(userId)
      setPatient(response);
    } catch (error) {
      console.error("No existe este paciente", error);
    }
  };

  const fetchMedicalEvent = async (scheduleId) => {
    try {

      const response = await getMedicalEventDetail(scheduleId)
      setMedicalEventExist(response.data);
      if (response.data) {
        setImportaciones(response.data.patientStudies)
        setIsLoading(false)
      }
    } catch (error) {
      console.error("No se ah echo un diagnostico anteriormente:", error);
    }
  };



  //-------------------------------------------------------------------------------
  //Handles que necesito para patch de data 
  const necesaryData = {
    // ids
    preconsultationId: Number(preconsult?.id),
    patient: Number(userId),
    appointmentSchedule: Number(scheduleId),
    // status
    status: "sent"
  }
  const handleSaveVitalSigns = async () => {
    try {
      const data = {
        ...necesaryData,
        updateVitalSigns:
          vitalSignsPreconsult.length > 0 ? vitalSignsPreconsult : null,
        ...glicemiaPreconsult,
      }

      const response = await patchPreconsultation(data)
      if (response.data) {
        setFlagVital(true)
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Se han guardado los signos vitales",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        });
      }

    } catch (error) {
      console.error("No pudo cargarse la data de signos vitales en el servidor", error.message)
      Swal.fire({
        icon: "error",
        title: "Error ",
        text: "Error al cargar los signos vitales",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setFlagVital(false)
    }
  }
  const handleBodySave = async () => {
    try {
      const data = {
        ...necesaryData,
        painRecordsToUpdate: [bodyOBJFormat],
      }

      const response = await patchPreconsultation(data)

      if (response.data) {
        setFlagBody(true)
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Se han guardado los cambios en Autoevaluación",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        });

      }
    } catch (error) {
      console.error("No pudo cargarse la data en el servidor", error.message)
      Swal.fire({
        icon: "error",
        title: "Error ",
        text: "Error al cargar los cambios",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setFlagBody(false)
    }


  }
  const handlePhysicalExam = async () => {
    try {
      const data = {
        ...necesaryData,
        updateVitalSigns:
          vitalSignsPreconsult.length > 0 ? vitalSignsPreconsult : null,
        ...glicemiaPreconsult,
        painRecordsToUpdate: [bodyOBJFormat],
      }

      const response = await postPhysycalExam(physicalExamination)
      const response2 = await patchPhysicalExam(userId, physicalExaminationPatch)
      const response3 = await patchPreconsultation(data)


    } catch (error) {
      console.error(error.message)
    }

  }

  const handleBackgroundSave = async (background) => {
    try {

      if (background !== undefined || background !== null) {
        const response = await postPatientBackgrounds(background);
      }

    } catch (error) {
      console.error('Error saving background:', error);
    }
  };

  const handleHtpRiskSave = async (htpRisk) => {
    try {

      const response = await patchHTPRisk(htpRisk);

    } catch (error) {

    }
  };

  const handleCardioVascularSave = async (cardiovascularRisk) => {
    try {

      const response = await patchCardiovascularRisk(cardiovascularRisk);

    } catch (error) {
      console.error('Error saving cardiovascular risk:', error);
    }
  };

  const handleAnamnesisSave = async (anamnesisData) => {
    try {
      const response = await patchPreconsultation(anamnesisData);

    } catch (error) {
      console.error('Error saving anamnesis:', error);
    }
  };

  const anamnesisCompleto = async () => {
    try {
      const responseR = await patchHTPRisk(htpRisk);
      const responseB = await postPatientBackgrounds(background)
      const responseA = await patchPreconsultation({ ...necesaryData, ...anamnesis });
      const responseC = await patchCardiovascularRisk(cardiovascularRisk);
      const responseG = await htpGroup(hpGroup)
    } catch (error) {
      console.error('Error completing anamnesis:', error);
    }
  };

  const handleDiagnostic = async () => {
    try {


      const response2 = await patchMedicalEvent(restofDiag)
      const response = await postPatientDiagnostic(diagnostic)

    } catch (error) {
      console.error(error.message)
    }
  }





  useEffect(() => {

    fetchPatientDetail(userId);
    fetchMedicalEvent(scheduleId);
  }, []);

  const handleBodyChange = (name, value) => {
    dispatch(updateBodyPainLevel({ name, option: value }));
  };



  const handleSave = async () => {
    setLoading(true);
    // const responses = [];
    // // Ruta de antecedentes - funciona patch y post
    // let response1;
    // if (background !== undefined) {
    //   if (patient?.backgrounds?.length === 0 || patient?.backgrounds === null) {
    //     response1 = await ApiSegimed.post(
    //       `/backgrounds/create-backgrounds`,
    //       background,
    //       { headers: { token: token } }
    //     );
    //   } else {
    //     response1 = await ApiSegimed.patch(
    //       `/backgrounds/update-backgrounds?id=${userId}`,
    //       backgroundPatch,
    //       { headers: { token: token } }
    //     );
    //   }
    // }
    // if (response1 !== undefined) {
    //   responses.push(response1);
    // }

    // // Riesgo cardiovascular - funciona patch y post
    // let response2;
    // if (
    //   patient?.patientCardiovascularRisks === null &&
    //   cardiovascularRisk.riskId > 0
    // ) {
    //   response2 = await ApiSegimed.post(
    //     `/patient-new-cardiovascular-risk`,
    //     cardiovascularRisk,
    //     { headers: { token: token } }
    //   );
    // } else if (cardiovascularRisk.riskId > 0) {
    //   response2 = await ApiSegimed.patch(
    //     `/patient-update-cardiovascular-risk`,
    //     cardiovascularRisk,
    //     { headers: { token: token } }
    //   );
    // }
    // if (response2 !== undefined) {
    //   responses.push(response2);
    // }

    // // Riesgo quirúrgico - funciona patch y post
    // let response3;
    // if(
    //   htpRisk.pulmonaryHypertensionRiskId > 0
    // )  {
    //   response3 = await ApiSegimed.patch(
    //     `/patient-update-surgical-risk`,
    //     htpRisk
    //   );
    // }
    // if (response3 !== undefined) {
    //   responses.push(response3);
    // }

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

    // // Examen físico - funciona patch y post
    // let response5;
    // if (
    //   medicalEventExist?.physicalExaminations?.length === 0 &&
    //   physicalExamination?.physicalSubsystemId !== 0 &&
    //   physicalExamination !== undefined
    // ) {
    //   response5 = await ApiSegimed.post(
    //     `/patient-physical-examination`,
    //     physicalExamination,
    //     { headers: { token: token } }
    //   );
    // } else if (
    //   physicalExaminationPatch?.physicalSubsystemId !== 0 &&
    //   physicalExaminationPatch !== undefined
    // ) {
    //   response5 = await ApiSegimed.patch(
    //     `/patient-physical-examination?id=${userId}`,
    //     physicalExaminationPatch,
    //     { headers: { token: token } }
    //   );
    // }
    // if (response5 !== undefined) {
    //   responses.push(response5);
    // }

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


  //SELECT DE CONSULTA NAVBAR
  const handleClic = (title) => {

    setHandleNav(title);
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (title === "Anamnesis" && !hasReloaded) {
      // Si selecciona "anamnesis" y no se ha recargado antes, recargar la página
      localStorage.setItem("hasReloaded", "true"); // Establecer la bandera
      window.location.reload();
    } else if (title !== "Anamnesis") {
      // Si selecciona otra opción, eliminar la bandera de recarga
      localStorage.removeItem("hasReloaded");

    }

  };

  //IMPORTAR ARCHIVOS 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalData = (data) => {
    setDataImportar(data);
  };
  const closeModalFile = () => {
    setIsModalOpenFile(false);
  };


  const submitModalData = async () => {
    if (!dataImportar || dataImportar.length === 0) {
      return setErrorsImport([{ message: 'No hay datos para importar.' }]); // Retorna el error si no hay estudios
    }

    const errors = [];

    // Validación: Iterar sobre el array dataImportar y verificar los campos
    dataImportar.forEach((item, index) => {
      let itemErrors = {}; // Errores para cada objeto

      if (!item.title) {
        itemErrors.title = `El título es requerido .`;
      }

      if (!item.study) {
        itemErrors.content = `Debe haber al menos un estudio.`;
      }
      if (!item.description) {
        itemErrors.description = `Debe haber al menos una descripción.`;
      }


      if (Object.keys(itemErrors).length > 0) {
        errors[index] = itemErrors;
      }
    });

    // Si hay errores, retornar y salir de la función
    if (errors.length > 0) {
      setErrorsImport(errors);
      return; // Salir si hay errores
    }
    const payload = { scheduleId: scheduleId, userId: userId, studies: dataImportar };

    console.log(payload);
    try {
      // Realizar la petición POST

      const response = await postPatientStudiesOrHc(payload)

      // Después de la petición POST, hacer un GET para obtener los estudios del paciente usando query parameters
      const getResponse = await ApiSegimed.get(`/patient-studies?userId=${userId}&scheduleId=${scheduleId}`);

      // Setear los datos obtenidos en setImportaciones
      if (getResponse.data) {
        setImportaciones(getResponse.data);
      }



      // Cerrar el modal después de la petición
      setIsModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "La importacion se realizo correctamente",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error.message);
      setIsModalOpen(false);
      Swal.fire({
        title: "Error",
        text: "No pudo realizarse la importacion, intente mas tarde",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });

    }

  }
  //LISTAR LAS IMPORTACIONES !!
  const ImportacionesColumns = [
    {
      label: "Fecha",
      key: "createdAt",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "createdAt",
      showMobile: true,
      width: "w-8",
    },

    {
      label: "Titulo",
      key: "title",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Descripcion",
      key: "description",
      showMobile: false,
      width: "w-16",
    },
  ];







  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full overflow-y-auto bg-[#fafafc]">
        <SubNavbarConsulta handleClic={handleClic} id={scheduleId} preconsult={preconsult} />

        <MenuDropDown
          label="Importar archivo"
          icon={<IconExportar color="#487FFA" />}
          classNameButton={"border-[#487FFA] border-2 bg-[#FFFFFF] text-start text-[#487FFA] font-bold text-base leading-5"}
          categories={[
            {
              items: [
                {
                  label: "Importar texto libre",
                  onClick: () => {
                    setText(true);
                    openModal()
                  },
                  icon: <IconEditar color={"#B2B2B2"} />,
                },
                {
                  label: "Importar archivo",
                  onClick: () => {
                    setText(false);
                    openModal()
                    setFlagFile(true)


                  },
                  icon: <IconExportar color={"#B2B2B2"} />,
                },

              ],
            }
          ]
          }
        />

        {loading === false ? (
          <form onChange={methods.handleSubmit(onSubmit)}>



            {/* ANAMNESIS Y ANTECEDENTES */}

            {handleNav === "Anamnesis" &&
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
                    "Antecedentes de juventud",
                    "Medicación actual",
                    "Alergias",
                    "Vacunas",
                  ]}
                  defaultOpen
                  paciente={patient}
                  onRiskChange={setSelectedRisk}
                  onRiskChange2={(newRisk2) => setSelectedRisk2(newRisk2)}
                  onGroupChange={setSelectedGroup}
                />

                <div className="flex justify-center p-6 bg-[#fafafc]">
                  <Elboton
                    nombre={"Guardar Cambios"}
                    icon={<IconGuardar />}
                    onPress={() => {
                      anamnesisCompleto()
                      Swal.fire({
                        icon: "success",
                        title: "Exito",
                        text: "Se han guardado los cambios",
                        confirmButtonColor: "#487FFA",
                        confirmButtonText: "Aceptar",
                      });
                    }}
                    size={"lg"}
                    className={"bg-greenPrimary w-60 text-sm font-bold"}
                  />
                </div>
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
                  flag={flagVital}

                />

                <div className="flex justify-center p-6 bg-[#fafafc]">
                  <Elboton
                    nombre={"Guardar"}
                    icon={<IconGuardar />}
                    onPress={handleSaveVitalSigns}
                    size={"sm"}
                    className={"bg-greenPrimary w-40 text-sm font-bold"}
                  />
                </div>


                <InputCuerpoPre
                  title={"Autoevaluación del paciente"}
                  onBodyChange={handleBodyChange}
                  bodySection={formData?.bodySection}
                  defaultOpen
                  valuePreconsultation={preconsult}
                  flag={flagBody}
                />
                <div className="flex justify-center p-6 bg-[#fafafc]">
                  <Elboton
                    nombre={"Guardar"}
                    icon={<IconGuardar />}
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



                <div className="flex justify-center p-6 bg-[#fafafc]">
                  <Elboton
                    nombre={"Guardar Cambios"}
                    icon={<IconGuardar />}
                    onPress={() => {
                      handlePhysicalExam()
                      Swal.fire({
                        icon: "success",
                        title: "Exito",
                        text: "Se han guardado los cambios",
                        confirmButtonColor: "#487FFA",
                        confirmButtonText: "Aceptar",
                      });


                    }}
                    size={"lg"}
                    className={"bg-greenPrimary w-60 text-sm font-bold"}
                  />
                </div>


              </dvi>}


            {/*  DIAGNOSTICO Y TRATAMIENTO CON EVOLUCION */}
            {handleNav === "DiagnosticoyTratamiento" &&
              <div>
                <InputConsulta
                  title={"Evolución de la Enfermedad"}
                  diagnostico={medicalEventExist}
                  subtitle={["Evolucion"]}
                  defaultOpen
                />
                <InputDiagnostico
                  orden={orden}
                  diagnostico={medicalEventExist}
                  title={"Descripción del Diagnóstico"}
                  subtitle={[
                    "Descripción del Diagnóstico",
                    "Conducta terapeutica",
                    "Tratamientos no farmacológicos",
                    "Procedimientos",
                    "Pautas de alarma"
                  ]}
                  defaultOpen
                  subtitle2={["Diagnóstico"]}

                />


                <div className="flex justify-center p-6 bg-[#fafafc]">
                  <Elboton
                    nombre={"Guardar"}
                    icon={<IconGuardar />}
                    onPress={() => {
                      handleDiagnostic()
                      Swal.fire({
                        icon: "success",
                        title: "Exito",
                        text: "Se han guardado los cambios",
                        confirmButtonColor: "#487FFA",
                        confirmButtonText: "Aceptar",
                      });
                    }}
                    size={"lg"}
                    className={"bg-greenPrimary w-60 text-sm font-bold"}
                  />
                </div>

              </div>


            }




            {/* ESTUDIOS */}
            {handleNav === "Estudios" &&
              <DynamicTable
                title={"Lista de Importaciones"}
                rows={importaciones}
                columns={ImportacionesColumns}
                showHistoryIcon={true}
                renderDropDown={(row) => {
                  return (
                    <MenuDropDown
                      label="Opciones"
                      icon={<IconOptions color="white" />}
                      categories={[
                        {
                          items: [
                            {
                              label: "Ver Detalles",
                              icon: <IconOptions color={"#B2B2B2"} />,
                              onClick: () => {
                                setSelectedImport(row);
                                setFlagFile(false)
                                setIsModalOpen(true);

                              },
                            },
                            {
                              label: "Ver archivo",
                              icon: <IconImportar color={"#B2B2B2"} />,
                              onClick: () => {
                                setSelectedImport(row);
                                setIsModalOpenFile(true);
                              },
                            },
                          ].filter(Boolean),
                        },
                      ]}
                      className={"w-[40px] md:w-full lg:w-fit mx-auto"}
                    />
                  );
                }}

              />
            }


            {/* PRECONSULTA */}

            {(handleNav === "Preconsulta" || "") && formData && formData.questions && (
              Object.keys(formData.questions).map((question, index) => (
                <PreconsultaQuestion
                  key={index}
                  question={question}
                  section={formData.questions[question]}
                  sectionIndex={index}
                  preconsult={preconsult}
                />
              ))
            )}




          </form>
        ) : (
          <div className="flex items-center justify-center h-20">
            <LoadingFallback />
          </div>
        )}
        {handleNav === "Estudios" && !flagFile ? (
          <ModalModularizado
            isOpen={isModalOpen}
            onClose={closeModal}
            Modals={[
              <ImportarHC key={"importar hc"} state={selectedImport} disabled={true} />,
            ]}
            title={"Ver detalles de importacion"}
            button1={"hidden"}
            button2={"bg-greenPrimary text-white block"}
            progessBar={"hidden"}
            size={"md:min-h-[4rem] md:w-[35rem]"}
            buttonText={{ end: `Cerrar` }}
            buttonIcon={<></>}
          />
        ) : (
          text ? (
            <ModalModularizado
              isOpen={isModalOpen}
              onClose={closeModal}
              titleClassName={"text-[#686868]"}
              Modals={[
                <ImportarHC
                  key={"importar hc"}
                  onData={handleModalData}
                  text={text}
                />,
              ]}
              title={"Importar Historia Clínica"}
              button1={"hidden"}
              button2={"bg-greenPrimary text-white block"}
              progessBar={"hidden"}
              size={"h-fit text-white md:h-fit md:w-[33rem]"}
              buttonText={{ end: `Importar` }}
              funcion={submitModalData}
            />
          ) : (
            <ModalModularizado
              isOpen={isModalOpen}
              onClose={closeModal}
              titleClassName={"text-[#686868]"}
              Modals={[
                <ImportarMultiple key={"importar hc"} onData={handleModalData} errors={errorsImport} />,
              ]}
              title={"Importar Historia Clínica"}
              button1={"hidden"}
              button2={"bg-greenPrimary text-white block"}
              progessBar={"hidden"}
              size={" text-white max-h-[35rem] min-h-[15rem] md:w-[55rem]"}
              buttonText={{ end: `Importar` }}
              funcion={submitModalData}
            />
          )
        )}


        <ModalModularizado
          isOpen={isModalOpenFile}
          onClose={closeModalFile}
          Modals={[
            <FileDisplay key={"displayFile"} state={selectedImport} />,
          ]}
          title={"Visualizacion de archivo"}
          button1={"hidden"}
          button2={"bg-greenPrimary text-white block"}
          progessBar={"hidden"}
          size={"md:min-h-[4rem] md:w-[35rem]"}
          buttonText={{ end: `Cerrar` }}
          buttonIcon={<></>}
        />
      </div>
    </FormProvider>
  );
};

