
var Constants = require('./GameConstants.js');

var Ball = function(x, y) {

  this.x = x;
  this.y = y;

  this.xVelocity = Constants.BALL_SPEED;
  this.yVelocity = Constants.BALL_SPEED;

  this.size = Constants.BALL_SIZE;
};

Ball.prototype.update = function() {

  this.x += this.xVelocity;
  this.y += this.yVelocity;
};

module.exports = Ball;
