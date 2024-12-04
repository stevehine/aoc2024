import { WordSearch } from "./word-search"

describe("Some tests about word searches", () => {
    test("A small grid contains 4 XMAS's", () => {
        const wordSearch = new WordSearch(["..X...", ".SAMX.", ".A..A.", "XMAS.S", ".X...."]);
        expect(wordSearch.XMASOccurances).toBe(4);
    })

    test("A Grid of CrossMAS's contains 9 CrossMAS's", () => {
        const wordSearch = new WordSearch([".M.S......",
            "..A..MSMS.",
            ".M.S.MAA..",
            "..A.ASMSM.",
            ".M.S.M....",
            "..........",
            "S.S.S.S.S.",
            ".A.A.A.A..",
            "M.M.M.M.M.",
            ".........."]);
        expect(wordSearch.CrossMASOccurances).toBe(9);
    })
})