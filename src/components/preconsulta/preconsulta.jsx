"use client";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import Elboton from "@/components/Buttons/Elboton";

import IconRegresar from "@/components/icons/iconRegresar";
import PreconsultaQuestion from "@/components/preconsulta/PreconsultaQuestion";
import Link from "next/link";
import rutas from "@/utils/rutas";
import {
  updateActive, subquestionSelectedOption, questionSelectedOption, updateDescription, updateVitalSign, updateAnamnesis, updateTratamiento, updateBodyPainLevel, updateGlycemia, updateLastGlycemia, updateAllFormData, updateFileUploaded, updateTestDescription, updateTestActive, updateTestSelectedOption, resetFormData,
} from "@/redux/slices/user/preconsultaFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InputConsulta from "../consulta/inputconsulta";
import InputCuerpoPre from "@/components/preconsulta/InputCuerpoPre";
import Cookies from "js-cookie";

import IconGuardar from "@/components/icons/iconGuardar";
import LoadingFallback from "@/components/loading/loading";
import Swal from "sweetalert2";
import postPatientBackgrounds from "@/utils/dataFetching/fetching/postPatientBackgrounds";
import getPatientDetail from "@/utils/dataFetching/fetching/getPatientDetail";
import patchPreconsultation from "@/utils/dataFetching/fetching/patchPreconsultation";
import SignosVitalesInfo from "../consulta/signosvitales";


