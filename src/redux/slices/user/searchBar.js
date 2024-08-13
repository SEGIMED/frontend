import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const searchBar = createSlice({
    name: "searchBar",
    initialState,
    reducers: {
        setSearchBar: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSearchBar } = searchBar.actions;
export default searchBar.reducer;
