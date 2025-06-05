import { Transforms } from './types';
export declare type Options = {
    compile: boolean;
    minify: boolean;
    gzip: boolean;
    verbose: boolean;
};
export declare const transform: (_dir: string, jsSource: string, elmfile: string | undefined, verbose: boolean, transforms: Transforms) => Promise<string>;
