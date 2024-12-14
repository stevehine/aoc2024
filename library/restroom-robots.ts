import { XY, XYFromString } from "./shared/xy"

export class RestroomRobots {
    private _robots: Robot[] = [];
    private _size: XY;

    constructor(data: string[], width: number, height: number) {
        this._size = new XY(width, height);
        data.map(line => line.split(' ')).map(parts => {
            return { pos: XYFromString(parts[0].replace("p=", "")), vel: XYFromString(parts[1].replace("v=", "")) }
        }
        ).forEach(robot => this._robots.push(robot));
    }

    public MoveRobots(seconds: number) {
        this._robots.forEach(robot =>
            robot.pos = robot.pos.add(robot.vel.scale(seconds)).mod(this._size)
        )
    }

    public get SafetyFactor() {
        const quadWidth = Math.floor(this._size.X / 2);
        const quadHeight = Math.floor(this._size.Y / 2);

        let factor = 1;

        for (let x = 0; x < 2; x++) {
            const left = x + x * quadWidth;
            const right = x + x * quadWidth + quadWidth - 1;
            for (let y = 0; y < 2; y++) {
                const top = y + y * quadHeight;
                const bottom = y + y * quadHeight + quadHeight - 1;
                factor *= this._robots.filter(robot => robot.pos.X >= left && robot.pos.X <= right && robot.pos.Y >= top && robot.pos.Y <= bottom).length;
            }
        }

        return factor;
    }

    public SearchForTree(maxIterations: number) {
        let i = 1;

        const robotCount = this._robots.length;

        while (true) {
            //console.log(`Searching frame ${i}`);
            this.MoveRobots(1);
            const avgPos = this._robots.map(robot => robot.pos).reduce((p, c) => p.add(c), new XY(0, 0)).descale(robotCount);
            let possibleTree = true;
            for (let x = avgPos.X - 2; x <= avgPos.X + 1; x++) {
                for (let y = avgPos.Y - 2; y <= avgPos.Y + 1; y++) {
                    if (!this._robots.find(robot => robot.pos.X === x && robot.pos.Y === y))
                        possibleTree = false;
                }
            }
            if (possibleTree) {
                console.log(`Suspicion at ${i}`);
                for (let y = 0; y < this._size.Y; y++) {
                    let line = "";
                    for (let x = 0; x < this._size.Y; x++) {
                        if (this._robots.find(robot => robot.pos.X === x && robot.pos.Y === y))
                            line += "#";
                        else
                            line += ".";
                    }
                    console.log(line);
                }
            }
            i++;
            if (i > maxIterations)
                return;
        }
    }
}

interface Robot {
    pos: XY,
    vel: XY
}
