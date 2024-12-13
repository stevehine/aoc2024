import { PlutoniumPebbles } from "./plutonium-pebbles";

describe("Some tests about pebbles", () => {
    test("A simple arangement", () => {
        const plutoniumPebbles = new PlutoniumPebbles("125 17");
        plutoniumPebbles.blink(6);
        expect(plutoniumPebbles.StoneCount).toBe(22);
    })
})