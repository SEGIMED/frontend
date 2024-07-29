
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    
   
  };

const chatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        setChats: (state, action) => {
            action.payload.forEach(chat => {
                const { users } = chat;
                const key = users.sort().join("-");
                state[key] = chat;
            });
            return state;
        },
        updateChat: (state, action) => {
            const { chat, lastMessage } = action.payload;
            const key = chat.users.sort().join("-");
            if (state[key]) {
                state[key].unseenMessages.push(lastMessage);
            }
        },
        addChat: (state, action) => {
            if (action.payload?.chat) {
                const { chat } = action.payload;
                const { users } = chat;
                const key = users.sort().join("-");
                return { ...state, [key]: chat };
            }
        },
        markMessagesAsSeen: (state, action) => {
            const { chatId,markedChats } = action.payload;
      
            // Si ya se ha marcado como visto, no hacer nada
            if (markedChats) {
              return;
            }
      
            const chat = state[chatId];
            if (chat) {
              chat.seenMessages = [
                ...chat.seenMessages,
                ...chat.unseenMessages.map(msg => ({ ...msg, state: true }))
              ];
              chat.unseenMessages = [];
      
             
            }
          },
        dataClear: (state) => {
            return {};
        },
    }
});

const selectChats = state => state.chat;

export const selectChatById = createSelector(
    [selectChats],
    (chats) => (users) => {
        const key = users.sort().join("-");
        return chats[key];
    }
);

export const { addChat, dataClear, setChats, updateChat, markMessagesAsSeen } = chatSlice.actions;

export default chatSlice.reducer;

