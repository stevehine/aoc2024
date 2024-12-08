import { XY } from "./shared/xy";

export class ResonantColinearity {
  private readonly _uniqueAntiNodeLocations: number;
  private readonly _aignedAntiNodeLocations: number;
  private readonly _width: number;
  private readonly _height: number;
  constructor(data: string[]) {
    this._width = data[0].length;
    this._height = data.length;
    const antennas = new Map<string, XY[]>();
    data.forEach((line, y) => {
      line.split("").forEach((cell, x) => {
        if (cell !== ".") {
          if (!antennas.has(cell)) antennas.set(cell, []);
          antennas.get(cell)?.push(new XY(x, y));
        }
      });
    });

    const nodeLocations: XY[] = [];
    const alignedNodeLocations: XY[] = [];

    antennas.forEach((antennaSet) => {
      antennaSet.forEach((antenna) => {
        antennaSet
          .filter(
            (subAntenna) =>
              !(subAntenna.X === antenna.X && subAntenna.Y === antenna.Y),
          )
          .forEach((subAntenna) => {
            const separation = subAntenna.sub(antenna);
            const newLocation = subAntenna.add(separation);
            if (
              this.inBounds(newLocation) &&
              !nodeLocations.find(
                (location) =>
                  location.X === newLocation.X && location.Y === newLocation.Y,
              )
            )
              nodeLocations.push(newLocation);

            const normalisedSeparation = separation.normalise();
            let oneWay = subAntenna;
            let orTheOther = subAntenna;
            while (this.inBounds(oneWay) || this.inBounds(orTheOther)) {
              oneWay = oneWay.sub(normalisedSeparation);
              orTheOther = orTheOther.sub(normalisedSeparation);
              if (
                this.inBounds(oneWay) &&
                !alignedNodeLocations.find(
                  (location) =>
                    location.X === oneWay.X && location.Y === oneWay.Y,
                )
              )
                alignedNodeLocations.push(oneWay);
              if (
                this.inBounds(orTheOther) &&
                !alignedNodeLocations.find(
                  (location) =>
                    location.X === orTheOther.X && location.Y === orTheOther.Y,
                )
              )
                alignedNodeLocations.push(orTheOther);
            }
          });
      });
    });

    this._uniqueAntiNodeLocations = nodeLocations.length;
    this._aignedAntiNodeLocations = alignedNodeLocations.length;
  }

  private inBounds(position: XY) {
    const { X, Y } = position;
    return X >= 0 && Y >= 0 && X < this._width && Y < this._height;
  }
  public get UniqueAntiNodeLocations() {
    return this._uniqueAntiNodeLocations;
  }
  public get AlignedAntiNodeLocations() {
    return this._aignedAntiNodeLocations;
  }
}
