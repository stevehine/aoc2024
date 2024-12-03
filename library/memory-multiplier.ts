export class MemoryMultiplier {
    private _totalResult: number;
    private _totalResultWithConditionals: number;

    private _regexConditional: RegExp = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g

    constructor(data: string[]) {
        var processInstructions = true;
        const results = data.map(line => {
            var m;
            var runningTotal: number = 0
            var runningTotalConditional: number = 0;
            do {
                m = this._regexConditional.exec(line);
                if (m) {
                    switch (m[0]) {
                        case "do()":
                            processInstructions = true;
                            break;
                        case "don't()":
                            processInstructions = false;
                            break;
                        default:
                            runningTotal += parseInt(m[1]) * parseInt(m[2]);
                            if (processInstructions)
                                runningTotalConditional += parseInt(m[1]) * parseInt(m[2]);

                    }
                }
            } while (m);
            return { runningTotal, runningTotalConditional };
        }).reduce((p, c) => { return { runningTotal: p.runningTotal + c.runningTotal, runningTotalConditional: p.runningTotalConditional + c.runningTotalConditional }; }, { runningTotal: 0, runningTotalConditional: 0 });
        this._totalResult = results.runningTotal;
        this._totalResultWithConditionals = results.runningTotalConditional;
    }

    public get TotalResult() { return this._totalResult; }
    public get TotalResultWithConditionals() { return this._totalResultWithConditionals; }
}