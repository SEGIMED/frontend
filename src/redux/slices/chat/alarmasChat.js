import { createSlice } from "@reduxjs/toolkit";

// Estado inicial para el chatbot de alarmas: un array vacío de mensajes
const initialState = {
  messages: [
    {
      sender: "bot",
      message:
        "Hola, soy el asistente de alarmas. ¿Qué síntomas estás experimentando?",
      time: new Date().toISOString(),
    },
  ],
};

const alarmasBotSlice = createSlice({
  name: "alarmasBot",
  initialState,
  reducers: {
    // Agregar un nuevo mensaje al array de mensajes
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Reiniciar los mensajes del chatbot de alarmas
    resetMessages: (state) => {
      state.messages = initialState.messages;
    },
  },
});

// Seleccionadores (selectores) para obtener los mensajes del chatbot de alarmas
export const selectAlarmasMessages = (state) => state.alarmasBot.messages;

// Exportar las acciones y el reductor del chatbot de alarmas
export const { addMessage, resetMessages } = alarmasBotSlice.actions;
export default alarmasBotSlice.reducer;
