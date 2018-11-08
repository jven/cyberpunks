var game = new Phaser.Game(
    800 /* width */,
    600 /* height */,
    Phaser.AUTO,
    '',
    {
      create: createFn,
      update: updateFn
    });

function createFn() {
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  var graphics = game.add.graphics(-100, -100);
  graphics.beginFill(0xFF0000);
  graphics.drawRect(0, 0, 20, 30);
  graphics.endFill();
  var texture = graphics.generateTexture();
  game.cache.addSpriteSheet(
      'rect',
      null,
      texture.baseTexture.source,
      20,
      30,
      1,
      0,
      0);
  
  // var group = game.add.physicsGroup(Phaser.Physics.P2JS);
  var fallingRect = game.add.sprite(300, 100, 'rect');
  game.physics.p2.enable([fallingRect], false);

}

function updateFn () {}
