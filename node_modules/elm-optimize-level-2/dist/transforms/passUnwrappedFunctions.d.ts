import ts from 'typescript';
import { InlineContext } from './inlineWrappedFunctions';
export declare const createPassUnwrappedFunctionsTransformer: (getCtx: () => InlineContext | undefined) => ts.TransformerFactory<ts.SourceFile>;
