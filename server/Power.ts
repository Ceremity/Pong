import GameConfig from "./GameConfig"
import Ball from "./Ball"

export default class Power implements IGameObject {
    id:number;
    name:string;
    abbr:string;

    x:number;
    y:number;
    
    elapsedTime:number = 0;
    expireTime:number;

    size:number = GameConfig.PowerSize;

    targetPlayers = [];
    targetBalls:Array<Ball> = [];

    state:PowerStateEnum = PowerStateEnum.Spawned;

    constructor(id:number, x:number, y:number, name:string, abbr:string, expireTime:number){
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.abbr = abbr;
        this.expireTime = expireTime;
    }

    private collidesWithBall(ball:Ball):boolean {
        var dx = this.x - ball.x;
        var dy = this.y - ball.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        return (distance < (this.size + ball.size)); // collision!
    }

    public collidesWithBalls(balls:Array<Ball>):boolean {
        for (let ball of balls) {
            if (this.collidesWithBall(ball)) {
                if (this.targetBalls.indexOf(ball) === -1) {
                    this.targetBalls.push(ball);
                }

                if (this.targetPlayers.indexOf(ball.hitByPlayerId) === -1) {
                    this.state = PowerStateEnum.Activated;
                    this.targetPlayers.push(ball.hitByPlayerId);
                }
            }
        }

        return (this.targetPlayers.length > 0);
    }

    public update():void {
        if (this.state === PowerStateEnum.Activated) {
            this.performActivated();
        }
    }

    private performActivated():void {
        if (this.elapsedTime > this.expireTime) {
            this.state = PowerStateEnum.Expired;
        }

        this.elapsedTime += GameConfig.SecondsPerFrame;
    }
}