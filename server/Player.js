"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var Player = (function () {
    function Player(id, name) {
        this.score = 0;
        this.width = GameConfig_1.default.PaddleWidth;
        this.height = GameConfig_1.default.PaddleHeight;
        this.speed = GameConfig_1.default.PaddleSpeed;
        this.pressingUp = false;
        this.pressingDown = false;
        this.id = id;
        this.name = name;
    }
    Player.prototype.init = function () {
        this.gameId = this.id;
        this.x = 10;
        this.y = GameConfig_1.default.GameHeight / 2 - GameConfig_1.default.PaddleHeight / 2;
        this.speed = GameConfig_1.default.PaddleSpeed;
    };
    Player.prototype.update = function () {
        if (this.pressingUp) {
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = 0;
            }
        }
        if (this.pressingDown) {
            this.y += this.speed;
            if (this.y + this.height > GameConfig_1.default.GameHeight) {
                this.y = GameConfig_1.default.GameHeight - this.height;
            }
        }
    };
    Player.prototype.collidesWith = function (ball) {
        // TODO: take into account ball size for more accurate collission detection
        // IF ball is above top of paddle and below bottom of paddle
        if (ball.x > this.x && ball.x < this.x + this.width) {
            // The ball is in the same x plane as the paddle
            if (ball.y > this.y && ball.y < this.y + this.height) {
                // The ball is in the same y plane as the paddle so it collides!
                return true;
            }
        }
        return false;
    };
    return Player;
}());
exports.default = Player;
