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
      shoulderDistance,
      upperBodyHeight);
  this.lowerBody_ = this.createBodyPart_(
      'lowerBody',
      shoulderDistance, 
      lowerBodyHeight);
  this.head_ = this.createBodyPart_(
      'head',
      headSize, 
      headSize);
  this.leftUpperLeg_ = this.createBodyPart_(
      'leftUpperLeg',
      upperLegWidth,
      upperLegHeight);
  this.leftLowerLeg_ = this.createBodyPart_(
      'leftLowerLeg',
      lowerLegWidth, 
      lowerLegHeight);
  this.leftFoot_ = this.createBodyPart_(
      'leftFoot',
      footWidth, 
      footHeight);
  this.rightUpperLeg_ = this.createBodyPart_(
      'rightUpperLeg',
      upperLegWidth, 
      upperLegHeight);
  this.rightLowerLeg_ = this.createBodyPart_(
      'rightLowerLeg',
      lowerLegWidth, 
      lowerLegHeight);
  this.rightFoot_ = this.createBodyPart_(
      'rightFoot',
      footWidth, 
      footHeight);
  this.leftHand_ = this.createBodyPart_(
      'leftHand',
      handSize, 
      handSize);
  this.leftLowerArm_ = this.createBodyPart_(
      'leftLowerArm',
      lowerArmWidth, 
      lowerArmHeight);
  this.leftUpperArm_ = this.createBodyPart_(
      'leftUpperArm',
      upperArmWidth, 
      upperArmHeight);
  this.rightHand_ = this.createBodyPart_(
      'rightHand',
      handSize, 
      handSize);
  this.rightLowerArm_ = this.createBodyPart_(
      'rightLowerArm',
      lowerArmWidth, 
      lowerArmHeight);
  this.rightUpperArm_ = this.createBodyPart_(
      'rightUpperArm',
      upperArmWidth, 
      upperArmHeight);
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
    
  this.enablePhysics_();
};

cyberpunks.Climber.prototype.getSelectableBodyParts = function() {
  return [
    this.leftHand_.body,
    this.rightHand_.body,
    this.leftFoot_.body,
    this.rightFoot_.body
  ];
};

cyberpunks.Climber.prototype.selectableBodyPartToConstraintNumber = function(bodyPart) {
  switch (bodyPart){
    case this.leftHand_.body:
      return 12;
    case this.rightHand_.body:
      return 13;
    case this.leftFoot_.body:
      return 6;
    case this.rightFoot_.body:
      return 7;
  }
};

cyberpunks.Climber.prototype.getForceOnBodyPart = function(bodyPart) {
  let constraintNumber= this.selectableBodyPartToConstraintNumber(bodyPart);
  //only checks y direction force
  //need to add x direction!!!!!!!!!
  return Math.abs(climber.game_.physics.p2.world.constraints[constraintNumber].equations[1].multiplier)
};


