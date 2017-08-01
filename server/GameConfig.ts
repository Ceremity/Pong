
export default class GameConfig {

    PregameTime:number = 3; // in seconds
    UpdatesPerSecond:number = 30;
    MillisecondsPerFrame:number = 1000 / this.UpdatesPerSecond;
    SecondsPerFrame:number = this.MillisecondsPerFrame / 1000;

    GameWidth:number = 800;
    GameHeight:number = 600;

    PaddleWidth:number = 10;
    PaddleHeight:number = 75;
    BallSize:number = 5;

    PaddleSpeed:number = 7;
    BallSpeed:number = 7;

    WinningScore:number = 11;
    PowerSize:number = 20;

        powers = [
        {
            id: 0,
            name: "Ball Speed",
            abbr: "BS",
            expireTime: 15, // seconds
            spawnProbability: 1 / 60,

            params: {
                increaseBy: 1.2,
                decreaseBy: 1 / 1.2
            }
        },

        {
            id: 1,
            name: "Increased Paddle",
            abbr: "IP",
            expireTime: 20, // seconds
            spawnProbability: 1 / 60,

                params: {
                    increaseBy: 20,
                    decreaseBy: -20
                }

        },

        {
            id: 2,
            name: "Decreased Paddle",
            abbr: "DP",
            expireTime: 20, // seconds
            spawnProbability: 1 / 60,

                params: {
                    increaseBy: -20,
                    decreaseBy: 20
                }

        }
   ]
};

