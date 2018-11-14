const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Game = require('./server/game.js').Game;

const game = new Game();

app.use(express.static(path.join(__dirname, 'client')));

// When a new player connects, add them to the game.
io.on('connection', socket => game.addPlayer(socket));

// Every 5 seconds, send the current roster to all players.
setInterval(game.sendRosterToAllPlayers.bind(game), 5000);

// Every second, print the state of the game to the console for debugging.
setInterval(game.printGameStateToConsole.bind(game), 1000);

// Every 500ms, send the climber's limb positions to all players.
setInterval(game.sendLimbPositionsToAllPlayers.bind(game), 500);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log('Listening on ' + port + '.'));