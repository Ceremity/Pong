"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig = (function () {
    function GameConfig() {
        this.PregameTime = 3; // in seconds
        this.UpdatesPerSecond = 30;
        this.MillisecondsPerFrame = 1000 / this.UpdatesPerSecond;
        this.SecondsPerFrame = this.MillisecondsPerFrame / 1000;
        this.GameWidth = 800;
        this.GameHeight = 600;
        this.PaddleWidth = 10;
        this.PaddleHeight = 75;
        this.BallSize = 5;
        this.PaddleSpeed = 7;
        this.BallSpeed = 7;
        this.WinningScore = 11;
        this.PowerSize = 20;
        this.powers = [
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
    }
    return GameConfig;
}());
exports.default = GameConfig;
;
