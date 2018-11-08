cyberpunks.Climber = function(game) {
  this.game = game;

  var scale = 100;
  var shouldersDistance = 0.5 * scale,
      upperArmLength = 0.4 * scale,
      lowerArmLength = 0.4 * scale,
      upperArmSize = 0.2 * scale,
      lowerArmSize = 0.2 * scale,
      handSize = 0.2 * scale,
      footLength = 0.3 * scale,
      footSize = 0.2 * scale,
      neckLength = 0.1 * scale,
      headSize = 0.5 * scale,
      upperBodyLength = 0.6 * scale,
      pelvisLength = 0.4 * scale,
      upperLegLength = 0.5 * scale,
      upperLegSize = 0.2 * scale,
      lowerLegSize = 0.2 * scale,
      lowerLegLength = 0.5 * scale;

  // this.createBody('leftHand', 200, 200, handSize, handSize, 0xff0000);
  // this.createBody('leftLowerArm', 200, 200, lowerArmLength, lowerArmSize, 0xff0000);
  // this.createBody('leftUpperArm', 200, 200, upperArmLength, upperArmSize, 0xff0000);

  // this.createBody('rightHand', 200, 200, 40, 10, 0xff0000);
  // this.createBody('rightLowerArm', 200, 200, lowerArmLength, lowerArmSize, 0xff0000);
  // this.createBody('rightUpperArm', 200, 200, upperArmLength, upperArmSize, 0xff0000);

  this.bodies = [
    this.createBody(
        'upperBody', 
        0, 
        0,
        shouldersDistance,
        upperBodyLength,
        0xff0000),
    
    this.createBody(
        'pelvis', 
        0, 
        upperBodyLength / 2 + pelvisLength / 2, 
        shouldersDistance, 
        pelvisLength, 
        0xff0000),

    this.createBody(
        'head', 
        0, 
        -upperBodyLength / 2 - headSize / 2 - neckLength, 
        headSize, 
        headSize, 
        0xff0000),
    
    this.createBody(
        'leftUpperLeg', 
        -shouldersDistance / 2, 
        upperBodyLength / 2 + pelvisLength + upperLegLength / 2, 
        upperLegSize, upperLegLength, 
        0xff0000),

    this.createBody(
        'leftLowerLeg', 
        -shouldersDistance / 2, 
        upperBodyLength / 2 + pelvisLength + upperLegLength + lowerLegLength / 2, 
        lowerLegSize, 
        lowerLegLength, 
        0xff0000),
    
    this.createBody(
        'leftFoot', 
        -shouldersDistance / 2 + upperLegSize / 2 - footLength / 2, 
        upperBodyLength / 2 + pelvisLength + upperLegLength + lowerLegLength + footSize / 2, 
        footLength, 
        footSize, 
        0xff0000),
    
    this.createBody(
        'rightUpperLeg', 
        shouldersDistance / 2, 
        upperBodyLength / 2 + pelvisLength + upperLegLength / 2, 
        upperLegSize, 
        upperLegLength, 
        0xff0000),
    
    this.createBody(
        'rightLowerLeg', 
        shouldersDistance / 2, 
        upperBodyLength / 2 + pelvisLength + upperLegLength + lowerLegLength / 2, 
        lowerLegSize, 
        lowerLegLength,
        0xff0000),

    this.createBody(
        'rightFoot', 
        -(-shouldersDistance / 2 + upperLegSize / 2 - footLength / 2), 
        upperBodyLength / 2 + pelvisLength + upperLegLength + lowerLegLength + footSize / 2, 
        footLength, 
        footSize, 
        0xff0000)
  ];
  this.upperBody = this.bodies[0];
};

cyberpunks.Climber.prototype.moveTo = function(x, y) {
  var translateX = x - this.upperBody.x;
  var translateY = y - this.upperBody.y;

  this.bodies.forEach(body => {
    body.x += translateX;
    body.y += translateY;
  });
};

cyberpunks.Climber.prototype.createBody = function(
    name, x, y, width, height, fillColor) {
  var graphics = this.game.add.graphics(x - 10000, y - 10000);
  graphics.beginFill(fillColor);
  graphics.drawRect(0, 0, width, height);
  graphics.endFill();
  var texture = graphics.generateTexture();
  game.cache.addSpriteSheet(
      name,
      null,
      texture.baseTexture.source,
      width,
      height,
      1,
      0,
      0);
  
  var body = game.add.sprite(x, y, name);
  game.physics.p2.enable([body], false);
  return body;
};