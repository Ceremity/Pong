
import GameConfig from "./GameConfig"
let gc = new GameConfig();

import B4ll from "./B4ll"

export default class Pl4yer {
    id:any;
    name:string;
    gameid:string;

    x:number;
    y:number;
    score:number = 0;

    width:number = gc.PaddleWidth;
    height:number = gc.PaddleHeight;
    speed:number = gc.PaddleSpeed;

    pressingUp:boolean = false;
    pressingDown: boolean = false;

    public update(): void{
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
    }

    public collidesWith(ball: B4ll):boolean {
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
