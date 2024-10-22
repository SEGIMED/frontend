//painmap
const muscleTranslations = {
  trapezius: "Trapecio",
  "upper-back": "Espalda Superior",
  "lower-back": "Espalda Inferior",
  chest: "Pecho",
  biceps: "Bíceps",
  triceps: "Tríceps",
  forearm: "Antebrazo",
  "back-deltoids": "Deltoides Posterior",
  "front-deltoids": "Deltoides Anterior",
  abs: "Abdominales",
  obliques: "Oblicuos",
  adductor: "Aductores",
  hamstring: "Isquiotibiales",
  quadriceps: "Cuádriceps",
  abductors: "Abductores",
  calves: "Pantorrillas",
  gluteal: "Glúteos",
  knees: "Rodillas",
  "right-soleus": "Sóleo Derecho",
  "left-soleus": "Sóleo Izquierdo",
  head: "Cabeza",
  neck: "Cuello",
};

const reversePainAreaMap = {
  trapezius: 1,
  "upper-back": 2,
  "lower-back": 3,
  chest: 4,
  biceps: 5,
  triceps: 6,
  forearm: 7,
  "back-deltoids": 8,
  "front-deltoids": 9,
  abs: "10",
  obliques: 11,
  adductor: 12,
  hamstring: 13,
  quadriceps: 14,
  abductors: 15,
  calves: 16,
  gluteal: 17,
  knees: 18,
  "right-soleus": 19,
  "left-soleus": 20,
  head: 21,
  neck: 22,
};
export const vitalSignsMapping = {
  temperature: 1, // Temperatura
  systolicBP: 2, // Presión Arterial Sistólica
  diastolicBP: 3, // Presión Arterial Diastólica
  heartRate: 7, // Frecuencia Cardiaca
  respiratoryRate: 5, // Frecuencia Respiratoria
  oxygenSaturation: 6, // Saturación de Oxígeno
  height: 8, // Estatura
  weight: 9, // Peso
  bmi: 10, // IMC
};
export function mapFunctionalClass(classFunctional) {
  const classMapping = {
    I: 10,
    II: 11,
    III: 12,
    IV: 13,
  };
  return classMapping[classFunctional] || null;
}
export function mapPrescriptions(prescriptions) {
  return prescriptions.map((prescription) => {
    const medication = prescription?.medicationPrescription[0]; // Asumimos que solo hay una medicación por prescripción
    return {
      drugName: medication.drugDetailPresentations.drugName.name,
      commercialDrugName: medication.commercialName.name,
      routeOfAdministrationId: 1, // Aquí deberías mapear el ID correspondiente a la ruta de administración
      presentationId: parseInt(medication.drugDetailPresentationId, 10),
      dose: parseInt(medication.drugDetailPresentations.dose, 10),
      measureUnitId: 30, // Aquí deberías mapear el ID correspondiente a la unidad de medida
      doseMeasure: medication.doseMeasure,
      timeMeasure: medication.timeMeasure,
      timeMeasureType: medication.timeMeasureType,
      indications: medication.indications,
      observations: medication.observations,
    };
  });
}

