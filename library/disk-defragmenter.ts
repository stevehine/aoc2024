export class DiskDefragmenter {
    private _diskData: number[] = [];
    private _diskDataWholeFiles: number[] = [];

    constructor(data: string) {
        let isFile = true;
        let fileIndex = 0;
        let totalFileSize = 0;
        let index = 0;
        const files = new Map<number, { index: number, size: number }>();
        const spaces = new Map<number, number>();

        data.split('').map(value => parseInt(value)).forEach(size => {
            if (isFile) {
                files.set(fileIndex, { index, size });
            } else
                spaces.set(index, size);
            for (let i = 0; i < size; i++) {
                if (isFile) {
                    this._diskData[index] = fileIndex;
                }
                index++;
            }
            if (isFile) {
                fileIndex++;
                totalFileSize += size;
            }
            isFile = !isFile
        })
        //console.log(this._diskData);
        //console.log(files);
        //console.log(spaces);
        for (let i = 0; i < totalFileSize; i++) {
            if (this._diskData[i] === undefined) {

                let value: number | undefined;
                do {
                    value = this._diskData.pop();
                } while (value === undefined)

                this._diskData[i] = value;
            }
        }
        for (let fileNumber = fileIndex - 1; fileNumber > 0; fileNumber--) {
            const file = files.get(fileNumber)!;

            for (const [index, space] of [...spaces].sort((a, b) => a[0] - b[0])) {
                if (index > file.index) {
                    break;
                }
                if (space >= file.size) {

                    file.index = index;

                    spaces.delete(index);
                    if (space > file.size) {
                        spaces.set(index + file.size, space - file.size);
                    }
                    break;
                }


            }
        }
        this.populateDiskDataFromMap(files);
    }
    populateDiskDataFromMap(files: Map<number, { index: number; size: number; }>) {
        files.forEach((value, key) => {
            for (let i = 0; i < value.size; i++) {
                this._diskDataWholeFiles[value.index + i] = key;
            }
        });
    }

    public get CheckSum() { return this._diskData.map((val, index) => val * index).reduce((p, c) => p + c, 0); }
    public get CheckSumWholeFiles() { return this._diskDataWholeFiles.map((val, index) => val * index).reduce((p, c) => p + c, 0); }
}