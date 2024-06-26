import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const schedules = createSlice({
    name: 'schedules',
    initialState,
    reducers: {
        addSchedules: (state, action) => action.payload,
    }
});

export const { addSchedules } = schedules.actions;
export default schedules.reducer;