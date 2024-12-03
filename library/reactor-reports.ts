export class ReactorReports {
    private _safeReports: number;
    private _safeDampenedReports: number;

    constructor(data: string[]) {
        this._safeReports = data
            .map(row => row.split(' ')
                .map(v => parseInt(v)))
            .filter(report =>
                this.isReportSafe(report)
            )
            .length

        this._safeDampenedReports = data
            .map(row => row.split(' ')
                .map(v => parseInt(v)))
            .filter(report => {
                for (var i = -1; i < report.length; i++) {
                    if (this.isReportSafe(report, i))
                        return true;
                }
                return false;
            }
            )
            .length
    }
    isReportSafe(originalReport: number[], skip: number | undefined = undefined): boolean {

        let trend;

        const report = originalReport.filter((v, i) => i !== skip);

        for (var i = 0; i < report.length - 1; i++) {

            if (Math.abs(report[i] - report[i + 1]) >= 4 || report[i] === report[i + 1])
                return false;

            const direction = Math.sign(report[i] - report[i + 1]);
            if (trend === undefined)
                trend = direction;
            else
                if (trend !== direction)
                    return false;
        }

        return true;
    }

    public get SafeReports() { return this._safeReports; }
    public get SafeDampenedReports() { return this._safeDampenedReports; }
}