cyberpunks.SpriteLoader = {};

cyberpunks.SpriteLoader.HOLD_SPRITE_NAMES = [
  'blueHold1',
  'blueHold2',
  'redHold1',
  'redHold2',
  'greenHold1',
  'greenHold2',
  'yellowHold1',
  'yellowHold2'
];

cyberpunks.SpriteLoader.loadHoldSprites = function(game) {
  for (var i = 0; i < cyberpunks.SpriteLoader.HOLD_SPRITE_NAMES.length; i++) {
    var holdName = cyberpunks.SpriteLoader.HOLD_SPRITE_NAMES[i];
    game.load.image(holdName, 'sprites/holds/' + holdName + '.png');
  }
};

cyberpunks.SpriteLoader.loadClimberSprites = function(game, climberTheme) {
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'head');
  
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'upperBody');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'lowerBody');
  
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'leftUpperArm');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'leftLowerArm');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'leftHand');
  
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'rightUpperArm');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'rightLowerArm');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'rightHand');
  
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'leftUpperLeg');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'leftLowerLeg');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'leftFoot');
  
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'rightUpperLeg');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'rightLowerLeg');
  cyberpunks.SpriteLoader.loadClimberBodyPart_(
      game, climberTheme, 'rightFoot');
};

cyberpunks.SpriteLoader.loadClimberBodyPart_ = function(
    game, climberTheme, bodyPart) {
  game.load.image(
      bodyPart, 'sprites/climber/' + climberTheme + '/' + bodyPart + '.png');
};

cyberpunks.SpriteLoader.getRandomHoldSpriteName_ = function() {
  var holds = cyberpunks.SpriteLoader.HOLD_SPRITE_NAMES;
  return holds[Math.floor(Math.random() * holds.length)];
}