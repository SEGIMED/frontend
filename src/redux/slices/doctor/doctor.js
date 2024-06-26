import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const doctor = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        addDoctor: (state, action) => action.payload,
    }
});

export const { addDoctor } = doctor.actions;
export default doctor.reducer;