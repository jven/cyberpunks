cyberpunks.Climber = function(game, size) {
  this.game = game;

  var shoulderDistance = 0.5 * size;
  var upperArmWidth = 0.4 * size;
  var upperArmHeight = 0.2 * size;
  var lowerArmWidth = 0.4 * size;
  var lowerArmHeight = 0.2 * size;
  var handSize = 0.2 * size;
  var footLength = 0.3 * size;
  var footSize = 0.2 * size;
  var neckLength = 0.05 * size;
  var headSize = 0.3 * size;
  var upperBodyHeight = 0.6 * size;
  var lowerBodyHeight = 0.4 * size;
  var upperLegHeight = 0.5 * size;
  var upperLegWidth = 0.2 * size;
  var lowerLegWidth = 0.2 * size;
  var lowerLegHeight = 0.5 * size;

  this.upperBody = this.createBody(
      'upperBody',
      0,
      0,
      shoulderDistance,
      upperBodyHeight,
      this.randomColor_());

  this.bodies = [
    this.upperBody,
    
    this.createBody(
        'lowerBody', 
        0, 
        upperBodyHeight / 2 + lowerBodyHeight / 2, 
        shoulderDistance, 
        lowerBodyHeight, 
        this.randomColor_()),

    this.createBody(
        'head', 
        0,
        -upperBodyHeight / 2 - headSize / 2 - neckLength, 
        headSize, 
        headSize, 
        this.randomColor_()),
    
    this.createBody(
        'leftUpperLeg', 
        -shoulderDistance / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight / 2, 
        upperLegWidth, upperLegHeight, 
        this.randomColor_()),

    this.createBody(
        'leftLowerLeg', 
        -shoulderDistance / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight + lowerLegHeight / 2, 
        lowerLegWidth, 
        lowerLegHeight, 
        this.randomColor_()),
    
    this.createBody(
        'leftFoot', 
        -shoulderDistance / 2 + upperLegWidth / 2 - footLength / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight + lowerLegHeight + footSize / 2, 
        footLength, 
        footSize, 
        this.randomColor_()),
    
    this.createBody(
        'rightUpperLeg', 
        shoulderDistance / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight / 2, 
        upperLegWidth, 
        upperLegHeight, 
        this.randomColor_()),
    
    this.createBody(
        'rightLowerLeg', 
        shoulderDistance / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight + lowerLegHeight / 2, 
        lowerLegWidth, 
        lowerLegHeight,
        this.randomColor_()),

    this.createBody(
        'rightFoot', 
        -(-shoulderDistance / 2 + upperLegWidth / 2 - footLength / 2), 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight + lowerLegHeight + footSize / 2, 
        footLength, 
        footSize, 
        this.randomColor_()),

    this.createBody(
        'leftHand', 
        -shoulderDistance / 2 - upperArmWidth - lowerArmWidth - handSize / 2,
        -upperBodyHeight / 2 + lowerArmHeight / 2, 
        handSize, 
        handSize, 
        this.randomColor_()),

    this.createBody(
        'leftLowerArm', 
        -shoulderDistance / 2 - upperArmWidth - lowerArmWidth / 2, 
        -upperBodyHeight / 2 + lowerArmHeight / 2, 
        lowerArmWidth, 
        lowerArmHeight, 
        this.randomColor_()),

    this.createBody(
        'leftUpperArm', 
        -shoulderDistance / 2 - upperArmWidth / 2, 
        -upperBodyHeight / 2 + lowerArmHeight / 2,
        upperArmWidth, 
        upperArmHeight, 
        this.randomColor_()),

    this.createBody(
        'rightHand', 
        -(-shoulderDistance / 2 - upperArmWidth - lowerArmWidth - handSize / 2),
        -upperBodyHeight / 2 + lowerArmHeight / 2,
        handSize, 
        handSize, 
        this.randomColor_()),

    this.createBody(
        'rightLowerArm', 
        -(-shoulderDistance / 2 - upperArmWidth - lowerArmWidth / 2), 
        -upperBodyHeight / 2 + lowerArmHeight / 2,
        lowerArmWidth, 
        lowerArmHeight, 
        this.randomColor_()),

    this.createBody(
        'rightUpperArm', 
        -(-shoulderDistance / 2 - upperArmWidth / 2), 
        -upperBodyHeight / 2 + lowerArmHeight / 2,
        upperArmWidth, 
        upperArmHeight, 
        this.randomColor_())
  ];
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
    name, centerX, centerY, width, height, fillColor) {
  var topLeftX = centerX - width / 2;
  var topLeftY = centerY - height / 2;
  var graphics = this.game.add.graphics(topLeftX - 10000, topLeftY - 10000);
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
  
  var body = game.add.sprite(topLeftX, topLeftY, name);
  // game.physics.p2.enable([body], false);
  return body;
};

cyberpunks.Climber.prototype.randomColor_ = function() {
  return ((Math.random() * 3000 + 1096) << 24) +
      ((Math.random() * 3000 + 1096) << 12) +
      (Math.random() * 3000 + 1096);
};