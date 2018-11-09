var game = new Phaser.Game(
    800 /* width */,
    600 /* height */,
    Phaser.AUTO,
    '',
    {
      create: createFn,
      update: updateFn
    });
var climber;

function createFn() {
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  climber = new cyberpunks.Climber(
      game, 
      100 /* size */);
  climber.moveTo(300, 300);
}

function updateFn () {}