export const mapAntecedentesData = (data) => {
  // Mapeo para Riesgo Cardiovascular Inicial
  const riskCv = data.risk?.ptCvRsks?.catCvRisk?.name || "";

  // Mapeo para Riesgo Hipertensión Pulmonar Inicial
  const riskHpPulmonarInicial =
    data.risk?.patPHRisks?.firstRisk?.catHpRisk?.name || "";
  // Mapeo para Riesgo Hipertensión Pulmonar 3 meses
  const riskHpPulmonarFinal =
    data.risk?.patPHRisks?.lastRisk?.catHpRisk?.name || "";
  // Mapeo para Grupo HTP
  const grupoHTP =
    data?.risk?.userHpGroups?.map((group) => group.catHpGroup.name) || [];

  // Mapeo para los diferentes antecedentes
  const antecedentes = {
    "Antecedentes quirúrgicos": data.background?.surgicalBackground || "",
    "Antecedentes patológicos": data.background?.pathologicBackground || "",
    "Antecedentes no patológicos":
      data.background?.nonPathologicBackground || "",
    "Antecedentes familiares": data.background?.familyBackground || "",
    "Antecedentes de la juventud": data.background?.pediatricBackground || "",
    "Medicación actual": data.background?.pharmacologicalBackground || "",
    Alergias: data.background?.allergicBackground || "",
    Vacunas: data.background?.vaccinationBackground || "",
  };

  // Mapeo para comorbilidades
  const comorbidities =
    data.comorbidities?.map((item) => item.disease.name) || [];
  antecedentes["Comorbilidades"] = comorbidities;
  antecedentes["TieneComorbilidades"] = comorbidities.length > 0 ? "Si" : "No";

  return {
    riskCardiovascular: riskCv,
    surgicalRisk: data.risk?.patSgRisks?.catSurgicalRisk?.name || "",
    riskHipertensionPulmonarInicial: riskHpPulmonarInicial,
    riskHipertensionPulmonarFinal: riskHpPulmonarFinal,
    grupoHTP: grupoHTP,
    ...antecedentes,
  };
};

