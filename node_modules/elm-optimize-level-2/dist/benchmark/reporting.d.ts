export interface Stat {
    name: string;
    bytes: number;
}
declare type Results = {
    assets: {
        [key: string]: Stat[];
    };
    benchmarks: any;
};
export declare const terminal: (report: Results) => string;
export declare const markdown: (report: Results) => string;
export declare const markdownTable: (report: Results) => string;
export {};
