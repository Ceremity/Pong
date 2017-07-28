
exports.PREGAME_TIME = 3; // in seconds
exports.UPDATES_PER_SECOND = 30;
exports.SECONDS_PER_FRAME = 1000 / exports.UPDATES_PER_SECOND;

exports.GAME_WIDTH = 800;
exports.GAME_HEIGHT = 600;

exports.PADDLE_WIDTH = 10;
exports.PADDLE_HEIGHT = 75;
exports.BALL_SIZE = 5;

exports.PADDLE_SPEED = 7;
exports.BALL_SPEED = 7;

exports.WINNING_SCORE = 11;

exports.GAME_STATES = Object.freeze( { GAMESTART: 0, PLAYING: 1, GAMEOVER: 2 } );

exports.POWER_SIZE = 10;

// TODO: make this a dictionary, so we may look powers up by key
exports.POWERS = [

  {
    id: 0,
    name: "Ball Speed",
    abbr: "BS",
    expireTime: 0,
    spawnProbability: 0.02,

    params: {

      increaseBy: 1.1,
      decreaseBy: 0.9
    }
  },

  // {
  //   id: 1,
  //   name: "Increased Paddle",
  //   abbr: "IP",
  //   expireTime: 20, // seconds
  //   spawnProbability: 0.01
  //
  // }
];
