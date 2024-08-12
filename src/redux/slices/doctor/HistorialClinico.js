import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  data: [],
  loading: true,
  tab: "Datos",
};

const clinicalHistorySlice = createSlice({
  name: "clinicalHistory",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addClinicalHistory: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    addUserHistory: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearClinicalHistory: (state) => {
      state.data = [];
      state.tab = "Datos";
    },
    changeTabs: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const {
  setLoading,
  addClinicalHistory,
  clearClinicalHistory,
  addUserHistory,
  changeTabs,
} = clinicalHistorySlice.actions;
export default clinicalHistorySlice.reducer;
