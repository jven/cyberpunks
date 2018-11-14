/** The specification for a single hold in the course. */
cyberpunks.HoldSpec = function(
    shape, 
    x, 
    y, 
    width, 
    height, 
    color, 
    spriteName) {
  this.shape = shape;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.spriteName = spriteName;
};

cyberpunks.HoldSpec.Shape = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  SPRITE: 'sprite'
};