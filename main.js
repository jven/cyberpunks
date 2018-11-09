var game = new Phaser.Game(
    800 /* width */,
    600 /* height */,
    Phaser.AUTO,
    '',
    {
      preload: preloadFn,
      create: createFn,
      update: updateFn
    });
var climber;
var course;

function preloadFn() {
  game.load.image('background', 'bg.png');
};

function createFn() {
  game.add.tileSprite(0, 0, 800, 600, 'background');
  game.world.setBounds(0, 0, 800, 600);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  climber = new cyberpunks.Climber(game, 100 /* size */);
  climber.moveEntireBodyTo(300, 350);

  course = new cyberpunks.Course(game);

  game.input.onDown.add(onMouseDown, this);

  game.camera.follow(climber.upperBody_);
}

function updateFn() {}

function onMouseDown(pointer) {
  var clickedBodyParts = game.physics.p2.hitTest(
      pointer.position,
      climber.getSelectableBodyParts());
  console.log(clickedBodyParts);
}
