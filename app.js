
/* importing modules */
var ConnectionHandler = require('./server/ConnectionHandler.js');

sockets = {}; // socket connections to the server
players = {}; // all players
games = {}; // all games being played

/* initialize everything */
ConnectionHandler.initServer(__dirname);
ConnectionHandler.initSocket();

// Server game loop; Call 25 times per second
setInterval(loop, 1000/30);

function loop() {

  // Loop through each game
  for (var i in games) {
      var game = games[i];
      game.update();
      game.emit();
  }
}
