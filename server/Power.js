
var Constants = require('./GameConstants.js');

var Power = function(id, x, y, name, abbr, expireTime) {

  this.id = id;
  this.name = name;

  this.x = x;
  this.y = y;

  this.elapsedTime = 0; // in UPDATES_PER_SECOND
  this.expireTime = expireTime;

  this.abbr = abbr;

  this.size = Constants.POWER_SIZE;

  this.targetPlayers = [];
  this.targetBalls = [];

  this.state = 0; // 0 = spawned, 1 = activated, 2 = expired
};

Power.prototype.update = function() {

  /* keep time */

  switch (this.state) {

    // case 0:
    //   this.performSpawned();
    //   break;

    case 1:
      this.performActivated();
      break;

    // case 2:
    //   this.performExpired();
    //   break;
  }

};

// Power.prototype.performSpawned = function(ball) {
//
//   if (this.state === 0) { // if currently spawned;
//
//     if (this.collidesWithBall(ball)) { // then check to see if collides with ball
//
//       this.state = 1; // so activate this power
//       this.targetPlayerId = ball.hitByPlayerId; // and store the player it applies to
//     }
//   }
// };

Power.prototype.performActivated = function() {

  if (this.elapsedTime > this.expireTime) { // if expired

    this.state = 2; // set to expired so PowerHandler can delete this
    console.log(this.name + " expired!");
  }

  this.elapsedTime += Constants.SECONDS_PER_FRAME;
};

Power.prototype.performExpired = function() {

};

Power.prototype.collidesWithBall = function(ball) {

  var dx = this.x - ball.x;
  var dy = this.y - ball.y;

  var distance = Math.sqrt(dx * dx + dy * dy);

  return (distance < (this.size + ball.size)); // collision!
};

Power.prototype.collidesWithBalls = function(balls) {

  for (var i in balls) {

    var ball = balls[i];
    if (this.collidesWithBall(ball)) {

      // console.log("collided");

      // console.log("Players: " + this.targetPlayers.length);

      // console.log("balls: " + this.targetBalls.length + "ball Id: " + ball.id + " " + this.targetBalls.indexOf(ball.id));

      if (this.targetBalls.indexOf(ball.id) == -1)  { // don't target the same ball more than once

        this.targetBalls.push(ball.id);
      }

      if (this.targetPlayers.indexOf(ball.hitByPlayerId) == -1)  { // don't target the same player more than once

        this.state = 1; // activate power
        this.targetPlayers.push(ball.hitByPlayerId);
        console.log("power " + this.name + ", id: " + this.id + " activated");
      }
    }
  }

  return (this.targetPlayers.length > 0);
};

module.exports = Power;
