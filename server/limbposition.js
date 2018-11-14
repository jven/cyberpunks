const LimbState = require('./limbstate.js').LimbState;

/** An immutable object representing the state and position of a given limb. */
class LimbPosition {
  constructor() {
    this.state = LimbState.LOOSE;
    this.x = 0;
    this.y = 0;
    // The player who reported this state.
    this.playerNumber = -1;
  }

  reportLoose(playerNumber) {
    if (this.state == LimbState.DRAGGING &&
        playerNumber == this.playerNumber) {
      // Only the player currently dragging a limb can report a loose limb.
      this.state = LimbState.LOOSE;
      this.x = 0;
      this.y = 0;
      this.playerNumber = -1;
    }
  }

  reportHolding(playerNumber, x, y) {
    if (this.state == LimbState.DRAGGING &&
        playerNumber == this.playerNumber) {
      // Only the player currently dragging a limb can report a holding limb.
      this.state = LimbState.HOLDING;
      this.x = x;
      this.y = y;
      this.playerNumber = playerNumber;
    }
  }

  reportDragging(playerNumber, x, y) {
    if (this.state != LimbState.DRAGGING ||
        playerNumber == this.playerNumber) {
      // In order to drag a limb, one of the following must be true:
      //  - The limb isn't already being dragged.
      //  - The player is already dragging this limb.
      this.state = LimbState.DRAGGING;
      this.x = x;
      this.y = y;
      this.playerNumber = playerNumber;
    }
  }

  getDebugDescription() {
    switch (this.state) {
      case LimbState.LOOSE:
        return "LOOSE";
      case LimbState.HOLDING:
        return "HOLDING(" + this.x + ", " + this.y + ")";
      case LimbState.DRAGGING:
        return "DRAGGING(" + this.y + ", " + this.y + ")";
      default:
        return "";
    }
    return "";
  }
}

exports.LimbPosition = LimbPosition;