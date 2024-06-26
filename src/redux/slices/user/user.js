import { createSlice } from "@reduxjs/toolkit";

const initialState = {  };

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        adduser: (state, action) => {
           
            return action.payload;
        },
    }
})

export const { adduser } = user.actions;
export default user.reducer;