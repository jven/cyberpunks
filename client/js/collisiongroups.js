/**
 * Contains the collision groups used by the game.
 *
 * See https://github.com/schteppe/p2.js/wiki#collision for more info.
 */
cyberpunks.CollisionGroups = function(game) {
  this.climberGroup_ = game.physics.p2.createCollisionGroup();
  this.holdsGroup_ = game.physics.p2.createCollisionGroup();
};

cyberpunks.CollisionGroups.prototype.getClimberGroup = function() {
  return this.climberGroup_;
};

cyberpunks.CollisionGroups.prototype.getHoldsGroup = function() {
  return this.holdsGroup_;
};