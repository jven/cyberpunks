cyberpunks.Courses = {};

cyberpunks.Courses.empty = function(game, collisionGroups) {
  return cyberpunks.Course.newBuilder(game, collisionGroups).build();
};

cyberpunks.Courses.randomCircles = function(
    game, 
    collisionGroups, 
    numHolds, 
    minX, minY, 
    maxX, maxY, 
    minDiameter, maxDiameter) {
  var builder = cyberpunks.Course.newBuilder(game, collisionGroups);
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
    game, 
    collisionGroups,
    minX, minY, 
    maxX, maxY, 
    holdSize, 
    holdSpacing) {
  var builder = cyberpunks.Course.newBuilder(game, collisionGroups);
  for (var x = minX; x <= maxX; x += holdSpacing) {
    for (var y = minY; y <= maxY; y += holdSpacing) {
      builder.addRectangle(x, y, holdSize, holdSize, 0x00cc00);
    }
  }
  return builder.build();
};

cyberpunks.Courses.randomSpriteGrid = function(
    game, 
    collisionGroups,
    minX, minY, 
    maxX, maxY, 
    holdSize, 
    holdSpacing) {
  var builder = cyberpunks.Course.newBuilder(game, collisionGroups);
  for (var x = minX; x <= maxX; x += holdSpacing) {
    for (var y = minY; y <= maxY; y += holdSpacing) {
      var sprite = cyberpunks.SpriteLoader.getRandomHoldSpriteName();
      builder.addSprite(x, y, holdSize, holdSize, sprite);
    }
  }
  return builder.build();
};

cyberpunks.Courses.bkbRedV4 = function(game, collisionGroups) {
  var holds = cyberpunks.Courses.LEVEL_EDITOR_OUTPUTS_.BKB_RED_V4;
  var builder = cyberpunks.Course.newBuilder(game, collisionGroups);
  for (var i = 0; i < holds.length; i++) {
    var hold = holds[i];
    builder.addSprite(
        hold.x, hold.y,
        hold.diameter, hold.diameter * 0.75,
        'redHold1');
  }
  return builder.build();
};

cyberpunks.Courses.LEVEL_EDITOR_OUTPUTS_ = {
  BKB_RED_V4: [{"x":628,"y":868,"diameter":16.749685133673086},{"x":664,"y":743,"diameter":26.87832758688245},{"x":728,"y":762,"diameter":26.87832758688245},{"x":657,"y":811,"diameter":18.302833187063193},{"x":628,"y":793,"diameter":18.302833187063193},{"x":598,"y":773,"diameter":18.302833187063193},{"x":558,"y":692,"diameter":26.87832758688245},{"x":629,"y":682,"diameter":26.87832758688245},{"x":582,"y":575,"diameter":31.15934833201531},{"x":517,"y":549,"diameter":31.15934833201531},{"x":492,"y":637,"diameter":23.185481486000008},{"x":525,"y":458,"diameter":28.515217736923592},{"x":436,"y":480,"diameter":22.510176200000007},{"x":336,"y":465,"diameter":22.510176200000007},{"x":405,"y":428,"diameter":22.510176200000007},{"x":284,"y":399,"diameter":22.510176200000007},{"x":324,"y":317,"diameter":82.64503758520303},{"x":408,"y":600,"diameter":63.340539650467534}]
};