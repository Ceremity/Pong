"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = require("uuid/v4");
var Logger_1 = require("./Logger");
var Ball_1 = require("./Ball");
var PowerGenerator_1 = require("./PowerGenerator");
var Game = (function () {
    function Game(player1, player2) {
        this.id = v4_1.default();
        this.state = 0 /* GameStart */;
        this.countdown = 0;
        this.winner = null;
        this.powerGenerator = new PowerGenerator_1.default();
        this.balls = [];
        this.player1 = player1;
        this.player2 = player2;
    }
    Game.prototype.init = function () {
        Logger_1.default.log('[' + this.id + '] Game created. Player 1: ' + this.player1.name + ' vs. Player 2: ' + this.player2.name);
        /* initialize players */
        this.player1.init();
        this.player2.init();
        /* initialize a new ball */
        this.balls = []; // Clear all balls
        var ball = new Ball_1.default(this.player1, this.player2);
        this.balls.push(ball);
        // TODO: Initialize powers again via PowerGenerator
    };
    Game.prototype.update = function () {
        switch (this.state) {
            case 0 /* GameStart */:
        }
    };
    return Game;
}());
exports.default = Game;
