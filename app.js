// Main entry point of server

// Setup express server
var express = require('express');
var app = express();
var serv = require('http').createServer(app);

const Player = require('./Player');
const Game = require('./Game');

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

// Game State Enum
var GameStateEnum = Object.freeze({GAMESTART: 0, PLAYING: 1, GAMEOVER: 2});

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
