/**
 * A class that encapsulates the text written on the screen. This only includes
 * text that is fixed to the camera (i.e. text that stays on the screen as the
 * camera moves).
 */
cyberpunks.ScreenText = function(game) {
  this.game_ = game;
  
  var style = {
    fill: 'white',
    fontSize: '16px',
    stroke: 'black',
    strokeThickness: 3
  };
  // Text showing the player numbers of other players in the game.
  this.otherPlayerText_ = game.add.text(
      10, cyberpunks.Config.SCREEN_HEIGHT - 30, '', style);
  this.otherPlayerText_.fixedToCamera = true;

  // Text showing the last reports sent to the server.
  this.lastReportsText_ = game.add.text(
      10, cyberpunks.Config.SCREEN_HEIGHT - 60, '', style);
  this.lastReportsText_.fixedToCamera = true;

  // Initialize all text.
  this.updateRosterText('?', []);
  this.updateLastReportsText([]);
};

cyberpunks.ScreenText.prototype.updateRosterText = function(
    myPlayerNumber, otherPlayers) {
  var newText = 'I\'m player ' + myPlayerNumber + '. Other players: ';
  if (!otherPlayers.length) {
    newText += ' none :(';
  } else {
    for (var i = 0; i < otherPlayers.length; i++) {
      if (i > 0) {
        newText += ', ';
      }
      newText += '' + otherPlayers[i];
    }
  }
  this.otherPlayerText_.text = newText;
};

cyberpunks.ScreenText.prototype.updateLastReportsText = function(reports) {
  this.lastReportsText_.text = JSON.stringify(reports);
};