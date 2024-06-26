import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'formState',
    initialState: {
        selectedOptions: {},
    },
    reducers: {
        setSelectedOption: (state, action) => {
            const { name, option } = action.payload;
            state.selectedOptions[name] = option;
        },
    },
});

export const { setSelectedOption } = formSlice.actions;
export default formSlice.reducer;