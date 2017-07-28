
var uuidV4 = require('uuid/v4');
var Constants = require('./GameConstants.js');

var Ball = function(x, y) {

  this.id = uuidV4();
  
  this.x = Constants.GAME_WIDTH / 2;
  this.y = Constants.GAME_HEIGHT / 2;

  this.xVelocity = Constants.BALL_SPEED;
  this.yVelocity = Constants.BALL_SPEED;

  this.size = Constants.BALL_SIZE;

  this.hitByPlayerId = null;
};

Ball.prototype.update = function(player1, player2) {

  this.x += this.xVelocity;
  this.y += this.yVelocity;

  if (player1.collidesWith(this)) {

    // rebound off paddle
    this.xVelocity *= -1;
    this.hitByPlayerId = player1.id;
  } else if (player2.collidesWith(this)) {

    // rebound off paddle
    this.xVelocity *= -1;
    this.hitByPlayerId = player2.id;
  }

  if (this.y > Constants.GAME_HEIGHT || this.y < 0) {

    // rebound off sides
    this.yVelocity *= -1;
  }

  if (this.x > Constants.GAME_WIDTH) {
    // offscreen

    this.reset();
    return 1; // right side
  } else if (this.x < 0) {
    // offscreen

    this.reset();
    return -1; // left side
  }

  return 0; // neither
};

Ball.prototype.reset = function() {

  this.x = Constants.GAME_WIDTH / 2;
  this.y = Constants.GAME_HEIGHT / 2;
};

module.exports = Ball;
