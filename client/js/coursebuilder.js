cyberpunks.CourseBuilder = function(game, collisionGroups) {
  this.game_ = game;
  this.collisionGroups_ = collisionGroups;
  this.holdSpec_ = [];
};

cyberpunks.CourseBuilder.prototype.addCircle = function(x, y, diameter, color) {
  this.holdSpec_.push(
      new cyberpunks.HoldSpec(
          cyberpunks.HoldSpec.Shape.CIRCLE, 
          x, 
          y, 
          diameter /* width */, 
          diameter /* height */, 
          color,
          ''));
  return this;
};

cyberpunks.CourseBuilder.prototype.addRectangle = function(
    x, y, width, height, color) {
  this.holdSpec_.push(
      new cyberpunks.HoldSpec(
          cyberpunks.HoldSpec.Shape.RECTANGLE, 
          x, 
          y, 
          width, 
          height, 
          color,
          ''));
  return this;
};

cyberpunks.CourseBuilder.prototype.addSprite = function(
    x, y, width, height, spriteName) {
  this.holdSpec_.push(
      new cyberpunks.HoldSpec(
          cyberpunks.HoldSpec.Shape.SPRITE, 
          x, 
          y, 
          width, 
          height, 
          '',
          spriteName));
  return this;
};

cyberpunks.CourseBuilder.prototype.build = function() {
  return new cyberpunks.Course(
      this.game_, this.collisionGroups_, this.holdSpec_);
};