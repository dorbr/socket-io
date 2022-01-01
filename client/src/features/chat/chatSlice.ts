import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ChatDataState {
  value: {
    user: string;
    target: string;
    messages: Message[];
    connectedUsers: {user:string; id:string;}[];
  };
  status: "idle" | "loading" | "failed";
}
export interface Message {
  user: string;
  content: string;
}
const initialState: ChatDataState = {
  value: {
    user: "Guest",
    target: "",
    messages: [],
    connectedUsers: [],
  },
  status: "idle",
};

export const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.value.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.value.messages = [...state.value.messages, action.payload];
    },
    setConnectedUsers: (state, action: PayloadAction<{user:string; id:string}[]>) => {
      state.value.connectedUsers = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.value.user = action.payload;
    },
    setTarget: (state, action: PayloadAction<string>) => {
      console.log("target is", state.value.target);
      state.value.target = action.payload;
    },
  },
});

export const { setConnectedUsers, addMessage, setMessages, setUser, setTarget } =
  chatSlice.actions;

export const selectChatData = (state: RootState) => state.chatData.value;

export default chatSlice.reducer;
