cyberpunks.Course = function(game) {
  this.game_ = game;
  this.holdsArray = [];
  for (let i=1; i<100; i+=1) {
    var hold=this.createHold(
        'hold' + i,
        Math.random()*(game.width-200)+100,
        Math.random()*(game.height-200)+100,
        Math.random()*15+10,
        0xA52A2A
    );
    this.holdsArray.push(hold);
  }

  this.game_.physics.p2.enable(this.holdsArray, false);

  for (let i in this.holdsArray) {
    this.holdsArray[i].body.static = true;
    this.holdsArray[i].body.setCollisionGroup(this.game_.courseCollisionGroup);
    this.holdsArray[i].body.collides([this.game_.climberCollisionGroup]);
  }
};

cyberpunks.Course.prototype.createHold = function(name, x, y, diameter, fillColor) {
  var graphics = this.game_.add.graphics(x - 10, y - 10);

  graphics.beginFill(fillColor);
  graphics.drawCircle(-1000000, -1000000, diameter);
  graphics.endFill();

  var texture = graphics.generateTexture();
  this.game_.cache.addSpriteSheet(
      name,
      null,
      texture.baseTexture.source,
      diameter,
      diameter,
      1,
      0,
      0
  );

  var hold = this.game_.add.sprite(x, y, name);

  return hold;
};
