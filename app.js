// Main entry point of server

// Setup express server
var express = require('express');
var app = express();
var serv = require('http').createServer(app);

// Setup what can be requested from server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

// Start server to listen on port 3000 for requests
serv.listen(3000);
console.log('Server listening on port 3000...')

// UUID
const uuidV4 = require('uuid/v4');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 75;
const BALL_SIZE = 5;
const GAME_PADDLE_SPEED = 7;
const GAME_BALL_SPEED = 7;

// Global variables
var sockets = {}; // Keep track of all socket connections to the server
var players = {}; // Keep track of all players
var games = {}; // Keep track of all games being played

// Player Class
var Player = function(id, name){
    var self = {
        id:id, // the playler's socket id
        gameId:null,
        name:name,
        x: 10,
        y: 10,
        score: 0,
        paddleWidth: PADDLE_WIDTH,
        paddleHeight: PADDLE_HEIGHT,
        pressingUp: false,
        pressingDown: false,
        paddleSpeed : GAME_PADDLE_SPEED
    }

    self.update = function() {

        // Update paddle location based on user input

        if (self.pressingUp) {
            self.y -= self.paddleSpeed;

            if (self.y < 0)
                self.y = 0;
        }

        if (self.pressingDown) {
            self.y += self.paddleSpeed;
            
            if (self.y + self.paddleHeight > GAME_HEIGHT) {
                //console.log(self.y + " + " + self.paddleHeight + " > " + GAME_HEIGHT);
                //self.y = GAME_HEIGHT - self.PADDLE_HEIGHT;
                // TODO: Figure out why the line above sets self.y to NaN!! Do not want to keep this hardcoded
                // still figureout

                self.y = 525; 
                //console.log(self.y + " = " + GAME_HEIGHT + " - " + self.paddleHeight)
            }
        }

        self.collidesWithBall = function(ballX, ballY) {
            // TODO: take into account ball size for more accurate collission detection
            // IF ball is above top of paddle and below bottom of paddle
            if (ballX > self.x && 
                ballX < self.x + self.paddleWidth) {

                // The ball is in the same x plane as the paddle
                if (ballY > self.y && 
                    ballY < self.y + self.paddleHeight) {
                    // The ball is in the same y plane as the paddle so collides!
                    return true;
                }
            }

            return false;
        }
    }

    return self;
}

// Game State Enum
var GameStateEnum = Object.freeze({GAMESTART: 0, PLAYING: 1, GAMEOVER: 2});

// Game Class
var Game = function(player1,player2){
    var self = {
        id: uuidV4(),
        player1 : player1,
        player2 : player2,
        ballX : GAME_WIDTH/2 - BALL_SIZE/2,
        ballY : GAME_HEIGHT/2 - BALL_SIZE/2,
        ballSpeedX : GAME_BALL_SPEED,
        ballSpeedY : GAME_BALL_SPEED,
        ballSize : BALL_SIZE,
        gameState : GameStateEnum.GAMESTART,
        loser : null
    }
  

    self.init = function(){

        console.log('[' + self.id + '] Game created. Player 1: ' + self.player1.name + ' vs. Player 2: ' + self.player2.name);

        // Initialize Player 1
        self.player1.gameId = self.id;
        self.player1.x = 10;
        self.player1.y = GAME_HEIGHT/2 - PADDLE_HEIGHT/2;
        self.player1.paddleSpeed = GAME_PADDLE_SPEED;

        // Initialize Player 2
        self.player2.gameId = self.id;
        self.player2.x = GAME_WIDTH - PADDLE_WIDTH - 10;
        self.player2.y = GAME_HEIGHT/2 - PADDLE_HEIGHT/2;
        self.player2.paddleSpeed = GAME_PADDLE_SPEED;

        // Initialize Ball
        self.ballX = GAME_WIDTH/2 - BALL_SIZE/2;
        self.ballY = GAME_HEIGHT/2 - BALL_SIZE/2;
        self.ballSpeedX = GAME_BALL_SPEED;
        self.ballSpeedY = GAME_BALL_SPEED;
        self.ballSize = BALL_SIZE;

        self.gameState = GameStateEnum.PLAYING;

        self.loser = null;
    }

    self.reset = function(){
        // TODO: After a point is scored, reset for next point
        self.ballX = GAME_WIDTH/2 - BALL_SIZE/2;
        self.ballY = GAME_HEIGHT/2 - BALL_SIZE/2;
    }

    self.update = function(){
        
        // Update Ball
        self.ballX += self.ballSpeedX;
        self.ballY += self.ballSpeedY;

        // Update paddles
        self.player1.update();
        self.player2.update();

        // TODO: Collission Detection Paddle
        if (self.player1.collidesWithBall(self.ballX, self.ballY))
            self.ballSpeedX = -self.ballSpeedX;

        if (self.player2.collidesWithBall(self.ballX, self.ballY))
            self.ballSpeedX = -self.ballSpeedX;

        if (self.ballX > GAME_WIDTH) {
            // TODO: see if game is over
            self.player1.score++;
            self.reset();
        }
        
        if (self.ballX < 0) {
            // TODO: see if game is over
            self.player2.score++;
            self.reset();
        }

        // Collission detection Y
        if (self.ballY > GAME_HEIGHT)
            self.ballSpeedY = -self.ballSpeedY;

        if (self.ballY < 0)
            self.ballSpeedY = -self.ballSpeedY;
        
    }

    self.emit = function(){
        // Send only to the players in this game
        var s1 = sockets[self.player1.id];
        var s2 = sockets[self.player2.id];

        if (s1 != null)
            s1.emit('game', self);

        if (s2 != null)
            s2.emit('game', self);
    }

    return self;
}

// Socket.io
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){

    sockets[socket.id] = socket;
    console.log('[' + socket.id + '] Unknown connected.');

    socket.on('join', function(data){
        var player = Player(socket.id, data.name);
        players[socket.id] = player;

        console.log('[' + socket.id + '] ' + players[socket.id].name + ' joined.')
        
        // Check to see if there is another player waiting for a game
        for (var i in players){
            if (i != socket.id){ // don't want to count the current player as someone looking for a game
                var p = players[i];
                if (p.gameId === null){
                    // Found someone looking for a game!
                    var game = new Game(p, player);
                    game.init();
                    games[game.id] = game;
                    break;
                }
            }
        }

    });

    socket.on('keyPress', function(data){
        
        if (players[socket.id] != null){
            var player = players[socket.id];
            
            if (data.input === 'up') {
                player.pressingUp = data.state;
            }
             if (data.input === 'down') {
                player.pressingDown = data.state;
            }
        
        }
    });

    socket.on('disconnect', function(data){

        if (players[socket.id] != null){
            var player = players[socket.id];
            if (player.gameId != null){
                // This player was in a game, so we need to let the other player know and give them an auto-win!
                var game = games[player.gameId];
                game.gameState = GameStateEnum.GAMEOVER;
                game.loser = player.id; 
            }
            

            // TODO: when a player leaves make sure they are removed from being drawn on screen

            
            console.log('[' + socket.id + '] ' + player.name + ' disconnected.')
            delete sockets[socket.id];
            delete players[socket.id];
        }
        else
        {
            console.log('[' + socket.id + '] Unknown disconnected.');
            delete sockets[socket.id];
        }
    });

});

// Server game loop; Call 25 times per second
setInterval(loop, 1000/30);

function loop() {
    
    // Loop through each game
    for (var i in games){
        var game = games[i];
        game.update();
        game.emit();
    }

}