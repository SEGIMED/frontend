import { createSlice } from "@reduxjs/toolkit";

const initialState = { };

const alarms = createSlice({
    name: 'alarms',
    initialState,
    reducers: {
        addAlarms: (state, action) => {
            return action.payload;
            
        }
    }
});

export const { addAlarms } = alarms.actions;
export default alarms.reducer;
