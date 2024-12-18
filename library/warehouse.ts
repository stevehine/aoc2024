import { XY } from "./shared/xy";

export class Warehouse {
    private readonly _map: Thing[] = [];
    private readonly _bigMap: Thing[] = [];

    constructor(data: string[]) {
        const map = data.filter(line => line.includes('#'));
        const instructions = data.filter(line => !line.includes('#'));

        let robot: XY;
        let bigRobot: XY;

        map.forEach((line, y) => {
            line.split('').forEach((cell, x) => {
                switch (cell) {
                    case "#":
                        this._map.push({ Pos: new XY(x, y), Mobility: Mobility.STATIC });
                        this._bigMap.push({ Pos: new XY(x * 2, y), Mobility: Mobility.STATIC });
                        this._bigMap.push({ Pos: new XY(x * 2 + 1, y), Mobility: Mobility.STATIC });
                        break;
                    case "O":
                        this._map.push({ Pos: new XY(x, y), Mobility: Mobility.MOBILE });
                        this._bigMap.push({ Pos: new XY(x * 2, y), Mobility: Mobility.LEFTMOB });
                        this._bigMap.push({ Pos: new XY(x * 2 + 1, y), Mobility: Mobility.RIGHTMOB });
                        break;
                    case "@":
                        robot = new XY(x, y);
                        bigRobot = new XY(x * 2, y);
                        break;
                    default:
                }
            });
        });

        instructions.forEach((line) => {
            line.split('').forEach((cell) => {
                const theMove = this.getMove(cell);
                if (theMove) {
                    const target = robot.add(theMove);
                    if (this.canMove(target, theMove))
                        robot = target;

                    const bigTarget = bigRobot.add(theMove);
                    if (this.canBigMove(bigTarget, theMove, Mobility.MOBILE)) {
                        this.canBigMove(bigTarget, theMove, Mobility.MOBILE, true);
                        bigRobot = bigTarget;
                    }

                    // console.log(cell);
                    // const visualMap: string[] = [];
                    // map.forEach((mapLine, y) => {
                    //     let line = "";
                    //     mapLine.split('').forEach((_cell, x) => {
                    //         const left = this._bigMap.find(it => it.Pos.X === x * 2 && it.Pos.Y === y);
                    //         if (left?.Mobility === Mobility.STATIC)
                    //             line += "#";
                    //         else if (left?.Mobility === Mobility.RIGHTMOB)
                    //             line += "]";
                    //         else if (left?.Mobility === Mobility.LEFTMOB)
                    //             line += "[";
                    //         else if (bigRobot.X === x * 2 && bigRobot.Y === y)
                    //             line += "@";
                    //         else line += ".";

                    //         const right = this._bigMap.find(it => it.Pos.X === x * 2 + 1 && it.Pos.Y === y);
                    //         if (right?.Mobility === Mobility.STATIC)
                    //             line += "#";
                    //         else if (right?.Mobility === Mobility.RIGHTMOB)
                    //             line += "]";
                    //         else if (right?.Mobility === Mobility.LEFTMOB)
                    //             line += "[";
                    //         else if (bigRobot.X === x * 2 + 1 && bigRobot.Y === y)
                    //             line += "@";
                    //         else line += "."
                    //     });
                    //     visualMap.push(line);

                    // });
                    //console.log(visualMap);
                    // for (let i = 0; i < 1000000000; i++) {
                    //     i = i + 1;
                    // }
                }
            });
        });

    }

    private canBigMove(location: XY, move: XY, sourceMobility: Mobility, doMove = false): boolean {
        const thing = this._bigMap.find(it => it.Pos.equals(location));
        if (thing) {
            if (move.equals(new XY(-1, 0))) {
                //We will contact the right hand side first
                const rightTarget = location.add(move);
                const leftTarget = rightTarget.add(move);
                if (thing.Mobility === Mobility.RIGHTMOB && this.canBigMove(leftTarget, move, Mobility.LEFTMOB, doMove)) {

                    if (doMove) {
                        this._bigMap.find(it => it.Pos.equals(rightTarget))!.Pos = leftTarget;
                        thing.Pos = rightTarget;
                    }
                    return true;

                }
                return false;
            } else if (move.equals(new XY(1, 0))) {
                //We will contact the left hand side first

                const leftTarget = location.add(move);
                const rightTarget = leftTarget.add(move);
                if (thing.Mobility === Mobility.LEFTMOB && this.canBigMove(rightTarget, move, Mobility.RIGHTMOB, doMove)) {

                    if (doMove) {
                        this._bigMap.find(it => it.Pos.equals(leftTarget))!.Pos = rightTarget;
                        thing.Pos = leftTarget;
                    }
                    return true;

                }
                return false;
            } else {
                //Moving up - we might contact either side; and how we handle it depends on whether it's full contact or partial
                if (thing.Mobility === sourceMobility) {
                    //Full face contact; we can process each half independantly
                    const target = location.add(move);
                    if (this.canBigMove(target, move, thing.Mobility, doMove)) {
                        if (doMove) {
                            thing.Pos = target;
                        }
                        return true;
                    }
                    return false;
                } else if (thing.Mobility === Mobility.LEFTMOB) {
                    //Left side contact
                    const leftTarget = location.add(move);
                    const rightTarget = location.add(new XY(1, 0)).add(move);

                    if (this.canBigMove(leftTarget, move, Mobility.LEFTMOB, doMove)
                        && this.canBigMove(rightTarget, move, Mobility.RIGHTMOB, doMove)) {
                        if (doMove) {
                            thing.Pos = leftTarget;
                            this._bigMap.find(it => it.Pos.equals(location.add(new XY(1, 0))))!.Pos = rightTarget;
                        }
                        return true;
                    }
                    return false;
                } else if (thing.Mobility === Mobility.RIGHTMOB) {
                    //right side contact
                    const rightTarget = location.add(move);
                    const leftTarget = location.add(new XY(-1, 0)).add(move);

                    if (this.canBigMove(leftTarget, move, Mobility.LEFTMOB, doMove)
                        && this.canBigMove(rightTarget, move, Mobility.RIGHTMOB, doMove)) {
                        if (doMove) {
                            thing.Pos = rightTarget;
                            this._bigMap.find(it => it.Pos.equals(location.add(new XY(-1, 0))))!.Pos = leftTarget;
                        }
                        return true;
                    }
                    return false;
                }
                return false;
            }
        }
        return true;
    }

    private canMove(location: XY, move: XY) {
        const thing = this._map.find(it => it.Pos.equals(location));
        if (thing) {
            const target = location.add(move);
            if (thing.Mobility === Mobility.MOBILE && this.canMove(target, move)) {
                thing.Pos = target;
                return true;
            } else {
                return false;
            }

        }
        return true;
    }

    private getMove(instruction: string): XY | undefined {
        switch (instruction) {
            case "^": return new XY(0, -1);
            case "<": return new XY(-1, 0);
            case ">": return new XY(1, 0);
            case "v": return new XY(0, 1);
        }
    }

    public get GPSTotal() {
        return this._map.filter(it => it.Mobility === Mobility.MOBILE)
            .map(it => 100 * it.Pos.Y + it.Pos.X).reduce((p, c) => p + c, 0);
    }

    public get BigGPSTotal() {
        return this._bigMap.filter(it => it.Mobility === Mobility.LEFTMOB)
            .map(it => 100 * it.Pos.Y + it.Pos.X).reduce((p, c) => p + c, 0);
    }
}

interface Thing {
    Pos: XY,
    Mobility: Mobility
}

enum Mobility {
    STATIC,
    MOBILE,
    LEFTMOB,
    RIGHTMOB
}