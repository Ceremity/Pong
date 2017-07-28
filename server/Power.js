
var Constants = require('./GameConstants.js');

var Power = function(x, y, name, abbr, expireTime) {

  this.name = name;

  this.x = x;
  this.y = y;

  this.elapsedTime = 0; // in UPDATES_PER_SECOND
  this.expireTime = expireTime;

  this.abbr = abbr;

  this.targetPlayerId = null;
  this.applied = false; // Whether or not the power has been applied to a player yet

  this.state = 0; // 0 = spawned, 1 = activated, 2 = expired
};

Power.prototype.update = function() {

  /* keep time */

  switch (this.state) {

    case 0: 
      this.performSpawned();
      break;

    case 1:
      this.performActivated();
      break;

    case 2:
      this.performExpired();
      break;
  }

};

Power.prototype.performSpawned = function() {

  if (this.state === 0) { // if currently spawned;

    if (this.collidesWithBall(ball)) { // then check to see if collides with ball

      this.state = 1; // so activate this power
      this.targetPlayerId = ball.hitByPlayerId; // and store the player it applies to
    }
  }
};

Power.prototype.performActivated = function() {

  if (this.elapsedTime > this.expireTime) { // if expired

    this.state = 2; // set to expired so PowerHandler can delete this
  }

  this.elapsedTime += Constants.SECONDS_PER_FRAME;
};

Power.prototype.performExpired = function() {

};

Power.prototype.collidesWithBall = function(ball) {

  // if ball collides
  // call apply

  return false; // TODO: calculate collision
};

module.exports = Power;
