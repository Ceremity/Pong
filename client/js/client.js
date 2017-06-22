var ctx = document.getElementById('ctx').getContext('2d');

var socket = io();

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const GAME_BACKGROUND_COLOR = "#173917";
const GAME_BALL_COLOR = "#74C265";
const GAME_PADDLE_COLOR = "#74C265";
const GAME_TEXT_COLOR = "#74C265";
var GameStateEnum = Object.freeze({GAMESTART: 0, PLAYING: 1, GAMEOVER: 2});

window.onload = function(){
    //draw();
}

function join(){
    socket.emit('join', { name: document.getElementById('name').value });
}

socket.on('game', function(game){
   draw(game); 
});

// User input
document.onkeydown = function(event){
    if (event.keyCode === 38) 
        socket.emit('keyPress', { input: 'up', state : true} )
     if (event.keyCode === 40) 
        socket.emit('keyPress', { input: 'down', state : true} )
}
document.onkeyup = function(event){
    if (event.keyCode === 38) 
        socket.emit('keyPress', { input: 'up', state : false} )
     if (event.keyCode === 40) 
        socket.emit('keyPress', { input: 'down', state : false} )
}

function draw(game) {
    switch (game.gameState) {
        case GameStateEnum.GAMESTART: break;
        case GameStateEnum.PLAYING: drawPlaying(game); break;
        case GameStateEnum.GAMEOVER: break;
        default: break;
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

function drawDivider(){
    ctx.strokeStyle = GAME_TEXT_COLOR;
    var lineHeight = 20;
    for (var y=lineHeight/2; y < GAME_HEIGHT; y = y + lineHeight*2){
        ctx.beginPath();
        ctx.moveTo(GAME_WIDTH / 2, y);
        ctx.lineTo(GAME_WIDTH / 2, y + lineHeight);
        ctx.stroke();
    }
 
}

function drawNames(player1Name, player2Name) {
    drawText(player1Name, 10, 25, GAME_TEXT_COLOR, 20, 100);
    drawText(player2Name, GAME_WIDTH - 100, 25, GAME_TEXT_COLOR, 20, 100);
}

function drawScores(player1Score, player2Score) {
    drawText(player1Score, GAME_WIDTH/2 - 70, 40, GAME_TEXT_COLOR, 40, 100);
    drawText(player2Score, GAME_WIDTH/2 + 50, 40, GAME_TEXT_COLOR, 40, 100);
}

function drawText(text, x, y, textColor, fontSize, maxWidth) {

    ctx.fillStyle = textColor;
    if (fontSize === undefined) {
        fontSize = 12;
    }
    ctx.font = fontSize + "px Arial";
    if (maxWidth === undefined) {
        ctx.fillText(text, x, y);
    }
    else {
        ctx.fillText(text, x, y, maxWidth);
    }

}

function drawRect(x, y, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
}

function drawCircle(x, y, size, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,size, 0, Math.PI*2, true);
    ctx.fill();
}