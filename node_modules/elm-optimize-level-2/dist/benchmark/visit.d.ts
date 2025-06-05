import { BrowserOptions, Browser } from '../types';
export declare type Benchmark = {
    name: string;
    tag: string | null;
    browser: Browser;
    results: BenchRun[];
    v8: V8Data | null;
};
export declare type BenchRun = {
    name: string;
    tags: string[];
    status: {
        runsPerSecond: number;
        goodnessOfFit: number;
    };
};
export declare type V8Data = {
    fns: {
        [key: string]: {
            status: string;
        };
    };
    memory: {
        [key: string]: Memory;
    };
};
export declare type Memory = {
    [key: string]: boolean;
};
export declare const benchmark: (options: BrowserOptions, name: string, tag: string | null, html: string, js: string, jitLogPath: string) => Promise<Benchmark>;
export declare const generateNodeJitLog: (options: BrowserOptions, name: string, tag: string | null, js: string, jitLogPath: string) => Promise<Benchmark>;
