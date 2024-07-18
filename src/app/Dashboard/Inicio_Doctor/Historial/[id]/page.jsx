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

const DetallePaciente = (id) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = id.params.id;
  const scheduleId = 1; // revisar por que cambiar por params

  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState();
  const [preconsult, setPreconsult] = useState();
  const [physicalExamination, setPhysicalExamination] = useState({
    physicalSubsystemId: null,
    description: "",
    medicalEventId: null,
  });
  const [preconsultPhysical, setPreconsultPhysical] = useState();
  const [cardiovascularRisk, setCardiovascularRisk] = useState();
  const [surgicalRisk, setSurgicalRisk] = useState();
  const [hpGroup, setHpGroup] = useState();
  const [background, setBackground] = useState();
  const [diagnostic, setDiagnostic] = useState();
  const [selectedRisk, setSelectedRisk] = useState();
  const [selectedRisk2, setSelectedRisk2] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [medicalEvent, setMedicalEvent] = useState();
  const [tests, setTests] = useState({});

  const methods = useForm();
  const formState = useAppSelector((state) => state.formSlice.selectedOptions);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);

  console.log(formState);
  console.log(formData);
  
  const bodyOBJFormat = {
    painOwnerId: Number(userId),
    schedulingId: Number(scheduleId),
    medicalEventId: null,
    isTherePain: formData.bodySection.selectedOptions.pain,
    painDurationId: formData.bodySection.selectedOptions.painTime,
    painScaleId: formData.bodySection.selectedOptions.painLevel,
    painTypeId: formData.bodySection.selectedOptions.painType,
    painAreas: formData.bodySection.selectedOptions.painAreas,
    painFrequencyId: formData.bodySection.selectedOptions.frecuencia,
    isTakingAnalgesic: formData.bodySection.selectedOptions.analgesicos,
    doesAnalgesicWorks: formData.bodySection.selectedOptions.calmaAnalgesicos,
    isWorstPainEver: formData.bodySection.selectedOptions.peorDolor,
  };

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

  const onSubmit = (data) => {
    console.log(data);
    //Antecedentes completo
    setCardiovascularRisk({
      patientId: Number(userId),
      riskId: selectedRisk,
    });
    setSurgicalRisk({
      patientId: Number(userId),
      surgicalRiskId: selectedRisk2,
    });
    setHpGroup({
      patientId: Number(userId),
      hpGroupId: selectedGroup,
    });
    setBackground({
      id: patient?.backgrounds?.id || null,
      allergicBackground:
        data["Alergias"] === ""
          ? patient?.backgrounds?.allergicBackground
          : data["Alergias"],
      familyBackground:
        data["Antecedentes familiares"] === ""
          ? patient?.backgrounds?.familyBackground
          : data["Antecedentes familiares"],
      medicalEvent:
        data["Anotaciones de la consulta"] === ""
          ? patient?.backgrounds?.medicalEvent
          : data["Anotaciones de la consulta"],
      nonPathologicBackground:
        data["Antecedentes no patologicos"] === ""
          ? patient?.backgrounds?.nonPathologicBackground
          : data["Antecedentes no patologicos"],
      pathologicBackground:
        data["Antecedentes patologicos"] === ""
          ? patient?.backgrounds?.pathologicBackground
          : data["Antecedentes patologicos"],
      pediatricBackground:
        data["Antecedentes de infancia"] === ""
          ? patient?.backgrounds?.pediatricBackground
          : data["Antecedentes de infancia"],
      pharmacologicalBackground:
        data["Medicamentos actuales"] === ""
          ? patient?.backgrounds?.pharmacologicalBackground
          : data["Medicamentos actuales"],
      surgicalBackground:
        data["Antecedentes quirúrgicos"] === ""
          ? patient?.backgrounds?.surgicalBackground
          : data["Antecedentes quirúrgicos"],
      vaccinationBackground:
        data["Vacunas"] === ""
          ? patient?.backgrounds?.vaccinationBackground
          : data["Vacunas"],
    });
    //preconsulta
    setPreconsultPhysical({
      patient: Number(userId),
      appointmentSchedule: Number(scheduleId),
      //exploracion fisica
      painRecordsToCreate: [
        bodyOBJFormat,
      ],
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
      lastAbnormalGlycemia: [526, 589, 600],

      // se tiene que aplicar una logica que cambia segun el patch o el post
      vitalSignsToCreate:[
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
        }
        ,
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
        }
      ]
    });
    setPhysicalExamination({
      physicalSubsystemId: formState.selectSubsistema,
      description: data["inputSubsistema"] ? data["inputSubsistema"] : "",
      medicalEventId: 5,
    });
    setDiagnostic({
      patientId: Number(userId),
      diseaseId: 3,
      diagnosticNotes: data["Diagnostico"],
      medicalEventId: 5,
      drugId: data["selectDrug"] ? IdDrug(data["selectDrug"]) : null,
      prescribedDose: "",
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
      physicianComments: data["Anotaciones de la consulta"], ///evolucion
      schedulingId: Number(scheduleId), /// el id del agendamiento
      chiefComplaint: null,// motivo de consulta
      historyOfPresentIllness: data["Evolucion de la enfermedad"], /// enfermedad actual
      reviewOfSystems: null, /// revision por sistemas o sintomas
      treatmentPlan: null, /// plan de tratamiento
      pendingDiagnosticTest : null, // test pendientes
      alarmPattern: data["Pauta de alarma"], // patron de alarma
     
    })
  };

  useEffect(() => {
    const token = Cookies.get("a");
    const fetchData = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          ApiSegimed.get(`/patient-details?id=${userId}`, {
            headers: { token: token },
          }),
          ApiSegimed.get(
            `/get-all-pateint-preconsultation?patientId=${userId}`,
            { headers: { token: token } }
          ),
        ]);

        console.log(response2.data);
        setPreconsult(response2.data[0]);
        setPatient(response1.data);
        setTests({
        laboratoryResults: {
          title: "Resultados de laboratorio",
          file: response2.data[0].laboratoryResults || null,
          description: "",
          active: false,
        },
        electrocardiogram: {
          title: "Electrocardiograma",
          file:  response2.data[0].electrocardiogram || null,
          description: "",
          active: false,
        },
        rxThorax: {
          title: "RX de Torax",
          file: response2.data[0].rxThorax || null,
          description: "",
          active: false,
        },
        echocardiogram: {
          title: "Ecocardiograma",
          file: response2.data[0].echocardiogram || null,
          description: "",
          active: false,
        },
        walkTest: {
          title: "Test de caminata",
          file: response2.data[0].walkTest || null,
          description: "",
          active: false,
        },
        respiratoryFunctional: {
          title: "Funcional respiratorio",
          file: response2.data[0].respiratoryFunctional || null,
          description: "",
          active: false,
        },
        tomographies: {
          title: "Tomografías",
          file: response2.data[0].tomographies || null,
          description: "",
          active: false,
        },
        rightHeartCatheterization: {
          title: "Cateterismo cardiaco derecho",
          file: response2.data[0].rightHeartCatheterization || null,
          description: "",
          active: false,
        },
        ccg: {
          title: "CCG (Coronariografia)",
          file: response2.data[0].ccg || null,
          description: "",
          active: false,
        },
        resonance: {
          title: "Resonancia",
          file: response2.data[0].resonance || null,
          description: "",
          active: false,
        },
        leftHeartCatheterization: {
          title: "Cateterismo cardiaco izquierdo",
          file: response2.data[0].leftHeartCatheterization || null,
          description: "",
          active: false,
        },
        otherStudies: {
          title: "Otros estudios",
          file: response2.data[0].otherStudies || null,
          description: "",
        },
        pendingStudies: {
          title: "Estudios pendientes",
          description: response2.data[0].pendingStudies || "",
        },
      });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleBodyChange = (name, value) => {
    dispatch(updateBodyPainLevel({ name, option: value }));
  };

  const handleSave = async () => {
    const token = Cookies.get("a");
    setLoading(true);
    if (patient?.backgrounds?.length === 0 || patient?.backgrounds === null) {
      const data = await ApiSegimed.post(
        `/backgrounds/update-backgrounds`,
        background,
        { headers: { token: token } }
      );
      console.log(data);
    } else {
      const data = await ApiSegimed.patch(
        `/backgrounds/update-backgrounds?id=${userId}`,
        background,
        { headers: { token: token } }
      );
      console.log(data);
    }
    console.log(cardiovascularRisk);
    if (patient?.patientCardiovascularRisks[0]?.length === 0) {
      const data = await ApiSegimed.post(
        `/patient-new-cardiovascular-risk`,
        cardiovascularRisk,
        { headers: { token: token } }
      );
      console.log(data);
    } else {
      const data = await ApiSegimed.patch(
        `/patient-update-cardiovascular-risk`,
        cardiovascularRisk,
        { headers: { token: token } }
      );
      console.log(data);
    }

    if (patient?.patientSurgicalRisks[0]?.length === 0) {
      const data = await ApiSegimed.post(
        `/patient-new-surgical-risk`,
        surgicalRisk,
        { headers: { token: token } }
      );
      console.log(data);
    } else {
      const data = await ApiSegimed.patch(
        `/patient-update-surgical-risk`,
        surgicalRisk,
        { headers: { token: token } }
      );
      console.log(data);
    }
    console.log(hpGroup);
    if (patient?.patientPulmonaryHypertensionGroups[0]?.length === 0) {
      const data = await ApiSegimed.post(`/patient-new-hp-group`, hpGroup, {
        headers: { token: token },
      });
      console.log(data);
    } else {
      const data = await ApiSegimed.patch(`/patient-update-hp-group`, hpGroup, {
        headers: { token: token },
      });
      console.log(data.data);
    }

    

    let response1;
    if(physicalExamination?.description === ""){
      response1 = await ApiSegimed.post(`/patient-physical-examination`,physicalExamination, {headers: { token: token },})
    }else {
    response1 = await ApiSegimed.patch(`/patient-physical-examination?id=${userId}`,physicalExamination, {headers: { token: token },})
    }
    console.log(response1);
/*
    if(preconsult?.length === 0){
      const data = await ApiSegimed.post(`/pre-consultation`,preconsultPhysical, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/update-pre-consultation`,preconsultPhysical, {headers: { token: token },})
      console.log(data.data);
    } // hay q esperar que modifiquen el patch de la preconsulta
*/ 


    const response2 = await ApiSegimed.post(`/patient-diagnostic`, diagnostic, {
      headers: { token: token },
 
    });
  

    /*const response3 = await ApiSegimed.post(`/medical-event/create-event`, diagnostic, {
      headers: { token: token },
    });
    */ // hay q esperar que la preconsulta traiga el id


    if (response1.status === 200 &&  response2.status === 200) {
      /*const data = await ApiSegimed.patch(
        `/patient-diagnostic/${idSchedule}`,{schedulingStatus:2},{
          headers: { token: token },
        }
      )*/ //cambia es estatus de la consulta --- hay q esperar que la preconsulta traiga el id
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "Se ha creado la consulta",
      });
      router.push(`/Dashboard/Inicio_Doctor/Historial`);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error ",
        text: "Error al crear la consulta",
      });
    }
  };
  if (!userId) {
    return <div>Cargando...</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full overflow-y-auto ">
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
        {loading === false ? (
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
            />
            <SignosVitalesInfo
              title={"Signos vitales"}
              paciente={patient}
              preconsult={preconsult}
            />
            <InputCuerpoPre
            title={"Exploracion fisica"}
            onBodyChange={handleBodyChange}
            defaultOpen
            />
            <InputExam title={"Examen fisico"} />
            {/*<InputConsulta title={"Comentarios"} subtitle={["Anotaciones"]} />*/}
            {/*<InputFile title={"Estudios"} Links={preconsult} />*/}
            <InputFilePreconsultation
              title={"Estudios"}
              onUploadFile={handleUploadTestFile}
              onDescriptionChange={handleTestDescription}
              onTestActive={handleTestActive}
              onTestSelectedOption={handleTestSelectedOption}
              tests={tests}
              defaultOpen
            />
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
              subtitle2={["Diagnostico","Procedimientos"]}
              subtitle3={"Medicamentos"}
            />
          </form>
        ) : (
          <div className="flex items-center justify-center h-20">
            <LoadingFallback />
          </div>
        )}
        <div className="flex justify-center m-6">
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
