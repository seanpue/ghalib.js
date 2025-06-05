import ts from 'typescript';
export declare type PartialApplication = {
    split: FuncSplit;
    appliedArgs: string[];
    funcReturnsWrapper?: FunctionInfoThatReturnsWrappedFunc;
};
declare type FunctionInfoThatReturnsWrappedFunc = {
    arity: number;
    resultArity: number;
};
export declare type InlineContext = {
    functionsThatWrapFunctions: Map<string, FunctionInfoThatReturnsWrappedFunc>;
    splits: Map<string, FuncSplit>;
    partialApplications: Map<string, PartialApplication>;
    inlined: {
        fromAlias: number;
        fromRawFunc: number;
        fromWrapper: number;
        partialApplications: number;
    };
};
export declare type FuncSplit = {
    rawLambdaName: string;
    arity: number;
    type: 'alias' | 'raw_func' | 'returned_wrapper';
};
export declare const createInlineContext: () => InlineContext;
export declare const createFunctionInlineTransformer: (logOverview: boolean, arityBasedFunctionNames: boolean, ignoreTopLevel?: "for tests" | undefined) => ts.TransformerFactory<ts.SourceFile>;
export {};
