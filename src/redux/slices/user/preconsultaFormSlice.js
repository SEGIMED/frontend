import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    questions: {
      lackOfAir: {
        title: "¿Tiene falta de aire (Disnea)?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
        subquestions: {
          lackOfAirIncremented: {
            title: "Se ha incrementado en las últimas:",
            display: "row",
            selectedOption: null,
            options: [
              { label: "Horas" },
              { label: "Días" },
              { label: "Semanas" },
            ],
          },
          lackOfAirClasification: {
            title: "Califique su falta de aire",
            selectedOption: null,
            orientation: "column",
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
          },
        },
      },
      chestPainAtRest: {
        title: "¿Tiene dolor de pecho en reposo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
      },
      chestPainOnExertion: {
        title: "¿Tiene dolor de pecho al hacer esfuerzos físicos?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
        subquestions: {
          chestPainOnExertionAmount: {
            selectedOption: null,
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
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
        subquestions: {
          edemaPresenceDescription: {
            selectedOption: null,
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
        selectedOption: null,
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
        active: null,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: "",
      },
      healthWorsened: {
        title: "Siente que su salud se ha empeorado en las últimas:",
        active: null,
        binaryOptions: false,
        selectedOption: null,
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
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: "",
      },
      mentalHealthAffected: {
        title: "¿Su salud mental está afectada?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: "",
      },
      energyStatus: {
        title: "Califique su estado de energía - Fatiga",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showSlider: true,
        description: "",
      },
      feed: {
        title: "Califique su alimentación",
        active: null,
        binaryOptions: false,
        selectedOption: null,
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
        selectedOption: null,
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
        selectedOption: null,
        description: "",
        options: [
          { label: "Orino normal (entre 500 ml y 1 litro al día)" },
          {
            label:
              "He notado una disminución del 50% o menos de 1 litro al día",
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
        selectedOption: null,
        description: "",
        options: [
          {
            label:
              "Ninguno: no puedo, no quiero, no recomendado por el médico, contraindicado.",
          },
          {
            label:
              "Bajo: camino poco, realizo tareas domésticas, trabajo con poca actividad física. Camino menos de 10 mil pasos al día o menos de 7.5 km día.",
          },
          {
            label:
              "Moderado: Camino más de 10 mil pasos o 7.5 km al día. Al menos 150 minutos de actividad física a la semana (caminar, trotar, nadar, yoga, baile, pesas, bicicleta, etc.)",
          },
          {
            label:
              "Intenso: Más de 150 minutos a la semana de actividad intensa o más de 300 minutos de actividad moderada. (Deportista aficionado, bien entrenado o competidor)",
          },
        ],
      },
    },
  },
};

const preconsultaFormSlice = createSlice({
  name: "preconsultaForm",
  initialState,
  reducers: {
    // updateAllFormData(state, action) {
    //   const { draft } = action.payload;
    //   state.formData = draft;
    // },
    resetFormData(state, action) {
      state.formData = action.payload;
    },
    updateField(state, action) {
      const { key, field, value } = action.payload;
      state.formData.questions[key][field] = value;
    },

    updateActive(state, action) {
      const { question, label, active } = action.payload;
      const currentSubquestions =
        state.formData.questions[question].subquestions;
      if (state.formData.questions[question].active === active) {
        state.formData.questions[question].active = null;
        if (currentSubquestions) {
          // limpiamos las opciones binarias, por lo tanto desactivamos y reseteamos los checkbox de las subpreguntas
          Object.keys(currentSubquestions).map((subquestion, index) => {
            state.formData.questions[question].subquestions[
              subquestion
            ].selectedOption = null;
          });
        }
      } else {
        if (!active) {
          if (currentSubquestions) {
            // si decimos que no, entonces desactivamos y reseteamos los checkbox de las subpreguntas
            Object.keys(currentSubquestions).map((subquestion, index) => {
              state.formData.questions[question].subquestions[
                subquestion
              ].selectedOption = null;
            });
          }
          state.formData.questions[question].active = active;
        } else state.formData.questions[question].active = active;
      }
    },
    subquestionSelectedOption(state, action) {
      const { question, subquestion, selectedOption } = action.payload;
      state.formData.questions[question].subquestions[
        subquestion
      ].selectedOption = selectedOption;
    },
    questionSelectedOption(state, action) {
      const { question, selectedOption } = action.payload;
      state.formData.questions[question].selectedOption = selectedOption;
    },
    updateDescription(state, action) {
      const { question, description } = action.payload;
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
    updateTratamiento(state, action) {
      const { field, item, description } = action.payload;
      state.formData.tratamiento[field].selectedOptions[item] = description;
    },
    updateBodyPainLevel: (state, action) => {
      const { name, option } = action.payload;
      state.formData.bodySection[name] = option;
    },
    updateSubquestion(state, action) {
      const { sectionIndex, subquestionIndex, field, value } = action.payload;
      state.formData.questions[sectionIndex].subquestions[subquestionIndex][
        field
      ] = value;
    },
    updateGlycemia(state, action) {
      const { vitalSign, active } = action.payload;
      if (state.formData.vitalSigns[vitalSign].active === active) {
        console.log(active);
        state.formData.vitalSigns[vitalSign].active = null;
      } else {
        console.log(active);
        state.formData.vitalSigns[vitalSign].active = active;
      }
    },
    updateLastGlycemia(state, action) {
      const { vitalSign, key, value } = action.payload;
      state.formData.vitalSigns[vitalSign].options[key] = value;
    },
    setFormData(state, action) {
      state.formData = action.payload;
    },
    resetForm(state) {
      state.formData = initialState.formData;
    },

    updateFileUploaded(state, action) {
      const { test, file } = action.payload;
      state.formData.tests[test].file = file;
    },

    updateTestDescription(state, action) {
      const { test, testDescription } = action.payload;
      state.formData.tests[test].description = testDescription;
    },

    updateTestActive(state, action) {
      const { test, active } = action.payload;
      state.formData.tests[test].active = active;
    },

    updateTestSelectedOption(state, action) {
      const { test, value } = action.payload;
      state.formData.tests[test].selectedOption = value;
    },
  },
});

export const {
  resetFormData,
  updateAllFormData,
  updateField,
  updateActive,
  updateGlycemia,
  updateLastGlycemia,
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
  updateFileUploaded,
  updateTestDescription,
  updateTestActive,
  updateTestSelectedOption,
} = preconsultaFormSlice.actions;
export default preconsultaFormSlice.reducer;
