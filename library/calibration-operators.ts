export class CalibrationOperators {
  private readonly _totalOfValidCalculations: number;
  private _totalOfValidCalculationsWithConcatination: number;

  constructor(data: string[]) {
    const dataSet = data
      .map((line) => line.split(":"))
      .map((parts) => {
        return {
          total: parseInt(parts[0]),
          values: parts[1]
            .trim()
            .split(" ")
            .map((n) => parseInt(n))
            .reverse(),
        };
      });
    this._totalOfValidCalculations = dataSet
      .filter((calc) =>
        this.calculatePossibleValues(calc.values).includes(calc.total),
      )
      .reduce((p, c) => c.total + p, 0);
    this._totalOfValidCalculationsWithConcatination = dataSet
      .filter((calc) =>
        this.calculatePossibleValues(calc.values, true).includes(calc.total),
      )
      .reduce((p, c) => c.total + p, 0);
  }

  private calculatePossibleValues(
    numbers: number[],
    concat: boolean = false,
  ): number[] {
    if (numbers.length === 1) return [numbers[0]];

    return this.calculatePossibleValues(numbers.slice(1), concat)
      .map((value) => [
        value * numbers[0],
        value + numbers[0],
        concat ? parseInt(`${value}${numbers[0]}`) : 0,
      ])
      .flat();
  }
  public get TotalOfValidCalculations() {
    return this._totalOfValidCalculations;
  }
  public get TotalOfValidCalculationsIncludingConcat() {
    return this._totalOfValidCalculationsWithConcatination;
  }
}
