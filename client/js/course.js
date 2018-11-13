cyberpunks.Course = function(game) {
  this.game_ = game;
  this.holdsArray_ = [];
  for (let i=1; i<100; i+=1) {
    var hold=this.createHold_(
        'hold' + i,
        Math.random()*(cyberpunks.Config.GAME_WIDTH-200)+100,
        Math.random()*(cyberpunks.Config.GAME_HEIGHT-200)+100,
        Math.random()*15+10,
        0xA52A2A
    );
    this.holdsArray_.push(hold);
  }

  this.game_.physics.p2.enable(this.holdsArray_, false);

  for (let i in this.holdsArray_) {
    this.holdsArray_[i].body.static = true;
    this.holdsArray_[i].body.setCollisionGroup(this.game_.courseCollisionGroup);
    this.holdsArray_[i].body.collides([this.game_.climberCollisionGroup]);
  }
};

cyberpunks.Course.prototype.isHoldAt = function(x, y) {
  var clickedHold = this.game_.physics.p2.hitTest(
      {'x': x, 'y': y}, this.holdsArray_);
  return !!clickedHold.length;
};

cyberpunks.Course.prototype.createHold_ = function(
    name, x, y, diameter, fillColor) {
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
