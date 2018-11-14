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
var hold
var diameter=20;
var diameterScale=1.03;

var mouseObject;
var graphics
var keys
var spritelist=[];

function preloadFn() {
  game.load.image('background', 'bg.png');
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

  mouseObject = createHold('mouseObject',0,0, diameter, 0xffffff)


  game.camera.follow(mouseObject);

     graphics = game.add.graphics(mouseObject.position.x-10, mouseObject.position.y-10);

 // game.camera.scale.x = cyberpunks.Config.CAMERA_SCALE;
 // game.camera.scale.y = cyberpunks.Config.CAMERA_SCALE;
  game.camera.deadzone = new Phaser.Rectangle(
      cyberpunks.Config.CAMERA_DEADZONE_WIDTH,
      cyberpunks.Config.CAMERA_DEADZONE_WIDTH, 
      (cyberpunks.Config.SCREEN_WIDTH
          - 2 * cyberpunks.Config.CAMERA_DEADZONE_WIDTH),
      (cyberpunks.Config.SCREEN_HEIGHT
          - 2 * cyberpunks.Config.CAMERA_DEADZONE_WIDTH));




  keys = game.input.keyboard.createCursorKeys();

  game.input.onUp.add(release, this);

  game.input.keyboard.onDownCallback = function( e ){           
    if(e.keyCode == Phaser.Keyboard.BACKSPACE && spritelist.length){              
      let last= spritelist.pop()
      last.destroy()
      levelData.pop()
    }
    if(e.keyCode == Phaser.Keyboard.ENTER){  
      console.clear()             
      console.log(JSON.stringify(levelData))
    }

  }
}


function updateFn() {

  game.debug.text("Level Editor v.1 controls: click: create hold   backspace: undo",20,20);
  game.debug.text(" up: increase diameter   down: decrease diameter   enter: log level data to console",20,40);

  var mouseCoordinates = getMouseCoordinates();
  mouseObject.position.x =mouseCoordinates[0]-diameter/2
  mouseObject.position.y =mouseCoordinates[1]-diameter/2

  if (keys.up.isDown){
    mouseObject.scale.x=mouseObject.scale.x*diameterScale
    mouseObject.scale.y=mouseObject.scale.y*diameterScale
    diameter=diameter*diameterScale;
  }
  if (keys.down.isDown){
    mouseObject.scale.x=mouseObject.scale.x/diameterScale
    mouseObject.scale.y=mouseObject.scale.y/diameterScale
    diameter=diameter/diameterScale;
  }

}



var levelData=[]
function release() {

  var mouseCoordinates = getMouseCoordinates();

     graphics = game.add.graphics(mouseCoordinates[0], mouseCoordinates[1]);

     spritelist.push(graphics)
     
     levelData.push({x:mouseCoordinates[0],y:mouseCoordinates[1],diameter:diameter})

    graphics.beginFill(0xffffff, 1);
    graphics.drawCircle(0, 0, diameter);


  var mouseCoordinates = getMouseCoordinates();

}

function getMouseCoordinates() {
  return [
    game.input.activePointer.worldX / game.camera.scale.x,
    game.input.activePointer.worldY / game.camera.scale.y
  ];
}


createHold = function(name, x, y, diameter, fillColor) {
  var graphics = game.add.graphics(x - diameter/2, y - diameter/2);

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
      0);

   hold = game.add.sprite(x, y, name);

console.log(hold)

//  game.p2.enable([hold], false);

  //hold.body.static = true;

  return hold;
};
