cyberpunks.CourseBuilder = function(game) {
  this.game_ = game;
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
          color));
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
          color));
};

cyberpunks.CourseBuilder.prototype.build = function() {
  return new cyberpunks.Course(this.game_, this.holdSpec_);
};