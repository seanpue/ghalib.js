import ts from 'typescript';
import { ObjectUpdate } from '../types';
export declare const objectUpdate: (kind: ObjectUpdate) => ts.TransformerFactory<ts.SourceFile>;
export declare const convertFunctionExpressionsToArrowFuncs: ts.TransformerFactory<ts.SourceFile>;
export declare const convertToObjectShorthandLiterals: ts.TransformerFactory<ts.SourceFile>;
