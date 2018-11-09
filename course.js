cyberpunks.Course = function(game) {
  this.game = game;

  for (let i=1; i<40; i+=1) {
    this.createHold(
        'hold' + i,
        Math.random()*(game.width-200)+100,
        Math.random()*(game.height-200)+100,
        Math.random()*15+10,
        0x0000ff
    );
  }
};

cyberpunks.Course.prototype.createHold = function(
    name, x, y, diameter, fillColor) {
  var graphics = this.game.add.graphics(x - 10, y - 10);

  graphics.beginFill(fillColor);
  graphics.drawCircle(0, 0, diameter);
  graphics.endFill();

  var texture = graphics.generateTexture();
  game.cache.addSpriteSheet(
      name,
      null,
      texture.baseTexture.source,
      diameter,
      diameter,
      1,
      0,
      0
  );

  // var body = game.add.sprite(x, y, name);
  // game.physics.p2.enable(body, false);
  // body.body.static = true;

  return null;
};
