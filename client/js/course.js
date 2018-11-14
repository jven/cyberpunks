cyberpunks.Course = function(game, collisionGroups, holdSpecs) {
  this.game_ = game;
  this.holds_ = [];
  for (var i = 0; i < holdSpecs.length; i++) {
    this.holds_.push(this.createHold_(i, holdSpecs[i]));
  }

  this.game_.physics.p2.enable(this.holds_, false);
  this.holds_.forEach(hold => {
    hold.body.static = true;
    hold.body.setCollisionGroup(collisionGroups.getHoldsGroup());
  });
};

cyberpunks.Course.newBuilder = function(game, collisionGroups) {
  return new cyberpunks.CourseBuilder(game, collisionGroups);
};

cyberpunks.Course.prototype.isPointOnHold = function(x, y) {
  var clickedHolds = this.game_.physics.p2.hitTest(
      {'x': x, 'y': y}, this.holds_);
  return !!clickedHolds.length;
};

cyberpunks.Course.prototype.createHold_ = function(i, holdSpec) {
  if (holdSpec.shape == cyberpunks.HoldSpec.Shape.SPRITE) {
    var sprite = this.game_.add.sprite(
        holdSpec.x, holdSpec.y, holdSpec.spriteName);
    sprite.width = holdSpec.width;
    sprite.height = holdSpec.height;
    return sprite;
  }

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

  return this.game_.add.sprite(holdSpec.x, holdSpec.y, 'hold' + i);
};