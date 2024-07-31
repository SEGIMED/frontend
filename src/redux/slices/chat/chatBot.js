import { createSlice } from "@reduxjs/toolkit";

// Estado inicial: un array vacío de mensajes
const initialState = {
  messages: [
    {
      sender: "bot",
      message: "¡Hola! Soy Segi. ¿En qué puedo ayudarte?",
    },
  ],
};

const chatBotSlice = createSlice({
  name: "chatBot",
  initialState,
  reducers: {
    // Agregar un nuevo mensaje al array de mensajes
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

// Seleccionadores (selectores) para obtener los mensajes
export const selectMessages = (state) => state.chatBot.messages;

// Exportar las acciones y el reductor
export const { addMessage } = chatBotSlice.actions;
export default chatBotSlice.reducer;
