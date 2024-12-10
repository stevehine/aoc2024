import { TopographicMap } from "./topographic-map"

describe("Some tests about topographic maps", () => {
    test("A simple trailhead has a score of 2", () => {
        const topographicMap = new TopographicMap(["...0...",
            "...1...",
            "...2...",
            "6543456",
            "7.....7",
            "8.....8",
            "9.....9"]);

        expect(topographicMap.SumOfTrailheads).toBe(2);
    });
    test("A more interesting map has a score of 36", () => {
        const topographicMap = new TopographicMap(["89010123",
            "78121874",
            "87430965",
            "96549874",
            "45678903",
            "32019012",
            "01329801",
            "10456732"]);

        expect(topographicMap.SumOfTrailheads).toBe(36);
        expect(topographicMap.SumOfUniqueTrailsByTrailheads).toBe(81);
    });
});

