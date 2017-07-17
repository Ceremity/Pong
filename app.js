
/* importing modules */
var ConnectionHandler = require('./server/ConnectionHandler.js');
var Constants = require('./server/GameConstants.js');

sockets = {}; // socket connections to the server
players = {}; // all players
games = {}; // all games being played

/* initialize everything */
ConnectionHandler.initServer(__dirname);
ConnectionHandler.initSocket();

// Server game loop; Call 30 times per second
var interval = 1000 / Constants.UPDATES_PER_SECOND;
setInterval(loop, interval);

function loop() {

  // Loop through each game
  for (var i in games) {
    var game = games[i];
    game.update();
    game.emit();

    // clear from hashmaps
    if (game.gameState === Constants.GAME_STATES.GAMEOVER) {

      delete players[game.player1.id];
      delete players[game.player2.id];
      delete games[game.id];
    }
  }
}
