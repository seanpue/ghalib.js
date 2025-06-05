import { RunTestcaseOptions } from '../types';
import * as Visit from './visit';
export interface Stat {
    name: string;
    bytes: number;
}
export declare const assetSizeStats: (dir: string) => Stat[];
export declare function reformat(results: Visit.BenchRun[]): any;
declare type Testcase = {
    name: string;
    dir: string;
    elmFile: string;
};
export declare const run: (options: RunTestcaseOptions, runnable: Testcase[]) => Promise<{
    assets: any;
    benchmarks: any;
}>;
export declare const runWithBreakdown: (options: RunTestcaseOptions, runnable: Testcase[]) => Promise<{
    assets: any;
    benchmarks: any;
}>;
export declare const runWithKnockout: (options: RunTestcaseOptions, runnable: Testcase[]) => Promise<{
    assets: any;
    benchmarks: any;
}>;
export {};
