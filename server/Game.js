
var Constants = require('./GameConstants.js');
var Ball = require('./Ball.js');
var uuidV4 = require('uuid/v4');

var Game = function(player1, player2) {

  this.id = uuidV4();

  this.player1 = player1;
  this.player2 = player2;

  this.gameState = Constants.gameStates.GAMESTART;
  this.winner = null;

  this.ball = null;
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
  var middle = Constants.GAME_WIDTH / 2;
  var center = Constants.GAME_HEIGHT / 2;
  this.ball = new Ball(middle, center);

  /* begin */
  this.gameState = Constants.gameStates.PLAYING;
};

Game.prototype.update = function() {

  // Update Ball
  this.ball.update();

  // Update paddles
  this.player1.update();
  this.player2.update();

  if (this.player1.collidesWith(this.ball) || this.player2.collidesWith(this.ball))
    // rebound off paddle
    this.ball.xVelocity *= -1;

  if (this.ball.x > Constants.GAME_WIDTH) {
    // offscreen

    this.player1.score++;
    this.reset();
  }

  if (this.ball.x < 0) {
    // offscreen

    this.player2.score++;
    this.reset();
  }

  if (this.ball.y > Constants.GAME_HEIGHT || this.ball.y < 0)
    // rebound off sides
    this.ball.yVelocity *= -1;
};

Game.prototype.reset = function() {

  // TODO: After a point is scored, reset for next point
  this.ballX = Constants.GAME_WIDTH / 2 - Constants.BALL_SIZE / 2;
  this.ballY = Constants.GAME_HEIGHT / 2 - Constants.BALL_SIZE / 2;
};

Game.prototype.emit = function() {

  // Send only to the players in this game
  var s1 = sockets[this.player1.id];
  var s2 = sockets[this.player2.id];

  if (s1 !== null)
    s1.emit('game', this);

  if (s2 !== null)
    s2.emit('game', this);
};

module.exports = Game;
