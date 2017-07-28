/*
  every second, decide to create a power (what & where)
  track all powers
  remove expired powers
  check collision with power & activate
  don't create power until a hit
*/

var PowerHandler = function() {

  this.state = 0; // 0 = inactive, 1 = active
};

PowerHandler.prototype.update = function() {



};

module.exports = PowerHandler;
