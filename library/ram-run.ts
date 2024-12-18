import { XY } from "./shared/xy";

export class RamRun {

    private readonly _byteShower: XY[];
    private readonly _size: number;
    private _memorySpace: XY[] = [];
    private _shortestPath: number = 0;
    private readonly _anim: boolean;
    constructor(data: string[], size: number, anim = false) {
        this._byteShower = data.map(item => item.split(',')).map(parts => new XY(parseInt(parts[0]), parseInt(parts[1])));
        this._size = size;
        this._anim = anim;
    }

    public calculateShortestPath(): undefined {
        const queue: Move[] = [];

        const visited: XY[] = [];
        const finish = new XY(this._size - 1, this._size - 1);
        queue.push({ location: new XY(0, 0), score: 0 })

        while (queue.length > 0) {
            const move = queue.sort((a, b) => b.score - a.score).pop()!;
            if (visited.find(visit => move.location.equals(visit))
                || this._memorySpace.find(block => move.location.equals(block)))
                continue;

            if (move.location.equals(finish)) {
                this._shortestPath = move.score;
            }

            visited.push(move.location);

            queue.push(...[move.location.add(XY.North), move.location.add(XY.South), move.location.add(XY.West), move.location.add(XY.East)]
                .filter(it => it.X >= 0 && it.Y >= 0 && it.X < this._size && it.Y < this._size)
                .map(it => { return { location: it, score: move.score + 1 }; }));

            if (this._anim) {
                const grid: string[] = [];
                for (let y = 0; y < this._size; y++) {
                    let line = "";
                    for (let x = 0; x < this._size; x++) {
                        if (visited.find(it => it.equals(new XY(x, y))))
                            line += "#";
                        else
                            line += " ";
                    }
                    grid.push(line);
                }
                console.log(grid);
            }

        }
    }

    public dropBytes(count: number) {
        this._memorySpace = this._byteShower.slice(0, count);
    }

    public get ShortestPath() { return this._shortestPath; }
}

interface Move {
    location: XY,
    score: number
}