
exports.PREGAME_TIME = 3; // in seconds
exports.UPDATES_PER_SECOND = 30;
exports.MILLISECONDS_PER_FRAME = (1000 / exports.UPDATES_PER_SECOND);
exports.SECONDS_PER_FRAME = exports.MILLISECONDS_PER_FRAME / 1000;

exports.GAME_WIDTH = 800;
exports.GAME_HEIGHT = 600;

exports.PADDLE_WIDTH = 10;
exports.PADDLE_HEIGHT = 75;
exports.BALL_SIZE = 5;

exports.PADDLE_SPEED = 7;
exports.BALL_SPEED = 7;

exports.WINNING_SCORE = 11;

exports.GAME_STATES = Object.freeze( { GAMESTART: 0, PLAYING: 1, GAMEOVER: 2 } );

exports.POWER_SIZE = 20;

// TODO: make this a dictionary, so we may look powers up by key
exports.POWERS = [

  {
    id: 0,
    name: "Ball Speed",
    abbr: "BS",
    expireTime: 15, // seconds
    spawnProbability: 1 / 60,

    params: {

      increaseBy: 1.2,
      decreaseBy: 1 / 1.2
    }
  },

  {
    id: 1,
    name: "Increased Paddle",
    abbr: "IP",
    expireTime: 20, // seconds
    spawnProbability: 30 / 60,

		params: {

			increaseBy: -200,
			decreaseBy: 200
		}

  }
];
