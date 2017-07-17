
var ctx;
var socket;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const GAME_BACKGROUND_COLOR = "#173917";
const GAME_BALL_COLOR = "#74C265";
const GAME_PADDLE_COLOR = "#74C265";
const GAME_TEXT_COLOR = "#74C265";

const PREGAME_TIME = 3;
const UPDATES_PER_SECOND = 30;

var GameStateEnum = Object.freeze({GAMESTART: 0, PLAYING: 1, GAMEOVER: 2});

window.onload = function() {

  ctx = document.getElementById('ctx').getContext('2d');
  ctx.font = '30px Arial';

  socket = io();
}

function join() {

  var n = document.getElementById('name').value;
  socket.emit('join', { name: n });

  socket.on('game', function(game) {

    draw(game);
  });
}

function draw(game) {

  switch (game.gameState) {

    case GameStateEnum.GAMESTART:
      drawPre(game.countDown);
      break;

    case GameStateEnum.PLAYING:
      drawPlaying(game);
      break;

    case GameStateEnum.GAMEOVER:
      drawPlaying(game);
      drawPost(game.winner);
      break;

    default:
      break;
  }
}

function drawPost(winner) {

  ctx.textAlign = "center";

  drawText(winner.name + " wins!", GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_TEXT_COLOR, 100);
}

function drawPre(time) {

  var t = Math.floor(time / UPDATES_PER_SECOND);
  
  ctx.textAlign = "center";

  drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT, GAME_BACKGROUND_COLOR);
  drawText(PREGAME_TIME - t, GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_TEXT_COLOR, 200);
}

function drawPlaying(game) {

  ctx.textAlign = "left";

  // Clear screen
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Draw background
  drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT, GAME_BACKGROUND_COLOR);

  // Draw divider
  drawDivider();

  // Draw ball
  drawCircle(game.ball.x, game.ball.y, game.ball.size, GAME_BALL_COLOR);

  // Draw paddles
  drawRect(game.player1.x, game.player1.y, game.player1.width, game.player1.height, GAME_PADDLE_COLOR);
  drawRect(game.player2.x, game.player2.y, game.player2.width, game.player2.height, GAME_PADDLE_COLOR);

  // Draw names
  drawNames(game.player1.name, game.player2.name);

  // Draw score
  drawScores(game.player1.score, game.player2.score);
}
