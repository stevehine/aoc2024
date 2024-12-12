import { GardenGroups } from "./garden-groups"

describe("Some tests about garden fencing", () => {
    test("A simple garden should have a fence cost of 140", () => {
        const gardenGroups = new GardenGroups(["AAAA",
            "BBCD",
            "BBCC",
            "EEEC"]);
        expect(gardenGroups.PriceOfFence).toBe(140);
        expect(gardenGroups.PriceOfDiscountFence).toBe(80);
    })
    test("A more complicated garden should have a fence cost of 1930", () => {
        const gardenGroups = new GardenGroups(
            ["RRRRIICCFF",
             "RRRRIICCCF",
             "VVRRRCCFFF",
             "VVRCCCJFFF",
            "VVVVCJJCFE",
            "VVIVCCJJEE",
            "VVIIICJJEE",
            "MIIIIIJJEE",
            "MIIISIJEEE",
            "MMMISSJEEE"]);
        expect(gardenGroups.PriceOfFence).toBe(1930);
        expect(gardenGroups.PriceOfDiscountFence).toBe(1206);
    })
    test("An e shaped garden has a discount price of 236", () => {
        const gardenGroups = new GardenGroups("EEEEE,EXXXX,EEEEE,EXXXX,EEEEE".split(','));
        expect(gardenGroups.PriceOfDiscountFence).toBe(236);
    })
})
