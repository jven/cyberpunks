const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const roster = require('./server/roster.js');

const myRoster = new roster.Roster();

app.use(express.static(path.join(__dirname, 'client')));

// When a new player connects, add them to the roster.
io.on('connection', socket => myRoster.addPlayer(socket));

// Every second, send the current roster to all players.
setInterval(myRoster.sendRosterToAllPlayers.bind(myRoster), 1000);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log('Listening on ' + port + '.'));