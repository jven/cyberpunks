/**
 * A class that manages all of the communications with the server via the web
 * socket.
 */
cyberpunks.SocketManager = function(socket, climber, screenText) {
  this.socket_ = socket;
  this.climber_ = climber;
  this.screenText_ = screenText;

  this.timestamp_ = 0;

  // Register callbacks for server messages.
  socket.on('otherPlayers', this.onOtherPlayers_.bind(this));
}

/** Sends reports to the server indicating the state of the climber. */
cyberpunks.SocketManager.prototype.sendClimberReports = function(reports) {
  this.timestamp_++;

  var reports = this.climber_.getReportsForServer();
  if (reports.length) {
    this.socket_.emit('report', {
      timestamp: this.timestamp_,
      reports: reports
    });
    if (cyberpunks.Config.SHOW_DEBUG_MESSAGING) {
      this.screenText_.updateLastReportsText(reports);
    }
  }
};

cyberpunks.SocketManager.prototype.onOtherPlayers_ = function(
    otherPlayerNumbers) {
  this.screenText_.updateOtherPlayersText(otherPlayerNumbers);
};