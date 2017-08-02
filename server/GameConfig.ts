
export default class GameConfig {

    static PregameTime:number = 3; // in seconds
    static UpdatesPerSecond:number = 30;
    static MillisecondsPerFrame:number = 1000 / GameConfig.UpdatesPerSecond;
    static SecondsPerFrame:number = GameConfig.MillisecondsPerFrame / 1000;

    static GameWidth:number = 800;
    static GameHeight:number = 600;

    static PaddleWidth:number = 10;
    static PaddleHeight:number = 75;
    static BallSize:number = 5;

    static PaddleSpeed:number = 7;
    static BallSpeed:number = 7;

    static WinningScore:number = 11;
    static PowerSize:number = 20;

    static powers = [
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

