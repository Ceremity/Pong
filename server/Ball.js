"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = require("uuid/v4");
var GameConfig_1 = require("./GameConfig");
var Ball = (function () {
    function Ball(player1, player2) {
        this.id = v4_1.default();
        this.x = GameConfig_1.default.GameWidth / 2;
        this.y = GameConfig_1.default.GameHeight / 2;
        this.xVelocity = GameConfig_1.default.BallSpeed;
        this.yVelocity = GameConfig_1.default.BallSpeed;
        this.size = GameConfig_1.default.BallSize;
        this.hitByPlayerId = null;
        this.player1 = player1;
        this.player2 = player2;
    }
    Ball.prototype.update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if (this.player1.collidesWith(this)) {
            this.xVelocity *= -1; // Rebound off paddle
            this.hitByPlayerId = this.player1.id;
        }
        if (this.player2.collidesWith(this)) {
            this.xVelocity *= -1; // Rebound off paddle
            this.hitByPlayerId = this.player2.id;
        }
        if (this.y > GameConfig_1.default.GameHeight || this.y < 0) {
            this.yVelocity *= -1; // Rebound off top and bottom
        }
        if (this.x > GameConfig_1.default.GameWidth) {
            // Went off right side of playing field!
            this.reset();
            return 2 /* RightSide */;
        }
        if (this.x < 0) {
            // Went off left side of playing field!
            this.reset();
            return 0 /* LeftSide */;
        }
        return 1 /* Neither */;
    };
    Ball.prototype.reset = function () {
        this.x = GameConfig_1.default.GameWidth / 2;
        this.y = GameConfig_1.default.GameHeight / 2;
        // TODO: Set direction to be aimed more toward middle or random
    };
    return Ball;
}());
exports.default = Ball;
