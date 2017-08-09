"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var Power_1 = require("./Power");
var PowerGenrator = (function () {
    function PowerGenrator() {
        this.state = 0 /* Off */;
        this.powers = [];
        this.elapsedTime = 0;
    }
    PowerGenrator.prototype.update = function () {
        if (this.state === 1 /* On */) {
            this.handleTime();
            this.spawn();
            this.updatePowers();
        }
    };
    PowerGenrator.prototype.handleTime = function () {
        this.elapsedTime += GameConfig_1.default.SecondsPerFrame;
    };
    PowerGenrator.prototype.spawn = function () {
        if (this.elapsedTime < 1)
            return;
        this.elapsedTime = 0;
        for (var _i = 0, _a = GameConfig_1.default.powers; _i < _a.length; _i++) {
            var power = _a[_i];
            var rand = Math.random(); // get number between 0 and 1
            if (1 - power.spawnProbability <= rand) {
                // Generate a randrom x,y such that it can only spawn in a rectangle 90% the size of the game width and height
                var minX = GameConfig_1.default.GameWidth * .1;
                var maxX = GameConfig_1.default.GameWidth - minX;
                var minY = GameConfig_1.default.GameHeight * .1;
                var maxY = GameConfig_1.default.GameHeight - minY;
                var x = Math.random() * (maxX - minX) + minX;
                var y = Math.random() * (maxY - minY) + minY;
                var p = new Power_1.default(power.id, x, y, power.name, power.abbr, power.expireTime);
                this.powers.push(p);
            }
        }
    };
    PowerGenrator.prototype.updatePowers = function () {
        for (var _i = 0, _a = this.powers; _i < _a.length; _i++) {
            var power = _a[_i];
            power.update();
        }
    };
    return PowerGenrator;
}());
exports.default = PowerGenrator;
