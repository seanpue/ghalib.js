"use strict";
/*

We can ask the v8 engine the following:
  - is a given function optimized?
  - What is the memory representation of a given javascript object

This package helps make this a bit more convenient: https://www.npmjs.com/package/v8-natives#variableobject-information-commands

Though we also need to start chrome with a --allow-natives-syntax flag.


If we need to access more calls, here's the full list from v8: https://github.com/v8/v8/blob/master/src/runtime/runtime.h


This transformer does a few things.



    1. Replaces elm-explorations/benchmark's kernel code: https://github.com/elm-explorations/benchmark/blob/master/src/Elm/Kernel/Benchmark.js
        With one that periodically asks for the optimization status of the function being run.

        This does mean that the benchmarks are likely no longer representatitive!

        And the results should be thrown out.

        Generally this means we'll probablay either run in "benchmark mode" or in "analysis mode".

    2. Replaces the implementation of the functions in `testcases/benchmark-utilities/Debug.V8`

        - `Debug.V8.representation`
            -> Inspects and reports memory representation characteristics of the value passed to it.
        

        
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportFunctionStatusInBenchmarks = exports.v8Debug = void 0;
const typescript_1 = __importDefault(require("typescript"));
const create_1 = require("./utils/create");
const callgraph_1 = require("./utils/callgraph");
/*

The stubbed version of the functions are:

    var $author$project$V8$Debug$report = function (_v0) {
        return $elm$json$Json$Encode$null;
    };

    var $author$project$V8$Debug$analyze = F2(function (tag, value) {
            return value;
        });



*/
const ENABLE_MEMORY_COLLECTION = '$author$project$V8$Debug$enableMemoryChecks';
const new_memory_collection_enabled = `$author$project$V8$Debug$enableMemoryChecks = function (v) {
    window.memoryCheckReady = false
});`;
const DISABLE_MEMORY_COLLECTION = '$author$project$V8$Debug$disableMemoryChecks';
const new_memory_collection_disabled = `$author$project$V8$Debug$disableMemoryChecks = function (v) {
    window.memoryCheckReady = false
});`;
const DEBUG_MEMORY_FN = '$author$project$V8$Debug$memory';
const new_memory = `$author$project$V8$Debug$memory = F2(function (tag, value) {
    if (v8 && window.memoryCheckReady) {
         if (tag in window.memory) {
            return value
         } else {
            if (v8.isSmi(value)) {
                window.memory[tag] = {
                     hasFastProperties: false,
                     hasFastPackedElements: false,
                     hasDoubleElements: false,
                     hasDictionaryElements: false,
                     isSmi: true
                     hasSmiOrObjectElements: false,
                     hasSloppyArgumentsElements: false,
                }
            } else {
                window.memory[tag] = {
                     hasFastProperties: v8.hasFastProperties(value),
                     hasFastPackedElements: v8.hasFastPackedElements(value),
                     hasDoubleElements: v8.hasDoubleElements(value),
                     hasDictionaryElements: v8.hasDictionaryElements(value),
                     isSmi: false
                     hasSmiOrObjectElements: v8.hasSmiOrObjectElements(value),
                     hasSloppyArgumentsElements: v8.hasSloppyArgumentsElements(value)
                }
            }
         }
     }
    return value;
});`;
const DEBUG_OPT_STATUS_FN = '$author$project$V8$Debug$optimizationStatus';
const new_opt_status = `$author$project$V8$Debug$optimizationStatus = F2(function (tag, fn) {
    if (v8.isNative()) {
        var opt_status = v8.getOptimizationStatus(fn);
        var binary = opt_status.toString(2).padStart(12, '0');
        // console.log("FN NAME", fn.toString());
        console.log(tag, binary);
    }
    return fn;
})`;
// Reporting status automatically for benchmarked fns
const DEBUG_REPORT_FN = '$author$project$V8$Debug$reportV8StatusForBenchmarks';
const reportAnalysis = function (fns) {
    let fns_string = "";
    for (const fn_name of fns) {
        if (fn_name == "html" || fn_name == "createNode" || fn_name.startsWith("$author$project$V8")) {
            continue;
        }
        fns_string = fns_string + "{ name: \"" + fn_name + "\", ref:" + fn_name + "}";
    }
    return `$author$project$V8$Debug$reportV8StatusForBenchmarks = function (_v0) {
    var fns = [ ${fns_string} ]
    var results = {}
    if (v8.isNative()) {
        for (const fn of fns) {
            var opt_status = v8.getOptimizationStatus(fn.ref);
            var binary = opt_status.toString(2).padStart(12, '0');
            var tag = binary

            if (binary == "000000000001") {
                tag = "uncalled"
            } else if (binary == "000000110001") {
                tag = "optimized"
            } else if (binary == "000001000001") {
                tag = "interpreted"
            }
            results[fn.name] = { status: tag };

        }
    }
    return { fns: results, memory: window.memory  };
}`;
};
const v8Debug = context => {
    return sourceFile => {
        const visitor = (node) => {
            if (typescript_1.default.isVariableDeclaration(node)) {
                if (typescript_1.default.isIdentifier(node.name) &&
                    node.name.text == DEBUG_MEMORY_FN) {
                    return (0, create_1.create)(DEBUG_MEMORY_FN, (0, create_1.ast)(new_memory));
                }
                else if (typescript_1.default.isIdentifier(node.name) &&
                    node.name.text == DEBUG_OPT_STATUS_FN) {
                    return (0, create_1.create)(DEBUG_OPT_STATUS_FN, (0, create_1.ast)(new_opt_status));
                }
                else if (typescript_1.default.isIdentifier(node.name) &&
                    node.name.text == ENABLE_MEMORY_COLLECTION) {
                    return (0, create_1.create)(ENABLE_MEMORY_COLLECTION, (0, create_1.ast)(new_memory_collection_enabled));
                }
                else if (typescript_1.default.isIdentifier(node.name) &&
                    node.name.text == DISABLE_MEMORY_COLLECTION) {
                    return (0, create_1.create)(DISABLE_MEMORY_COLLECTION, (0, create_1.ast)(new_memory_collection_disabled));
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
exports.v8Debug = v8Debug;
const reportFunctionStatusInBenchmarks = context => {
    return sourceFile => {
        const callgraph = (0, callgraph_1.createCallGraph)(sourceFile);
        const suite = "$author$project$Suite$suite";
        const main_runner = "$author$project$V8$Benchmark$main";
        let called = (0, callgraph_1.getCalled)(callgraph, suite, undefined);
        const visitor = (node) => {
            if (typescript_1.default.isVariableDeclaration(node)) {
                if (typescript_1.default.isIdentifier(node.name) &&
                    node.name.text == DEBUG_REPORT_FN) {
                    return (0, create_1.create)(DEBUG_REPORT_FN, (0, create_1.ast)(reportAnalysis(called)));
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
exports.reportFunctionStatusInBenchmarks = reportFunctionStatusInBenchmarks;
//# sourceMappingURL=analyze.js.map