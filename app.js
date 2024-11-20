const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Allow CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: '*', // Allow all origins (you can specify specific domains here)
}));

const io = socketIo(server, {
  cors: {
    origin: '*', // Allow connections from any origin (for testing purposes)
    methods: ['GET', 'POST'],
  }
});

// const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  // socket.on('chat messages', (msg) => {
  //   io.emit('chat message', msg); // Broadcast the message to everyone
  // });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
