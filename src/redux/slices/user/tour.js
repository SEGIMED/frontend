import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const tourstate = createSlice({
    name: "tour",
    initialState,
    reducers: {
        setTourstate: (state, action) => {
            return action.payload;
        },
    },
});

export const { setTourstate } = tourstate.actions;
export default tourstate.reducer;
