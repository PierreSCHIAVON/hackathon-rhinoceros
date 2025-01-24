import React, { useState, useEffect } from "react";
import { Card, Button, Input } from "@material-tailwind/react";
import io from "socket.io-client";

const socket = io('http://localhost:3000/');

const Chat = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: "Floods - City Center", activeUsers: 5 },
    { id: 2, name: "Earthquake - North Zone", activeUsers: 3 },
    { id: 3, name: "General Discussion", activeUsers: 8 },
  ]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState(localStorage.getItem('chatUsername') || '');
  const [tempUsername, setTempUsername] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(!!localStorage.getItem('chatUsername'));
  const [currentZone, setCurrentZone] = useState(null);

  useEffect(() => {
    socket.on('chat history', (history) => {
      setMessages(history.map(msg => ({
        sender: msg.username,
        text: msg.message,
        zoneId: msg.zoneId
      })));
    });

    socket.on('chat', (msg) => {
      const [sender, text] = msg.split(': ');
      setMessages(prev => [...prev, { sender, text, zoneId: currentZone }]);
    });

    return () => {
      socket.off('chat history');
      socket.off('chat');
    };
  }, [currentZone]);

  const joinRoom = (zoneId) => {
    socket.emit('join room', zoneId);
    setCurrentZone(zoneId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && username && currentZone) {
      socket.emit('chat', {
        username,
        message: newMessage,
        zoneId: currentZone
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      <Card className="w-1/4 p-4 mr-4 bg-white shadow-lg">
        {!isConfirmed ? (
          <div className="mb-4">
            <Input
              label="Enter username (minimum 3 characters)"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
            />
            <Button
              disabled={tempUsername.length < 3}
              onClick={() => {
                setUsername(tempUsername);
                localStorage.setItem('chatUsername', tempUsername);
                setIsConfirmed(true);
              }}
            >
              Confirm Username
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-2 rounded-lg flex justify-between items-center cursor-pointer ${
                    currentZone === room.id ? "bg-green-200" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => joinRoom(room.id)}
                >
                  <span>{room.name}</span>
                  <span className="text-sm text-gray-500">Active: {room.activeUsers}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card className="flex-1 flex flex-col p-4 bg-white shadow-lg">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages
            .filter(message => !currentZone || message.zoneId === currentZone)
            .map((message, index) => (
              <div key={index} className={`flex mb-2 ${message.sender === username ? "justify-end" : "justify-start"}`}>
                <div className={`p-2 rounded-lg max-w-xs ${message.sender === username ? "bg-green-200" : "bg-gray-200"}`}>
                  <p className="text-sm font-medium">{message.sender}</p>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
        </div>

        {username ? (
          currentZone ? (
            <div className="flex items-center space-x-2">
              <Input
                variant="standard"
                label="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button color="green" onClick={handleSendMessage} className="flex-shrink-0">
                Send
              </Button>
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-100 rounded">
              Please select a room to start chatting
            </div>
          )
        ) : (
          <div className="text-center p-4 bg-gray-100 rounded">
            Please enter a username to start chatting
          </div>
        )}
      </Card>
    </div>
  );
};

export default Chat;