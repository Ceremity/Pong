import GameConfig from "./GameConfig"


import Power from "./Power"

export default class PowerGenrator implements IGameObject {
    
    state:PowerGeneratorStateEnum = PowerGeneratorStateEnum.Off;
    powers:Array<Power> = [];
    elapsedTime:number = 0;
    
    public update() : void {
        if (this.state === PowerGeneratorStateEnum.On) {
            this.handleTime();
            this.spawn();
            this.updatePowers();
        }
    }

    private handleTime() : void {
        this.elapsedTime += GameConfig.SecondsPerFrame;
    }

    private spawn() : void {
        if (this.elapsedTime < 1)
            return;

        this.elapsedTime = 0;

        for (let power of GameConfig.powers) {
            var rand = Math.random(); // get number between 0 and 1

            if (1 - power.spawnProbability <= rand) { // Should we spawn?
                // Generate a randrom x,y such that it can only spawn in a rectangle 90% the size of the game width and height
                var minX = GameConfig.GameWidth * .1;
                var maxX = GameConfig.GameWidth - minX;

                var minY =  GameConfig.GameHeight * .1;
                var maxY =  GameConfig.GameHeight - minY;

                var x = Math.random() * (maxX - minX) + minX;
                var y = Math.random() * (maxY - minY) + minY;

                var p = new Power(power.id, x, y, power.name, power.abbr, power.expireTime);
                this.powers.push(p);
            }
        }
    }

    private updatePowers() : void {
        for (let power of this.powers) {
            power.update();
        }
    }
}