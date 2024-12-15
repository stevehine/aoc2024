import { Warehouse } from "./warehouse"

describe("Some tests about warehouses", () => {
    test("A small warehouse is rearranged by the instructions for a GPS score of 2028 and a bigGPS score of 9021", () => {
        const warehouse = new Warehouse("########,#..O.O.#,##@.O..#,#...O..#,#.#.O..#,#...O..#,#......#,########,,<^^>>>vv<v>>v<<".split(','));
        expect(warehouse.GPSTotal).toBe(2028);
        expect(warehouse.BigGPSTotal).toBe(1751);
    })
})