import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join } from 'path';
import fs from 'fs';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.sendFile(join(process.cwd(), '..', 'front', 'index_chat.html'));
});

const CHAT_HISTORY_FILE = join(__dirname, 'chat_history.json');

interface ChatMessage {
  username: string;
  message: string;
  timestamp: Date;
}

const loadChatHistory = (): ChatMessage[] => {
  try {
    return JSON.parse(fs.readFileSync(CHAT_HISTORY_FILE, 'utf8'));
  } catch {
    return [];
  }
};

const saveChatHistory = (messages: ChatMessage[]) => {
  fs.writeFileSync(CHAT_HISTORY_FILE, JSON.stringify(messages));
};

io.on('connection', (socket) => {
  const chatHistory = loadChatHistory();
  socket.emit('chat history', chatHistory);

  socket.on('chat', (data: { username: string, message: string }) => {
    const message = {
      ...data,
      timestamp: new Date()
    };
    const history = loadChatHistory();
    history.push(message);
    saveChatHistory(history);
    io.emit('chat', `${data.username}: ${data.message}`);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

