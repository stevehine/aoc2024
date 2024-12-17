export class ChronospatialComputer {
  private _outputBuffer: number[] = [];

  private _A: number;
  private _B: number;
  private _C: number;

  private _memory: number[] = [];
  private _memorySize: number;
  private _pc = 0;

  constructor(data: string[]) {
    this._A = parseInt(data[0].split(" ")[2]);
    this._B = parseInt(data[1].split(" ")[2]);
    this._C = parseInt(data[2].split(" ")[2]);
    data[4]
      .split(" ")[1]
      .split(",")
      .forEach((entry) => this._memory.push(parseInt(entry)));
    this._memorySize = this._memory.length;
  }

  public hackA(newA: number) {
    this._A = newA;
  }

  public get Memory() {
    return this._memory.map((mem) => mem.toString()).join(",");
  }

  private comboOperand(op: number) {
    switch (op) {
      case 0:
      case 1:
      case 2:
      case 3:
        return op;
      case 4:
        return this._A;
      case 5:
        return this._B;
      case 6:
        return this._C;
      default:
        throw new Error("Invalid operand");
    }
  }

  private executeNextInstruction() {
    const opcode = this._memory[this._pc];
    const operand = this._memory[this._pc + 1];
    const pc = this._pc + 2;
    switch (opcode) {
      case 0:
        this._A = Math.floor(this._A / Math.pow(2, this.comboOperand(operand)));
        return pc;
      case 1:
        this._B = this._B ^ operand;
        return pc;
      case 2:
        this._B = ((this.comboOperand(operand) % 8) + 8) % 8;
        return pc;
      case 3:
        return this._A === 0 ? pc : operand;
      case 4:
        this._B = this._B ^ this._C;
        return pc;
      case 5:
        this._outputBuffer.push(((this.comboOperand(operand) % 8) + 8) % 8);
        return pc;
      case 6:
        this._B = Math.floor(this._A / Math.pow(2, this.comboOperand(operand)));
        return pc;
      case 7:
        this._C = Math.floor(this._A / Math.pow(2, this.comboOperand(operand)));
        return pc;
      default:
        return pc;
    }
  }

  public runToCompletion() {
    do {
      this._pc = this.executeNextInstruction();
    } while (this._pc < this._memorySize);
  }

  public get OutputBuffer() {
    return this._outputBuffer.map((value) => value.toString()).join(",");
  }
}
