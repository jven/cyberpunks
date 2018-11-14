/**
 * An object encapsulating the climber and its constituent body parts. This
 * class is responsible for composing the climber from P2 bodies and positioning
 * these physics bodies during runtime.
 */
cyberpunks.Climber = function(game, collisionGroups, size) {
  this.game_ = game;
  this.collisionGroups_ = collisionGroups;

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

  // A map from draggable limbs to the state and position of each limb.
  this.draggableLimbProperties_ = {};

  // A graphics object holding debug indicators about the state of the climber.
  this.debugGraphics_ = this.game_.add.graphics(0, 0);
  this.debugForcesText_ = {};

  this.enablePhysics_();
  this.fixCamera_();
};

/**
 * Sets that the given limb is being dragged by another player at the given
 * coordinates.
 */
cyberpunks.Climber.prototype.dragLimbByOtherPlayer = function(
    draggableLimb, x, y) {
  this.setLimbProperties_(draggableLimb, x, y, cyberpunks.LimbState.OTHER_DRAGGING);
};

/**
 * Starts dragging the limb by the current player at the given mouse
 * coordinates.
 */
cyberpunks.Climber.prototype.dragLimbMyself = function(mouseX, mouseY) {
  var draggableLimb = null;
  if (cyberpunks.Climber.isBodyPartAt_(
      this.leftHand_, mouseX, mouseY)) {
    draggableLimb = cyberpunks.DraggableLimb.LEFT_HAND;
  } else if (cyberpunks.Climber.isBodyPartAt_(
      this.rightHand_, mouseX, mouseY)) {
    draggableLimb = cyberpunks.DraggableLimb.RIGHT_HAND;
  } else if (cyberpunks.Climber.isBodyPartAt_(
      this.leftFoot_, mouseX, mouseY)) {
    draggableLimb = cyberpunks.DraggableLimb.LEFT_FOOT;
  } else if (cyberpunks.Climber.isBodyPartAt_(
      this.rightFoot_, mouseX, mouseY)) {
    draggableLimb = cyberpunks.DraggableLimb.RIGHT_FOOT;
  }

  if (draggableLimb) {
    this.setLimbProperties_(
        draggableLimb, 
        mouseX,
        mouseY,
        cyberpunks.LimbState.SELF_DRAGGING);
  }
};

/**
 * Sets the positions of the draggable limbs as necessary, according to their 
 * state.
 */
cyberpunks.Climber.prototype.positionLimbs = function(mouseX, mouseY) {

  this.forEachDraggableLimb((limbProperties,bodyPart)=>{
     switch(limbProperties.state) {
      case cyberpunks.LimbState.HOLDING:
      case cyberpunks.LimbState.OTHER_DRAGGING:
        this.moveBodyPartTo_(bodyPart, limbProperties.x, limbProperties.y);
        break;
      case cyberpunks.LimbState.SELF_DRAGGING:
        this.setLimbProperties_(
            limbProperties.limb, 
            mouseX, mouseY,
            cyberpunks.LimbState.SELF_DRAGGING);
        this.moveBodyPartTo_(bodyPart, mouseX, mouseY);
        break;
    }
  })
};

/** Releases all limbs currently being dragged by the player. */
cyberpunks.Climber.prototype.releaseLimbs = function(course) {
  this.forEachDraggableLimb((limbProperties,bodyPart)=>{
    if (limbProperties.state !=cyberpunks.LimbState.SELF_DRAGGING) {
      return;
    }

    if (cyberpunks.Climber.isBodyPartOnHold_(bodyPart, course)) {
      this.setLimbProperties_(
          limbProperties.limb, 
          bodyPart.body.x, 
          bodyPart.body.y, 
          cyberpunks.LimbState.HOLDING);
    } else {
      // The coordinates are not used for loose limbs.
      this.setLimbProperties_(limbProperties.limb, 0, 0, cyberpunks.LimbState.LOOSE);
    }
  })
};

/** Unfixes limbs based on the forces acting on them, as appropriate. */
cyberpunks.Climber.prototype.maybeUnfixLimbsBasedOnForce = function() {
  var toUnfix = [];

  this.forEachDraggableLimb(limbProperties=>{
    if (limbProperties.state === cyberpunks.LimbState.HOLDING
        && this.getForceOnDraggableLimb_(limbProperties.limb) > 900) {
      toUnfix.push(limbProperties.limb);
    }
    if (limbProperties.state === cyberpunks.LimbState.SELF_DRAGGING) {
      if (this.getForceOnDraggableLimb_(limbProperties.limb) > 1500) {
        toUnfix.push(limbProperties.limb);
      } 
      else if (this.numberOfLimbsHoldingOn_() == 0 &&
          this.getForceOnDraggableLimb_(limbProperties.limb) > 650) {
        toUnfix.push(limbProperties.limb);
      }
    }
  })

  toUnfix.forEach(draggableLimb => {
    delete this.draggableLimbProperties_[draggableLimb];
  });
};

