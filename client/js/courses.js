cyberpunks.Courses = {};

cyberpunks.Courses.randomCircles = function(
    game, numHolds, minX, minY, maxX, maxY, minDiameter, maxDiameter) {
  var builder = cyberpunks.Course.newBuilder(game);
  for (var i = 0; i < numHolds; i++) {
    var x = Math.floor(Math.random() * (maxX - minX)) + minX;
    var y = Math.floor(Math.random() * (maxY - minY)) + minY;
    var diameter = Math.floor(Math.random() * (maxDiameter - minDiameter)) +
        minDiameter;
    builder.addCircle(x, y, diameter, 0xcc00cc);
  }
  return builder.build();
};

cyberpunks.Courses.squareGrid = function(
    game, minX, minY, maxX, maxY, holdSize, holdSpacing) {
  var builder = cyberpunks.Course.newBuilder(game);
  for (var x = minX; x <= maxX; x += holdSpacing) {
    for (var y = minY; y <= maxY; y += holdSpacing) {
      builder.addRectangle(x, y, holdSize, holdSize, 0x00cc00);
    }
  }
  return builder.build();
};