import { XY } from "./shared/xy";

export class TopographicMap {
    private readonly _topography = new Map<string, number>;
    private readonly _trailheadScores: number[];
    private readonly _uniqueTrailsByHead: number[] = [];
    constructor(data: string[]) {
        const startPositions: XY[] = []
        data.forEach((line, y) => {
            line.split('').forEach((char, x) => {
                const height = parseInt(char);
                const location = new XY(x, y);
                if (height === 0)
                    startPositions.push(new XY(x, y));
                this._topography.set(location.toString(), height);
            })
        });


        this._trailheadScores = startPositions.map(position => this.walkMap(position, 0)).map(destinations => {
            this._uniqueTrailsByHead.push(destinations.length);
            const uniqueDestinations: string[] = [];
            destinations.forEach(dest => {
                if (!uniqueDestinations.includes(dest.toString()))
                    uniqueDestinations.push(dest.toString())
            });
            return uniqueDestinations.length;
        });

    }

    private walkMap(location: XY, targetHeight: number): XY[] {

        if (this._topography.has(location.toString())) {
            const height = this._topography.get(location.toString());
            if (height === targetHeight) {
                if (height === 9)
                    return [location];

                const { X, Y } = location;

                return [...[new XY(X, Y - 1),
                new XY(X - 1, Y), new XY(X + 1, Y),
                new XY(X, Y + 1)].map(
                    position => this.walkMap(position, height + 1)
                ).flat()]
            }
        }
        return [];
    }

    public get SumOfTrailheads() { return this._trailheadScores.reduce((p, c) => p + c, 0); }
    public get SumOfUniqueTrailsByTrailheads() { return this._uniqueTrailsByHead.reduce((p, c) => p + c, 0); }
}