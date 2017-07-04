
require('../app.js');
var Player = require('./Player.js');
var Game = require('./Game.js');
var Constants = require('./GameConstants.js');

/**
 * Initialize Express server
 */
exports.initServer = function(dir) {

  express = require('express');
  app = express();
  serv = require('http').createServer(app);

  /* what may be requested from server */
  app.get('/', function(req, res) {
      res.sendFile(dir + '/client/index.html');
  });

  app.use('/client', express.static(dir + '/client'));

  serv.listen(3000); // Start server to listen on port 3000 for requests
  console.log('Server listening on port 3000...');
};


/**
 * Initialize Socket.io connections
 */
exports.initSocket = function() {
  var io = require('socket.io')(serv, {});

  io.sockets.on('connection', function(socket) {

      sockets[socket.id] = socket;
      console.log('[' + socket.id + '] Unknown connected.');

      socket.on('join', function(data){
          var player = new Player(socket.id, data.name);
          players[socket.id] = player;

          console.log('[' + socket.id + '] ' + players[socket.id].name + ' joined.');

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

          if (players[socket.id] !== null) {
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

          if (players[socket.id] !== null) {
              var player = players[socket.id];
              if (player.gameId !== null) {
                  // This player was in a game, so we need to let the other player know and give them an auto-win!
                  var game = games[player.gameId];
                  game.gameState = Constants.GAMEOVER;
                  game.loser = player.id;
              }


              // TODO: when a player leaves make sure they are removed from being drawn on screen

              console.log('[' + socket.id + '] ' + player.name + ' disconnected.');
              delete sockets[socket.id];
              delete players[socket.id];
          } else {
              console.log('[' + socket.id + '] Unknown disconnected.');
              delete sockets[socket.id];
          }
      });

  });
};
