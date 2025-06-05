import ts from 'typescript';
export declare const ast: (sourceText: string) => ts.Node;
export declare const astNodes: (sourceText: string) => ts.Node[];
export declare function create(name: string, body: ts.Node): ts.Node;
