const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'client')));

io.on('connection', socket => {
  console.log('A player connected! :D');
  socket.on('disconnect', () => {
    console.log('A player disconnected. :(');
  });
});

server.listen(5000, () => console.log('Listening on 5000.'));