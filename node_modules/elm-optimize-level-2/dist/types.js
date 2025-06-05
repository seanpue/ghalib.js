"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previous = exports.benchmarkDefaults = exports.toolDefaults = exports.emptyOpts = exports.unallowedChars = exports.Browser = exports.ObjectUpdate = exports.InlineLists = exports.Mode = void 0;
var Mode;
(function (Mode) {
    Mode["Prod"] = "prod";
    Mode["Dev"] = "dev";
})(Mode = exports.Mode || (exports.Mode = {}));
var InlineLists;
(function (InlineLists) {
    InlineLists["AsObjects"] = "list_as_objs";
    InlineLists["AsCons"] = "list_as_cons";
})(InlineLists = exports.InlineLists || (exports.InlineLists = {}));
var ObjectUpdate;
(function (ObjectUpdate) {
    ObjectUpdate["UseSpreadForUpdateAndOriginalRecord"] = "for_both";
    ObjectUpdate["UseSpreadOnlyToMakeACopy"] = "for_copy";
    ObjectUpdate["UseAssign"] = "use_assign";
    ObjectUpdate["InlineAssign"] = "inline_assign";
    ObjectUpdate["InlineSpread"] = "inline_spread";
})(ObjectUpdate = exports.ObjectUpdate || (exports.ObjectUpdate = {}));
var Browser;
(function (Browser) {
    Browser["Chrome"] = "chrome";
    Browser["Firefox"] = "firefox";
    Browser["Safari"] = "safari";
    Browser["IE"] = "ie";
    Browser["Edge"] = "edge";
    Browser["Node"] = "node";
    Browser["V8JitLog"] = "v8-jit-log";
})(Browser = exports.Browser || (exports.Browser = {}));
exports.unallowedChars = /[^A-Za-z0-9]/g;
exports.emptyOpts = {
    replaceVDomNode: false,
    variantShapes: false,
    inlineNumberToString: false,
    inlineFunctions: false,
    inlineEquality: false,
    listLiterals: false,
    passUnwrappedFunctions: false,
    arrowFns: false,
    shorthandObjectLiterals: false,
    objectUpdate: false,
    unusedValues: false,
    replaceListFunctions: false,
    replaceStringFunctions: false,
    recordUpdates: false,
    v8Analysis: false,
    fastCurriedFns: false,
    replacements: null
};
function toolDefaults(o3Enabled, replacements) {
    return {
        replaceVDomNode: false,
        variantShapes: true,
        inlineNumberToString: false,
        inlineEquality: true,
        inlineFunctions: true,
        listLiterals: false,
        passUnwrappedFunctions: true,
        arrowFns: false,
        shorthandObjectLiterals: false,
        objectUpdate: false,
        unusedValues: false,
        replaceListFunctions: true,
        replaceStringFunctions: false,
        recordUpdates: o3Enabled,
        v8Analysis: false,
        fastCurriedFns: true,
        replacements: replacements
    };
}
exports.toolDefaults = toolDefaults;
function benchmarkDefaults(o3Enabled, replacements) {
    return {
        replaceVDomNode: false,
        variantShapes: true,
        inlineNumberToString: false,
        inlineEquality: true,
        inlineFunctions: true,
        listLiterals: false,
        passUnwrappedFunctions: true,
        arrowFns: false,
        shorthandObjectLiterals: false,
        objectUpdate: false,
        unusedValues: false,
        replaceListFunctions: true,
        replaceStringFunctions: false,
        recordUpdates: o3Enabled,
        v8Analysis: false,
        fastCurriedFns: true,
        replacements: replacements
    };
}
exports.benchmarkDefaults = benchmarkDefaults;
exports.previous = { v1: {
        replaceVDomNode: false,
        variantShapes: true,
        inlineNumberToString: false,
        inlineEquality: true,
        inlineFunctions: true,
        listLiterals: false,
        passUnwrappedFunctions: true,
        arrowFns: false,
        shorthandObjectLiterals: false,
        objectUpdate: false,
        unusedValues: false,
        replaceListFunctions: false,
        replaceStringFunctions: false,
        recordUpdates: false,
        v8Analysis: false,
        fastCurriedFns: false,
        replacements: null
    }
};
//# sourceMappingURL=types.js.map