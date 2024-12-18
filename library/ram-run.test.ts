import { RamRun } from "./ram-run"

describe("Some tests about running through ram", () => {
    test("A trip through ram should have 22 steps", () => {
        const ramRun = new RamRun(["5,4",
            "4,2",
            "4,5",
            "3,0",
            "2,1",
            "6,3",
            "2,4",
            "1,5",
            "0,6",
            "3,3",
            "2,6",
            "5,1",
            "1,2",
            "5,5",
            "2,5",
            "6,5",
            "1,4",
            "0,4",
            "6,4",
            "1,1",
            "6,1",
            "1,0",
            "0,5",
            "1,6",
            "2,0"], 7);
        ramRun.dropBytes(12);
        ramRun.calculateShortestPath();
        expect(ramRun.ShortestPath).toBe(22);
    })
})

