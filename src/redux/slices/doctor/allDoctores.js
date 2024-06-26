import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctores: [],
    searchTerm1: "",
};

const doctores = createSlice({
    name: 'doctores',
    initialState,
    reducers: {
        getAllDoctores: (state, action) => {
            state.doctores = action.payload;
        },
        setSearchTerm1: (state, action) => {  
            state.searchTerm1 = action.payload;
        },
    },
});

export const { getAllDoctores, setSearchTerm1 } = doctores.actions;  
export default doctores.reducer;
