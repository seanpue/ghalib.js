import ts from 'typescript';
import { Mode, ElmVariant } from '../types';
export declare const createCustomTypesTransformer: (replacements: ElmVariant[], mode: Mode) => ts.TransformerFactory<ts.SourceFile>;
