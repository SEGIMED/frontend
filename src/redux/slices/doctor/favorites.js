import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favorites = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorites: (state, action) => action.payload,
    }
});

export const { addFavorites } = favorites.actions;
export default favorites.reducer;