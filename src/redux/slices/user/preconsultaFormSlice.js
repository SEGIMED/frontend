import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {}

};

const preconsultaFormSlice = createSlice({
  name: "preconsultaForm",
  initialState,
  reducers: {
    updateAllFormData(state, action) {
      const { draft } = action.payload;
      state.formData = draft;
    },
    resetFormData(state, action) {
      state.formData = action.payload;
    },
    updateField(state, action) {
      const { key, field, value } = action.payload;
      state.formData.questions[key][field] = value;
    },

    updateActive(state, action) {
      const { question, label, active } = action.payload;
      const currentSubquestions = state.formData.questions[question].subquestions;
      if (state.formData.questions[question].active === active) {
        state.formData.questions[question].active = null;
        if (currentSubquestions) { // limpiamos las opciones binarias, por lo tanto desactivamos y reseteamos los checkbox de las subpreguntas
          Object.keys(currentSubquestions).map((subquestion, index) => {
            state.formData.questions[question].subquestions[subquestion].selectedOption = null;
          });
        }
      }
      else {
        if (!active) {
          if (currentSubquestions) { // si decimos que no, entonces desactivamos y reseteamos los checkbox de las subpreguntas
            Object.keys(currentSubquestions).map((subquestion, index) => {
              state.formData.questions[question].subquestions[subquestion].selectedOption = null;
            });
          }
          state.formData.questions[question].active = active;
        }
        else state.formData.questions[question].active = active;
      }
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
      }
      else {
        console.log(active);
        state.formData.vitalSigns[vitalSign].active = active
      }
    },
    updateLastGlycemia(state, action) {
      const { vitalSign, key, value } = action.payload;
      state.formData.vitalSigns[vitalSign].options[key] = value;
    },
    setFormData(state, action) {
      state.formData= action.payload;
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
  updateTestSelectedOption
} = preconsultaFormSlice.actions;
export default preconsultaFormSlice.reducer;
