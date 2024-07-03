import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    questions: [
      {
        title: "¿Tiene falta de aire (Disnea)?",
        active: false,
        selectedOption: null,
        field: "lackOfAir",
        subquestions: [
          //   {
          //     title: "Igual que siempre",
          //     options: [],
          //     selectedOption: null,
          //     field: "lackOfAirAsAlways",
          //   },
          {
            title: "Se ha incrementado en las últimas:",
            options: [
              { label: "Horas" },
              { label: "Días" },
              { label: "Semanas" },
            ],
            selectedOption: null,
            field: "lackOfAirIncremented",
          },
          {
            title: "Califique su falta de aire",
            options: [
              {
                label:
                  "Puedo caminar a paso rápido más de 10 cuadras sin parar.",
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
            selectedOption: null,
            orientation: "column",
            field: "lackOfAirClasification",
          },
        ],
      },
      {
        title: "¿Tiene dolor de pecho en reposo?",
        active: false,
        selectedOption: null,
        field: "chestPainAtRest",
        subquestions: [],
      },
      {
        title: "¿Tiene dolor de pecho al hacer esfuerzos físicos?",
        active: false,
        selectedOption: null,
        field: "chestPainOnExertion",
        subquestions: [
          {
            title: "Con poco esfuerzo físico",
            selectedOption: null,
            field: "chestPainOnExertionAmount",
          },
          {
            title: "Con esfuerzo físico moderado",
            selectedOption: null,
            field: "chestPainOnExertionAmount",
          },
          {
            title: "Con esfuerzo físico intenso",
            selectedOption: null,
            field: "chestPainOnExertionAmount",
          },
        ],
      },
      {
        title: "¿Ha notado edemas (hinchazón) o aumento del edema previo?",
        active: false,
        selectedOption: null,
        field: "edemaPresence",
        subquestions: [
          {
            title: "Hinchazón en los pies",
            selectedOption: null,
            field: "edemaPresenceDescription",
          },
          {
            title: "Hinchazón por debajo de las rodillas",
            selectedOption: null,
            field: "edemaPresenceDescription",
          },
          {
            title: "Hinchazón de las rodillas a la cadera",
            selectedOption: null,
            field: "edemaPresenceDescription",
          },
          {
            title: "Hinchazón general",
            selectedOption: null,
            field: "edemaPresenceDescription",
          },
        ],
      },
      {
        title: "¿Cómo se encuentra el día de hoy?",
        active: false,
        selectedOption: null,
        showRowOptions: true,
        options: [
          { label: "Mal" },
          { label: "Regular" },
          { label: "Normal" },
          { label: "Bien" },
        ],
        field: "feelings",
      },
      {
        title: "¿Ha notado algún cambio en su salud?",
        active: false,
        selectedOption: null,
        showTextInput: true,
        field: "healthChanges",
        subquestions: [
          {
            selectedOption: null,
            field: "healthChangesDescription",
          },
        ],
      },
      {
        title: "Siente que su salud se ha empeorado en las últimas:",
        active: false,
        selectedOption: null,
        showRowOptions: true,
        options: [
          { label: "Horas" },
          { label: "Días" },
          { label: "Semanas" },
          { label: "No empeoró" },
        ],
        field: "healthWorsened",
      },
      {
        title: "¿Tiene alguna dolencia en su cuerpo?",
        active: false,
        selectedOption: null,
        field: "bodyPain",
      },
      {
        title: "¿Su salud mental está afectada?",
        active: false,
        selectedOption: null,
        showTextInput: true,
        field: "mentalHealthAffected",
        subquestions: [
          {
            selectedOption: null,
            field: "mentalHealthAffectedDescription",
          },
        ],
      },
      {
        title: "Califique su estado de energía - Fatiga",
        active: false,
        selectedOption: null,
        showSlider: true,
        field: "energyStatus",
      },
      {
        title: "Califique su alimentación",
        active: false,
        selectedOption: null,
        showRowOptions: true,
        options: [
          { label: "Nada saludable" },
          { label: "Poco saludable" },
          { label: "Saludable" },
          { label: "Muy saludable" },
        ],
        field: "feed",
      },
      {
        title: "Califique su hidratación diaria (todos los líquidos ingeridos)",
        active: false,
        selectedOption: null,
        subquestions: [
          {
            title: "Poca ingesta < de 1.5 litros (menos de 5 vasos aprox.) ",
            selectedOption: null,
            field: "hydrationStatus",
          },
          {
            title: "Normal 1.5 a 2 litros (5 a 8 vasos aprox.)",
            selectedOption: null,
            field: "hydrationStatus",
          },
          {
            title: "Mucha ingesta > a 2.5 litros (> de 8 vasos aprox.)",
            selectedOption: null,
            field: "hydrationStatus",
          },
        ],
        field: "hydrationStatus",
      },
      {
        title: "Califique su estado de orina (diuresis)",
        active: false,
        selectedOption: null,
        subquestions: [
          {
            title: "Orino normal (entre 500 ml y 1 litro al día)",
            selectedOption: null,
            field: "urineStatus",
          },
          {
            title:
              "He notado una disminución del 50% o menos de 1 litro al día",
            selectedOption: null,
            field: "urineStatus",
          },
          {
            title: "Orino poco (menos de medio litro o 500 ml al día)",
            selectedOption: null,
            field: "urineStatus",
          },
          {
            title: "Casi nada (menos de 1 vaso al día)",
            selectedOption: null,
            field: "urineStatus",
          },
          {
            title: "Nada",
            selectedOption: null,
            field: "urineStatus",
          },
        ],
        field: "urineStatus",
      },
      {
        title: "Califique su estado de ejercicio físico",
        active: false,
        selectedOption: null,
        subquestions: [
          {
            title:
              "Ninguno: no puedo, no quiero, no recomendado por el médico, contraindicado.",
            selectedOption: null,
            field: "exerciseStatus",
          },
          {
            title:
              "Bajo: camino poco, realizo tareas domésticas, trabajo con poca actividad física. Camino menos de 10 mil pasos al día o menos de 7.5 km día.",
            selectedOption: null,
            field: "exerciseStatus",
          },
          {
            title:
              "Moderado: Camino más de 10 mil pasos o 7.5 km al día. Al menos 150 minutos de actividad física a la semana (caminar, trotar, nadar, yoga, baile, pesas, bicicleta, etc.)",
            selectedOption: null,
            field: "exerciseStatus",
          },
          {
            title:
              "Intenso: Más de 150 minutos a la semana de actividad intensa o más de 300 minutos de actividad moderada. (Deportista aficionado, bien entrenado o competidor)",
            selectedOption: null,
            field: "exerciseStatus",
          },
        ],
        field: "exerciseStatus",
      },

      // Agrega más campos aquí según sea necesario
    ],
    vitalSigns: [],
    bodySection: {
      selectedMuscles: [],
      isPain: false,
      painLevel: 1,
      painTime: "",
      painType: "",
      analgesics: "",
      calmWithAnalgesics: "",
      painFrequency: "",
      worstPain: "",
    },
    estudios: {
      abnormalGlycemia: {
        title: 'Glicemia anormal',
        file: '',
        active: false,
      },
      lastAbnormalGlycemia: {
        title: 'Última glicemia anormal',
        file: '',
        active: false,
        selectedOption: [526, 589, 600]
      },
      physicalExamination: {
        title: 'Examen físico',
        file: '',
        selectedOption: 1
      },
      laboratoryResults: {
        title: 'Resultados de laboratorio',
        file: '',
        selectedOption: [
          "https:cloudinary1",
          "https:cloudinary2"
        ],
        laboratoryResultsDescription: {
          title: 'Descripción resultados de laboratorio',
          file: '',
          selectedOption: [
            "description1",
            "description2"
          ]
        }
      },
      electrocardiogram: {
        title: 'Electrocardiograma',
        file: '',
        selectedOption: "https:cloudinary",
        electrocardiogramDescription: {
          title: 'Descripción electrocardiograma',
          file: '',
          selectedOption: "decription electrocardiogram"
        }
      },
      rxThorax: {
        title: 'RX de Torax',
        file: '',
        selectedOption: "https:cloudinary"
      },
      echocardiogram: {
        title: 'Ecocardiograma',
        file: '',
        selectedOption: "https:cloudinary"
      },
      walkTest: {
        title: 'Test de caminata',
        file: '',
        selectedOption: "https:cloudinary"
      },
      respiratoryFunctional: {
        title: 'Funcional respiratorio',
        file: '',
        selectedOption: "https:cloudinary"
      },
      tomographies: {
        title: 'Tomografías',
        file: '',
        selectedOption: "https:cloudinary"
      },
      rightHeartCatheterization: {
        title: 'Cateterismo cardiaco derecho',
        file: '',
        selectedOption: "https:cloudinary"
      },
      ccg: {
        title: 'CCG (Coronariografia)',
        file: '',
        selectedOption: "https:cloudinary"
      },
      resonance: {
        title: 'Resonancia',
        file: '',
        selectedOption: "https:cloudinary"
      },
      leftHeartCatheterization: {
        title: 'Cateterismo cardiaco izquierdo',
        file: '',
        selectedOption: "https:cloudinary"
      },
      otherStudies: {
        title: 'Otros estudios',
        file: '',
        selectedOption: [
          "other study 1",
          "other study 2"
        ]
      },
      pendingStudies: {
        title: 'Estudios pendientes',
        file: '',
        selectedOption: "No one is pending :) Good patient"
      },
      consultationReason: {
        title: 'Motivo de la consulta',
        file: '',
        selectedOption: "Dolor de cabeza :("
      },
      importantSymptoms: {
        title: 'Síntomas importantes',
        file: '',
        selectedOption: "Dolor de cabeza muy fuerte por 2 días :("
      },
      currentMedications: {
        title: 'Medicamentos actuales',
        file: '',
        selectedOption: [
          "medicamento1",
          "medicamento2",
          "medicamento3"
        ]
      },
    },
    anamnesis: {
      consultationReason: {
        title: '¿Por qué solicitó la consulta?',
        selectedOption: "Dolor de cabeza :("
      },
      importantSymptoms: {
        title: 'Síntomas importantes',
        selectedOption: "Dolor de cabeza muy fuerte por 2 días :("
      },
    },
    tratamiento: {
      medicines: {
        title: 'Medicamentos',
        selectedOption: ''
      }
    }
  },
};