/**
 * Returns a list of reports for the server indicating the current state of the
 * climber.
 */
cyberpunks.Climber.prototype.getReportsForServer = function() {
  var reports = [];
  this.forEachDraggableLimb(limbProperties=>{
    if (limbProperties.state != cyberpunks.LimbState.LOOSE &&
        limbProperties.state != cyberpunks.LimbState.HOLDING &&
        limbProperties.state != cyberpunks.LimbState.SELF_DRAGGING) {
      // The server only cares about these states.
      return;
    }

    reports.push({
      limb: limbProperties.limb,
      x: limbProperties.x,
      y: limbProperties.y,
      state: limbProperties.state
    });
  })
  return reports;
};

cyberpunks.Climber.prototype.getForceOnDraggableLimb_ = function(
    draggableLimb) {
  var constraintNumber = 0;
  switch (draggableLimb) {
    case cyberpunks.DraggableLimb.LEFT_HAND:
      constraintNumber = 12;
      break;
    case cyberpunks.DraggableLimb.RIGHT_HAND:
      constraintNumber = 13;
      break;
    case cyberpunks.DraggableLimb.LEFT_FOOT:
      constraintNumber = 6;
      break;
    case cyberpunks.DraggableLimb.RIGHT_FOOT:
      constraintNumber = 7;
      break;
  }
  // TODO(douglas): only checks y direction force, need to add x direction!
  return Math.abs(climber.game_.physics.p2.world.constraints[constraintNumber]
      .equations[1].multiplier);
};

cyberpunks.Climber.prototype.moveEntireBodyTo = function(
    climberCenterX, climberCenterY) {
  this.moveBodyPartTo_(
      this.upperBody_,
      climberCenterX,
      climberCenterY);
  this.moveBodyPartTo_(
      this.lowerBody_,
      climberCenterX,
      climberCenterY + this.upperBody_.height / 2 + this.lowerBody_.height / 2);
  this.moveBodyPartTo_(
      this.head_,
      climberCenterX,
      climberCenterY - this.upperBody_.height / 2 - this.head_.height / 2);
  this.moveBodyPartTo_(
      this.leftUpperLeg_,
      climberCenterX - this.lowerBody_.width / 2,
      climberCenterY + this.upperBody_.height / 2 + this.lowerBody_.height + this.leftUpperLeg_.height / 2);
  this.moveBodyPartTo_(
      this.leftLowerLeg_,
      climberCenterX - this.lowerBody_.width / 2,
      climberCenterY + this.upperBody_.height / 2 + this.lowerBody_.height + this.leftUpperLeg_.height + this.leftLowerLeg_.height / 2);
  this.moveBodyPartTo_(
      this.leftFoot_,
      climberCenterX - this.lowerBody_.width / 2 + this.leftUpperLeg_.width / 2 - this.leftFoot_.width / 2,
      climberCenterY + this.upperBody_.height / 2 + this.lowerBody_.height + this.leftUpperLeg_.height + this.leftLowerLeg_.height + this.leftFoot_.height / 2);
  this.moveBodyPartTo_(
      this.rightUpperLeg_,
      climberCenterX + this.lowerBody_.width / 2,
      climberCenterY + this.upperBody_.height / 2 + this.lowerBody_.height + this.rightUpperLeg_.height / 2);
  this.moveBodyPartTo_(
      this.rightLowerLeg_,
      climberCenterX + this.lowerBody_.width / 2,
      climberCenterY + this.upperBody_.height / 2 + this.lowerBody_.height + this.rightUpperLeg_.height + this.rightLowerLeg_.height / 2);
  this.moveBodyPartTo_(
      this.rightFoot_,
      climberCenterX + this.lowerBody_.width / 2 - this.rightUpperLeg_.width / 2 + this.rightFoot_.width / 2,
      climberCenterY + this.upperBody_.height / 2 + this.lowerBody_.height + this.rightUpperLeg_.height + this.rightLowerLeg_.height + this.rightFoot_.height / 2);
  this.moveBodyPartTo_(
      this.leftHand_,
      climberCenterX - this.upperBody_.width / 2 - this.leftUpperArm_.width - this.leftLowerArm_.width - this.leftHand_.width / 2,
      climberCenterY - this.upperBody_.height / 2 + this.leftLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.leftLowerArm_,
      climberCenterX - this.upperBody_.width / 2 - this.leftUpperArm_.width - this.leftLowerArm_.width / 2,
      climberCenterY - this.upperBody_.height / 2 + this.leftLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.leftUpperArm_,
      climberCenterX - this.upperBody_.width / 2 - this.leftUpperArm_.width / 2,
      climberCenterY - this.upperBody_.height / 2 + this.leftLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.rightHand_,
      climberCenterX + this.upperBody_.width / 2 + this.rightUpperArm_.width + this.rightLowerArm_.width + this.rightHand_.width / 2,
      climberCenterY - this.upperBody_.height / 2 + this.rightLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.rightLowerArm_,
      climberCenterX + this.upperBody_.width / 2 + this.rightUpperArm_.width + this.rightLowerArm_.width / 2,
      climberCenterY - this.upperBody_.height / 2 + this.rightLowerArm_.height / 2);
  this.moveBodyPartTo_(
      this.rightUpperArm_,
      climberCenterX + this.upperBody_.width / 2 + this.rightUpperArm_.width / 2,
      climberCenterY - this.upperBody_.height / 2 + this.rightLowerArm_.height / 2);
};

