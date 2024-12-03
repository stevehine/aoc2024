import { ReactorReports } from "./reactor-reports"

describe("Some tests about reactor reports", () => {
    it.each([["7 6 4 2 1", 1],
    ["1 2 7 8 9", 0],
    ["9 7 6 2 1", 0],
    ["1 3 2 4 5", 0],
    ["8 6 4 4 1", 0],
    ["1 3 6 7 9", 1]])("The input `%s` should have `%s` safe reports", (input, safeCount) => {
        const reactorReports = new ReactorReports([input]);
        expect(reactorReports.SafeReports).toBe(safeCount);
    });

    it.each([["7 6 4 2 1", 1],
    ["1 2 7 8 9", 0],
    ["9 7 6 2 1", 0],
    ["1 3 2 4 5", 1],
    ["8 6 4 4 1", 1],
    ["1 3 6 7 9", 1]])("The input `%s` should have `%s` safe dampened reports", (input, safeCount) => {
        const reactorReports = new ReactorReports([input]);
        expect(reactorReports.SafeDampenedReports).toBe(safeCount);
    })

})