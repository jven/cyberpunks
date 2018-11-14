const player = require('./player.js');

/** A roster of all the players currently playing. */
class Roster {
  constructor() {
    this.nextPlayerNumber_ = 0;
    this.currentPlayers_ = {};
  }

  addPlayer(socket) {
    const newPlayer = new player.Player(this.nextPlayerNumber_, socket);
    // Set up the callbacks.
    socket.on('disconnect', this.onDisconnect.bind(this, newPlayer));

    // Add the player to the roster and increment the player number.
    this.currentPlayers_[this.nextPlayerNumber_] = newPlayer;
    this.nextPlayerNumber_++;

    this.sendRosterToAllPlayers();
  }

  onDisconnect(disconnectingPlayer) {
    // Remove the player from the roster.
    delete this.currentPlayers_[disconnectingPlayer.playerNumber];

    this.sendRosterToAllPlayers();
  }

  sendRosterToAllPlayers() {
    var allPlayerNumbers = Object.keys(this.currentPlayers_);
    for (var playerNumber in this.currentPlayers_) {
      this.currentPlayers_[playerNumber].sendRosterMessage(allPlayerNumbers);
    }
  }
}

exports.Roster = Roster;