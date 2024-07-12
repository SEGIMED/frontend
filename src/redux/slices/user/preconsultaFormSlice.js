import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    questions: {
      lackOfAir: {
        title: "¿Tiene falta de aire (Disnea)?",
        active: false,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          lackOfAirIncremented: {
            title: "Se ha incrementado en las últimas:",
            options: [
              { label: "Horas" },
              { label: "Días" },
              { label: "Semanas" },
            ],
            selectedOption: null,
          },
          lackOfAirClasification: {
            title: "Califique su falta de aire",
            options: [
              {
                label: "Puedo caminar a paso rápido más de 10 cuadras sin parar.",
              },
              {
                label: "Puedo caminar a paso rápido menos de 5 cuadras sin parar.",
              },
              {
                label: "No puedo caminar más de 3 cuadras, solo realizo tareas domésticas, uso oxígeno eventualmente.",
              },
              {
                label: "No puedo caminar ni una cuadra, tampoco realizar tareas domésticas con normalidad, me hace falta el aire aunque esté en reposo, uso oxígeno todo el tiempo.",
              },
            ],
            selectedOption: null,
            orientation: "column",
          },
        },
      },
      chestPainAtRest: {
        title: "¿Tiene dolor de pecho en reposo?",
        active: false,
        binaryOptions: true,
        selectedOption: null,
        description: '',
      },
      chestPainOnExertion: {
        title: "¿Tiene dolor de pecho al hacer esfuerzos físicos?",
        active: false,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          chestPainOnExertionAmount: {
            options: [
              { label: "Con poco esfuerzo físico" },
              { label: "Con esfuerzo físico moderado" },
              { label: "Con esfuerzo físico intenso" },
            ],
            selectedOption: null,
          }
        }
      },
      edemaPresence: {
        title: "¿Ha notado edemas (hinchazón) o aumento del edema previo?",
        active: false,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          edemaPresenceDescription: {
            options: [
              { label: "Hinchazón en los pies" },
              { label: "Hinchazón por debajo de las rodillas" },
              { label: "Hinchazón de las rodillas a la cadera" },
              { label: "Hinchazón general" },
            ],
            selectedOption: null,
          }
        }
      },
      feelings: {
        title: "¿Cómo se encuentra el día de hoy?",
        active: false,
        binaryOptions: false,
        selectedOption: 1,
        showRowOptions: true,
        description: '',
        options: [
          { label: "Mal" },
          { label: "Regular" },
          { label: "Normal" },
          { label: "Bien" },
        ],
      },
      healthChanges: {
        title: "¿Ha notado algún cambio en su salud?",
        active: false,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: '',
        // healthChangesDescription: ''
      },
      healthWorsened: {
        title: "Siente que su salud se ha empeorado en las últimas:",
        active: false,
        binaryOptions: false,
        selectedOption: 3,
        showRowOptions: true,
        description: '',
        options: [
          { label: "Horas" },
          { label: "Días" },
          { label: "Semanas" },
          { label: "No empeoró" },
        ],
      },
      bodyPain: {
        title: "¿Tiene alguna dolencia en su cuerpo?",
        active: false,
        binaryOptions: true,
        selectedOption: null,
        description: '',
      },
      mentalHealthAffected: {
        title: "¿Su salud mental está afectada?",
        active: false,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: '',
        // mentalHealthAffectedDescription: ''
      },
      energyStatus: {
        title: "Califique su estado de energía - Fatiga",
        active: false,
        binaryOptions: false,
        selectedOption: 1,
        showSlider: true,
        description: '',
      },
      feed: {
        title: "Califique su alimentación",
        active: false,
        binaryOptions: false,
        selectedOption: 2,
        showRowOptions: true,
        description: '',
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
        selectedOption: 2,
        description: '',
        options: [
          { label: "Poca ingesta < de 1.5 litros (menos de 5 vasos aprox.) " },
          { label: "Normal 1.5 a 2 litros (5 a 8 vasos aprox.)" },
          { label: "Mucha ingesta > a 2.5 litros (> de 8 vasos aprox.)" },
        ],
      },
      urineStatus: {
        title: "Califique su estado de orina (diuresis)",
        active: true,
        binaryOptions: false,
        selectedOption: 4,
        description: '',
        options: [
          { label: "Orino normal (entre 500 ml y 1 litro al día)" },
          { label: "He notado una disminución del 50% o menos de 1 litro al día" },
          { label: "Orino poco (menos de medio litro o 500 ml al día)" },
          { label: "Casi nada (menos de 1 vaso al día)" },
          { label: "Nada" },
        ],
      },
      exerciseStatus: {
        title: "Califique su estado de ejercicio físico",
        active: true,
        binaryOptions: false,
        selectedOption: 2,
        description: '',
        options: [
          { label: "Ninguno: no puedo, no quiero, no recomendado por el médico, contraindicado." },
          { label: "Bajo: camino poco, realizo tareas domésticas, trabajo con poca actividad física. Camino menos de 10 mil pasos al día o menos de 7.5 km día." },
          { label: "Moderado: Camino más de 10 mil pasos o 7.5 km al día. Al menos 150 minutos de actividad física a la semana (caminar, trotar, nadar, yoga, baile, pesas, bicicleta, etc.)" },
          { label: "Intenso: Más de 150 minutos a la semana de actividad intensa o más de 300 minutos de actividad moderada. (Deportista aficionado, bien entrenado o competidor)" },
        ],
      },
    },
    vitalSigns: {
      height: {
        cat: "antrophometric",
        medicalEventId: null,
        measureType: 4,
        measure: 0,
        key: "Talla",
        label: "Estatura",
        unit: "cm",
        referenceValue: 180,
      },
      weight: {
        cat: "antrophometric",
        medicalEventId: null,
        measureType: 5,
        measure: 0,
        key: "Peso",
        label: "Peso",
        unit: "kg",
        referenceValue: 76,
      },
      IMC: {
        cat: "antrophometric",
        key: "IMC",
        medicalEventId: null,
        measureType: 7,
        measure: 0,
        label: "Índice de masa corporal",
        unit: "kg/m2",
        referenceValue: 24.69,
      },
      temperature: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 1,
        measure: 0,
        key: "Temperatura",
        label: "Temperatura",
        unit: "°C",
        referenceValue: 37,
      },
      /* Abdominal_perimeter: {
        cat: "antrophometric",
        key: "Perimetro Abdominal",
        label: "Perímetro abdominal",
        unit: "cm",
        referenceValue: "",
      }, */
      Heart_Rate: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 7,
        measure: 0,
        key: "Frecuencia Cardiaca",
        label: "Frecuencia cardíaca",
        unit: "lpm",
        referenceValue: 80,
      },
      Systolic_Blood_Pressure: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 2,
        measure: 0,
        key: "Presion Arterial Sistolica",
        label: "Presión arterial sistólica",
        unit: "mmHg",
        referenceValue: 120,
      },
      Diastolic_Blood_Pressure: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 3,
        measure: 0,
        key: "Presion Arterial Diastolica",
        label: "Presión arterial diastólica",
        unit: "mmHg",
        referenceValue: 80,
      },
      // Mean_arterial_pressure: {
      //   cat: "vitalSigns",
      //   key: "Presion Arterial Media",
      //   label: "Presión arterial media",
      //   unit: "mmHg",
      //   referenceValue: "",
      // },
      Breathing_frequency: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 5,
        measure: 0,
        key: "Frecuencia Respiratoria",
        label: "Frecuencia respiratoria",
        unit: "rpm",
        referenceValue: 17,
      },
      Oxygen_saturation: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 6,
        measure: 0,
        key: "Saturacion de Oxigeno",
        label: "Saturación de oxígeno",
        unit: "%",
        referenceValue: 80,
      },
    },
    bodySection: {
      selectedOptions: {
        isTherePain: null,
        painDuration: null,
        painScale: null,
        painType: null,
        painAreas: null,
        painFrequency: null,
        isTakingAnalgesic: null,
        doesAnalgesicWorks: null,
        isWorstPainEver: null,
        painOwner: null,
        scheduling: null,
        medicalEvent: null,
      },
    },
    anamnesis: {
      consultationReason: {
        title: '¿Por qué solicitó la consulta?',
        description: "Dolor de cabeza :("
      },
      importantSymptoms: {
        title: 'Síntomas importantes',
        description: "Dolor de cabeza muy fuerte por 2 días :("
      },
    },
    tratamiento: {
      currentMedications: {
        title: 'Medicamentos actuales',
        placeholder: 'Escriba el medicamento',
        file: '',
        selectedOptions: {
          item0: '',
        }
      },
    }
  },
};

