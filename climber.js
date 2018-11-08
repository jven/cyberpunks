cyberpunks.Climber = function(game) {
  this.game = game;

  this.createBody('leftArm', 200, 200, 40, 10, 0xff0000);
  this.createBody('body', 260, 200, 40, 60, 0x00ff00);
  this.createBody('rightArm', 300, 200, 40, 10, 0x0000ff);
};

cyberpunks.Climber.prototype.createBody = function(
    name, x, y, width, height, fillColor) {
  var graphics = this.game.add.graphics(x - 10000, y - 10000);
  graphics.beginFill(fillColor);
  graphics.drawRect(0, 0, width, height);
  graphics.endFill();
  var texture = graphics.generateTexture();
  game.cache.addSpriteSheet(
      name,
      null,
      texture.baseTexture.source,
      width,
      height,
      1,
      0,
      0);
  
  var body = game.add.sprite(x, y, name);
  game.physics.p2.enable([body], false);
  return body;
};