const preconsultaFormSlice = createSlice({
  name: "preconsultaForm",
  initialState,
  reducers: {
    updateField(state, action) {
      const { sectionIndex, field, value } = action.payload;
      state.formData.questions[sectionIndex][field] = value;
    },
    updateSubquestion(state, action) {
      const { sectionIndex, subquestionIndex, field, value } = action.payload;
      state.formData.questions[sectionIndex].subquestions[subquestionIndex][
        field
      ] = value;
    },
    updateVitalSign(state, action) {
      const { patientId, measureType, measure, schedulingId, key } =
        action.payload;
      const index = state.formData.vitalSigns.findIndex(
        (sign) => sign.measureType === measureType
      );
      if (index !== -1) {
        state.formData.vitalSigns[index] = {
          patientId,
          measureType,
          measure,
          schedulingId,
          key,
        };
      } else {
        state.formData.vitalSigns.push({
          patientId,
          measureType,
          measure,
          schedulingId,
          key,
        });
      }
    },
    updateBodyField(state, action) {
      const { field, value } = action.payload;
      state.formData.bodySection[field] = value;
    },
    updateFileUploaded(state, action) {
      const { field, file } = action.payload;
      state.formData.estudios[field].file = file;
    },
    setFormData(state, action) {
      state.formData = action.payload;
    },
    resetForm(state) {
      state.formData = initialState.formData;
    },
  },
});

export const {
  updateField,
  updateSubquestion,
  updateVitalSign,
  setFormData,
  resetForm,
  updateBodyField,
  updateFileUploaded
} = preconsultaFormSlice.actions;
export default preconsultaFormSlice.reducer;
