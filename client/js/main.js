var socket = io();

var game = new Phaser.Game(
    cyberpunks.Config.SCREEN_WIDTH,
    cyberpunks.Config.SCREEN_HEIGHT,
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
  
  cyberpunks.SpriteLoader.loadClimberSprites(game, 'skeleton');
};

function createFn() {
  game.add.tileSprite(
      0, 0,
      cyberpunks.Config.GAME_WIDTH, cyberpunks.Config.GAME_HEIGHT,
      'background');
  game.world.setBounds(
      0, 0,
      cyberpunks.Config.GAME_WIDTH, cyberpunks.Config.GAME_HEIGHT);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = cyberpunks.Config.GRAVITY_Y;

  // create collision groups
  game.courseCollisionGroup = game.physics.p2.createCollisionGroup();
  game.climberCollisionGroup = game.physics.p2.createCollisionGroup();

  course = cyberpunks.Courses.squareGrid(
      game,
      0 /* minX */, 
      0 /* minY */, 
      cyberpunks.Config.GAME_WIDTH /* maxX */, 
      cyberpunks.Config.GAME_HEIGHT /* maxY */,
      30 /* holdSize */,
      180 /* holdSpacing */);
  climber = new cyberpunks.Climber(game, cyberpunks.Config.CLIMBER_SIZE);
  climber.moveEntireBodyTo(
      cyberpunks.Config.GAME_WIDTH / 2, cyberpunks.Config.GAME_HEIGHT - 300);

  // for collision groups to collide with the world borders
  game.physics.p2.updateBoundsCollisionGroup();

  game.camera.scale.x = cyberpunks.Config.CAMERA_SCALE;
  game.camera.scale.y = cyberpunks.Config.CAMERA_SCALE;
  game.camera.deadzone = new Phaser.Rectangle(
      cyberpunks.Config.CAMERA_DEADZONE_WIDTH,
      cyberpunks.Config.CAMERA_DEADZONE_WIDTH, 
      (cyberpunks.Config.SCREEN_WIDTH
          - 2 * cyberpunks.Config.CAMERA_DEADZONE_WIDTH),
      (cyberpunks.Config.SCREEN_HEIGHT
          - 2 * cyberpunks.Config.CAMERA_DEADZONE_WIDTH));

  game.input.onDown.add(click, this);
  game.input.onUp.add(release, this);

  // Listen for state messages from the server. On receipt, fix the given limb
  // to the corresponding position.
  socket.on('state', msg => {
    if (msg.draggableLimb &&
        typeof msg.x == "number" &&
        typeof msg.y == "number") {
      climber.fixLimbTo(
          draggableLimb, msg.x, msg.y,cyberpunks.LimbState.OTHER_DRAGGING);
    }
  });
}

function updateFn() {
  if (cyberpunks.Config.SHOW_DEBUG_FORCES) {
    var textY = 32;
    for (var draggableLimb in cyberpunks.DraggableLimb) {
      var force = climber.getForceOnDraggableLimb(draggableLimb);
      game.debug.text('y force on ' + draggableLimb + ': ' + force);
      textY += 16;
    }
  }

  // Position the draggable limbs of the climber, based on whether they are
  // being dragged, fixed to a hold, or fixed to another player's mouse.
  var mouseCoordinates = getMouseCoordinates();

  climber.positionDraggableLimbs(mouseCoordinates[0], mouseCoordinates[1]);

  // Unfix limbs as appropriate.
  climber.maybeUnfixLimbsBasedOnForce();

  // Send the state to the server if necessary.
  var msg = climber.getDraggedLimbMessage();

  if (msg.length) {
    game.debug.text(JSON.stringify(msg),10,20);

    socket.emit('state', msg);
  }
}

function click(pointer) {
  var mouseCoordinates = getMouseCoordinates();
  climber.startDraggingAndUnfixLimbAt(mouseCoordinates[0], mouseCoordinates[1]);
}

function release() {
  var mouseCoordinates = getMouseCoordinates();

  climber.releaseDraggedLimbs(course);
}

function getMouseCoordinates() {
  return [
    game.input.activePointer.worldX / game.camera.scale.x,
    game.input.activePointer.worldY / game.camera.scale.y
  ];
}
