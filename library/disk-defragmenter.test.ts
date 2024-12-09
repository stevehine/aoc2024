import { DiskDefragmenter } from "./disk-defragmenter";

describe("Some tests about defragmentation", () => {

    test("A disk when defragmented block by block should have a checksum", () => {
        const diskDefragmenter = new DiskDefragmenter("2333133121414131402");
        expect(diskDefragmenter.CheckSum).toBe(1928);
        expect(diskDefragmenter.CheckSumWholeFiles).toBe(2858);
    })
});