export function mapToNewFormat(state, medicalEventId, patientId) {
  // Mapeo de IDs de signos vitales
  const vitalSignsMapping = {
    temperature: 1, // Temperatura
    systolicBP: 2, // Presión Arterial Sistólica
    diastolicBP: 3, // Presión Arterial Diastólica
    heartRate: 7, // Frecuencia Cardiaca
    respiratoryRate: 5, // Frecuencia Respiratoria
    oxygenSaturation: 6, // Saturación de Oxígeno
    height: 8, // Estatura
    weight: 9, // Peso
    bmi: 10, // IMC
  };

  // Mapeo de IDs de subsistemas
  const subsystemsMapping = {
    "Sistema Cardiovascular": 1,
    "Sistema Respiratorio": 2,
    "Sistema Neurológico": 3,
    "Sistema Digestivo": 4,
    "Sistema Osteomuscular": 5,
    "Sistema Endocrino": 6,
    "Sistema Reproductor y Urológico": 7,
    "Sistema Oftalmológico": 8,
    ORL: 9,
    "Piel y Faneras": 10,
    Otros: 11,
  };

  // Función para convertir la clase funcional

  // Mapeo de signos vitales
  let vitalSigns = [];
  Object.keys(vitalSignsMapping).forEach((key) => {
    if (state.signosVitales[key]) {
      vitalSigns.push({
        measureType: vitalSignsMapping[key],
        measure: parseFloat(state.signosVitales[key]),
      });
    }
  });

  // Mapeo de los valores de glucemia
  let glycemia = state.signosVitales.abnormalGlucoseValues.map(
    (value) => parseFloat(value) || 0
  );

  // Mapeo del subsistema seleccionado
  let selectedSubsystemId =
    subsystemsMapping[state.examenFisico.selectedSubsystem] || null;
  // Retorno de la estructura final
  return {
    vitalSigns: vitalSigns,
    glycemia: glycemia.length > 0 ? glycemia : [0, 0, 0, 0], // Valores por defecto si está vacío
    abnormalGlycemia: state.signosVitales.glucoseAbnormal,
    functionalClass: mapFunctionalClass(state.signosVitales.classFunctional),
    medicalEvent: {
      physicianComments: state.evolucion,
      historyOfPresentIllness: state.anamnesis.historyOfPresentIllness || "",
      treatmentPlan: state.diagnosticoTratamientos.treatmentPlan,
      alarmPattern: state.diagnosticoTratamientos.alarmPattern,
      reasonForConsultationId: state?.reasonForConsultationId || null,
    },
    diagnostics: state.diagnostics.map((diagnostic) => diagnostic.id),
    primaryDiagnostic: state.primaryDiagnostic,
    physicalExamination: {
      physicalSubsystemId: selectedSubsystemId,
      description: state.examenFisico.description,
    },
    medication: state.diagnosticoTratamientos.prescriptions.map(
      (prescription) => {
        return {
          drugCreation: {
            drugDetailPresentationId: null,
            drugName: prescription.drugName,
            commercialDrugName: prescription.commercialDrugName,
            presentationId: prescription.presentationId,
            dose: prescription.dose,
            measureUnitId: prescription.measureUnitId,
            routeOfAdministrationId: prescription.routeOfAdministrationId,
          },
          prescriptionCreation: {
            medicalEventId: medicalEventId,
            patientId: patientId,
            observations: prescription.observations,
            indications: prescription.indications,
            doseMeasure: prescription.doseMeasure,
            timeMeasure: prescription.timeMeasure,
            timeMeasureType: prescription.timeMeasureType,
          },
        };
      }
    ),
    medicalProcedure: state.diagnosticoTratamientos.procedurePrescriptions.map(
      (procedure) => procedure.medicalProcedureName
    ),
  };
}
// Mapeo para las comorbilidades
export const comorbiditiesMapping = {
  "Hipertensión arterial": 1,
  "Insuficiencia cardíaca": 2,
  "Fibrilación auricular": 3,
  "Flutter o aleteo auricular": 4,
  "Extrasístoles ventriculares frecuentes": 5,
  "Enfermedad coronaria": 6,
  "Insuficiencia aórtica severa": 7,
  "Estenosis aórtica severa": 8,
  "Insuficiencia mitral severa": 9,
  "Estenosis mitral severa": 10,
  "Insuficiencia tricuspidea severa": 11,
  "Estenosis tricuspidea severa": 12,
  "Insuficiencia pulmonar severa": 13,
  "Estenosis pulmonar severa": 14,
  "Disección de aorta": 15,
  "Enfermedad pulmonar obstructiva crónica (EPOC)": 16,
  Asma: 17,
  "Fibrosis pulmonar": 18,
  "Enfermedades intersticiales pulmonares": 19,
  "Diabetes mellitus": 20,
  Dislipidemia: 21,
  Obesidad: 22,
  "Enfermedad renal crónica": 23,
  "Lupus eritematoso sistémico": 24,
  Esclerodermia: 25,
  Linfomas: 26,
  "Tumores sólidos metastásicos": 27,
  "Apnea obstructiva del sueño": 28,
  "Tromboembolismo pulmonar crónico": 29,
  Coagulopatías: 30,
  Anemia: 31,
};
export function mapAntecedentesOutput(input) {
  // Mapas para los riesgos y grupos HTP
  const riskMapping = {
    Bajo: 1,
    "Intermedio-bajo": 2,
    "Intermedio-alto": 3,
    Alto: 4,
  };

  const htpGroupMapping = {
    I: 5,
    II: 6,
    III: 7,
    IV: 8,
    V: 9,
  };

  // Mapeamos los riesgos
  const cardiovascularRiskId = riskMapping[input.riskCardiovascular] || null;
  const surgicalRiskId = riskMapping[input.surgicalRisk] || null;
  const pulmonaryHypertensionRiskId =
    riskMapping[input.riskHipertensionPulmonarInicial] || null;

  // Mapeamos los grupos HTP
  const hpGroupIds = input.grupoHTP
    .map((group) => htpGroupMapping[group])
    .filter(Boolean);

  // Mapeamos las comorbilidades a IDs
  const comorbiditiesList = input.Comorbilidades.map(
    (comorbidity) => comorbiditiesMapping[comorbidity]
  ).filter(Boolean);

  // Resultado final
  return {
    risks: {
      cardiovascularRiskId: cardiovascularRiskId,
      surgicalRiskId: surgicalRiskId,
      pulmonaryHypertensionRiskId: pulmonaryHypertensionRiskId,
    },
    hpGroupIds: hpGroupIds,
    background: {
      surgicalBackground: input["Antecedentes quirúrgicos"] || "",
      pathologicBackground: input["Antecedentes patológicos"] || "",
      nonPathologicBackground: input["Antecedentes no patológicos"] || "",
      familyBackground: input["Antecedentes familiares"] || "",
      pediatricBackground: input["Antecedentes de la juventud"] || "",
      pharmacologicalBackground: input["Medicación actual"] || "",
      allergicBackground: input.Alergias || "",
      vaccinationBackground: input.Vacunas || "",
      comorbidities: input.TieneComorbilidades === "Si",
      comorbiditiesList: comorbiditiesList,
    },
  };
}
export const ConsultaInitialState = {
  signosVitales: {
    height: "",
    weight: "",
    bmi: "",
    temperature: "",
    heartRate: "",
    systolicBP: "",
    diastolicBP: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    classFunctional: "",
    glucoseAbnormal: false,
    abnormalGlucoseValues: ["", "", "", ""],
  },
  evolucion: "",
  examenFisico: {
    subsistemas: [], // Array de subsistemas seleccionados
    description: "",
    useSubsystems: false,
    selectedSubsystem: "",
  },
  diagnosticoTratamientos: {
    procedurePrescriptions: [""],
    treatmentPlan: "",
    alarmPattern: "",
    treatmentNoFarmacologico: "",
    prescriptions: [],
  },
  diagnostics: [],
  primaryDiagnostic: "",
  reasonForConsultationId: null,
  anamnesis: {
    historyOfPresentIllness: "",
  },
};

