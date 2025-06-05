"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgramFromSource = void 0;
const typescript_1 = __importDefault(require("typescript"));
const cache = new Map();
const defaultCompilerHost = typescript_1.default.createCompilerHost({});
function serveLibFile(name, languageVersion) {
    const cached = cache.get(name);
    if (cached)
        return cached;
    const val = defaultCompilerHost.getSourceFile(name, languageVersion);
    cache.set(name, val);
    return val;
}
const printer = typescript_1.default.createPrinter();
const createProgramFromSource = (source) => {
    const sourceCopy = typescript_1.default.createSourceFile(source.fileName, printer.printFile(source), typescript_1.default.ScriptTarget.ES2018);
    const customCompilerHost = {
        getSourceFile: (name, languageVersion) => {
            // console.log(`getSourceFile ${name}`);
            if (name === sourceCopy.fileName) {
                return sourceCopy;
            }
            else {
                return serveLibFile(name, languageVersion);
            }
        },
        writeFile: () => { },
        getDefaultLibFileName: () => 'node_modules/typescript/lib/lib.es2018.full.d.ts',
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: filename => filename,
        getCurrentDirectory: () => '',
        getNewLine: () => '\n',
        getDirectories: () => [],
        fileExists: () => true,
        readFile: () => '',
    };
    const program = typescript_1.default.createProgram([sourceCopy.fileName], {
        allowJs: true,
        noUnusedLocals: true,
        checkJs: true,
        outDir: 'yo',
    }, customCompilerHost);
    return [program, sourceCopy];
};
exports.createProgramFromSource = createProgramFromSource;
//# sourceMappingURL=createTSprogram.js.map