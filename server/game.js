const Climber = require('./climber.js').Climber;
const Limb = require('./limb.js').Limb;
const LimbState = require('./limbstate.js').LimbState;
const Player = require('./player.js').Player;

/** A single instance of the climbing game. */
class Game {
  constructor() {
    this.nextPlayerNumber_ = 0;
    this.currentPlayers_ = {};
    this.climber_ = new Climber();
  }

  addPlayer(socket) {
    const newPlayer = new Player(this.nextPlayerNumber_, socket);
    // Set up the callbacks.
    socket.on('disconnect', this.onDisconnect.bind(this, newPlayer));
    socket.on('report', this.onReport.bind(this, newPlayer));

    // Add the player to the roster and increment the player number.
    this.currentPlayers_[this.nextPlayerNumber_] = newPlayer;
    this.nextPlayerNumber_++;

    this.sendRosterToAllPlayers();
  }

  onDisconnect(player) {
    this.climber_.reportLooseLimb(player.playerNumber, Limb.LEFT_HAND);
    this.climber_.reportLooseLimb(player.playerNumber, Limb.RIGHT_HAND);
    this.climber_.reportLooseLimb(player.playerNumber, Limb.LEFT_FOOT);
    this.climber_.reportLooseLimb(player.playerNumber, Limb.RIGHT_FOOT);

    // Remove the player from the roster.
    delete this.currentPlayers_[player.playerNumber];

    this.sendRosterToAllPlayers();
  }

  onReport(player, msg) {
    var reports = msg.reports;
    if (!reports || !reports.length) {
      // Ignore the message if there are no reports.
      return;
    }
    for (var i = 0; i < reports.length; i++) {
      var report = reports[i];
      if (report.limb != Limb.LEFT_HAND &&
          report.limb != Limb.RIGHT_HAND &&
          report.limb != Limb.LEFT_FOOT &&
          report.limb != Limb.RIGHT_FOOT) {
        continue;
      }
      if (typeof report.x != "number") {
        continue;
      }
      if (typeof report.y != "number") {
        continue;
      }
      if (report.state == LimbState.LOOSE) {
        this.climber_.reportLooseLimb(player.playerNumber, report.limb);
      } else if (report.state == LimbState.HOLDING) {
        this.climber_.reportHoldingLimb(
            player.playerNumber, report.limb, report.x, report.y);
      } else if (report.state == LimbState.DRAGGING) {
        this.climber_.reportDraggingLimb(
            player.playerNumber, report.limb, report.x, report.y)
      }
    }
  }

  sendRosterToAllPlayers() {
    var allPlayerNumbers = Object.keys(this.currentPlayers_);
    for (var playerNumber in this.currentPlayers_) {
      this.currentPlayers_[playerNumber].sendRosterMessage(allPlayerNumbers);
    }
  }

  sendLimbPositionsToAllPlayers() {
    var limbPositions = this.climber_.getLimbPositionsForClient();
    for (var playerNumber in this.currentPlayers_) {
      this.currentPlayers_[playerNumber].sendLimbPositions(limbPositions);
    }
  }

  printGameStateToConsole() {
    console.log(this.climber_.getDebugDescription());
  }
}

exports.Game = Game;