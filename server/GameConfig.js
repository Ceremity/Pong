"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig = (function () {
    function GameConfig() {
    }
    return GameConfig;
}());
GameConfig.PregameTime = 3; // in seconds
GameConfig.UpdatesPerSecond = 30;
GameConfig.MillisecondsPerFrame = 1000 / GameConfig.UpdatesPerSecond;
GameConfig.SecondsPerFrame = GameConfig.MillisecondsPerFrame / 1000;
GameConfig.GameWidth = 800;
GameConfig.GameHeight = 600;
GameConfig.PaddleWidth = 10;
GameConfig.PaddleHeight = 75;
GameConfig.BallSize = 5;
GameConfig.PaddleSpeed = 7;
GameConfig.BallSpeed = 7;
GameConfig.WinningScore = 11;
GameConfig.PowerSize = 20;
GameConfig.powers = [
    {
        id: 0,
        name: "Ball Speed",
        abbr: "BS",
        expireTime: 15,
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
        expireTime: 20,
        spawnProbability: 1 / 60,
        params: {
            increaseBy: 20,
            decreaseBy: -20
        }
    },
    {
        id: 2,
        name: "Decreased Paddle",
        abbr: "DP",
        expireTime: 20,
        spawnProbability: 1 / 60,
        params: {
            increaseBy: -20,
            decreaseBy: 20
        }
    }
];
exports.default = GameConfig;
;
