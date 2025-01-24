import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';

import fs from 'fs';
import { createServer } from 'http';
import { join } from 'path';
import { Server } from 'socket.io';
import activityRoutes from './routes/activity_route';
import alertRoutes from './routes/alert_route';
import alertTypeRoutes from './routes/alertType_route';
import messageRoutes from './routes/message_route';
import notifyRoutes from './routes/notify_route';
import zoneRoutes from './routes/zone_route';

dotenv.config();

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/zones', zoneRoutes);
app.use('/api/notify', notifyRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/alert-types', alertTypeRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/activities', activityRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur interne est survenue.' });
});


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
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

export const alertNamespace = io.of('/alertSocket');
alertNamespace.on('connection', (socket) => {
  console.log('Client connected to /alertSocket namespace');

  socket.on('disconnect', () => {
    console.log('Client disconnected from /alertSocket namespace');
  });
});


server.listen(3000, () => {
  console.log('Server running on port 3000');
});
