export class PrintQueue {
    private _sumOfMiddlePages: number;
    constructor(data: string[]) {

        const pageMap = new Map<number, number[]>();

        data.filter(line => line.includes("|"))
            .map(line => line.split('|'))
            .map(parts => { return { second: parseInt(parts[0]), first: parseInt(parts[1]) } })
            .forEach(pageOrder => {

                if (!pageMap.has(pageOrder.first)) {
                    pageMap.set(pageOrder.first, []);
                }
                const mapping = pageMap.get(pageOrder.first)
                mapping?.push(pageOrder.second);

            });

        this._sumOfMiddlePages = data.filter(line => line.includes(","))
            .map(line => line.split(','))
            .map(parts => parts.map(part => parseInt(part)))
            .filter(pages => {
                const excludePages: number[] = [];
                var validOrder = true;
                pages.forEach(page => {
                    if (excludePages.includes(page))
                        validOrder = false;
                    if (pageMap.has(page))
                        excludePages.push(...pageMap.get(page)!);
                })
                return validOrder;
            })
            .map(pages => pages[Math.floor(pages.length / 2) ])
            .reduce((p, c) => p + c);


    }
    public get SumOfMiddlePages() { return this._sumOfMiddlePages; }
}