export default function PreconsultaPte({params, preconsult, schedule}) {
  const dispatch = useAppDispatch();
  const scheduleId =Number(params)
  const token = Cookies.get("a");
  const patientId = Number(Cookies.get("c"));
  const medicalEventId= schedule?.medicalEvent?.id
  const [vitalSignsPreconsult, setVitalSignsPreconsult] = useState([]);
  const [glicemiaPreconsult, setGlicemiaPreconsult] = useState([])
  const [background, setBackground]= useState()
  const [anamnesis, setAnamnesis]= useState()
  const [patient, setPatient]=useState()

  console.log(schedule)



  const [draftEnabled, setDraftEnabled] = useState(false);
  const [available, setAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  
  const [preconsultationAlreadyExists, setPreconsultationAlreadyExists] =
    useState(null);
  const formData = useAppSelector((state) => state.preconsultaForm.formData);
  console.log(preconsult)
  console.log(formData)
  

  

  // useEffect(() => {
    
  //   const intervalId = setInterval(() => {
  //     saveDraftToDatabase();
  //   }, 60000); // Guarda cada 60 segundos

  //   return () => {
  //     clearInterval(intervalId);
  //     saveDraftToDatabase(); // Guarda borrador al desmontar el componente
  //   };
  // }, []);

  //util que necesito
  const getValue = (formValue, preconsultValue) =>
    formValue !== undefined && formValue !== null ? formValue : preconsultValue;

  const bodyOBJFormat = {
    patient: Number(patientId),
    patientPainMapId: Number(patientId),
    painOwnerId: Number(patientId),
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







  //ESTO (bodyForm) ES LO QUE SE ENVIA POR BODY , debe contener si o si patient = patientID y appointmentSchedule  = scheduleID
  const bodyForm = {
    patient: Number(patientId),
    appointmentSchedule: Number(scheduleId),
    // Questions
    lackOfAir: formData?.questions?.lackOfAir?.active,
    lackOfAirIncremented: formData?.questions?.lackOfAir?.subquestions?.lackOfAirIncremented?.selectedOption,
    lackOfAirClasification: formData?.questions?.lackOfAir?.subquestions?.lackOfAirClasification?.selectedOption,
    chestPainAtRest: formData?.questions?.chestPainAtRest?.active,
    chestPainOnExertion: formData?.questions?.chestPainOnExertion?.active,
    chestPainOnExertionAmount: formData?.questions?.chestPainOnExertion?.subquestions?.chestPainOnExertionAmount?.selectedOption,
    edemaPresence: formData?.questions?.edemaPresence?.active,
    edemaPresenceDescription: formData?.questions?.edemaPresence?.subquestions?.edemaPresenceDescription?.selectedOption,
    feelings: formData?.questions?.feelings?.selectedOption,
    healthChanges: formData?.questions?.healthChanges?.active,
    healthChangesDescription: formData?.questions?.healthChanges?.description,
    healthWorsened: formData?.questions?.healthWorsened?.selectedOption,
    mentalHealthAffected: formData?.questions?.mentalHealthAffected?.active,
    mentalHealthAffectedDescription: formData?.questions?.mentalHealthAffected?.description,
    energyStatus: formData?.questions?.energyStatus?.selectedOption,
    feed: formData?.questions?.feed?.selectedOption,
    hydrationStatus: formData?.questions?.hydrationStatus?.selectedOption,
    urineStatus: formData?.questions?.urineStatus?.selectedOption,
    exerciseStatus: formData?.questions?.exerciseStatus?.selectedOption,
    bodyPain: formData?.questions?.bodyPain?.selectedOption,
    // Estudios
    // laboratoryResults: tests.laboratoryResults.file,
    // laboratoryResultsDescription: tests.laboratoryResults.description,
    // electrocardiogram: tests.electrocardiogram.file,
    // electrocardiogramDescription: tests.electrocardiogram.description,
    // rxThorax: tests.rxThorax.file,
    // echocardiogram: tests.echocardiogram.file,
    // walkTest: tests.walkTest.file,
    // respiratoryFunctional: tests.respiratoryFunctional.file,
    // tomographies: tests.tomographies.file,
    // rightHeartCatheterization: tests.rightHeartCatheterization.file,
    // ccg: tests.ccg.file,
    // resonance: tests.resonance.file,
    // leftHeartCatheterization: tests.leftHeartCatheterization.file,
    // otherStudies: tests.otherStudies.file,
    // pendingStudies: tests.pendingStudies.description,
    // Anamnesis
    // consultationReason: formData?.anamnesis?.consultationReason?.description,
    // importantSymptoms: formData?.anamnesis?.importantSymptoms?.description,
    // Tratamiento
    // currentMedications: formData?.tratamiento?.currentMedications
    //   ?.selectedOptions
    //   ? Object.values(formData?.tratamiento?.currentMedications?.selectedOptions)
    //   : null,
    // Signos vitales
    // abnormalGlycemia: formData?.vitalSigns?.abnormalGlycemia?.active,
    // lastAbnormalGlycemia: Object.keys(
    //   formData?.vitalSigns?.lastAbnormalGlycemia?.options
    // ).length
    //   ? Object.values(formData?.vitalSigns?.lastAbnormalGlycemia?.options)
    //   : null,
    // updateVitalSigns: vitalSignFormat,
    // painRecordsToUpdate
    painRecordsToUpdate: [bodyOBJFormat],
    ...anamnesis,
    updateVitalSigns:
    vitalSignsPreconsult.length > 0 ? vitalSignsPreconsult : null,
  ...glicemiaPreconsult,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
   
    try {

      const response =await patchPreconsultation(bodyForm)
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Preconsulta creada con éxito",
          text: "",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        });
        console.log({ resupuestaCreate: response.data });
      }


      // if (!bodyForm) {
      //   console.error("No form data to submit");
      //   setIsLoading(false);
      //   return;
      // }
      // const isAnamnesisMissing = Object.values(formData.anamnesis).some(
      //   (item) => item.description?.trim() === ''
      // );
      
      // const isVitalSignMissing = vitalSignFormat.some(
      //   (item) => item.measure === null
      // );
      // if (isAnamnesisMissing || isVitalSignMissing) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Error",
      //     text: "Debe completar la información de anamnesis y los signos vitales",
      //     confirmButtonColor: "#487FFA",
      //     confirmButtonText: "Aceptar",
      //   });
      //   setIsLoading(false);
      //   return;
      // }
     
      if (available) {
        console.log({
          toCreate: bodyForm,
          preconsultationAlreadyExists: !!preconsultationAlreadyExists,
        });
        console.log(bodyForm, "justo antes del submit")
        
       
        setIsLoading(false);
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "La preconsulta no puede ser modificada",
          text: "",
        });
        setAvailable(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setIsLoading(false);
    }
  };

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

 

  
  const handleBodyChange = (name, value) => {
    dispatch(updateBodyPainLevel({ name, option: value }));
  };

  const methods = useForm();

  // Loader mientras se cargan o envían los datos de la preconsulta
  if (isLoading) {
    return (
      <FormProvider {...methods}>
        <div className="flex h-full items-center justify-center my-2 bg-white">
          <LoadingFallback />
        </div>
      </FormProvider>
    );
  }

  // Si el paciente ya tuvo la consulta, entonces no puede volver a editar la preconsulta.
  if (!available) {
    return (
      <FormProvider {...methods}>
        <div className="flex flex-col h-full overflow-y-auto gap-5 bg-[#fafafc]">
          <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] bg-white">
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
          <div className="flex items-center justify-center my-2">
            Su preconsulta no está disponible
          </div>
        </div>
      </FormProvider>
    );
  }

  const onSubmit= (data)=>{
    const vitalSigns = [
      { id: 1344, measureType: 1, measure: Number(data["Temperatura"]) },
      {
        id: 1344,
        measureType: 2,
        measure: Number(data["Presión Arterial Sistólica"]),
      },
      {
        id: 1344,
        measureType: 3,
        measure: Number(data["Presión Arterial Diastólica"]),
      },
      {
        id: 1344,
        measureType: 5,
        measure: Number(data["Frecuencia Respiratoria"]),
      },
      {
        id: 1344,
        measureType: 6,
        measure: Number(data["Saturación de Oxígeno"]),
      },
      {
        id: 1344,
        measureType: 7,
        measure: Number(data["Frecuencia Cardiaca"]),
      },
      { id: 1344, measureType: 8, measure: Number(data["Estatura"]) },
      { id: 1344, measureType: 9, measure: Number(data["Peso"]) },
      { id: 1344, measureType: 10, measure: Number(data["IMC"]) },
    ];
    const updateVitalSigns = vitalSigns.filter(
      (sign) => sign.measure !== 0 && sign.measure !== ""
    );
    
    setVitalSignsPreconsult(updateVitalSigns);
    setGlicemiaPreconsult({
      lastAbnormalGlycemia:
        data["lastAbnormalGlycemia"] === ""
          ? preconsult?.lastAbnormalGlycemia
          : data["lastAbnormalGlycemia"],
    })

    setBackground({
      patientId: Number(patientId),
      medicalEventId: Number(medicalEventId),
      schedulingId: Number(scheduleId),
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
      
    });
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

  }
  const necesaryData= {
    // ids
   preconsultationId: Number(preconsult?.id),
   patient: Number(patientId),
   appointmentSchedule: Number(scheduleId),
   // status
   status: "sent"
    }

  const handleSaveVitalSigns = async ()=>{
    try {
      const data= {
         // ids
        preconsultationId: Number(preconsult?.id),
        patient: Number(patientId),
        appointmentSchedule: Number(scheduleId),
        // status
        status: "sent",
        updateVitalSigns:
      vitalSignsPreconsult.length > 0 ? vitalSignsPreconsult : null,
    ...glicemiaPreconsult,
      }
      
      const response= await patchPreconsultation(data)
      console.log(response.data)
    } catch (error) {
      console.error("No pudo cargarse la data en el servidor", error.message)
    }
  }

  const handleBackgroundSave = async () => {
    try {
      console.log(background)
        const response = await postPatientBackgrounds(background);
        console.log(response);
    } catch (error) {
        console.error('Error saving background:', error);
    }
};
  const handleAnamnesisSave = async () => {
    try {
        const data = {
            ...necesaryData,
            ...anamnesis
        };
        const response = await patchPreconsultation(data);
        console.log("esto es anamnesis", response.data);
    } catch (error) {
        console.error('Error saving anamnesis:', error);
    }
};



  const anamnesisCompleto = async () => {
    await handleBackgroundSave();
    await handleAnamnesisSave();
   
};
const fetchPatientDetail = async (userId) => {
  try {
    console.log(userId)
    const response= await getPatientDetail(userId)
    setPatient(response);
  } catch (error) {
    console.log("No existe este paciente", error);
  }
};

