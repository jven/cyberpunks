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
var course;

function createFn() {
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  climber = new cyberpunks.Climber(game, 100 /* size */);
  climber.moveEntireBodyTo(300, 350);

  course = new cyberpunks.Course(game);

  game.input.onDown.add(onMouseDown, this);
}

function updateFn() {}

function onMouseDown(pointer) {
  var clickedBodyParts = game.physics.p2.hitTest(
      pointer.position,
      climber.getSelectableBodyParts());
  console.log(clickedBodyParts);
}
