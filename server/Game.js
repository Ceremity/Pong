
var Constants = require('./GameConstants.js');
var Ball = require('./Ball.js');
var Power = require('./Power.js');
var uuidV4 = require('uuid/v4');
var PowerGenerator = require('./PowerGenerator.js');

var Game = function(player1, player2) {

  this.id = uuidV4();

  this.player1 = player1;
  this.player2 = player2;

  this.gameState = Constants.GAME_STATES.GAMESTART;
  this.countDown = 0;
  this.winner = null;

  this.powerGenerator = new PowerGenerator();

  this.balls = {};
};

Game.prototype.init = function() {

  console.log('[' + this.id + '] Game created. Player 1: ' + this.player1.name + ' vs. Player 2: ' + this.player2.name);

  /* initialize player1 */
  this.player1.gameId = this.id;
  this.player1.x = 10;
  this.player1.y = Constants.GAME_HEIGHT / 2 - Constants.PADDLE_HEIGHT / 2;
  this.player1.paddleSpeed = Constants.GAME_PADDLE_SPEED;

  /* initialize player2 */
  this.player2.gameId = this.id;
  this.player2.x = Constants.GAME_WIDTH - Constants.PADDLE_WIDTH - 10;
  this.player2.y = Constants.GAME_HEIGHT / 2 - Constants.PADDLE_HEIGHT / 2;
  this.player2.paddleSpeed = Constants.GAME_PADDLE_SPEED;

  /* initialize ball */
  var ball = new Ball();
  this.balls[ball.id] = ball;
};

Game.prototype.update = function() {

  switch (this.gameState) {

    case (Constants.GAME_STATES.GAMESTART):
      if (++this.countDown >= Constants.PREGAME_TIME * Constants.UPDATES_PER_SECOND)
        this.gameState = Constants.GAME_STATES.PLAYING;

        this.powerGenerator.state = 1; // Turn the power handler ON
      break;

    case (Constants.GAME_STATES.PLAYING):

      // Update paddles
      this.player1.update();
      this.player2.update();

      this.powerGenerator.update();

      // Apply powers
      this.handlePowers();

      // if (Math.random() < 0.001) {

      //   var x = Math.random() * Constants.GAME_WIDTH;
      //   var y = Math.random() * Constants.GAME_HEIGHT;

      //   var p = new Power(x, y, Constants.POWERS.B_SPEED, this);

      //   this.powers.push(p);
      //   console.log(p);
      // }

      // Update Balls
      for (var i in this.balls) {

        var side = this.balls[i].update(this.player1, this.player2);

        if (side > 0) {

          if (++this.player1.score >= Constants.WINNING_SCORE)
          this.end(this.player1);
        } else if (side < 0) {

          if (++this.player2.score >= Constants.WINNING_SCORE)
          this.end(this.player2);
        }

      }
      break;

    case (Constants.GAME_STATES.GAMEOVER):
      /* not much is needed here, for now */
      break;

    default:
      console.log("Invalid gamestate");
      break;
  }

};

Game.prototype.handlePowers = function() {
  // This will handle applying the activated powers and also removing the power effect when copmlete
  for (var i = 0; i < this.powerGenerator.powers.length; i++) {
    var power = this.powerGenerator.powers[i];

    if (power.state === 0) {
      // TODO: Check to see if a ball has collided with the power
      // ... and if so, activate the power and set the targetPlayerId

      if (power.collidesWithBalls(this.balls)) {
        // TODO: Need to apply this newly activated power!

        this.applyPower(power, true);
      }

    }

    if (power.state === 2) { // 2 == expired power
      // TODO: Need to remove this power off the player

      // and then delete the power
      this.applyPower(power, false);
      this.powerGenerator.removePower(power);
    }
  }
}

// TODO: rename this method to something better
Game.prototype.applyPower = function(power, applying) {

  switch (power.id) {

    case 0: // Ball Speed

      for (var i = 0; i < power.targetBalls.length; i++) {

        // TODO: try changing power.targetBalls to a dictionary
        // (storing ball as reference instead of the id)
        var ball = this.balls[power.targetBalls[i]];

        if (applying) {

          ball.xVelocity *= Constants.POWERS[power.id].params.increaseBy;
          ball.yVelocity *= Constants.POWERS[power.id].params.increaseBy;

          console.log("Increased " + power.name + " to " + ball.xVelocity + ", " + ball.yVelocity);
        } else {

          ball.xVelocity *= Constants.POWERS[power.id].params.decreaseBy;
          ball.yVelocity *= Constants.POWERS[power.id].params.decreaseBy;
          console.log("Decreased " + power.name + " to " + ball.xVelocity + ", " + ball.yVelocity);
        }
      }
      break;

    case 1: // Increased Paddle

      break;

    default:
      console.log("Unimplemented power: " + power.name + ", id: " + power.id);
      break;
  }

};

Game.prototype.end = function(winner) {

  this.winner = winner;
  this.gameState = Constants.GAME_STATES.GAMEOVER;
};

Game.prototype.emit = function() {

  // Send only to the players in this game
  var s1 = sockets[this.player1.id];
  var s2 = sockets[this.player2.id];

  if (s1 != null)
    s1.emit('game', this);

  if (s2 != null)
    s2.emit('game', this);
};

module.exports = Game;