useEffect(() => {
  
  fetchPatientDetail(patientId)
}, []);
console.log(background)  
console.log(patient)

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full overflow-y-auto gap-5 bg-[#fafafc]">
        <div className="flex items-center gap-2 p-4 border-b border-b-[#cecece] bg-white">
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
        {formData && formData?.questions && Object.keys(formData?.questions).map((question, index) => (
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
        ))}
        <form onChange={methods.handleSubmit(onSubmit)}>
     
       <SignosVitalesInfo
              title={"Signos vitales"}
              preconsult={preconsult}
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
              <InputConsulta
            title={"Anamnesis"}
            subtitle={[
              "Motivo de consulta",
              "Sintomas importantes",
            ]}
            preconsult={preconsult}
           
            defaultOpen
            />
             <InputConsulta
            title={"Antecedentes"}
           
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
            />
             <div className="flex justify-center p-6 bg-[#fafafc]">
            <Elboton
            nombre={"Guardar"}
            icon={<IconGuardar/>}
            onPress={anamnesisCompleto}
            size={"sm"}
            className={"bg-greenPrimary w-40 text-sm font-bold"}
            />
            </div>

        </form>
        <div className="flex justify-center p-6 bg-[#fafafc]">
          <Elboton
            nombre={"Guardar Cambios"}
            icon={<IconGuardar />}
            onPress={handleSubmit}
            disabled={!enableButton}
            size={"lg"}
            className={"bg-greenPrimary w-60 text-sm font-bold"}
          />
        </div>
      </div>
    </FormProvider>
  );
}
