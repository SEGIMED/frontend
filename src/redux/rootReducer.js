import { combineReducers } from "@reduxjs/toolkit";
import user from "./slices/user/user";
import allPatients from "./slices/doctor/allPatients";
import doctores from "./slices/doctor/allDoctores";
import chat from "./slices/chat/chat";
import formSlice from "./slices/doctor/formConsulta";
import doctor from "./slices/doctor/doctor";
import estadisticas from "./slices/doctor/estadisticas";
import schedules from "./slices/doctor/schedules";
import preconsultaForm from "./slices/user/preconsultaFormSlice";
import { enableMapSet } from "immer";
import alarms from "./slices/alarms/alarms";
import activePtes from "./slices/activePtes/activePtes";
import notifications from "./slices/user/notifications";
import clinicalHistory from "./slices/doctor/HistorialClinico";
import chatBot from "./slices/chat/chatBot";
import searchBar from "./slices/user/searchBar";
import alarmasChat from "./slices/chat/alarmasChat";
enableMapSet();
// Define a reset action type
const RESET_ACTION_TYPE = "root/reset";

// Combine all your slices
const appReducer = combineReducers({
  user,
  allPatients,
  doctores,
  doctor,
  estadisticas,
  schedules,
  chat,
  formSlice,
  preconsultaForm,
  alarms,
  activePtes,
  notifications,
  clinicalHistory,
  chatBot,
  searchBar,
  alarmasChat,
});

// Create a root reducer that handles the reset action
const rootReducer = (state, action) => {
  if (action.type === RESET_ACTION_TYPE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

// Export the reset action creator
export const resetApp = () => ({ type: RESET_ACTION_TYPE });
