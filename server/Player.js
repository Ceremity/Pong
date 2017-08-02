"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var gc = new GameConfig_1.default();
var Player = (function () {
    function Player() {
        this.score = 0;
        this.width = gc.PaddleWidth;
        this.height = gc.PaddleHeight;
        this.speed = gc.PaddleSpeed;
        this.pressingUp = false;
        this.pressingDown = false;
    }
    Player.prototype.update = function () {
        if (this.pressingUp) {
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = 0;
            }
        }
        if (this.pressingDown) {
            this.y += this.speed;
            if (this.y + this.height > gc.GameHeight) {
                this.y = gc.GameHeight - this.height;
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
