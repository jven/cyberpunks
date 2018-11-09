cyberpunks.Climber = function(game, size) {
  this.game_ = game;

  var shoulderDistance = 0.5 * size;
  var upperArmWidth = 0.4 * size;
  var upperArmHeight = 0.2 * size;
  var lowerArmWidth = 0.4 * size;
  var lowerArmHeight = 0.2 * size;
  var handSize = 0.2 * size;
  var footWidth = 0.3 * size;
  var footHeight = 0.2 * size;
  var neckLength = 0.05 * size;
  var headSize = 0.3 * size;
  var upperBodyHeight = 0.6 * size;
  var lowerBodyHeight = 0.4 * size;
  var upperLegHeight = 0.5 * size;
  var upperLegWidth = 0.2 * size;
  var lowerLegWidth = 0.2 * size;
  var lowerLegHeight = 0.5 * size;

  // Create the body parts.
  this.upperBody_ = this.createBodyPart_(
      'upperBody',
      0,
      0,
      shoulderDistance,
      upperBodyHeight,
      this.randomColor_());
  this.lowerBody_ = this.createBodyPart_(
        'lowerBody', 
        0, 
        upperBodyHeight / 2 + lowerBodyHeight / 2, 
        shoulderDistance, 
        lowerBodyHeight, 
        this.randomColor_());
  this.head_ = this.createBodyPart_(
        'head', 
        0,
        -upperBodyHeight / 2 - headSize / 2 - neckLength, 
        headSize, 
        headSize, 
        this.randomColor_());
  this.leftUpperLeg_ = this.createBodyPart_(
        'leftUpperLeg', 
        -shoulderDistance / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight / 2, 
        upperLegWidth, upperLegHeight, 
        this.randomColor_());
  this.leftLowerLeg_ = this.createBodyPart_(
        'leftLowerLeg', 
        -shoulderDistance / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight + lowerLegHeight / 2, 
        lowerLegWidth, 
        lowerLegHeight, 
        this.randomColor_());
  this.leftFoot_ = this.createBodyPart_(
        'leftFoot', 
        -shoulderDistance / 2 + upperLegWidth / 2 - footWidth / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight + lowerLegHeight + footHeight / 2, 
        footWidth, 
        footHeight, 
        this.randomColor_());
  this.rightUpperLeg_ = this.createBodyPart_(
        'rightUpperLeg', 
        shoulderDistance / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight / 2, 
        upperLegWidth, 
        upperLegHeight, 
        this.randomColor_());
  this.rightLowerLeg_ = this.createBodyPart_(
        'rightLowerLeg', 
        shoulderDistance / 2, 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight + lowerLegHeight / 2, 
        lowerLegWidth, 
        lowerLegHeight,
        this.randomColor_());
  this.rightFoot_ = this.createBodyPart_(
        'rightFoot', 
        -(-shoulderDistance / 2 + upperLegWidth / 2 - footWidth / 2), 
        upperBodyHeight / 2 + lowerBodyHeight + upperLegHeight + lowerLegHeight + footHeight / 2, 
        footWidth, 
        footHeight, 
        this.randomColor_());
  this.leftHand_ = this.createBodyPart_(
        'leftHand', 
        -shoulderDistance / 2 - upperArmWidth - lowerArmWidth - handSize / 2,
        -upperBodyHeight / 2 + lowerArmHeight / 2, 
        handSize, 
        handSize, 
        this.randomColor_());
  this.leftLowerArm_ = this.createBodyPart_(
        'leftLowerArm', 
        -shoulderDistance / 2 - upperArmWidth - lowerArmWidth / 2, 
        -upperBodyHeight / 2 + lowerArmHeight / 2, 
        lowerArmWidth, 
        lowerArmHeight, 
        this.randomColor_());
  this.leftUpperArm_ = this.createBodyPart_(
        'leftUpperArm', 
        -shoulderDistance / 2 - upperArmWidth / 2, 
        -upperBodyHeight / 2 + lowerArmHeight / 2,
        upperArmWidth, 
        upperArmHeight, 
        this.randomColor_());
  this.rightHand_ = this.createBodyPart_(
        'rightHand', 
        -(-shoulderDistance / 2 - upperArmWidth - lowerArmWidth - handSize / 2),
        -upperBodyHeight / 2 + lowerArmHeight / 2,
        handSize, 
        handSize, 
        this.randomColor_());
  this.rightLowerArm_ = this.createBodyPart_(
        'rightLowerArm', 
        -(-shoulderDistance / 2 - upperArmWidth - lowerArmWidth / 2), 
        -upperBodyHeight / 2 + lowerArmHeight / 2,
        lowerArmWidth, 
        lowerArmHeight, 
        this.randomColor_());
  this.rightUpperArm_ = this.createBodyPart_(
        'rightUpperArm', 
        -(-shoulderDistance / 2 - upperArmWidth / 2), 
        -upperBodyHeight / 2 + lowerArmHeight / 2,
        upperArmWidth, 
        upperArmHeight, 
        this.randomColor_());
  this.bodyParts_ = [
    this.head_,
    this.upperBody_,
    this.lowerBody_,
    this.leftUpperLeg_,
    this.leftLowerLeg_,
    this.leftFoot_,
    this.rightUpperLeg_,
    this.rightLowerLeg_,
    this.rightFoot_,
    this.leftHand_,
    this.leftLowerArm_,
    this.leftUpperArm_,
    this.rightHand_,
    this.rightLowerArm_,
    this.rightUpperArm_
  ];

  // Create the constraints between body parts.
  this.game_.physics.p2.createRevoluteConstraint(
      this.head_,
      [0, headSize / 2],
      this.upperBody_,
      [0, -upperBodyHeight / 2]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.upperBody_,
      [0, upperBodyHeight / 2],
      this.lowerBody_,
      [0, -lowerBodyHeight / 2]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.lowerBody_,
      [-shoulderDistance / 2, lowerBodyHeight / 2],
      this.leftUpperLeg_,
      [0, -upperLegHeight / 2]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.lowerBody_,
      [shoulderDistance / 2, lowerBodyHeight / 2],
      this.rightUpperLeg_,
      [0, -upperLegHeight / 2]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.leftUpperLeg_,
      [0, upperLegHeight / 2],
      this.leftLowerLeg_,
      [0, -lowerLegHeight / 2]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightUpperLeg_,
      [0, upperLegHeight / 2],
      this.rightLowerLeg_,
      [0, -lowerLegHeight / 2]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.leftLowerLeg_,
      [0, lowerLegHeight / 2],
      this.leftFoot_,
      [footWidth / 2 - lowerLegWidth / 2, -footHeight / 2]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightLowerLeg_,
      [0, lowerLegHeight / 2],
      this.rightFoot_,
      [-(footWidth / 2 - lowerLegWidth / 2), -footHeight / 2]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.upperBody_,
      [-shoulderDistance / 2, -upperBodyHeight / 2 + upperArmHeight / 2],
      this.leftUpperArm_,
      [upperArmWidth / 2, 0]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.upperBody_,
      [shoulderDistance / 2, -upperBodyHeight / 2 + upperArmHeight / 2],
      this.rightUpperArm_,
      [-upperArmWidth / 2, 0]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.leftLowerArm_,
      [lowerArmWidth / 2, 0],
      this.leftUpperArm_,
      [-upperArmWidth / 2, 0]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightLowerArm_,
      [-lowerArmWidth / 2, 0],
      this.rightUpperArm_,
      [upperArmWidth / 2, 0]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.leftHand_,
      [handSize / 2, 0],
      this.leftLowerArm_,
      [-lowerArmWidth / 2, 0]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightHand_,
      [-handSize / 2, 0],
      this.rightLowerArm_,
      [lowerArmWidth / 2, 0]);
};