cyberpunks.Climber.prototype.showDebugGraphics = function() {
  this.debugGraphics_.clear();

  this.forEachDraggableLimb((limbProperties,bodyPart)=>{
    var limb = limbProperties.limb;

    // Show dots on the hit points of each limb.
    var hitPoints = cyberpunks.Climber.getHitPoints_(bodyPart);
    hitPoints.forEach(hitPoint => {
      this.debugGraphics_.beginFill(0xcccccc);
      this.debugGraphics_.drawCircle(hitPoint[0], hitPoint[1], 5);
      this.debugGraphics_.endFill();
    });

    // Show the force acting on each limb.
    if (!this.debugForcesText_[limb]) {
      this.debugForcesText_[limb] = this.game_.add.text(
          0, 0, '', {
            font: "20px Arial",
            align: "center"
          });
    }
    var force = Math.floor(this.getForceOnDraggableLimb_(limb));
    var percentRed = Math.min(1, force / 1000);
    var color = ((Math.floor(percentRed * 150) + 100) << 16) +
        ((Math.floor((1 - percentRed) * 150) + 100) << 8);
    this.debugForcesText_[limb].x = bodyPart.body.x;
    this.debugForcesText_[limb].y = bodyPart.body.y;
    this.debugForcesText_[limb].setText('' + force);
    this.debugForcesText_[limb].fill = '#' + color.toString(16);
    this.debugForcesText_[limb].stroke = 'black';
    this.debugForcesText_[limb].strokeThickness = 3;
  })
};

cyberpunks.Climber.prototype.enablePhysics_ = function() {
  this.game_.physics.p2.enable(this.bodyParts_, false);

  let collidableBodyParts = [
    this.upperBody_,
    this.lowerBody_,
    this.leftUpperLeg_,
    this.leftLowerLeg_,
    this.rightUpperLeg_,
    this.rightLowerLeg_,
    this.leftLowerArm_,
    this.leftUpperArm_,
    this.rightLowerArm_,
    this.rightUpperArm_
  ];
  var collisionFilter = [];
  if (cyberpunks.Config.CLIMBER_COLLIDES_WITH_ITSELF) {
    collisionFilter.push(this.collisionGroups_.getClimberGroup());
  }
  if (cyberpunks.Config.CLIMBER_COLLIDES_WITH_HOLDS) {
    collisionFilter.push(this.collisionGroups_.getHoldsGroup());
  }
  for (let i in collidableBodyParts) {
    collidableBodyParts[i].body.setCollisionGroup(
        this.collisionGroups_.getClimberGroup());
    collidableBodyParts[i].body.collides(collisionFilter);
  }

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
      .setLimits(-Math.PI / 2, 0);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightUpperLeg_,
      [0, this.rightUpperLeg_.height / 2],
      this.rightLowerLeg_,
      [0, -this.rightLowerLeg_.height / 2])
      .setLimits(0, Math.PI / 2);
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
      .setLimits(-Math.PI / 2, 0);
  this.game_.physics.p2.createRevoluteConstraint(
      this.rightLowerArm_,
      [-this.rightLowerArm_.width / 2, 0],
      this.rightUpperArm_,
      [this.rightUpperArm_.width / 2, 0])
      .setLimits(0, Math.PI / 2);
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
};

cyberpunks.Climber.prototype.fixCamera_ = function() {
  this.game_.camera.follow(this.upperBody_);
};

