
var Constants = require('./GameConstants.js');

var Player = function(id, name) {

  this.id = id;
  this.name = name;
  this.gameId = null;

  this.x = 10;
  this.y = 10;

  this.score = 0;

  this.width = Constants.PADDLE_WIDTH;
  this.height = Constants.PADDLE_HEIGHT;
  this.speed = Constants.PADDLE_SPEED;

  this.pressingUp = false;
  this.pressingDown = false;
};

Player.prototype.update = function() {

  if (this.pressingUp) {

    this.y -= this.speed;

    if (this.y < 0)
      this.y = 0;
  }

  if (this.pressingDown) {

    this.y += this.speed;
    if (this.y + this.height > Constants.GAME_HEIGHT) {

      this.y = Constants.GAME_HEIGHT - this.height;
    }
  }
};

Player.prototype.collidesWith = function(ball) {

  // TODO: take into account ball size for more accurate collission detection
  // IF ball is above top of paddle and below bottom of paddle
  if (ball.x > this.x && ball.x < this.x +  this.width) {

    // The ball is in the same x plane as the paddle
    if (ball.y > this.y && ball.y < this.y + this.height) {
      // The ball is in the same y plane as the paddle so it collides!
      return true;
    }
  }

  return false;
};

module.exports = Player;
