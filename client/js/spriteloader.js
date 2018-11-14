cyberpunks.SpriteLoader = {};

cyberpunks.SpriteLoader.loadClimberSprites = function(game, climberTheme) {
  this.loadClimberBodyPart_(game, climberTheme, 'head');
  
  this.loadClimberBodyPart_(game, climberTheme, 'upperBody');
  this.loadClimberBodyPart_(game, climberTheme, 'lowerBody');
  
  this.loadClimberBodyPart_(game, climberTheme, 'leftUpperArm');
  this.loadClimberBodyPart_(game, climberTheme, 'leftLowerArm');
  this.loadClimberBodyPart_(game, climberTheme, 'leftHand');
  
  this.loadClimberBodyPart_(game, climberTheme, 'rightUpperArm');
  this.loadClimberBodyPart_(game, climberTheme, 'rightLowerArm');
  this.loadClimberBodyPart_(game, climberTheme, 'rightHand');
  
  this.loadClimberBodyPart_(game, climberTheme, 'leftUpperLeg');
  this.loadClimberBodyPart_(game, climberTheme, 'leftLowerLeg');
  this.loadClimberBodyPart_(game, climberTheme, 'leftFoot');
  
  this.loadClimberBodyPart_(game, climberTheme, 'rightUpperLeg');
  this.loadClimberBodyPart_(game, climberTheme, 'rightLowerLeg');
  this.loadClimberBodyPart_(game, climberTheme, 'rightFoot');
};

cyberpunks.SpriteLoader.loadClimberBodyPart_ = function(
    game, climberTheme, bodyPart) {
  game.load.image(
      bodyPart, 'sprites/climber/' + climberTheme + '/' + bodyPart + '.png');
};