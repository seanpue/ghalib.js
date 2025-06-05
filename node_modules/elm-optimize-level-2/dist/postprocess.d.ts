export declare function prepack(input: string): string;
export declare type Post = {
    minify: Boolean;
    gzip: Boolean;
};
export declare function process(file: string, options: Post): Promise<void>;
export declare function minify(inputFilename: string, outputFilename: string): Promise<void>;
export declare function gzip(file: string, output: string): Promise<void>;
export declare function includeV8Helpers(output_dir: string): Promise<void>;
export declare function includeStubbedV8Helpers(output_dir: string): Promise<void>;
