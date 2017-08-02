"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var gc = new GameConfig_1.default();
var Power = (function () {
    function Power(id, x, y, name, abbr, expireTime) {
        this.elapsedTime = 0;
        this.size = gc.PowerSize;
        this.targetPlayers = [];
        this.targetBalls = [];
        this.state = 0 /* Spawned */;
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.abbr = abbr;
        this.expireTime = expireTime;
    }
    Power.prototype.collidesWithBall = function (ball) {
        var dx = this.x - ball.x;
        var dy = this.y - ball.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        return (distance < (this.size + ball.size)); // collision!
    };
    Power.prototype.collidesWithBalls = function (balls) {
        for (var _i = 0, balls_1 = balls; _i < balls_1.length; _i++) {
            var ball = balls_1[_i];
            if (this.collidesWithBall(ball)) {
                if (this.targetBalls.indexOf(ball) === -1) {
                    this.targetBalls.push(ball);
                }
                if (this.targetPlayers.indexOf(ball.hitByPlayerId) === -1) {
                    this.state = 1 /* Activated */;
                    this.targetPlayers.push(ball.hitByPlayerId);
                }
            }
        }
        return (this.targetPlayers.length > 0);
    };
    Power.prototype.update = function () {
        if (this.state === 1 /* Activated */) {
            this.performActivated();
        }
    };
    Power.prototype.performActivated = function () {
        if (this.elapsedTime > this.expireTime) {
            this.state = 2 /* Expired */;
        }
        this.elapsedTime += gc.SecondsPerFrame;
    };
    return Power;
}());
exports.default = Power;
