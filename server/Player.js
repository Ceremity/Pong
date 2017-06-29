
// TODO: move constants to another class
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 75;
const BALL_SIZE = 5;
const GAME_PADDLE_SPEED = 7;
const GAME_BALL_SPEED = 7;

module.exports = {

  Player: function Player(id, name) {

    this.id = id;
    this.name = name;
    this.gameId = null;

    this.x = 10;
    this.y = 10;

    this.score = 0;

    this.paddleWidth = 10; // PADDLE_WIDTH;
    this.paddleHeight = 75; // PDDLE_HEIGHT;
    this.paddleSpeed = 7; // GAME_PADDLE_SPEED;

    this.pressingUp = false;
    this.pressingDown = false;
  }

  Player.prototype.update = function() {

    if (this.pressingUp) {

      this.y -= this.paddleSpeed;

      if (this.y < 0)
        this.y = 0;
    }

    if (this.pressingDown) {

      this.y += this.paddleSpeed;

      if (this.y + this.paddleHeight > GAME_HEIGHT) {

        this.y = GAME_HEIGHT - this.paddleHeight;
      }
    }
  };

  Player.prototype.collidesWithBall = function() {

    // TODO: take into account ball size for more accurate collission detection
    // IF ball is above top of paddle and below bottom of paddle
    if (ballX > self.x && ballX < self.x +  self.paddleWidth) {

      // The ball is in the same x plane as the paddle
      if (ballY > self.y && ballY < self.y + self.paddleHeight) {
        // The ball is in the same y plane as the paddle so it collides!
        return true;
      }
    }

    return false;
  };
}
