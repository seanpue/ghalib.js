import * as ts from "typescript";
export declare type CallGraph = {
    all: string[];
    called: Map<string, string[]>;
};
export declare function print(fns: CallGraph): void;
export declare function getCalled(graph: CallGraph, entry: string, already_called: undefined | string[]): string[];
export declare function createCallGraph(source: ts.SourceFile): CallGraph;
