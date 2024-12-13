import { XY } from "./shared/xy";

export class Arcade {
    private _clawMachines: ClawMachine[] = [];

    constructor(data: string[]) {
        for (let i = 0; i < data.length; i += 4) {

            const Xparts = data[i].split(' ')
            const Yparts = data[i + 1].split(' ')
            const Pparts = data[i + 2].split(' ')

            this._clawMachines.push(new ClawMachine(
                new XY(parseInt(Xparts[2].replace("X+", "").replace(",", "")), parseInt(Xparts[3].replace("Y+", ""))),
                new XY(parseInt(Yparts[2].replace("X+", "").replace(",", "")), parseInt(Yparts[3].replace("Y+", ""))),
                new XY(parseInt(Pparts[1].replace("X=", "").replace(",", "")), parseInt(Pparts[2].replace("Y=", "")))
            ));
        }
    }

    public get TokenCount() { return this._clawMachines.map(machine => machine.MinimumCost).reduce((p, c) => p + c, 0); }
    public get TokenCountLongRange() { return this._clawMachines.map(machine => machine.MinimumCostLongRange).reduce((p, c) => p + c, 0); }
}

class ClawMachine {

    private _a: XY;
    private _b: XY;
    private _prize: XY;

    public MinimumCost: number;
    public MinimumCostLongRange: number;

    constructor(A: XY, B: XY, Prize: XY) {
        this._a = A;
        this._b = B;
        this._prize = Prize;

        this.MinimumCost = this.calculateMinimumCostv2(0);
        this.MinimumCostLongRange = this.calculateMinimumCostv2(10000000000000)
    }

    private calculateMinimumCostv2(prizeFactor: number): number {

        const prizeY = this._prize.Y + prizeFactor;
        const prizeX = this._prize.X + prizeFactor;

        const denominator = this._a.Y * this._b.X - this._a.X * this._b.Y;

        if (denominator == 0)
            return 0

        const aPresses = (this._b.X * prizeY - this._b.Y * prizeX) / denominator;
        const bPresses = (this._a.Y * prizeX - this._a.X * prizeY) / denominator;

        if (aPresses % 1 !== 0 || bPresses % 1 !== 0)
            return 0;

        return aPresses * 3 + bPresses;

    }

    private calculateMinimumCostv1(): number {
        let minimumCost = 0;
        for (let i = 0; i <= 100; i++) {
            const x = this._a.X * i;
            const y = this._a.Y * i;

            //console.log(i, x, y);
            if (x > this._prize.X || y > this._prize.Y)
                return minimumCost;

            if ((this._prize.X - x) % this._b.X === 0 && (this._prize.Y - y) % this._b.Y === 0) {
                // Divisible

                const bPresses = (this._prize.X - x) / this._b.X;
                if (bPresses === (this._prize.Y - y) / this._b.Y) {
                    const cost = bPresses + (i * 3);
                    if (minimumCost === 0 || cost < minimumCost)
                        minimumCost = cost;
                }
            }
        }

        return minimumCost;
    }
}