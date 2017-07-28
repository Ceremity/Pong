
var ctx;
var socket;

const WIDTH = 800;
const HEIGHT = 600;
const BACKGROUND_COLOR = "#173917";
const BALL_COLOR = "#74C265";
const PADDLE_COLOR = "#74C265";
const TEXT_COLOR = "#74C265";

const POWER_SIZE = 25;

const PREGAME_TIME = 3;
const UPDATES_PER_SECOND = 30;
var POWERS = Object.freeze( { B_SPEED: "BS", P_SPEED: "PS" } );

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

// Touch support
canvas.addEventListener("touchstart", function(e){
    if (e.targetTouches.length == 1) {
        var touch = e.targetTouches[0];
        if (touch.pageY < GAME_HEIGHT / 2) {
            socket.emit('keyPress', { input: 'up', state : true} );
        }
        else {
            socket.emit('keyPress', { input: 'down', state : true} );
        }
    }
}, false);

canvas.addEventListener("touchend", function(e){
    socket.emit('keyPress', { input: 'up', state : false} );
    socket.emit('keyPress', { input: 'down', state : false} );
}, false);

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

  drawText(winner.name + " wins!", WIDTH / 2, HEIGHT / 2, TEXT_COLOR, 100);
}

function drawPre(time) {

  var t = Math.floor(time / UPDATES_PER_SECOND);

  ctx.textAlign = "center";

  drawRect(0, 0, WIDTH, HEIGHT, BACKGROUND_COLOR);
  drawText(PREGAME_TIME - t, WIDTH / 2, HEIGHT / 2, TEXT_COLOR, 200);
}

function drawPlaying(game) {

  ctx.textAlign = "left";

  // Clear screen
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw background
  drawRect(0, 0, WIDTH, HEIGHT, BACKGROUND_COLOR);

  // Draw divider
  drawDivider();

  // Draw balls
  for (var i = 0; i < game.balls.length; i++)
    drawCircle(game.balls[i].x, game.balls[i].y, game.balls[i].size, BALL_COLOR);

  // Draw powers
  for (var i = 0; i < game.powers.length; i++)
    drawPower(game.powers[i])

  // Draw paddles
  drawRect(game.player1.x, game.player1.y, game.player1.width, game.player1.height, PADDLE_COLOR);
  drawRect(game.player2.x, game.player2.y, game.player2.width, game.player2.height, PADDLE_COLOR);

  // Draw names
  drawNames(game.player1.name, game.player2.name);

  // Draw score
  drawScores(game.player1.score, game.player2.score);
}
