
var Constants = require('./GameConstants.js');

var Power = function(x, y, type, game) {

  this.x = x;
  this.y = y;

  this.type = type;

  // this.game = game; I think this is causing errors

  this.time = 0; // in UPDATES_PER_SECOND
};

Power.prototype.update = function() {

  /* keep time */
};

Power.prototype.collidesWith = function(ball) {

  /* maths */
};

Power.prototype.apply = function(lastPaddle) {

  /* apply power based upon last hit */
};

module.exports = Power;
