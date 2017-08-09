
import GameConfig from "./GameConfig"
import Ball from "./Ball"

export default class Player implements IGameObject {
    id:any;
    name:string;
    gameId:string;

    x:number;
    y:number;
    score:number = 0;

    width:number = GameConfig.PaddleWidth;
    height:number = GameConfig.PaddleHeight;
    speed:number = GameConfig.PaddleSpeed;

    pressingUp:boolean = false;
    pressingDown: boolean = false;

		constructor(id:number, name:string) {

			this.id = id;
			this.name = name;
		}

    public init(): void {
        this.gameId = this.id;
        this.x = 10;
        this.y = GameConfig.GameHeight / 2 - GameConfig.PaddleHeight / 2;
        this.speed = GameConfig.PaddleSpeed;
    }

    public update(): void {
        if (this.pressingUp) {
            this.y -= this.speed;

            if (this.y < 0) {
                this.y = 0;
            }
        }

          if (this.pressingDown) {
            this.y += this.speed;

            if (this.y + this.height > GameConfig.GameHeight) {
                this.y = GameConfig.GameHeight - this.height;
            }
        }
    }

    public collidesWith(ball: Ball):boolean {
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
    }
}
