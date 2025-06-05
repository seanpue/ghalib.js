import { ElmVariant } from '../types';
export declare const parseElm: ({ author, project, source, }: {
    author: string;
    project: string;
    source: string;
}) => ElmVariant[];
export declare const parseDir: (dir: string) => ElmVariant[];
