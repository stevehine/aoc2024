import { GuardedLab } from "./guarded-lab";

describe("Some tests about guarded labs", () => {
  test("A lab guard should leave after visiting 41 positions", () => {
    const guardedLab = new GuardedLab([
      "....#.....",
      ".........#",
      "..........",
      "..#.......",
      ".......#..",
      "..........",
      ".#..^.....",
      "........#.",
      "#.........",
      "......#...",
    ]);
    expect(guardedLab.VisitedLocations).toBe(41);
    expect(guardedLab.PotentialParadoxes).toBe(6);
  });
});