export const listReasonsForConsultation = [
  { id: 1, description: "Control de cardiología" },
  { id: 2, description: "Control neumonologia" },
  { id: 3, description: "Control de reumatología" },
  { id: 4, description: "Control de psicología" },
  { id: 5, description: "Control de psiquiatria" },
  { id: 6, description: "Control de hematología" },
  { id: 7, description: "Disnea" },
  { id: 8, description: "Tos" },
  { id: 9, description: "Asma" },
  { id: 10, description: "Enfisema" },
  { id: 11, description: "Fibrosis pulmonar" },
  { id: 12, description: "Esclerodermia" },
  { id: 13, description: "Artritis reumatoidea" },
  { id: 14, description: "Síndrome de sjogren" },
  { id: 15, description: "Vasculitis" },
  { id: 16, description: "Polimiositis" },
  { id: 17, description: "Fiebre" },
  { id: 18, description: "Neumonía" },
  { id: 19, description: "Infección del tracto respiratorio alto" },
  { id: 20, description: "Infección del tracto respiratorio bajo" },
  { id: 21, description: "Sincope" },
  { id: 22, description: "Sensación de desvanecimiento" },
  { id: 23, description: "Mareo" },
  { id: 24, description: "Dolor muscular" },
  { id: 25, description: "Dolor de pecho" },
  { id: 26, description: "Enfermedad coronaria" },
  { id: 27, description: "Infección de piel y partes blandas" },
  { id: 28, description: "Infección respiratoria" },
  { id: 29, description: "Síndrome febril" },
  { id: 30, description: "Congestión nasal" },
  { id: 31, description: "Dolor abdominal" },
  { id: 32, description: "Nauseas y vómitos" },
  { id: 33, description: "Diarrea" },
  { id: 34, description: "Estreñimiento" },
  { id: 35, description: "Astenia" },
  { id: 36, description: "Hiporexia" },
  { id: 37, description: "Debilidad generalizada" },
  { id: 38, description: "Dolor articular" },
  { id: 39, description: "Artrosis" },
  { id: 40, description: "Dolor muscular" },
  { id: 41, description: "Limitación de movimiento" },
  { id: 42, description: "Disuria" },
  { id: 43, description: "Tenesmo" },
  { id: 44, description: "Oliguria" },
  { id: 45, description: "Poliuria" },
  { id: 46, description: "Micción frecuente" },
  { id: 47, description: "Incontinencia urinaria" },
  { id: 48, description: "Dolor pélvico" },
  { id: 49, description: "Dolor ocular" },
  { id: 50, description: "Conjuntivitis" },
  { id: 51, description: "Dolor" },
  { id: 52, description: "Erupciones cutáneas" },
  { id: 53, description: "Dermatitis" },
  { id: 54, description: "Urticaria" },
  { id: 55, description: "Picazón en alguna parte del cuerpo" },
  { id: 56, description: "Alergia no especificada" },
  { id: 57, description: "Xeroftalmia" },
  { id: 58, description: "Onicomicosis" },
  { id: 59, description: "Micosis cutánea" },
  { id: 60, description: "Fatiga" },
  { id: 61, description: "Pérdida de peso" },
  { id: 62, description: "Ansiedad" },
  { id: 63, description: "Depresión Insomnio" },
  { id: 64, description: "Cefalea" },
  { id: 65, description: "Vertigo" },
  { id: 66, description: "Mareos" },
  { id: 67, description: "Dolor lumbar" },
  { id: 68, description: "Dolor de una extremidad" },
  { id: 69, description: "Faringitis" },
  { id: 70, description: "Sinusitis" },
  { id: 71, description: "Bronquitis" },
  { id: 72, description: "Neumonía bacteriana" },
  { id: 73, description: "Neumonía viral" },
  { id: 74, description: "Neumonía no especificada" },
  { id: 75, description: "Tromboembolismo pulmonar" },
  { id: 76, description: "Trombosis venosa" },
  { id: 77, description: "Trombosis no especificada" },
  { id: 78, description: "Sangrado nasal" },
  { id: 79, description: "Sangrado digestivo alto" },
  { id: 80, description: "Sangrado digestivo bajo" },
  { id: 81, description: "Sangrado ocular" },
  { id: 82, description: "Hemorragia conjuntival" },
  { id: 83, description: "Gingivitis" },
  { id: 84, description: "Gastroenteritis" },
  { id: 85, description: "Celulitis" },
  { id: 86, description: "Impétigo" },
  { id: 87, description: "Erisipela" },
  { id: 88, description: "Insuficiencia cardiaca" },
  { id: 89, description: "Infección ginecológica" },
  { id: 90, description: "Infección urológica" },
  { id: 91, description: "Infección del aparato sexual" },
  { id: 92, description: "Infección neurología" },
  { id: 93, description: "Meningitis" },
  { id: 94, description: "Otitis" },
  { id: 95, description: "Hipertensión arterial" },
  { id: 96, description: "Diabetes mellitus tipo I" },
  { id: 97, description: "Diabetes mellitus tipo II" },
  { id: 98, description: "Fibrilación auricular" },
  { id: 99, description: "Flutter auricular" },
  { id: 100, description: "Arritmia cardiaca no especificada" },
  { id: 101, description: "Extrasístoles supraventriculares" },
  { id: 102, description: "Extrasístoles ventriculares" },
  { id: 103, description: "Palpitaciones" },
  { id: 104, description: "Cardiopatía no especificada" },
  { id: 105, description: "Colagenopatía no especificada" },
  { id: 106, description: "Enfermedad pulmonar intesticial" },
  { id: 107, description: "Dislipidemia" },
  { id: 108, description: "Hipercolesterolemia" },
  { id: 109, description: "Hipertrigliceridemia" },
  { id: 110, description: "Enfermedad del tejido conectivo" },
  { id: 111, description: "Cardiopatía congénita" },
  { id: 112, description: "Enfermedad de chagas" },
  { id: 113, description: "Síndrome de down" },
  { id: 114, description: "Tetralogía de fallot" },
  { id: 115, description: "Enfermedad congénita" },
  { id: 116, description: "Tabaquismo" },
  { id: 117, description: "Alcoholismo" },
  { id: 118, description: "Drogadicción" },
  { id: 119, description: "Intoxicación no especificada" },
  { id: 120, description: "Control de anticoagulación" },
];

