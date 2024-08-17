import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    activeAlarms: [], 
};

const alarms2 = createSlice({
    name: 'alarms2',
    initialState,
    reducers: {
        addActiveAlarms: (state, action) => {
            const { alarms, flag } = action.payload;
            if (!flag) {
                state.activeAlarms = alarms;
            }
        },
    }
});

export const { addActiveAlarms } = alarms2.actions;
export default alarms2.reducer;

