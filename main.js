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
var scale=.5;
function preloadFn() {
  game.load.image('background', 'bg.png');
};

function createFn() {
  game.add.tileSprite(0, 0, 1000, 900, 'background');
  game.world.setBounds(0, 0, 1000, 900);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  climber = new cyberpunks.Climber(game, 100 /* size */);
  climber.moveEntireBodyTo(300, 350);

  course = new cyberpunks.Course(game);

 // game.input.onDown.add(onMouseDown, this);

  game.camera.follow(climber.upperBody_);
  game.camera.scale.x = scale;
  game.camera.scale.y = scale;


    game.input.addMoveCallback(move, this);


}

function updateFn() {
//console.log(game.physics.p2)
climber.leftHand_.body.setZeroVelocity();
//    climber.leftHand_.body.static=true;
    //climber.leftHand_.body.x=game.input.mousePointer.x;
    climber.leftHand_.body.x=game.input.activePointer.worldX/scale;
    climber.leftHand_.body.y=game.input.activePointer.worldY/scale;


}


function move(pointer) {
 var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
  //  climber.leftHand_.body.x = physicsPos[0];
 //   climber.leftHand_.body.y = physicsPos[1];

}


function onMouseDown(pointer) {
  var clickedBodyParts = game.physics.p2.hitTest(
      pointer.position,
      climber.getSelectableBodyParts());
  console.log(clickedBodyParts);
}