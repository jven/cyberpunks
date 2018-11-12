var game = new Phaser.Game(
    1920 /* width */,
    1920 /* height */,
    Phaser.AUTO,
    '',
    {
      preload: preloadFn,
      create: createFn,
      update: updateFn
    });
var climber;
var course;
var selectedBodyPart;
var climberSize = 100;


function preloadFn() {
  game.load.image('background', 'bg.png');
  
  cyberpunks.SpriteLoader.loadClimberSprites(game, 'skeleton');
};

function createFn() {
  game.add.tileSprite(0, 0, 1920, 1920, 'background');
  game.world.setBounds(0, 0, 1920, 1920);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  // create collision groups
  game.courseCollisionGroup = game.physics.p2.createCollisionGroup();
  game.climberCollisionGroup = game.physics.p2.createCollisionGroup();

  climber = new cyberpunks.Climber(game, climberSize);
  climber.moveEntireBodyTo(100, 300);

  course = new cyberpunks.Course(game);

  // for collision groups to collide with the world borders
  game.physics.p2.updateBoundsCollisionGroup();

  game.camera.follow(climber.upperBody_);

  game.camera.scale.x = cyberpunks.Config.CAMERA_SCALE;
  game.camera.scale.y = cyberpunks.Config.CAMERA_SCALE;

  game.input.onDown.add(click, this);
  game.input.onUp.add(release, this);
  game.input.addMoveCallback(move, this);

}

function updateFn() {

  if (cyberpunks.Config.SHOW_DEBUG_FORCES) {
    game.debug.text('y force on right hand '+climber.getForceOnBodyPart(climber.rightHand_.body), 32, 32);
    game.debug.text('y force on left hand '+climber.getForceOnBodyPart(climber.leftHand_.body), 32, 48);
    game.debug.text('y force on right foot '+climber.getForceOnBodyPart(climber.rightFoot_.body), 32, 64);
    game.debug.text('y force on left foot '+climber.getForceOnBodyPart(climber.leftFoot_.body), 32, 78);
  }


  //drag with mouse
  if(selectedBodyPart) {
    selectedBodyPart.holdingOn=false;
    selectedBodyPart.setZeroVelocity();
    selectedBodyPart.x=game.input.activePointer.worldX/game.camera.scale.x;
    selectedBodyPart.y=game.input.activePointer.worldY/game.camera.scale.y;
  }

  //fix each limb if holding on
  climber.getSelectableBodyParts().forEach(bodyPart=>{
    if (bodyPart.holdingOn){
      bodyPart.setZeroVelocity();
      bodyPart.x=bodyPart.staticPositionX;
      bodyPart.y=bodyPart.staticPositionY;
    }
  })
}


//motionState : number
//The type of motion this body has. Should be one of: Body.STATIC (the body does not move), Body.DYNAMIC (body can move and respond to collisions) and Body.KINEMATIC (only moves according to its .velocity).
//bodyPart.motionState = Phaser.Physics.P2.Body.DYNAMIC;
//bodyPart.motionState = Phaser.Physics.P2.Body.KINEMATIC;


function click(pointer) {
//check if mouse clicks on a body part
  let mousePosition = {
    'x': game.input.activePointer.worldX/game.camera.scale.x,
    'y': game.input.activePointer.worldY/game.camera.scale.y
  };

  var clickedBodyParts = game.physics.p2.hitTest(
      mousePosition,
      climber.getSelectableBodyParts());

  if(clickedBodyParts.length) {
    selectedBodyPart = clickedBodyParts[0].parent;
  }
}

function release() {

  if (!selectedBodyPart) return;

  var holdingOnBodyPart=game.physics.p2.hitTest(
    selectedBodyPart,
    course.holdsArray);
//if holding on, set fixed position
  if (holdingOnBodyPart.length){
    selectedBodyPart.holdingOn=true;
    selectedBodyPart.staticPositionX=game.input.activePointer.worldX/game.camera.scale.x;
    selectedBodyPart.staticPositionY=game.input.activePointer.worldY/game.camera.scale.y;
  }

  selectedBodyPart = null;
}


function move() {
  if (!selectedBodyPart) return;

//release limb if force is too great
  if (climber.getForceOnBodyPart(selectedBodyPart)>1500){
    // selectedBodyPart = null;
  }
}
