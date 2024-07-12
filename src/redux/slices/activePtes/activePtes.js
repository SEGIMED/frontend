import { createSlice } from "@reduxjs/toolkit";

const initialState = { };

const activePtes = createSlice({
    name: 'activePtes',
    initialState,
    reducers: {
        addActivePtes: (state, action) => {
            return action.payload;
            
        }
    }
});

export const { addActivePtes } = activePtes.actions;
export default activePtes.reducer;