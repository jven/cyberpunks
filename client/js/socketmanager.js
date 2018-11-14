/**
 * A class that manages all of the communications with the server via the web
 * socket.
 */
cyberpunks.SocketManager = function(socket, climber, screenText) {
  this.socket_ = socket;
  this.climber_ = climber;
  this.screenText_ = screenText;

  this.myPlayerNumber_ = -1;

  // Register callbacks for server messages.
  socket.on('roster', this.onRoster_.bind(this));
  socket.on('limbPositions', this.onLimbPositions_.bind(this));
}

/** Sends reports to the server indicating the state of the climber. */
cyberpunks.SocketManager.prototype.sendClimberReports = function(reports) {
  var reports = this.climber_.getReportsForServer();
  if (reports.length) {
    this.socket_.emit('report', {
      reports: reports
    });
    if (cyberpunks.Config.SHOW_DEBUG_MESSAGING) {
      this.screenText_.updateLastReportsText(reports);
    }
  }
};

cyberpunks.SocketManager.prototype.onRoster_ = function(msg) {
  this.myPlayerNumber_ = msg.playerNumber;
  this.screenText_.updateRosterText('' + msg.playerNumber, msg.otherPlayers);
};

cyberpunks.SocketManager.prototype.onLimbPositions_ = function(msg) {
  var limbPositions = msg.limbPositions;
  for (var i = 0; i < limbPositions.length; i++) {
    var limbPosition = limbPositions[i];
    if (limbPosition.playerNumber == this.myPlayerNumber_) {
      // Ignore limb positions that were reported by this player.
      continue;
    }
    this.climber_.setStateFromServer(
        limbPosition.limb, limbPosition.x, limbPosition.y, limbPosition.state);
  }
};