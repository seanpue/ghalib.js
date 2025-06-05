import ts from 'typescript';
export declare type Pattern<T> = (node: ts.Node) => T | undefined;
declare type WrappedInvocation = {
    args: ts.Expression[];
    calleeName: ts.Identifier;
    callExpression: ts.CallExpression;
    arity: number;
};
export declare const matchWrappedInvocation: Pattern<WrappedInvocation>;
declare type Wrapping = {
    wrappedExpression: ts.Expression;
    arity: number;
};
export declare const matchWrapping: Pattern<Wrapping>;
export declare const matchElmSource: (source: ts.SourceFile) => {
    topScope: ts.Block;
} | undefined;
export {};
