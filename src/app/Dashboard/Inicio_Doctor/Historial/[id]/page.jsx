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
    physicalSubsystemId: null,
    description: "",
    medicalEventId: null,
  });
  const [vitalSigns, setVitalSigns] = useState();
  const [preconsultPhysical, setPreconsultPhysical] = useState();
  const [cardiovascularRisk, setCardiovascularRisk] = useState();
  const [surgicalRisk, setSurgicalRisk] = useState();
  const [hpGroup, setHpGroup] = useState();
  const [background, setBackground] = useState();
  const [diagnostic, setDiagnostic] = useState();
  const [selectedRisk, setSelectedRisk] = useState();
  const [selectedRisk2, setSelectedRisk2] = useState();
  const [selectedGroup, setSelectedGroup] = useState();

  const methods = useForm();
  const formState = useAppSelector((state) => state.formSlice.selectedOptions);
  const router = useRouter();
  console.log(selectedGroup);
  console.log(selectedRisk2);
  console.log(selectedGroup);
  const onSubmit = (data) => {
    console.log(data);
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
    setPreconsultPhysical({
      preconsultationId: preconsult.id,
      patient: Number(userId),
      appointmentSchedule: 4,
      bodyPain: false,
      abnormalGlycemia:
        data["glucemiaElevada"] === ""
          ? preconsult?.abnormalGlycemia
          : data["glucemiaElevada"],
      lastAbnormalGlycemia: [526, 589, 600],
      physicalExamination: 1,
      laboratoryResults: ["https:cloudinary1", "https:cloudinary2"],
      laboratoryResultsDescription: ["description1", "description2"],
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
      otherStudies: ["other study 1", "other study 2"],
      consultationReason:
        data["Motivo de consulta"] === ""
          ? preconsult?.consultationReason
          : data["Motivo de consulta"],
      importantSymptoms:
        data["Sintomas importantes"] === ""
          ? preconsult?.importantSymptoms
          : data["Sintomas importantes"],
      currentMedications: ["medicamento1", "medicamento2", "medicamento3"],
    });
    setVitalSigns([
      {
        patientId: Number(userId), // id del paciente
        measureType: 7, // id del parametro "frecuencia cardiaca" en el catalogo vital signs
        measure: data["Presión Arterial Diastólica"], // medida introducida por el médico o paciente,
        schedulingId: null, /// id del scheduling si se crea en preconsulta
        medicalEventId: 4, /// id del medical event si se crea durante medical event
      },
      {
        patientId: userId,
        measureType: 7,
        measure: data["Presión Arterial Sistólica"],
        schedulingId: null,
        medicalEventId: 4,
      },
      {
        patientId: userId,
        measureType: 7,
        measure: data["Saturación de Oxígeno"],
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
        measure: data["Frecuencia Respiratoria"],
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
    ]);
    setPhysicalExamination({
      physicalSubsystemId: 2,
      description: data["inputSubsistema"] ? data["inputSubsistema"] : "",
      medicalEventId: 5,
    });
    setDiagnostic({
      patientId: Number(userId),
      diseaseId: 3,
      diagnosticNotes: data["Diagnostico"],
      medicalEventId: 5,
      drugId: 1,
      prescribedDose: data["Medicamentos"],
      quantityDrug: 60,
      medicalProcedureId: 4,
      //diagnosticNotes: data["Procedimientos"],
      therapyId: 2,
      descriptionTherapy: data["Conducta terapeutica"],
      quantityTherapy: 10,
      descriptionIndication: data["Tratamientos no farmacológicos"],
    });
    setMedicalEvent({        
      physicianComments: data["Evolucion de la enfermedad"], ///evolucion
      schedulingId: 54, /// el id del agendamiento
      chiefComplaint: "Remitido por Medicina Interna por hipertension Pulmonar",// motivo de consulta
      historyOfPresentIllness: "Paciente con Diagnóstico de HAP idiopática, con variables de alto riesgo.FRCV: flutter auricular, Insuficiencia cardiaca Fevi 76%. Múltiples internaciones por insuficiencia Cardiaca Derecha. Internación reciente por infusión súbita por treprostinil con efectos adversos asociados. Internacion 06/02/24 - 13/02/24 por hiponatremia severa sintomatica Na 106, hipocalcemia, infeccion de piel y partes blandas MSI. Acude el día de hoy a control.", /// enfermedad actual
      reviewOfSystems: "Disnea a 500mts", /// revision por sistemas o sintomas
      treatmentPlan: "Paciente con diagnostico de hipertensión arterial pulmonar idiopática, con variables de alto riesgo. Dilatación severa de cavidades derechas, remodelado negativo de las mismas. Continua con signos de insuficiencia cardíaca actuales y hemodinamia de alto riesgo (PAD 19 mm HG, IC 1,57 l/min/mt, IVS 23, Sat AP 54%).Continua con diuretico, actualmente con triple esquema de tratamiento especifico, se aumentara dosis de acuerdo a tolerancia.", /// plan de tratamiento
      pendingDiagnosticTest : "test caminata 6 minutos y  ", // test pendientes
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
        setPreconsult(response2.data[0]);
        setPatient(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSave = async () => {
    const token = Cookies.get("a");
    setLoading(true);
    if (patient?.backgrounds?.length === 0) {
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

    /*if(patient.vitalSigns.length === 0){
      const data = await ApiSegimed.post(`/vital-signs/create-vital-sign`,vitalSigns, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/vital-signs/update-vital-sign`,vitalSigns, {headers: { token: token },})
      console.log(data);
    }

    let response1;
    if(physicalExamination?.description === ""){
      response1 = await ApiSegimed.post(`/patient-physical-examination`,physicalExamination, {headers: { token: token },})
    }else {
    response1 = await ApiSegimed.patch(`/patient-physical-examination?id=${userId}`,physicalExamination, {headers: { token: token },})
    }
    console.log(response1);

    if(preconsult?.length === 0){
      const data = await ApiSegimed.post(`/pre-consultation`,preconsultPhysical, {headers: { token: token },})
      console.log(data);
    }
    else{
      const data = await ApiSegimed.patch(`/update-pre-consultation`,preconsultPhysical, {headers: { token: token },})
      console.log(data.data);
    }
*/

    const response2 = await ApiSegimed.post(`/patient-diagnostic`, diagnostic, {
      headers: { token: token },
    });


    const response3 = await ApiSegimed.post(`/medical-event/create-event`, diagnostic, {
      headers: { token: token },
    });


    console.log(response2);
    console.log(response3);
    //pautas de alarma
    if (/*response1.status === 200 && */ response2.status === 200) {
      const data = await ApiSegimed.patch(
        `/patient-diagnostic/${idSchedule}`,{schedulingStatus:2},{
          headers: { token: token },
        }
      )
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
      <div className="flex flex-col h-full overflow-y-auto">
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
            className={"bg-green-500 w-60 text-sm font-bold"}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default DetallePaciente;
