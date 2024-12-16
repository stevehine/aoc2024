import { ReindeerMaze } from "./reindeer-maze"

describe("Some tests about reindeers in mazes", () => {
    test("An Example maze should have a best score of 7036", () => {
        const reindeerMaze = new ReindeerMaze(("###############,#.......#....E#,#.#.###.#.###.#,#.....#.#...#.#,#.###.#####.#.#,#.#.#.......#.#," +
            "#.#.#####.###.#,#...........#.#,###.#.#####.#.#,#...#.....#.#.#,#.#.#.###.#.#.#,#.....#...#.#.#,#.###.#.#.#.#.#," +
            "#S..#.....#...#,###############").split(','));
        expect(reindeerMaze.BestScore).toBe(7036);
        expect(reindeerMaze.UniqueSquares).toBe(45);
    })
    test("An Example maze should have a best score of 11048", () => {
        const reindeerMaze = new ReindeerMaze(("#################,#...#...#...#..E#,#.#.#.#.#.#.#.#.#,#.#.#.#...#...#.#,#.#.#.#.###.#.#.#,#...#.#.#.....#.#,#.#.#.#.#.#####.#,#.#...#.#.#.....#,#.#.#####.#.###.#,#.#.#.......#...#,#.#.###.#####.###,#.#.#...#.....#.#,#.#.#.#####.###.#,#.#.#.........#.#,#.#.#.#########.#,#S#.............#,#################").split(','));
        expect(reindeerMaze.BestScore).toBe(11048);
        expect(reindeerMaze.UniqueSquares).toBe(64);
    })
})