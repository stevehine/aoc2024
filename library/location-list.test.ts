import { LocationList } from "./location-list";

describe("Some tests about location lists", () => {
  test("A simple example should have a total list distance of 11", () => {
    const locationList = new LocationList([
      "3   4",
      "4   3",
      "2   5",
      "1   3",
      "3   9",
      "3   3",
    ]);
    expect(locationList.ListDistance).toBe(11);
  });

  test("A simple example should have a similarity score of 31", () => {
    const locationList = new LocationList([
      "3   4",
      "4   3",
      "2   5",
      "1   3",
      "3   9",
      "3   3",
    ]);
    expect(locationList.SimilarityScore).toBe(31);
  });
});
