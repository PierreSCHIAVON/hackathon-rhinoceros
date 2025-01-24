import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import AlertRouter from './routes/AlertRouter';
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

app.use(express.json());
app.use('/', AlertRouter);

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
// Namespace for alerts
export const alertNamespace = io.of('/alertSocket');
alertNamespace.on('connection', (socket) => {
  console.log('Client connected to /alertSocket namespace');

  socket.on('disconnect', () => {
    console.log('Client disconnected from /alertSocket namespace');
  });
});

// Namespace pour le chat
export const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket) => {
  console.log('User connected to /chat namespace');
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
    chatNamespace.emit('chat', `${data.username}: ${data.message}`);
  });

  socket.on('chat', (data: { username: string; message: string }) => {
    console.log(`Chat message from ${data.username}: ${data.message}`);
    chatNamespace.emit('chat', `${data.username}: ${data.message}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from /chat namespace');
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});

