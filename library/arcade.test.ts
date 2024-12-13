import { Arcade } from "./arcade"

describe("Some tests about claw machines", () => {
    test("A simple claw machine can be won with 280 tokens", () => {
        const arcade = new Arcade(
            ["Button A: X+94, Y+34",
            "Button B: X+22, Y+67",
            "Prize: X=8400, Y=5400"]);
        expect(arcade.TokenCount).toBe(280);
    })
})
