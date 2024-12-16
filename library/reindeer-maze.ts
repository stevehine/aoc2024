import { XY } from "./shared/xy";

export class ReindeerMaze {
    private _maze: XY[] = [];
    private _uniqueSquares: string[] = [];
    private _bestScore: number = 100000000;
    constructor(data: string[]) {
        let reindeer: Reindeer = { location: new XY(0, 0), direction: XY.East };
        let finish: XY;
        data.forEach((line, y) => {
            line.split('').forEach((cell, x) => {
                switch (cell) {
                    case "#":
                        this._maze.push(new XY(x, y));
                        break;
                    case "S":
                        reindeer = { location: new XY(x, y), direction: XY.East };
                        break;
                    case "E":
                        finish = new XY(x, y);
                        break;
                }
            })
        })

        const visited: Pathstep[] = [];
        const steps: Pathstep[] = [{ reindeer, score: 0, through: [reindeer.location.toString()] }]
        while (steps.length > 0) {
            const step = steps.sort((a, b) => b.score - a.score).pop()!;
            if (!this._maze.find(wall => wall.equals(step.reindeer.location))) {
                //Valid move
                const isVisited = visited.find(visit => visit.reindeer.direction.equals(step.reindeer.direction) && visit.reindeer.location.equals(step.reindeer.location));
                if ((!isVisited || isVisited.score >= step.score) && step.score <= this._bestScore) {
                    if (step.reindeer.location.equals(finish!)) {
                        this._bestScore = step.score;
                        step.through.forEach(via => {
                            if (!this._uniqueSquares.includes(via))
                                this._uniqueSquares.push(via);
                        })
                    }
                    if (isVisited)
                        isVisited.score = step.score
                    else
                        visited.push(step);

                    steps.push(...this.generateNextMoves(step));
                }
            }
        }
        //this._bestScore = visited.filter(visit => visit.reindeer.location.equals(finish)).sort((a, b) => a.score - b.score)[0].score;

    }
    generateNextMoves(step: Pathstep): Pathstep[] {
        const left = step.reindeer.direction.left();
        const right = step.reindeer.direction.right();
        return [
            { reindeer: { location: step.reindeer.location.add(step.reindeer.direction), direction: step.reindeer.direction }, score: step.score + 1, through: [step.reindeer.location.add(step.reindeer.direction).toString(), ...step.through] },
            { reindeer: { location: step.reindeer.location.add(left), direction: left }, score: step.score + 1001, through: [step.reindeer.location.add(left).toString(), ...step.through] },
            { reindeer: { location: step.reindeer.location.add(right), direction: right }, score: step.score + 1001, through: [step.reindeer.location.add(right).toString(), ...step.through] }

        ];
    }
    public get BestScore() { return this._bestScore; }
    public get UniqueSquares() { return this._uniqueSquares.length; }
}

interface Reindeer {
    location: XY,
    direction: XY
}

interface Pathstep {
    reindeer: Reindeer,
    score: number,
    through: string[]
}