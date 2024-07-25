import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    data: [],
    loading: true,
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
        },
    },
});

export const { setLoading, addClinicalHistory, clearClinicalHistory, addUserHistory } = clinicalHistorySlice.actions;
export default clinicalHistorySlice.reducer;
