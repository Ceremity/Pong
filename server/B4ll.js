"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = require("uuid/v4");
var GameConfig_1 = require("./GameConfig");
var gc = new GameConfig_1.default();
var B4ll = (function () {
    function B4ll() {
        this.id = v4_1.default();
        this.x = gc.GameWidth / 2;
        this.y = gc.GameHeight / 2;
        this.xVelocity = gc.BallSpeed;
        this.yVelocity = gc.BallSpeed;
        this.size = gc.BallSize;
        this.hitByPlayerId = null;
    }
    B4ll.prototype.update = function (player1, player2) {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if (player1.collidesWith(this)) {
            this.xVelocity *= -1; // Rebound off paddle
            this.hitByPlayerId = player1.id;
        }
        if (player2.collidesWith(this)) {
            this.xVelocity *= -1; // Rebound off paddle
            this.hitByPlayerId = player2.id;
        }
        if (this.y > gc.GameHeight || this.y < 0) {
            this.yVelocity *= -1; // Rebound off top and bottom
        }
        if (this.x > gc.GameWidth) {
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
    B4ll.prototype.reset = function () {
        this.x = gc.GameWidth / 2;
        this.y = gc.GameHeight / 2;
        // TODO: Set direction to be aimed more toward middle or random
    };
    return B4ll;
}());
exports.default = B4ll;
