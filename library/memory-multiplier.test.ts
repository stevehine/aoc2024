import { MemoryMultiplier } from "./memory-multiplier"

describe("Some test about memory multiplying", () => {
    test("A complicated expression contains some instructions", () => {
        const memoryMultiplier = new MemoryMultiplier(["xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"]);
        expect(memoryMultiplier.TotalResult).toBe(161);
    })
    test("A complicated expression contains some instructions and some rules", () => {
        const memoryMultiplier = new MemoryMultiplier(["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"]);
        expect(memoryMultiplier.TotalResultWithConditionals).toBe(48);
    })
})