cyberpunks.Climber.prototype.moveEntireBodyTo = function(
    climberCenterX, climberCenterY) {
  this.moveBodyPartTo_(
      this.upperBody_,
      climberCenterX,
      climberCenterY,
      0,
      0);
  this.moveBodyPartTo_(
      this.lowerBody_,
      climberCenterX,
      climberCenterY,
      0,
      this.upperBody_.height / 2 + this.lowerBody_.height / 2);
  this.moveBodyPartTo_(
      this.head_,
      climberCenterX,
      climberCenterY,
      0,
      -this.upperBody_.height / 2 - this.head_.height / 2);
  this.moveBodyPartTo_(
      this.leftUpperLeg_,
      climberCenterX,
      climberCenterY, 
      -this.lowerBody_.width / 2, 
      this.upperBody_.height / 2 + this.lowerBody_.height + this.leftUpperLeg_.height / 2);
  this.moveBodyPartTo_(
      this.leftLowerLeg_,
      climberCenterX,
      climberCenterY, 
      -this.lowerBody_.width / 2, 
      this.upperBody_.height / 2 + this.lowerBody_.height + this.leftUpperLeg_.height + this.leftLowerLeg_.height / 2);
  this.moveBodyPartTo_(
      this.leftFoot_,
      climberCenterX,
      climberCenterY,
      -this.lowerBody_.width / 2 + this.leftUpperLeg_.width / 2 - this.leftFoot_.width / 2, 
      this.upperBody_.height / 2 + this.lowerBody_.height + this.leftUpperLeg_.height + this.leftLowerLeg_.height + this.leftFoot_.height / 2);
  this.moveBodyPartTo_(
      this.rightUpperLeg_,
      climberCenterX,
      climberCenterY,
      this.lowerBody_.width / 2, 
      this.upperBody_.height / 2 + this.lowerBody_.height + this.rightUpperLeg_.height / 2);
  this.moveBodyPartTo_(
      this.rightLowerLeg_,
      climberCenterX,
      climberCenterY,
      this.lowerBody_.width / 2, 
      this.upperBody_.height / 2 + this.lowerBody_.height + this.rightUpperLeg_.height + this.rightLowerLeg_.height / 2);
  this.moveBodyPartTo_(
      this.rightFoot_,
      climberCenterX,
      climberCenterY,
      this.lowerBody_.width / 2 - this.rightUpperLeg_.width / 2 + this.rightFoot_.width / 2, 
      this.upperBody_.height / 2 + this.lowerBody_.height + this.rightUpperLeg_.height + this.rightLowerLeg_.height + this.rightFoot_.height / 2);
  this.moveBodyPartTo_(
      this.leftHand_,
      climberCenterX,
      climberCenterY,
      -this.upperBody_.width / 2 - this.leftUpperArm_.width - this.leftLowerArm_.width - this.leftHand_.width / 2, 
      -this.upperBody_.height / 2 + this.leftLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.leftLowerArm_,
      climberCenterX,
      climberCenterY,
      -this.upperBody_.width / 2 - this.leftUpperArm_.width - this.leftLowerArm_.width / 2, 
      -this.upperBody_.height / 2 + this.leftLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.leftUpperArm_,
      climberCenterX,
      climberCenterY,
      -this.upperBody_.width / 2 - this.leftUpperArm_.width / 2, 
      -this.upperBody_.height / 2 + this.leftLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.rightHand_,
      climberCenterX,
      climberCenterY,
      this.upperBody_.width / 2 + this.rightUpperArm_.width + this.rightLowerArm_.width + this.rightHand_.width / 2, 
      -this.upperBody_.height / 2 + this.rightLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.rightLowerArm_,
      climberCenterX,
      climberCenterY,
      this.upperBody_.width / 2 + this.rightUpperArm_.width + this.rightLowerArm_.width / 2, 
      -this.upperBody_.height / 2 + this.rightLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.rightUpperArm_,
      climberCenterX,
      climberCenterY,
      this.upperBody_.width / 2 + this.rightUpperArm_.width / 2, 
      -this.upperBody_.height / 2 + this.rightLowerArm_.height / 2);
};

