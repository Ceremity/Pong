/*
  every second, decide to create a power (what & where) 100%
  track all powers 100%
  remove expired powers 100%
*/

var Constants = require('./GameConstants.js');
var Power = require('./Power.js');

var PowerHandler = function() {

  this.state = 0; // 0 = off, 1 = on; We can turn on and off powers
  this.powers = [];
  this.elapsedTime = 0;
};

// Public
PowerHandler.prototype.update = function() {
  if (state === 1) { // if on
    this.handleTime();
    this.spawn();
    this.updatePowers();
  }
};

PowerHandler.prototype.removePower() = function(power) {
 if (power.state === 2)  { // if expired
    // Remove from powers array
    var index = this.powers.indexOf(power);
    if (index > -1) {
      this.powers.splice(index, 1);
    }
  } 
}

// Private Methods
PowerHandler.prototype.handleTime() = function() {
 this.elapsedTime += Constants.SECONDS_PER_FRAME;
}

PowerHandler.prototype.spawn = function () {

  if (this.elapsedTime < 1) 
    return;

  this.elapsedTime = 0; // reset time and spawn!

  for (var i = 0; i < Constants.POWERS.length; i++) {
    var power = POWERS[i];
    var rand = Math.random(); // get number between 0 and 1
    if (1 - power.spawnProbablity <= rand) { // Should we spawn?

      // Generate a randrom x,y such that it can only spawn in a rectangle 90% the size of the game width and height      
      var minX = Constants.GAME_WIDTH * .1;
      var maxX = Constants.GAME_WIDTH - (Constants.GAME_WIDTH * .1);
      
      var minY =  Constants.GAME_HEIGHT * .1;
      var maxY =  Constants.GAME_HEIGHT - (Constants.GAME_HEIGHT * .1);

      var x = Math.random() * (maxX - minX) + minX;
      var y = Math.random() * (maxY - minY) + minY;

      var p = new Power(x, y, power.name, power.abbr, power.expireTime);
      this.powers.push(p);
    }
  }
}

PowerHandler.prototype.updatePowers() = function() {
  for (var i = 0; i < this.powers; i++) {
    var power = this.powers[i];
    power.update();
  }
}

module.exports = PowerHandler;
