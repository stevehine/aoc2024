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

  public scale(scale: number) {
    return new XY(this.X * scale, this.Y * scale);
  }

  public descale(scale: number) {
    return new XY(Math.floor(this.X / scale), Math.floor(this.Y / scale));
  }

  public mod(mod: XY) {
    return new XY(((this.X % mod.X) + mod.X) % mod.X, ((this.Y % mod.Y) + mod.Y) % mod.Y);
  }

  public equals(that: XY): boolean {
    return this.X === that.X && this.Y === that.Y;
  }

  public toString() {
    return `${this.X},${this.Y}`;
  }
}

export function XYFromString(value: string) {
  const parts = value.split(',');
  return new XY(parseInt(parts[0]), parseInt(parts[1]));
}