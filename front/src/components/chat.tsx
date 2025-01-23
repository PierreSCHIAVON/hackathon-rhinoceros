import React, { useState } from "react";
import { Card, Button, Input } from "@material-tailwind/react";

const Chat = () => {
  const [rooms, setRooms] = useState([
    { name: "Floods - City Center", activeUsers: 5 },
    { name: "Earthquake - North Zone", activeUsers: 3 },
    { name: "General Discussion", activeUsers: 8 },
  ]);

  const [messages, setMessages] = useState([
    {
      sender: "User1",
      text: "The flood situation is worsening in the city center.",
    },
    {
      sender: "User2",
      text: "Yes, I've seen the reports. We should be prepared for more evacuations.",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Sidebar */}
      <Card className="w-1/4 p-4 mr-4 bg-white shadow-lg">
        <Button color="green" className="w-full mb-4" onClick={() => {}}>
          Create New Room
        </Button>
        <div className="space-y-2">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="p-2 bg-gray-200 rounded-lg flex justify-between items-center hover:bg-gray-300 cursor-pointer"
            >
              <span>{room.name}</span>
              <span className="text-sm text-gray-500">
                Active: {room.activeUsers}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col p-4 bg-white shadow-lg">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-2 ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  message.sender === "You" ? "bg-green-200" : "bg-gray-200"
                }`}
              >
                <p className="text-sm font-medium">
                  {message.sender === "You" ? "You" : message.sender}
                </p>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Input
            label="Type a message"
            className="flex-grow" // Permet à l'input de prendre tout l'espace restant
          />
          <Button
            color="green"
            onClick={handleSendMessage}
            className="flex-shrink-0" // Fixe la taille du bouton
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
