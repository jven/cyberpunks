const Limb = require('./limb.js').Limb;
const LimbPosition = require('./limbposition.js').LimbPosition;

/** A representation of the climber and the state of each limb. */
class Climber {
  constructor() {
    this.limbPositions_ = {};
    this.limbPositions_[Limb.LEFT_HAND] = new LimbPosition();
    this.limbPositions_[Limb.RIGHT_HAND] = new LimbPosition();
    this.limbPositions_[Limb.LEFT_FOOT] = new LimbPosition();
    this.limbPositions_[Limb.RIGHT_FOOT] = new LimbPosition();
  }

  reportLooseLimb(playerNumber, limb) {
    this.limbPositions_[limb].reportLoose(playerNumber);
  }

  reportHoldingLimb(playerNumber, limb, x, y) {
    this.limbPositions_[limb].reportHolding(playerNumber, x, y);
  }

  reportDraggingLimb(playerNumber, limb, x, y) {
    this.limbPositions_[limb].reportDragging(playerNumber, x, y);
  }

  getDebugDescription() {
    return "{\nLEFT_HAND: " +
      this.limbPositions_[Limb.LEFT_HAND].getDebugDescription() +
      "\nRIGHT_HAND: " +
      this.limbPositions_[Limb.RIGHT_HAND].getDebugDescription() +
      "\nLEFT_FOOT: " +
      this.limbPositions_[Limb.LEFT_FOOT].getDebugDescription() +
      "\nRIGHT_FOOT: " +
      this.limbPositions_[Limb.RIGHT_FOOT].getDebugDescription() +
      "\n}";
  }
}

exports.Climber = Climber;