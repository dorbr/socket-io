import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Message, selectChatData } from "../features/chat/chatSlice";

function UsersList() {
  const chatData: {
    user: string;
    target: string;
    messages: Message[];
    connectedUsers: {user:string, id:string}[];
  } = useAppSelector(selectChatData);
  return (
    <div className="flex flex-col justify-between h-2/6 w-1/3 shadow-2xl rounded-lg">
      {chatData.connectedUsers ? chatData.connectedUsers.map((item) => (
        <div key={item.id}>{item.user}</div>
      )) : ""}
    </div>
  );
}

export default UsersList;
