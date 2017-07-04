
var Constants = require('./GameConstants.js');

var Ball = function(x, y) {

  this.x = x;
  this.y = y;

  this.xVelocity = Math.random(Constants.BALL_SPEED) + 2;
  this.yVelocity = Math.random(Constants.BALL_SPEED) + 2;

  this.size = Constants.BALL_SIZE;
};

Ball.prototype.update = function() {

  this.x += this.xVelocity;
  this.y += this.yVelocity;
};

module.exports = Ball;
