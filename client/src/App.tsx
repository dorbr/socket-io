import React, { useEffect } from "react";

import { io } from "socket.io-client";

import Chat from "./features/chat/Chat";
import UsersList from "./core/UsersList"
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { setUser } from "./features/chat/chatSlice";
const socket = io();

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let user = window.prompt("Whats Your Name?");
    socket.emit("joinedChat", {
      user: user,
    });
    if (user) dispatch(setUser(user));
  }, [dispatch]);
  return (
    <div className="App flex justify-center h-screen w-screen">
      <Chat socket={socket}/>
      <UsersList/>
    </div>
  );
}

export default App;
