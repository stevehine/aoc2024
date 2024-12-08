export class XY {
  public X: number;
  public Y: number;

  constructor(x: number, y: number) {
    this.X = x;
    this.Y = y;
  }

  public add(second: XY) {
    return new XY(this.X + second.X, this.Y + second.Y);
  }

  public sub(second: XY) {
    return new XY(this.X - second.X, this.Y - second.Y);
  }

  public normalise() {
    return new XY(this.X, this.Y);
  }

  public toString() {
    return `${this.X},${this.Y}`;
  }
}
