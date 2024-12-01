export class LocationList {
  private _listDistance: number;
  private _similarityScore: number;
  constructor(inputData: string[]) {
    const lists = inputData
      .map((line) => line.split("   "))
      .map((parts) => {
        return { left: parseInt(parts[0]), right: parseInt(parts[1]) };
      });

    const left = lists.map((entry) => entry.left).sort((a, b) => a - b);
    const right = lists.map((entry) => entry.right).sort((a, b) => a - b);

    this._listDistance = left.reduce(
      (p, c, i) => p + Math.abs(c - right[i]),
      0,
    );

    this._similarityScore = left.reduce(
      (p, c) => p + c * right.filter((v) => v === c).length,
      0,
    );
  }

  public get ListDistance() {
    return this._listDistance;
  }
  public get SimilarityScore() {
    return this._similarityScore;
  }
}
