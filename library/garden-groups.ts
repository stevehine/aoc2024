import { XY } from "./shared/xy";

export class GardenGroups {
    private _gardenGroups: gardenGroup[] = [];

    constructor(data: string[]) {
        data.forEach((line, y) => {
            line.split('').forEach((cell, x) => {
                const existingGroups = this._gardenGroups.filter(group => group.groupCode === cell
                    && (group.locations.find(loc => loc.X === x - 1 && loc.Y === y) ||
                        group.locations.find(loc => loc.X === x + 1 && loc.Y === y) ||
                        group.locations.find(loc => loc.X === x && loc.Y === y - 1) ||
                        group.locations.find(loc => loc.X === x && loc.Y === y + 1)));

                if (existingGroups.length > 0) {
                    existingGroups[0].locations.push(new XY(x, y))
                    if (existingGroups.length > 1) {
                        existingGroups[0].locations.push(...existingGroups[1].locations);
                        existingGroups[1].locations = [];
                    }
                }
                else
                    this._gardenGroups.push({ groupCode: cell, locations: [new XY(x, y)] })
            })

        })



    }

    public get PriceOfFence() {
        return this._gardenGroups.filter(group => group.locations.length > 0).map(group => {
            return group.locations.length * this.calculateFenceLength(group)
        }).reduce((p, c) => p + c);
    }

    public get PriceOfDiscountFence() {
        return this._gardenGroups.filter(group => group.locations.length > 0).map(group => {
            return group.locations.length * this.calculateFenceSides(group)
        }).reduce((p, c) => p + c);
    }

    private calculateFenceLength(group: gardenGroup): number {
        return group.locations.map(loc => 4 - group.locations.filter(sq => ((sq.X === loc.X - 1 && sq.Y === loc.Y) || (sq.X === loc.X + 1 && sq.Y === loc.Y) || (sq.X === loc.X && sq.Y === loc.Y - 1) || (sq.X === loc.X && sq.Y === loc.Y + 1))).length).reduce((p, c) => p + c)
    }

    private calculateFenceSides(group: gardenGroup): number {
        const locationsAsStrings = group.locations.map(loc => loc.toString());
        const tops = group.locations.filter(location => !locationsAsStrings.includes(location.add(new XY(0, -1)).toString()));
        const bottoms = group.locations.filter(location => !locationsAsStrings.includes(location.add(new XY(0, 1)).toString()));
        const lefts = group.locations.filter(location => !locationsAsStrings.includes(location.add(new XY(-1, 0)).toString()));
        const rights = group.locations.filter(location => !locationsAsStrings.includes(location.add(new XY(1, 0)).toString()));


        const topSet = [...new Set(tops.map(top => top.Y))];
        const bottomSet = [...new Set(bottoms.map(top => top.Y))];
        const leftSet = [...new Set(lefts.map(top => top.X))];
        const rightSet = [...new Set(rights.map(top => top.X))];
        let uniques = topSet.length + bottomSet.length + leftSet.length + rightSet.length;

        topSet.forEach(y => {
            tops.filter(entry => entry.Y === y).map(entry => entry.X).sort((a, b) => a - b).reduce((p, c) => { if (c - p !== 1) { uniques++; } return c; });
        })
        bottomSet.forEach(y => {
            bottoms.filter(entry => entry.Y === y).map(entry => entry.X).sort((a, b) => a - b).reduce((p, c) => { if (c - p !== 1) { uniques++; } return c; });
        })
        leftSet.forEach(x => {
            lefts.filter(entry => entry.X === x).map(entry => entry.Y).sort((a, b) => a - b).reduce((p, c) => { if (c - p !== 1) { uniques++; } return c; });
        })
        rightSet.forEach(x => {
            rights.filter(entry => entry.X === x).map(entry => entry.Y).sort((a, b) => a - b).reduce((p, c) => { if (c - p !== 1) { uniques++; } return c; });
        })

        return uniques;
    }
}



interface gardenGroup {
    groupCode: string,
    locations: XY[]
}