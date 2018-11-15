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
var screenText;
var socketManager;

function preloadFn() {
  game.load.image('background', 'img/backgrounds/gray.png');
  game.load.image('mat', 'img/mat.png');
  
  cyberpunks.SpriteLoader.loadClimberSprites(game, 'skeleton');
  cyberpunks.SpriteLoader.loadHoldSprites(game);
};

function createFn() {
  game.add.tileSprite(
      0, 0,
      2 * cyberpunks.Config.GAME_WIDTH, 2 * cyberpunks.Config.GAME_HEIGHT,
      'background');
  game.world.setBounds(
      0, 0,
      cyberpunks.Config.GAME_WIDTH, cyberpunks.Config.GAME_HEIGHT);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = cyberpunks.Config.GRAVITY_Y;
  var collisionGroups = new cyberpunks.CollisionGroups(game);
  game.physics.p2.updateBoundsCollisionGroup();

  // Create the mat at the bottom of the world.
  var mat = game.add.sprite(
      cyberpunks.Config.GAME_WIDTH / 2,
      cyberpunks.Config.GAME_HEIGHT - cyberpunks.Config.MAT_HEIGHT / 2,
      'mat');
  mat.width = cyberpunks.Config.GAME_WIDTH;
  mat.height = cyberpunks.Config.MAT_HEIGHT;
  game.physics.p2.enable([mat], false);
  mat.body.static = true;
  mat.body.setCollisionGroup(collisionGroups.getMatGroup());
  mat.body.collides([collisionGroups.getClimberGroup()]);

  course = cyberpunks.Courses.randomSpriteGrid(
      game, collisionGroups,
      50, 50,
      cyberpunks.Config.GAME_WIDTH - 50, cyberpunks.Config.GAME_HEIGHT - 100,
      30, 80);
  climber = new cyberpunks.Climber(
      game, collisionGroups, cyberpunks.Config.CLIMBER_SIZE);
  climber.moveEntireBodyTo(
      cyberpunks.Config.GAME_WIDTH / 2, cyberpunks.Config.GAME_HEIGHT - 300);

  game.camera.scale.x = cyberpunks.Config.CAMERA_SCALE;
  game.camera.scale.y = cyberpunks.Config.CAMERA_SCALE;
  game.camera.deadzone = new Phaser.Rectangle(
      cyberpunks.Config.CAMERA_DEADZONE_WIDTH,
      cyberpunks.Config.CAMERA_DEADZONE_WIDTH, 
      (cyberpunks.Config.SCREEN_WIDTH
          - 2 * cyberpunks.Config.CAMERA_DEADZONE_WIDTH),
      (cyberpunks.Config.SCREEN_HEIGHT
          - 2 * cyberpunks.Config.CAMERA_DEADZONE_WIDTH));

  // Register callback functions for mouse events.
  game.input.onDown.add(click, this);
  game.input.onUp.add(release, this);

  // Prevent the game from pausing when the window loses focus.
  game.stage.disableVisibilityChange = true;

  screenText = new cyberpunks.ScreenText(game);
  socketManager = new cyberpunks.SocketManager(socket, climber, screenText);
}

function updateFn() {
  if (cyberpunks.Config.SHOW_DEBUG_CLIMBER_GRAPHICS) {
    climber.showDebugGraphics();
  }

  // Position the draggable limbs of the climber, based on whether they are
  // being dragged, fixed to a hold, or fixed to another player's mouse.
  var mouseCoordinates = getMouseCoordinates();

  climber.positionLimbs(mouseCoordinates[0], mouseCoordinates[1]);

  // Unfix limbs as appropriate.
  if (cyberpunks.Config.CLIMBER_FALLS_BASED_ON_FORCES) {
    climber.maybeUnfixLimbsBasedOnForce();
  }

  socketManager.sendClimberReports();
}

function click(pointer) {
  var mouseCoordinates = getMouseCoordinates();
  climber.dragLimbMyself(mouseCoordinates[0], mouseCoordinates[1]);
}

function release() {
  climber.releaseLimbs(course);
}

function getMouseCoordinates() {
  return [
    game.input.activePointer.worldX / game.camera.scale.x,
    game.input.activePointer.worldY / game.camera.scale.y
  ];
}