cyberpunks.Climber.prototype.moveBodyPartTo_ = function(bodyPart, x, y) {
  bodyPart.body.setZeroVelocity();
  bodyPart.body.x = x;
  bodyPart.body.y = y;
};

cyberpunks.Climber.prototype.createBodyPart_ = function(
    bodyPartName, width, height) {
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
      bodyPartName,
      null,
      texture.baseTexture.source,
      width,
      height,
      1,
      0,
      0);

  // Add the sprite off screen. It will be positioned on screen later.
  return this.game_.add.sprite(-10000, -10000, bodyPartName);
};

/** Sets the state of the given draggable limb, based on a server message. */
cyberpunks.Climber.prototype.setStateFromServer = function(
    draggableLimb, x, y, state) {
  if (this.draggableLimbProperties_[draggableLimb] &&
      this.draggableLimbProperties_[draggableLimb].state ==
      cyberpunks.LimbState.SELF_DRAGGING) {
    // If the player is currently dragging this limb, ignore the server.
    return;
  }
  // Any drag state sent from the server is a drag from another player
  if (state == cyberpunks.LimbState.SELF_DRAGGING) {
    state = cyberpunks.LimbState.OTHER_DRAGGING;
  }
  this.setLimbProperties_(draggableLimb, x, y, state);
};

/** Sets the state of the given draggable limb. */
cyberpunks.Climber.prototype.setLimbProperties_ = function(draggableLimb, x, y, state) {
  this.draggableLimbProperties_[draggableLimb] = {
    limb:draggableLimb,
    state: state,
    x: x,
    y: y
  };
};

cyberpunks.Climber.prototype.randomColor_ = function() {
  var randomValue = Math.floor(Math.random() * 156) + 100;
  return (randomValue << 16) + (randomValue << 8) + randomValue;
};

cyberpunks.Climber.prototype.bodyPartForDraggableLimb_ = function(draggableLimb) {
  switch (draggableLimb) {
    case cyberpunks.DraggableLimb.LEFT_HAND:
      return this.leftHand_;
    case cyberpunks.DraggableLimb.RIGHT_HAND:
      return this.rightHand_;
    case cyberpunks.DraggableLimb.LEFT_FOOT:
      return this.leftFoot_;
    case cyberpunks.DraggableLimb.RIGHT_FOOT:
      return this.rightFoot_;
    default:
      console.error('Unexpected draggable limb: ' + draggableLimb);
      return null;
  }
};

cyberpunks.Climber.prototype.numberOfLimbsHoldingOn_ = function() {
  var counter = 0;
  this.forEachDraggableLimb(limbProperties=>{
    counter += (limbProperties.state === cyberpunks.LimbState.HOLDING);
  })
  return counter;
}

cyberpunks.Climber.isBodyPartAt_ = function(bodyPart, x, y) {
  var mousePosition = {'x': x, 'y': y};
  var collision = game.physics.p2.hitTest(mousePosition, [bodyPart.body]);
  return !!collision.length;
};

cyberpunks.Climber.isBodyPartOnHold_ = function(bodyPart, course) {
  var hitPoints = cyberpunks.Climber.getHitPoints_(bodyPart);
  for (var i = 0; i < hitPoints.length; i++) {
    var hitPoint = hitPoints[i];
    if (course.isPointOnHold(hitPoint[0], hitPoint[1])) {
      return true;
    }
  }
  return false;
};

cyberpunks.Climber.getHitPoints_ = function(bodyPart) {
  var granularity = cyberpunks.Config.CLIMBER_HIT_POINT_GRANULARITY;
  var centerX = bodyPart.x;
  var centerY = bodyPart.y;
  var width = bodyPart.width;
  var height = bodyPart.height;
  var rotationRadians = bodyPart.rotation;

  var dx = width / granularity;
  var dy = height / granularity;
  var testPoints = [];
  for (var ix = 0; ix <= granularity; ix++) {
    for (var iy = 0; iy <= granularity; iy++) {
      testPoints.push([
        centerX - width / 2 + ix * dx,
        centerY - height / 2 + iy * dy
      ]);
    }
  }
  return testPoints.map(point => {
    var sin = Math.sin(rotationRadians);
    var cos = Math.cos(rotationRadians);
    return [
      centerX + (point[0] - centerX) * cos - (point[1] - centerY) * sin,
      centerY + (point[1] - centerY) * cos + (point[0] - centerX) * sin
    ];
  });
}

cyberpunks.Climber.prototype.forEachDraggableLimb = function(callback) {
  for (var draggableLimb in this.draggableLimbProperties_) {
    callback(this.draggableLimbProperties_[draggableLimb],this.bodyPartForDraggableLimb_(draggableLimb));
  }
}