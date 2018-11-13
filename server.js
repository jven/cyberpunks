const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var playerNumber = 0;

app.use(express.static(path.join(__dirname, 'client')));

io.on('connection', socket => {
  var myPlayerNumber = playerNumber;
  socket.on('state', msg => {
    socket.broadcast.emit('state', msg);
  });
  socket.on('disconnect', () => {
  });
  playerNumber += 1;
});

server.listen(5000, () => console.log('Listening on 5000.'));