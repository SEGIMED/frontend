import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const estadisticas = createSlice({
    name: 'estadisticas',
    initialState,
    reducers: {
        addEstadisticas: (state, action) => action.payload,
    }
});

export const { addEstadisticas } = estadisticas.actions;
export default estadisticas.reducer;