cyberpunks.Climber.prototype.moveTo = function(x, y) {
  var translateX = x - this.upperBody_.x;
  var translateY = y - this.upperBody_.y;

  this.bodyParts_.forEach(body => {
    body.x += translateX;
    body.y += translateY;
  });
};

cyberpunks.Climber.prototype.createBodyPart_ = function(
    name, centerX, centerY, width, height, fillColor) {
  var topLeftX = centerX - width / 2;
  var topLeftY = centerY - height / 2;
  // Draw the body part graphic off screen.
  var graphics = this.game_.add.graphics(topLeftX - 10000, topLeftY - 10000);
  graphics.beginFill(fillColor);
  graphics.drawRect(0, 0, width, height);
  graphics.endFill();
  // Create a texture and sprite based on the graphic and add it to the game.
  var texture = graphics.generateTexture();
  this.game_.cache.addSpriteSheet(
      name,
      null,
      texture.baseTexture.source,
      width,
      height,
      1,
      0,
      0);
  
  var bodyPart = this.game_.add.sprite(topLeftX, topLeftY, name);
  // Add physics to the body part.
  this.game_.physics.p2.enable([bodyPart], false);
  return bodyPart;
};

cyberpunks.Climber.prototype.randomColor_ = function() {
  return ((Math.random() * 3000 + 1096) << 24) +
      ((Math.random() * 3000 + 1096) << 12) +
      (Math.random() * 3000 + 1096);
};