import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join } from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(process.cwd(), '..', 'front', 'index_chat.html'));
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat', (data: { username: string, message: string }) => {
    io.emit('chat', `${data.username}: ${data.message}`);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
