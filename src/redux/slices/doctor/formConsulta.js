import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedOptions: {},
};

const formSlice = createSlice({
    name: 'formState',
    initialState,
    reducers: {
        setSelectedOption: (state, action) => {
            const { name, option } = action.payload;
            state.selectedOptions[name] = option;
        },
        resetFormState: (state) => {
            state.selectedOptions = {};
        },
    },
});

export const { setSelectedOption, resetFormState } = formSlice.actions;
export default formSlice.reducer;
