import { ResonantColinearity } from "./resonant-colinearity";

describe("Some tests about resonant colinearity", () => {
  test("An example layout has 14 antinodes", () => {
    const resonantColinearity = new ResonantColinearity([
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ]);
    expect(resonantColinearity.UniqueAntiNodeLocations).toBe(14);
    expect(resonantColinearity.AlignedAntiNodeLocations).toBe(34);
  });
});
