import { ChronospatialComputer } from "./chronospatial-computer";

describe("Some tests about chronospatial computers", () => {
  test("The example program should output 4,6,3,5,6,3,5,2,1,0", () => {
    const chronospatialComputer = new ChronospatialComputer([
      "Register A: 729",
      "Register B: 0",
      "Register C: 0",
      "",
      "Program: 0,1,5,4,3,0",
    ]);
    chronospatialComputer.runToCompletion();
    expect(chronospatialComputer.OutputBuffer).toBe("4,6,3,5,6,3,5,2,1,0");
  });

  test("I should override the example program with 117440 to get a copy of my input program back", () => {
    const chronospatialComputer = new ChronospatialComputer([
      "Register A: 2024",
      "Register B: 0",
      "Register C: 0",
      "",
      "Program: 0,3,5,4,3,0",
    ]);
    chronospatialComputer.hackA(117440);
    const initialMemory = chronospatialComputer.Memory;
    chronospatialComputer.runToCompletion();
    expect(chronospatialComputer.OutputBuffer).toBe(initialMemory);
  });

  test("I should override the example program with 117440 to get a copy of my input program back", () => {
    let foundValue = 0;
    for (let i = 0; i < 117441; i++) {
      const chronospatialComputer = new ChronospatialComputer([
        "Register A: 2024",
        "Register B: 0",
        "Register C: 0",
        "",
        "Program: 0,3,5,4,3,0",
      ]);
      chronospatialComputer.hackA(i);
      const initialMemory = chronospatialComputer.Memory;
      chronospatialComputer.runToCompletion();
      if (initialMemory === chronospatialComputer.OutputBuffer) {
        foundValue = i;
        break;
      }
    }
    expect(foundValue).toBe(117440);
  });
});
