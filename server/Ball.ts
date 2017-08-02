import uuidV4 from "uuid/v4"
import GameConfig from "./GameConfig"
import Player from "./Player"

export default class Ball implements IGameObject {

    id:any = uuidV4();
    x:number = GameConfig.GameWidth / 2;
    y:number = GameConfig.GameHeight / 2;
    xVelocity:number = GameConfig.BallSpeed;
    yVelocity:number = GameConfig.BallSpeed;
    size:number = GameConfig.BallSize;
    hitByPlayerId:any = null;
    player1:Player;
    player2:Player;

    constructor(player1:Player, player2:Player){
        this.player1 = player1;
        this.player2 = player2;
    }

    public update ():GameBoundEnum { // TODO: check this works as this did pass these in as params before
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        if (this.player1.collidesWith(this)){
            this.xVelocity *= -1; // Rebound off paddle
            this.hitByPlayerId = this.player1.id;
        }

        if (this.player2.collidesWith(this)){
            this.xVelocity *= -1; // Rebound off paddle
            this.hitByPlayerId = this.player2.id;
        }

        if (this.y > GameConfig.GameHeight || this.y < 0) {
            this.yVelocity *= -1; // Rebound off top and bottom
        }

        if (this.x > GameConfig.GameWidth) {
            // Went off right side of playing field!
            this.reset();
            return GameBoundEnum.RightSide;
        }

        if (this.x < 0) {
            // Went off left side of playing field!
            this.reset();
            return GameBoundEnum.LeftSide;
        }

        return GameBoundEnum.Neither;
    }

    private reset():void {
        this.x = GameConfig.GameWidth / 2;
        this.y = GameConfig.GameHeight / 2;

        // TODO: Set direction to be aimed more toward middle or random
    }
}