import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers:[],
    searchTermUsers:""
};

const allUsers = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        addAllUsers: (state, action) => {
           
           state.allUsers= action.payload
        },
        setSearchTermUsers: (state, action) => {  
            state.searchTermUsers = action.payload;
        },
    }
})

export const {addAllUsers, setSearchTermUsers} = allUsers.actions;
export default allUsers.reducer;