const preconsultaFormSlice = createSlice({
  name: "preconsultaForm",
  initialState,
  reducers: {
    updateField(state, action) {
      const { key, field, value } = action.payload;
      state.formData.questions[key][field] = value;
    },

    updateActive(state, action) {
      const { question, active } = action.payload;
      const currentSubquestions = state.formData.questions[question].subquestions;
      if (!active && currentSubquestions) { // si decimos que no, entonces desactivamos y reseteamos los checkbox de las subpreguntas
        state.formData.questions[question].active = active
        Object.keys(currentSubquestions).map((subquestion, index) => {
          state.formData.questions[question].subquestions[subquestion].selectedOption = null;
        });
      }
      else state.formData.questions[question].active = active;
    },
    subquestionSelectedOption(state, action) {
      const { question, subquestion, selectedOption } = action.payload;
      state.formData.questions[question].subquestions[subquestion].selectedOption = selectedOption;
    },
    questionSelectedOption(state, action) {
      const { question, selectedOption } = action.payload;
      state.formData.questions[question].selectedOption = selectedOption;
    },
    updateDescription(state, action) {
      const { question, description } = action.payload;
      console.log({ question, description });
      state.formData.questions[question].description = description;
    },
    updateVitalSign(state, action) {
      const { vitalSign, value, patientId, schedulingId } = action.payload;
      state.formData.vitalSigns[vitalSign].measure = value;
      state.formData.vitalSigns[vitalSign].patientId = patientId;
      state.formData.vitalSigns[vitalSign].schedulingId = schedulingId;
    },
    updateAnamnesis(state, action) {
      const { field, description } = action.payload;
      state.formData.anamnesis[field].description = description;
    },
    updateFileUploaded(state, action) {
      const { field, file } = action.payload;
      state.formData.estudios[field].file = file;
    },
    updateTratamiento(state, action) {
      const { field, item, description } = action.payload;
      state.formData.tratamiento[field].selectedOptions[item] = description;
    },
    updateBodyPainLevel: (state, action) => {
      const { name, option } = action.payload;
      state.formData.bodySection.selectedOptions[name] = option;
    },
    updateSubquestion(state, action) {
      const { sectionIndex, subquestionIndex, field, value } = action.payload;
      state.formData.questions[sectionIndex].subquestions[subquestionIndex][
        field
      ] = value;
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
  updateActive,
  subquestionSelectedOption,
  questionSelectedOption,
  updateDescription,
  updateVitalSign,
  updateAnamnesis,
  updateTratamiento,
  updateBodyPainLevel,
  updateSubquestion,
  setFormData,
  resetForm,
  updateFileUploaded
} = preconsultaFormSlice.actions;
export default preconsultaFormSlice.reducer;
