cyberpunks.Course = function(game, holdSpecs) {
  this.game_ = game;
  this.holds_ = [];
  for (var i = 0; i < holdSpecs.length; i++) {
    this.holds_.push(this.createHold_(i, holdSpecs[i]));
  }
  this.game_.physics.p2.enable(this.holds_, false);

  for (let i in this.holds_) {
    this.holds_[i].body.static = true;
    this.holds_[i].body.setCollisionGroup(this.game_.courseCollisionGroup);
    this.holds_[i].body.collides([this.game_.climberCollisionGroup]);
  }
};

cyberpunks.Course.newBuilder = function(game) {
  return new cyberpunks.CourseBuilder(game);
};

cyberpunks.Course.prototype.doesP2BodyIntersectAnyHold = function(p2Body) {
  var clickedHolds = this.game_.physics.p2.hitTest(p2Body, this.holds_);
  return !!clickedHolds.length;
};

cyberpunks.Course.prototype.createHold_ = function(i, holdSpec) {
  var graphics = this.game_.add.graphics(-10000, 10000);

  graphics.beginFill(holdSpec.color);
  if (holdSpec.shape == cyberpunks.HoldSpec.Shape.RECTANGLE) {
    graphics.drawRect(0, 0, holdSpec.width, holdSpec.height);
  } else {
    graphics.drawCircle(0, 0, holdSpec.width);
  }
  graphics.endFill();

  var texture = graphics.generateTexture();
  this.game_.cache.addSpriteSheet(
      'hold' + i,
      null,
      texture.baseTexture.source,
      holdSpec.width,
      holdSpec.height,
      1,
      0,
      0);

  var hold = this.game_.add.sprite(holdSpec.x, holdSpec.y, 'hold' + i);

  return hold;
};
