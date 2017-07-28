
var Constants = require('./GameConstants.js');

var Power = function(x, y, name, abbr, expireTime) {

  this.name = name;

  this.x = x;
  this.y = y;

  this.elapsedTime = 0; // in UPDATES_PER_SECOND
  this.expireTime = expireTime;

  this.abbr = abbr;

  this.targetPlayerId = null;

  this.state = 0; // 0 = inactive, 1 = active, 2 = expired
};

Power.prototype.update = function() {

  /* keep time */

  switch (this.state) {

    case 0: // if currently inactive
      this.performInactive();
      break;

    case 1: // if currently active
      this.performActive();
      break;

    case 2:
      this.performExpire();
      break;
  }

};

Power.prototype.performInactive = function() {

  if (this.state === 0) { // if currently incative;

    if (this.collidesWithBall(ball)) { // then check to see if collides with ball

      this.state = 1; // so activate this power
      this.targetPlayerId = ball.hitByPlayerId; // and store the player it applies to
    }
  }
};

Power.prototype.performActive = function() {

  if (this.elapsedTime > this.expireTime) { // if expired

    this.state = 2; // set to expired so PowerHandler can delete this
  }

  this.elapsedTime += Constants.SECONDS_PER_FRAME;
};

Power.prototype.performExpire = function() {

};

Power.prototype.collidesWithBall = function(ball) {

  // if ball collides
  // call apply

  return false; // TODO: calculate collision
};

module.exports = Power;
