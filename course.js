cyberpunks.Course = function(game) {
  this.game = game;
  this.holdsArray=[];
  for (let i=1; i<40; i+=1) {
    var hold=this.createHold(
        'hold' + i,
        Math.random()*(game.width-200)+100,
        Math.random()*(game.height-200)+100,
        Math.random()*15+10,
        0x0000ff
    );
      this.holdsArray.push(hold);

  }  
};

cyberpunks.Course.prototype.createHold = function(name, x, y, diameter, fillColor) {
  var graphics = this.game.add.graphics(x - 10, y - 10);

  graphics.beginFill(fillColor);
  graphics.drawCircle(-1000000, -1000000, diameter);
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

  var hold = game.add.sprite(x, y, name);
  game.physics.p2.enable(hold, false);
  hold.body.data.shapes[0].sensor = true;
  hold.body.static = true;
  return hold;
};
