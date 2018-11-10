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
var selectedBodyPart;


function preloadFn() {
  game.load.image('background', 'bg.png');
  game.load.image('head', 'sprites/head.png');
  game.load.image('upperBody', 'sprites/upperBody.png');
  game.load.image('lowerBody', 'sprites/lowerBody.png');
  game.load.image('hand', 'sprites/hand.png');
  game.load.image('lowerArm', 'sprites/lowerArm.png');
  game.load.image('upperArm', 'sprites/upperArm.png');
  game.load.image('foot', 'sprites/foot.png');
  game.load.image('lowerLeg', 'sprites/lowerLeg.png');
  game.load.image('upperLeg', 'sprites/upperLeg.png');
};

function createFn() {
  game.add.tileSprite(0, 0, 1000, 900, 'background');
  game.world.setBounds(0, 0, 1000, 900);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  climber = new cyberpunks.Climber(game, 100 /* size */);
  climber.moveEntireBodyTo(300, 350);

  course = new cyberpunks.Course(game);

  game.camera.follow(climber.upperBody_);

  game.camera.scale.x = scale;
  game.camera.scale.y = scale;

  game.input.onDown.add(click, this);
  game.input.onUp.add(release, this);
}

function updateFn() {
  if(selectedBodyPart) {
    selectedBodyPart.holdingOn=false;
    selectedBodyPart.setZeroVelocity();
    selectedBodyPart.x=game.input.activePointer.worldX/scale;
    selectedBodyPart.y=game.input.activePointer.worldY/scale;
  }
  climber.getSelectableBodyParts().forEach(bodyPart=>{
    if (bodyPart.holdingOn){
      bodyPart.motionState = Phaser.Physics.P2.Body.KINEMATIC;
      bodyPart.setZeroVelocity();
      bodyPart.setZeroRotation();

    }
    else{    
      bodyPart.motionState = Phaser.Physics.P2.Body.DYNAMIC;
    }
  })
}


//motionState : number
//The type of motion this body has. Should be one of: Body.STATIC (the body does not move), Body.DYNAMIC (body can move and respond to collisions) and Body.KINEMATIC (only moves according to its .velocity).





function release() {
  if (!selectedBodyPart) return;

  var holdingOnBodyPart=game.physics.p2.hitTest(
    selectedBodyPart,
    course.holdsArray);

  if (holdingOnBodyPart.length){
    console.log('holding on')
    selectedBodyPart.holdingOn=true;
  }
  else {
    console.log('in else');
    selectedBodyPart.holdingOn=false;
  }

  selectedBodyPart = null;
}

function click(pointer) {

  let mousePosition = {
    'x': game.input.activePointer.worldX/scale,
    'y': game.input.activePointer.worldY/scale
  };

  var clickedBodyParts = game.physics.p2.hitTest(
      mousePosition,
      climber.getSelectableBodyParts());

  if(clickedBodyParts.length) {
    selectedBodyPart = clickedBodyParts[0].parent;
  }
}