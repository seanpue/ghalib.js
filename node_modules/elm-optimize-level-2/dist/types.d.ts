export declare enum Mode {
    Prod = "prod",
    Dev = "dev"
}
export interface ElmVariant {
    typeName: string;
    name: string;
    jsName: string;
    index: number;
    slots: string[];
    totalTypeSlotCount: number;
}
export declare type RunTestcaseOptions = {
    compile: boolean;
    gzip: boolean;
    minify: boolean;
    verbose: boolean;
    assetSizes: boolean;
    runBenchmark: BrowserOptions[];
    transforms: Transforms;
};
export declare type Transforms = {
    replaceVDomNode: boolean;
    variantShapes: boolean;
    inlineNumberToString: boolean;
    inlineEquality: boolean;
    inlineFunctions: boolean;
    passUnwrappedFunctions: boolean;
    listLiterals: InlineLists | false;
    arrowFns: boolean;
    shorthandObjectLiterals: boolean;
    objectUpdate: ObjectUpdate | false;
    unusedValues: boolean;
    replaceListFunctions: boolean;
    replaceStringFunctions: boolean;
    recordUpdates: boolean;
    v8Analysis: boolean;
    fastCurriedFns: boolean;
    replacements: {
        [name: string]: string;
    } | null;
};
export declare enum InlineLists {
    AsObjects = "list_as_objs",
    AsCons = "list_as_cons"
}
export declare enum ObjectUpdate {
    UseSpreadForUpdateAndOriginalRecord = "for_both",
    UseSpreadOnlyToMakeACopy = "for_copy",
    UseAssign = "use_assign",
    InlineAssign = "inline_assign",
    InlineSpread = "inline_spread"
}
export declare type BrowserOptions = {
    browser: Browser;
    headless: boolean;
};
export declare enum Browser {
    Chrome = "chrome",
    Firefox = "firefox",
    Safari = "safari",
    IE = "ie",
    Edge = "edge",
    Node = "node",
    V8JitLog = "v8-jit-log"
}
export declare const unallowedChars: RegExp;
export declare const emptyOpts: Transforms;
export declare function toolDefaults(o3Enabled: boolean, replacements: {
    string: string;
} | null): Transforms;
export declare function benchmarkDefaults(o3Enabled: boolean, replacements: {
    string: string;
} | null): Transforms;
export declare type Previous = {
    v1: Transforms;
};
export declare const previous: Previous;
