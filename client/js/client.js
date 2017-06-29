
var ctx;
var socket;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const GAME_BACKGROUND_COLOR = "#173917";
const GAME_BALL_COLOR = "#74C265";
const GAME_PADDLE_COLOR = "#74C265";
const GAME_TEXT_COLOR = "#74C265";

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


/* user input */
document.onkeydown = function(event) {

  if (event.keyCode === 38)
      socket.emit('keyPress', { input: 'up', state : true})

  if (event.keyCode === 40)
      socket.emit('keyPress', { input: 'down', state : true})
}

document.onkeyup = function(event) {

  if (event.keyCode === 38)
    socket.emit('keyPress', { input: 'up', state : false})

  if (event.keyCode === 40)
    socket.emit('keyPress', { input: 'down', state : false})
}

function draw(game) {

  switch (game.gameState) {

    case GameStateEnum.GAMESTART:
      break;

    case GameStateEnum.PLAYING:
      drawPlaying(game);
      break;

    case GameStateEnum.GAMEOVER:
      break;

    default:
      break;
  }
}

function drawPlaying(game) {

  // Clear screen
  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  // Draw background
  drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT, GAME_BACKGROUND_COLOR);

  // Draw divider
  drawDivider();

  // Draw ball
  drawCircle(game.ballX, game.ballY, game.ballSize, GAME_BALL_COLOR);

  // Draw paddles
  drawRect(game.player1.x, game.player1.y, game.player1.paddleWidth, game.player1.paddleHeight, GAME_PADDLE_COLOR);
  drawRect(game.player2.x, game.player2.y, game.player2.paddleWidth, game.player2.paddleHeight, GAME_PADDLE_COLOR);

  // Draw names
  drawNames(game.player1.name, game.player2.name);

  // Draw score
  drawScores(game.player1.score, game.player2.score);
}
