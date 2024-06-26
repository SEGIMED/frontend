import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    patients: [],
    searchTerm: '',
    patient:[]
};


const allPatientsSlice = createSlice({
    name: 'allPatients',
    initialState,
    reducers: {
        setAllPatients: (state, action) => {
            state.patients = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        toggleFavorite: (state, action) => {
            const patientId = action.payload;
            const patient = state.patients.find(p => p.id === patientId);
            if (patient) {
                patient.favoritos = !patient.favoritos;
            }
        },
        setPatient :(state, action)=>{
            state.patient= action.payload;
        }
    },
});

export const { setAllPatients, setSearchTerm, toggleFavorite, setPatient } = allPatientsSlice.actions;
export default allPatientsSlice.reducer;