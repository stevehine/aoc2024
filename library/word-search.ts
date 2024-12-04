export class WordSearch {
    private readonly _XMASoccurances: number;
    private readonly _CrossMASoccurances: number;

    constructor(lines: string[]) {
        const width = lines[0].length;
        const height = lines.length;

        const generateXMASOptions: (x: number, y: number) => TestPoint[][] = (x, y) => {
            const tests: TestPoint[][] = [];
            tests.push([new TestPoint(x + 1, y, "M"), new TestPoint(x + 2, y, "A"), new TestPoint(x + 3, y, "S")]);
            tests.push([new TestPoint(x - 1, y, "M"), new TestPoint(x - 2, y, "A"), new TestPoint(x - 3, y, "S")]);
            tests.push([new TestPoint(x, y + 1, "M"), new TestPoint(x, y + 2, "A"), new TestPoint(x, y + 3, "S")]);
            tests.push([new TestPoint(x, y - 1, "M"), new TestPoint(x, y - 2, "A"), new TestPoint(x, y - 3, "S")]);
            tests.push([new TestPoint(x + 1, y + 1, "M"), new TestPoint(x + 2, y + 2, "A"), new TestPoint(x + 3, y + 3, "S")]);
            tests.push([new TestPoint(x - 1, y - 1, "M"), new TestPoint(x - 2, y - 2, "A"), new TestPoint(x - 3, y - 3, "S")]);
            tests.push([new TestPoint(x - 1, y + 1, "M"), new TestPoint(x - 2, y + 2, "A"), new TestPoint(x - 3, y + 3, "S")]);
            tests.push([new TestPoint(x + 1, y - 1, "M"), new TestPoint(x + 2, y - 2, "A"), new TestPoint(x + 3, y - 3, "S")]);
            return tests;
        }

        const generateCrossMASOptions: (x: number, y: number) => TestPoint[][] = (x, y) => {
            const tests: TestPoint[][] = [];
            tests.push([new TestPoint(x - 1, y - 1, "M"), new TestPoint(x + 1, y + 1, "S"), new TestPoint(x - 1, y + 1, "M"), new TestPoint(x + 1, y - 1, "S")])
            tests.push([new TestPoint(x - 1, y - 1, "S"), new TestPoint(x + 1, y + 1, "M"), new TestPoint(x - 1, y + 1, "M"), new TestPoint(x + 1, y - 1, "S")])
            tests.push([new TestPoint(x - 1, y - 1, "S"), new TestPoint(x + 1, y + 1, "M"), new TestPoint(x - 1, y + 1, "S"), new TestPoint(x + 1, y - 1, "M")])
            tests.push([new TestPoint(x - 1, y - 1, "M"), new TestPoint(x + 1, y + 1, "S"), new TestPoint(x - 1, y + 1, "S"), new TestPoint(x + 1, y - 1, "M")])
            return tests;
        }

        this._XMASoccurances = lines.map((line, y) =>
            Array.from(line).map((char, x): number =>
                char === 'X' ?
                    generateXMASOptions(x, y).map((testPoints: TestPoint[]) =>
                        testPoints.filter((tp) => tp.X >= 0 && tp.Y >= 0 && tp.X < width && tp.Y < height && tp.C === lines[tp.Y][tp.X]).length
                    ).filter((n: number) => n === 3).length
                    : 0
            ).reduce((p, c) => p + c, 0)
        ).reduce((p, c) => p + c, 0);

        this._CrossMASoccurances = lines.map((line, y) =>
            Array.from(line).map((char, x): number =>
                char === 'A' ?
                    generateCrossMASOptions(x, y).map((testPoints: TestPoint[]) =>
                        testPoints.filter((tp) => tp.X >= 0 && tp.Y >= 0 && tp.X < width && tp.Y < height && tp.C === lines[tp.Y][tp.X]).length
                    ).filter((n: number) => n === 4).length
                    : 0
            ).reduce((p, c) => p + c, 0)
        ).reduce((p, c) => p + c, 0);

    }

    public get XMASOccurances() { return this._XMASoccurances; }
    public get CrossMASOccurances() { return this._CrossMASoccurances; }
}

class TestPoint {
    public X: number;
    public Y: number;
    public C: string;

    constructor(x: number, y: number, c: string) {
        this.X = x;
        this.Y = y;
        this.C = c;
    }
}