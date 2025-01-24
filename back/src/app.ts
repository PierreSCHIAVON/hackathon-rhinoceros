import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import AlertRouter from './routes/AlertRouter';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use('/', AlertRouter);

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