cyberpunks.Climber.prototype.enablePhysics_ = function() {
  this.game_.physics.p2.enable(this.bodyParts_, false);

 // this.lowerBody_.body.mass=20;
 // this.upperBody_.body.mass=20;

  // Create the constraints between body parts.
  this.game_.physics.p2.createRevoluteConstraint(
      this.head_,
      [0, this.head_.height / 2],
      this.upperBody_,
      [0, -this.upperBody_.height / 2])
      .setLimits(-Math.PI / 8, Math.PI / 8);
  this.game_.physics.p2.createRevoluteConstraint(
      this.upperBody_,
      [0, this.upperBody_.height / 2],
      this.lowerBody_,
      [0, -this.lowerBody_.height / 2])
      .setLimits([-Math.PI / 8, Math.PI / 8]);
  this.game_.physics.p2.createRevoluteConstraint(
      this.lowerBody_,
      [-this.lowerBody_.width / 2, this.lowerBody_.height / 2],
      this.leftUpperLeg_,
      [0, -this.leftUpperLeg_.height / 2])
      .setLimits(-Math.PI / 4, Math.PI / 4);
  this.game_.physics.p2.createRevoluteConstraint(
      this.lowerBody_,
      [this.lowerBody_.width / 2, this.lowerBody_.height / 2],
      this.rightUpperLeg_,
      [0, -this.rightUpperLeg_.height / 2])
      .setLimits(-Math.PI / 4, Math.PI / 4);
  this.game_.physics.p2.createRevoluteConstraint(
      this.leftUpperLeg_,
      [0, this.leftUpperLeg_.height / 2],
      this.leftLowerLeg_,
      [0, -this.leftLowerLeg_.height / 2])
      .setLimits(-Math.PI / 8, Math.PI / 8);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightUpperLeg_,
      [0, this.rightUpperLeg_.height / 2],
      this.rightLowerLeg_,
      [0, -this.rightLowerLeg_.height / 2])
      .setLimits(-Math.PI / 8, Math.PI / 8);
  this.game_.physics.p2.createRevoluteConstraint(
      this.leftLowerLeg_,
      [0, this.leftLowerLeg_.height / 2],
      this.leftFoot_,
      [this.leftFoot_.width / 2 - this.leftLowerLeg_.width / 2, -this.leftFoot_.height / 2])
      .setLimits(-Math.PI / 8, Math.PI / 8);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightLowerLeg_,
      [0, this.rightLowerLeg_.height / 2],
      this.rightFoot_,
      [-this.rightFoot_.width / 2 + this.rightLowerLeg_.width / 2, -this.rightFoot_.height / 2])
      .setLimits(-Math.PI / 8, Math.PI / 8);
  this.game_.physics.p2.createRevoluteConstraint(
      this.upperBody_,
      [-this.upperBody_.width / 2, -this.upperBody_.height / 2 + this.leftUpperArm_.height / 2],
      this.leftUpperArm_,
      [this.leftUpperArm_.width / 2, 0])
      .setLimits(-Math.PI / 2, Math.PI / 2);
  this.game_.physics.p2.createRevoluteConstraint(
      this.upperBody_,
      [this.upperBody_.width / 2, -this.upperBody_.height / 2 + this.rightUpperArm_.height / 2],
      this.rightUpperArm_,
      [-this.rightUpperArm_.width / 2, 0])
      .setLimits(-Math.PI / 2, Math.PI / 2);
  this.game_.physics.p2.createRevoluteConstraint(
      this.leftLowerArm_,
      [this.leftLowerArm_.width / 2, 0],
      this.leftUpperArm_,
      [-this.leftUpperArm_.width / 2, 0])
      .setLimits(-Math.PI / 8, Math.PI / 8);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightLowerArm_,
      [-this.rightLowerArm_.width / 2, 0],
      this.rightUpperArm_,
      [this.rightUpperArm_.width / 2, 0])
      .setLimits(-Math.PI / 8, Math.PI / 8);
  this.game_.physics.p2.createRevoluteConstraint(
      this.leftHand_,
      [this.leftHand_.width / 2, 0],
      this.leftLowerArm_,
      [-this.leftLowerArm_.width / 2, 0])
      .setLimits(-Math.PI / 8, Math.PI / 8);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightHand_,
      [-this.rightHand_.width / 2, 0],
      this.rightLowerArm_,
      [this.rightLowerArm_.width / 2, 0])
      .setLimits(-Math.PI / 8, Math.PI / 8);
}

cyberpunks.Climber.prototype.moveBodyPartTo_ = function(
    bodyPart, anchorX, anchorY, offsetX, offsetY) {
  bodyPart.body.x = anchorX + offsetX - bodyPart.width / 2;
  bodyPart.body.y = anchorY + offsetY - bodyPart.height / 2;
};

cyberpunks.Climber.prototype.createBodyPart_ = function(
    bodyPartName, width, height, rotationDegrees) {
  if (cyberpunks.Config.USE_SKELETON_SPRITE) {
    // Add the sprite off screen. It will be positioned on screen later.
    var skeletonSprite = this.game_.add.sprite(-10000, -10000, bodyPartName);
    skeletonSprite.width = width;
    skeletonSprite.height = height;
    return skeletonSprite;
  }

  // Draw the body part graphic off screen. We draw this just to produce the
  // sprite which will actually be rendered on screen.
  var graphics = this.game_.add.graphics(-10000, -10000);
  graphics.beginFill(this.randomColor_());
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
  
  // Add the sprite off screen. It will be positioned on screen later.
  return this.game_.add.sprite(-10000, -10000, name);
};

cyberpunks.Climber.prototype.randomColor_ = function() {
  var randomValue = Math.floor(Math.random() * 156) + 100;
  return (randomValue << 16) + (randomValue << 8) + randomValue;
};