//Preconsulta
export function formatPreconsultationData(questions) {
  const formattedData = {
    preconsultation: {
      lackOfAir: questions.lackOfAir?.active ?? false,
      lackOfAirIncremented:
        questions.lackOfAir?.subquestions?.lackOfAirIncremented
          ?.selectedOption ?? null,
      lackOfAirClasification:
        questions.lackOfAir?.subquestions?.lackOfAirClasification
          ?.selectedOption ?? null,
      chestPainAtRest: questions.chestPainAtRest?.active ?? false,
      chestPainOnExertion: questions.chestPainOnExertion?.active ?? false,
      chestPainOnExertionAmount:
        questions.chestPainOnExertion?.subquestions?.chestPainOnExertionAmount
          ?.selectedOption ?? null,
      edemaPresence: questions.edemaPresence?.active ?? false,
      edemaPresenceDescription:
        questions.edemaPresence?.subquestions?.edemaPresenceDescription
          ?.selectedOption ?? null,
      feelings: questions.feelings?.selectedOption ?? null,
      healthChanges: questions.healthChanges?.active ?? false,
      healthChangesDescription: questions.healthChanges?.description ?? "",
      healthWorsened: questions.healthWorsened?.selectedOption ?? null,
      bodyPain: questions.bodyPain?.active ?? false,
      mentalHealthAffected: questions.mentalHealthAffected?.active ?? false,
      mentalHealthAffectedDescription:
        questions.mentalHealthAffected?.description ?? "",
      energyStatus: questions.energyStatus?.selectedOption ?? null,
      feed: questions.feed?.selectedOption ?? null,
      hydrationStatus: questions.hydrationStatus?.selectedOption ?? null,
      urineStatus: questions.urineStatus?.selectedOption ?? null,
      exerciseStatus: questions.exerciseStatus?.selectedOption ?? null,
    },
  };

  return formattedData;
}

