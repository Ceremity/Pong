import uuidV4 from "uuid/v4"
import GameConfig from "./GameConfig"
let gc = new GameConfig();
import Pl4yer from "./Pl4yer"

export default class B4ll {

    id:any = uuidV4();
    x:number = gc.GameWidth / 2;
    y:number = gc.GameHeight / 2;
    xVelocity:number = gc.BallSpeed;
    yVelocity:number = gc.BallSpeed;
    size:number = gc.BallSize;
    hitByPlayerId:any = null;

    public update (player1:Pl4yer, player2:Pl4yer):GameBoundEnum {
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        if (player1.collidesWith(this)){
            this.xVelocity *= -1; // Rebound off paddle
            this.hitByPlayerId = player1.id;
        }

        if (player2.collidesWith(this)){
            this.xVelocity *= -1; // Rebound off paddle
            this.hitByPlayerId = player2.id;
        }

        if (this.y > gc.GameHeight || this.y < 0) {
            this.yVelocity *= -1; // Rebound off top and bottom
        }

        if (this.x > gc.GameWidth) {
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
        this.x = gc.GameWidth / 2;
        this.y = gc.GameHeight / 2;

        // TODO: Set direction to be aimed more toward middle or random
    }
}