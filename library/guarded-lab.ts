import { XY } from "./shared/xy";

export class GuardedLab {
  private readonly _visited: XY[] = [];
  private readonly _potentialParadoxes: number;
  private readonly _width: number;
  private readonly _height: number;

  constructor(data: string[]) {
    const obstacles: XY[] = [];
    let initialPosition: XY;
    this._width = data[0].length;
    this._height = data.length;
    data.forEach((line, y) => {
      line.split("").forEach((cell, x) => {
        if (cell === "#") obstacles.push(new XY(x, y));
        else if (cell === "^") initialPosition = new XY(x, y);
      });
    });

    //getInitialVisitedList
    this._visited = this.walkPath(initialPosition!, obstacles).visited!;

    this._potentialParadoxes = this._visited
      .filter(
        (location) =>
          location.X != initialPosition.X || location.Y != initialPosition.Y,
      )
      .map((location) =>
        this.walkPath(initialPosition!, [...obstacles, location]),
      )
      .filter((result) => result.paradox).length;
  }

  private walkPath(
    initialPosition: XY,
    obstacles: XY[],
  ): { paradox: boolean; visited: XY[] } {
    let position = initialPosition;
    const visited: XY[] = [];
    const visitedDirection: string[] = [];
    const directions = this.Directions();
    let direction = directions.next().value;
    do {
      const posDirString = `${position.toString()}:${direction.toString()}`;
      if (visitedDirection.includes(posDirString)) {
        return { paradox: true, visited };
      }
      visitedDirection.push(posDirString);
      if (!visited.find((val) => val.X === position.X && val.Y === position.Y))
        visited.push(position);
      let newPosition = position.add(direction);
      while (
        obstacles.find(
          (val) => val.X === newPosition.X && val.Y === newPosition.Y,
        )
      ) {
        direction = directions.next().value;
        newPosition = position.add(direction);
      }

      position = newPosition;
    } while (this.inBounds(position));
    return { paradox: false, visited };
  }

  private inBounds(position: XY) {
    const { X, Y } = position;
    return X >= 0 && Y >= 0 && X < this._width && Y < this._height;
  }

  *Directions(): Iterator<XY> {
    while (true) {
      yield new XY(0, -1);
      yield new XY(1, 0);
      yield new XY(0, 1);
      yield new XY(-1, 0);
    }
  }

  public get VisitedLocations() {
    return this._visited.length;
  }
  public get PotentialParadoxes() {
    return this._potentialParadoxes;
  }
}
