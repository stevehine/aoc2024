import { RestroomRobots } from "./restroom-robots"

describe("Some tests about restroom robots", () => {
    test("The safety factor of some robots after 100 seconds is 12", () => {
        const restroomRobots = new RestroomRobots(["p=0,4 v=3,-3",
            "p=6,3 v=-1,-3",
            "p=10,3 v=-1,2",
            "p=2,0 v=2,-1",
            "p=0,0 v=1,3",
            "p=3,0 v=-2,-2",
            "p=7,6 v=-1,-3",
            "p=3,0 v=-1,-2",
            "p=9,3 v=2,3",
            "p=7,3 v=-1,2",
            "p=2,4 v=2,-3",
            "p=9,5 v=-3,-3"], 11, 7);
        restroomRobots.MoveRobots(100)
        expect(restroomRobots.SafetyFactor).toBe(12);
    })
})

