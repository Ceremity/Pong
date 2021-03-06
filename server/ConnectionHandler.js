
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

  /* Start server to listen on port 3000 for requests */
  var port = process.env.PORT || 3000;
  serv.listen(port);
  console.log('Server listening...');
};


/**
 * Initialize Socket.io connections
 */
exports.initSocket = function() {

  var io = require('socket.io')(serv, {});

  io.sockets.on('connection', function(socket) {

      sockets[socket.id] = socket;
      console.log(`[${socket.id}] Unknown connected.`);

      socket.on('join', function(data) {
        
          var player = new Player(socket.id, data.name);
          players[socket.id] = player;

          console.log(`[${socket.id}] ${player[socket.id].name} joined.`);

          // Check to see if there is another player waiting for a game
          for (var i in players) {
              if (i != socket.id) { // don't want to count the current player as someone looking for a game
                
                  var p = players[i];
                  if (p.gameId === null) {
                      // Found someone looking for a game!
                      var game = new Game(p, player);
                      game.init();
                      games[game.id] = game;
                      break;
                  }
              }
          }

      });

      /* clients will emit a 'keyPress' packet */
      socket.on('keyPress', function(data) {

          if (players[socket.id] != null) {
              var player = players[socket.id];

              if (data.input === 'up') {
                
                  player.pressingUp = data.state;
              }
            
               if (data.input === 'down') {
                 
                  player.pressingDown = data.state;
              }

          }
      });

      /* clients will send a 'disconnect' packet */
      socket.on('disconnect', function(data) {

          if (players[socket.id] != null) {

            var player = players[socket.id];

            if (player != null && player.gameId != null) {
                // This player was in a game, so we need to let the other player know and give them an auto-win!
                var game = games[player.gameId];

                var winner = (player === game.player1) ? game.player2 : game.player1;
                game.end(winner);
            }

            console.log(`[${socket.id}] ${player.name} disconnected.`);
            delete sockets[socket.id];
          } else {
            
            console.log(`[${socket.id}] Unknown disconnected.`);
            delete sockets[socket.id];
          }
      });

  });
};
