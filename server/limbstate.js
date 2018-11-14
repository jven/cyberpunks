/**
 * An enumeration of the possible states for a limb.
 * The string values must be kept in sync with the client.
 */
const LimbState = {};
LimbState.LOOSE = 'loose';
LimbState.HOLDING = 'holding';
LimbState.DRAGGING = 'dragging';

exports.LimbState = LimbState;