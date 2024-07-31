import io from "socket.io-client";
import { setChats, updateChat, addChat } from "@/redux/slices/chat/chat";
import { dataClear } from "@/redux/slices/chat/chat";
import Cookies from "js-cookie";

class Socket {
  constructor() {
    this._socket = null;
    this._observer = null;
    this._token = null;
    this._dispatch = null;
    if (!Socket.instace) {
      Socket.instace = this;
    }
    return Socket.instace;
  }

  addObserver(observer) {
    this._observer = observer;
  }

  removeObserver() {
    this._observer = null;
  }

  notifyObservers(eventType, eventData) {
    this._observer[eventType](eventData);
  }

  setSocket(token, refreshToken, dispatch) {
    this._token = token;
    this._refreshToken = refreshToken;
    this._dispatch = dispatch;
    this._socket = io(`http://localhost:5000/room-consult`, {
      query: {
        token: token,
        refreshToken: refreshToken,
      },
    });
    this._socket.on("connect", () => {});

    // Escuchar el evento 'disconnect' para saber cuando el socket se desconecta
    this._socket.on("disconnect", () => {});

    this._socket.on("getHistoryChats", async (data) => {
      //event listener client recived all chats of a user.
      if (data) dispatch(setChats(data));
    });

    this._socket.on("updateMessage", async (data) => {
      //event listener client recived info of a chat.
      dispatch(updateChat(data));

      this._socket.emit("persistChat", data.chat, (newChat) => {
        dispatch(addChat(newChat));
      });
    });
    this._socket.emit("joinRoom", data, () => {});
  

    this._socket.on("newAccessToken", ({ newAccessToken }) => {
      Cookies.set("a", newAccessToken);
      // También puedes actualizar el token en el cliente
      this._token = newAccessToken;
    });

    this._socket.on("updateNewChat", (data) => {
      dispatch(addChat(data));
    });
  }

  getSocket() {
    return this._socket;
  }

  emit(event, data) {
    this._socket.emit(event, data);
  }

  addObserver(event, component) {
    this._observer;
  }
  isConnected() {
    return this._socket?.connected;
  }

  reconnect() {
    if (this._token && this._dispatch) {
      this.setSocket(this._token, this._dispatch);
    }
  }
  disconnect() {
    this._socket.emit("destroyChatBot");
    this._dispatch(dataClear());
  }
}

export const socket = new Socket();
