import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notifications = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotifications: (state, action) => {
      return action.payload;
    },
  },
});

export const { addNotifications } = notifications.actions;
export default notifications.reducer;
