/** A single player playing the game. */
class Player {
  constructor(playerNumber, socket) {
    this.playerNumber = playerNumber;
    this.socket = socket;
  }

  sendRosterMessage(allPlayerNumbers) {
    const otherPlayers = allPlayerNumbers.filter(n => n != this.playerNumber);
    this.socket.emit('otherPlayers', otherPlayers);
  }
}

exports.Player = Player;