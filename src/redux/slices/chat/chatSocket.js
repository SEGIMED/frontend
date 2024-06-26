import { createSlice } from "@reduxjs/toolkit";


const initialState = {};

const chatSocket = createSlice({
    name: 'chatSocket',
    initialState,
    reducers: {
        addChat: (state, action) => action.payload,
    }
})

export const { addChat } = chatSocket.actions;
export default chatSocket.reducer;