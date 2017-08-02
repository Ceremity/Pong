import uuidV4 from "uuid/v4"
import Logger from "./Logger"
import GameConfig from "./GameConfig"
import Ball from "./Ball"
import Power from "./Power"
import PowerGenerator from "./PowerGenerator"
import Player from "./Player"

export default class Game implements IGameObject {
    
    id:any = uuidV4();
    player1:Player;
    player2:Player;
    state:GameStateEnum = GameStateEnum.GameStart;
    countdown:number = 0;
    winner:Player = null;
    powerGenerator:PowerGenerator = new PowerGenerator();
    balls:Array<Ball> = [];

    constructor(player1:Player, player2:Player) {
        this.player1 = player1;
        this.player2 = player2;
    }

    init() : void {
        Logger.log('[' + this.id + '] Game created. Player 1: ' + this.player1.name + ' vs. Player 2: ' + this.player2.name);

        /* initialize players */
        this.player1.init();
        this.player2.init();
        
        /* initialize a new ball */
        this.balls = []; // Clear all balls
        var ball = new Ball(this.player1, this.player2);
        this.balls.push(ball);

        // TODO: Initialize powers again via PowerGenerator
    }

    update() : void {
        switch (this.state) {
            case GameStateEnum.GameStart:
        }
    }
}