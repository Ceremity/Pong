
var Constants = require('./GameConstants.js');
var Ball = require('./Ball.js');
var Power = require('./Power.js');
var uuidV4 = require('uuid/v4');

var Game = function(player1, player2) {

  this.id = uuidV4();

  this.player1 = player1;
  this.player2 = player2;

  this.gameState = Constants.GAME_STATES.GAMESTART;
  this.countDown = 0;
  this.winner = null;

  this.powers = [];

  this.balls = [];
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
  this.balls.push(new Ball());
};

Game.prototype.update = function() {

  switch (this.gameState) {

    case (Constants.GAME_STATES.GAMESTART):
      if (++this.countDown >= Constants.PREGAME_TIME * Constants.UPDATES_PER_SECOND)
        this.gameState = Constants.GAME_STATES.PLAYING;
      break;

    case (Constants.GAME_STATES.PLAYING):

      // Update paddles
      this.player1.update();
      this.player2.update();

      if (Math.random() < 0.001) {

        var x = Math.random() * Constants.GAME_WIDTH;
        var y = Math.random() * Constants.GAME_HEIGHT;

        var p = new Power(x, y, Constants.POWERS.B_SPEED, this);

        this.powers.push(p);
        console.log(p);
      }

      // Update Balls
      for (var i = 0; i < this.balls.length; i++) {

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
