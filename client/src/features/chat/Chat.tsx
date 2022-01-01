import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types/types";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addMessage,
  Message,
  selectChatData,
  setConnectedUsers,
  setMessages,
  setTarget,
} from "./chatSlice";

function Chat(props: {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}) {
  const socket = props.socket;
  const chatData: { user: string; target: string; messages: Message[]; connectedUsers: {user:string; id:string}[] } =
    useAppSelector(selectChatData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on("chatMessage", (data) => {
      dispatch(setMessages(data.messages));
      dispatch(setConnectedUsers(data.users))
    });
    socket.on("displayPrivateMessage", ({ sender, msg }) => {
      dispatch(
        addMessage({ user: sender, content: msg + "(private message)" })
      );
    });
  }, []);

  const sendMsg = (value: string) => {
    console.log(chatData);
    if (chatData.target === "")
      socket.emit("chatMessage", { user: chatData.user, content: value });
    else socket.emit("privateMessage", chatData.target, chatData.user, value);
  };
  return (
    <div className="Chatroom flex flex-col justify-between h-5/6 w-1/3 shadow-2xl rounded-lg ">
      <div className="font-medium mx-auto m-6">CHATROOM</div>
      <div className="flex flex-col w-full h-3/4 bg-orange-200 overflow-y-scroll">
        {chatData.messages
          ? chatData.messages.map((item) => (
              <div
                id={item.user.split(":")[1]}
                key={item.user.split(":")[1]}
                onClick={(e) => dispatch(setTarget(e.currentTarget.id))}
                className="font-bold text-lg cursor-pointer"
              >
                {item.user.split(":")[0]} {item.content}
              </div>
            ))
          : ""}
      </div>
      <div className="flex w-full h-1/6">
        <input
          onKeyDown={(e) =>
            e.key === "Enter" ? sendMsg(e.currentTarget.value) : ""
          }
          className="w-full m-2 p-2 bg-red-100"
        />
      </div>
    </div>
  );
}

export default Chat;