//Post Pain Map
export function formatPainMapData(painMap) {
  console.log(painMap);
  const formattedPainMap = {
    painMap: {
      isTherePain: painMap.isTherePain ?? false,
      painDuration: painMap.painDuration ?? null,
      painScale: painMap.painScale ?? null,
      painType: painMap.painType ?? null,
      painAreas: Object.values(painMap?.painAreas || {}).map((area) => ({
        active: area.active ?? false,
        muscle: area.muscle || "",
        painArea: area.painArea || null,
        painNotes: area.painNotes || "",
      })),
      painFrequency: painMap.painFrequency ?? null,
      isTakingAnalgesic: painMap.isTakingAnalgesic ?? false,
      doesAnalgesicWorks: painMap.isTakingAnalgesic
        ? painMap.doesAnalgesicWorks
        : null, // Set to null if not taking analgesic
      isWorstPainEver: painMap.isWorstPainEver ?? false,
    },
  };

  return formattedPainMap;
}

//Get preconsultation map
export function formatPreconsultationGetData(
  provisionalPreConsultation,
  patientPainMap
) {
  const questions = {
    lackOfAir: {
      title: "¿Tiene falta de aire (Disnea)?",
      active: provisionalPreConsultation.lackOfAir ?? null,
      binaryOptions: true,
      selectedOption: provisionalPreConsultation.lackOfAirAsAlways ?? null,
      description: "",
      subquestions: {
        lackOfAirIncremented: {
          title: "Se ha incrementado en las últimas:",
          display: "row",
          selectedOption:
            provisionalPreConsultation.lackOfAirIncremented ?? null,
          options: [
            { label: "Horas" },
            { label: "Días" },
            { label: "Semanas" },
          ],
        },
        lackOfAirClasification: {
          title: "Califique su falta de aire",
          selectedOption:
            provisionalPreConsultation.lackOfAirClasification ?? null,
          orientation: "column",
          options: [
            {
              label: "Puedo caminar a paso rápido más de 10 cuadras sin parar.",
            },
            {
              label:
                "Puedo caminar a paso rápido menos de 5 cuadras sin parar.",
            },
            {
              label:
                "No puedo caminar más de 3 cuadras, solo realizo tareas domésticas, uso oxígeno eventualmente.",
            },
            {
              label:
                "No puedo caminar ni una cuadra, tampoco realizar tareas domésticas con normalidad, me hace falta el aire aunque esté en reposo, uso oxígeno todo el tiempo.",
            },
          ],
        },
      },
    },
    chestPainAtRest: {
      title: "¿Tiene dolor de pecho en reposo?",
      active: provisionalPreConsultation.chestPainAtRest ?? null,
      binaryOptions: true,
      selectedOption: provisionalPreConsultation.chestPainAtRest ? "Sí" : "No",
      description: "",
    },
    chestPainOnExertion: {
      title: "¿Tiene dolor de pecho al hacer esfuerzos físicos?",
      active: provisionalPreConsultation.chestPainOnExertion ?? null,
      binaryOptions: true,
      selectedOption: provisionalPreConsultation.chestPainOnExertion
        ? "Sí"
        : "No",
      description: "",
      subquestions: {
        chestPainOnExertionAmount: {
          selectedOption:
            provisionalPreConsultation.chestPainOnExertionAmount ?? null,
          options: [
            { label: "Con poco esfuerzo físico" },
            { label: "Con esfuerzo físico moderado" },
            { label: "Con esfuerzo físico intenso" },
          ],
        },
      },
    },
    edemaPresence: {
      title: "¿Ha notado edemas (hinchazón) o aumento del edema previo?",
      active: provisionalPreConsultation.edemaPresence ?? null,
      binaryOptions: true,
      selectedOption: provisionalPreConsultation.edemaPresence ? "Sí" : "No",
      description: "",
      subquestions: {
        edemaPresenceDescription: {
          selectedOption:
            provisionalPreConsultation.edemaPresenceDescription ?? null,
          options: [
            { label: "Hinchazón en los pies" },
            { label: "Hinchazón por debajo de las rodillas" },
            { label: "Hinchazón de las rodillas a la cadera" },
            { label: "Hinchazón general" },
          ],
        },
      },
    },
    feelings: {
      title: "¿Cómo se encuentra el día de hoy?",
      active: null,
      binaryOptions: false,
      selectedOption: provisionalPreConsultation.feelings ?? null,
      showRowOptions: true,
      description: "",
      options: [
        { label: "Mal" },
        { label: "Regular" },
        { label: "Normal" },
        { label: "Bien" },
      ],
    },
    healthChanges: {
      title: "¿Ha notado algún cambio en su salud?",
      active: provisionalPreConsultation.healthChanges ?? null,
      binaryOptions: true,
      selectedOption: provisionalPreConsultation.healthChanges ? "Sí" : "No",
      showTextInput: true,
      description: provisionalPreConsultation.healthChangesDescription ?? "",
    },
    healthWorsened: {
      title: "Siente que su salud se ha empeorado en las últimas:",
      active: null,
      binaryOptions: false,
      selectedOption: provisionalPreConsultation.healthWorsened ?? null,
      showRowOptions: true,
      description: "",
      options: [
        { label: "Horas" },
        { label: "Días" },
        { label: "Semanas" },
        { label: "No empeoró" },
      ],
    },
    bodyPain: {
      title: "¿Tiene alguna dolencia en su cuerpo?",
      active: provisionalPreConsultation.bodyPain ?? null,
      binaryOptions: true,
      selectedOption: provisionalPreConsultation.bodyPain ? "Sí" : "No",
      description: "",
    },
    // mentalHealthAffected: {
    //   title: "¿Su salud mental está afectada?",
    //   active: provisionalPreConsultation.mentalHealthAffected ?? null,
    //   binaryOptions: true,
    //   selectedOption: provisionalPreConsultation.mentalHealthAffected
    //     ? "Sí"
    //     : "No",
    //   showTextInput: true,
    //   description:
    //     provisionalPreConsultation.mentalHealthAffectedDescription ?? "",
    // },
    energyStatus: {
      title: "Califique su estado de energía - Fatiga",
      active: null,
      binaryOptions: false,
      selectedOption: provisionalPreConsultation.energyStatus ?? null,
      showSlider: true,
      description: "",
    },
    feed: {
      title: "Califique su alimentación",
      active: null,
      binaryOptions: false,
      selectedOption: provisionalPreConsultation.feed ?? null,
      showRowOptions: true,
      description: "",
      options: [
        { label: "Nada saludable" },
        { label: "Poco saludable" },
        { label: "Saludable" },
        { label: "Muy saludable" },
      ],
    },
    hydrationStatus: {
      title: "Califique su hidratación diaria (todos los líquidos ingeridos)",
      active: true,
      binaryOptions: false,
      selectedOption: provisionalPreConsultation.hydrationStatus ?? null,
      description: "",
      options: [
        { label: "Poca ingesta < de 1.5 litros (menos de 5 vasos aprox.)" },
        { label: "Normal 1.5 a 2 litros (5 a 8 vasos aprox.)" },
        { label: "Mucha ingesta > a 2.5 litros (> de 8 vasos aprox.)" },
      ],
    },
    urineStatus: {
      title: "Califique su estado de orina (diuresis)",
      active: true,
      binaryOptions: false,
      selectedOption: provisionalPreConsultation.urineStatus ?? null,
      description: "",
      options: [
        { label: "Orino normal (entre 500 ml y 1 litro al día)" },
        {
          label: "He notado una disminución del 50% o menos de 1 litro al día",
        },
        { label: "Orino poco (menos de medio litro o 500 ml al día)" },
        { label: "Casi nada (menos de 1 vaso al día)" },
        { label: "Nada" },
      ],
    },
    exerciseStatus: {
      title: "Califique su estado de ejercicio físico",
      active: true,
      binaryOptions: false,
      selectedOption: provisionalPreConsultation.exerciseStatus ?? null,
      description: "",
      options: [
        {
          label:
            "Ninguno: no puedo, no quiero, no recomendado por el médico, contraindicado.",
        },
        {
          label:
            "Bajo: camino poco, realizo tareas domésticas, trabajo con poca actividad física.",
        },
        { label: "Moderado: Camino más de 10 mil pasos o 7.5 km al día." },
        {
          label:
            "Intenso: Más de 150 minutos a la semana de actividad intensa.",
        },
      ],
    },
  };
  const transformPainAreas = (painAreas) => {
    if (!painAreas) return [];
    return painAreas?.reduce((acc, area) => {
      const englishKey = area.painArea?.painAreaEnglish || ""; // Use painAreaEnglish as the key
      const painAreaId = reversePainAreaMap[englishKey] || null; // Map painAreaEnglish to the corresponding ID
      if (englishKey && painAreaId !== null) {
        acc[englishKey] = {
          muscle: englishKey, // painAreaEnglish becomes the muscle
          painArea: painAreaId, // Use the ID from reversePainAreaMap
          active: true, // Assuming active is always true
          painNotes: area.painNotes || "", // painNotes from the input
        };
      }
      return acc;
    }, {});
  };
  const bodySection = {
    isTherePain: patientPainMap?.isTherePain ?? null,
    painDuration: patientPainMap?.painDuration ?? null,
    painScale: patientPainMap?.painScale ?? null,
    painType: patientPainMap?.painType ?? null,
    painAreas: transformPainAreas(patientPainMap?.painAreas || {}),
    painFrequency: patientPainMap?.painFrequency ?? null,
    isTakingAnalgesic: patientPainMap?.isTakingAnalgesic ?? null,
    doesAnalgesicWorks: patientPainMap?.isTakingAnalgesic
      ? patientPainMap?.doesAnalgesicWorks
      : null,
    isWorstPainEver: patientPainMap?.isWorstPainEver ?? null,
  };

  return { questions, bodySection };
}
