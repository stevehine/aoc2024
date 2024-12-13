export class PlutoniumPebbles {

    private _pebbles: Map<string, number> = new Map();

    constructor(input: string) {
        input.split(' ').forEach(value => this._pebbles.set(value, 1));
    }

    public blink(times: number) {
        for (let i = 0; i < times; i++) {
            const newPebbles = new Map<string, number>();

            this._pebbles.forEach((count, id) => {
                const ids = [];
                if (id === "0") {
                    ids.push("1");
                } else if (id.length % 2 === 0) {
                    const splitpoint = id.length / 2;
                    ids.push(...[id.slice(0, splitpoint), parseInt(id.slice(splitpoint)).toString()]);
                } else {
                    ids.push((parseInt(id) * 2024).toString());
                }
                ids.forEach(id => {
                    newPebbles.set(id, newPebbles.has(id) ? count + newPebbles.get(id)! : count);
                })
            });

            this._pebbles = newPebbles;
        }
    }

    public get StoneCount() { return [...this._pebbles].map(pebble => pebble[1]).reduce((p, c) => p + c, 0); }
}