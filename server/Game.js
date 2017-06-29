
// TODO: move constants to another class
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 75;
const BALL_SIZE = 5;
const GAME_PADDLE_SPEED = 7;
const GAME_BALL_SPEED = 7;

var GameStateEnum = Object.freeze({GAMESTART: 0, PLAYING: 1, GAMEOVER: 2});

module.exports = {

  Game: function Game(player1, player2) {

    this.id = "Wooho, I'm an ID!"// uuidV4();

    this.player1 = player1;
    this.player2 = player2;

    this.gameState = GameStateEnum.GAMESTART;
    this.loser = null; // TODO: change to winner

    // TODO: make Ball object
    this.ballX = GAME_WIDTH / 2 - BALL_SIZE / 2;
    this.ballY = GAME_HEIGHT / 2 - BALL_SIZE / 2;

    this.ballSpeedX = GAME_BALL_SPEED;
    this.ballSpeedY = GAME_BALL_SPEED;

    this.ballSize = BALL_SIZE;
  }

  Game.prototype.init = function() {

    console.log('[' + this.id + '] Game created. Player 1: ' + this.player1.name + ' vs. Player 2: ' + this.player2.name);

    // Initialize Player 1
    this.player1.gameId = this.id;
    this.player1.x = 10;
    this.player1.y = GAME_HEIGHT/2 - PADDLE_HEIGHT/2;
    this.player1.paddleSpeed = GAME_PADDLE_SPEED;

    // Initialize Player 2
    this.player2.gameId = this.id;
    this.player2.x = GAME_WIDTH - PADDLE_WIDTH - 10;
    this.player2.y = GAME_HEIGHT/2 - PADDLE_HEIGHT/2;
    this.player2.paddleSpeed = GAME_PADDLE_SPEED;

    // Initialize Ball
    this.ballX = GAME_WIDTH/2 - BALL_SIZE/2;
    this.ballY = GAME_HEIGHT/2 - BALL_SIZE/2;
    this.ballSpeedX = GAME_BALL_SPEED;
    this.ballSpeedY = GAME_BALL_SPEED;
    this.ballSize = BALL_SIZE;

    this.gameState = GameStateEnum.PLAYING;

    this.loser = null;
  };

  Game.prototype.update = function() {

    // Update Ball
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;

    // Update paddles
    this.player1.update();
    this.player2.update();

    // TODO: Collission Detection Paddle
    if (this.player1.collidesWithBall(this.ballX, this.ballY))
      this.ballSpeedX = -this.ballSpeedX;

    if (this.player2.collidesWithBall(this.ballX, this.ballY))
      this.ballSpeedX = -this.ballSpeedX;

    if (this.ballX > GAME_WIDTH) {
      // TODO: see if game is over
      this.player1.score++;
      this.reset();
    }

    if (this.ballX < 0) {
      // TODO: see if game is over
      this.player2.score++;
      this.reset();
    }

    // Collission detection Y
    if (this.ballY > GAME_HEIGHT)
      this.ballSpeedY = -this.ballSpeedY;

    if (this.ballY < 0)
      this.ballSpeedY = -this.ballSpeedY;
  };

  Game.prototype.reset = function() {

    // TODO: After a point is scored, reset for next point
    this.ballX = GAME_WIDTH/2 - BALL_SIZE/2;
    this.ballY = GAME_HEIGHT/2 - BALL_SIZE/2;
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
}
