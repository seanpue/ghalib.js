"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRemoveUnusedLocalsTransform = void 0;
const typescript_1 = __importDefault(require("typescript"));
const createRemoveUnusedLocalsTransform = () => context => {
    return sourceFile => {
        const printer = typescript_1.default.createPrinter();
        const sourceCopy = typescript_1.default.createSourceFile('elm.js', printer.printFile(sourceFile), typescript_1.default.ScriptTarget.ES2018);
        let unused = collectUnusedVariables(sourceCopy);
        console.log('found unused:', unused.length);
        let removedCount = 0;
        const visitor = (node) => {
            // detects function f(..){..}
            if (typescript_1.default.isFunctionDeclaration(node) &&
                node.name &&
                isUnused(unused, node.name.pos, node.name.end)) {
                removedCount++;
                return undefined;
            }
            if (typescript_1.default.isVariableStatement(node)) {
                const declList = node.declarationList;
                const filteredDeclarations = declList.declarations.filter(decl => !isUnused(unused, decl.name.pos, decl.name.end));
                if (filteredDeclarations.length !== declList.declarations.length) {
                    if (filteredDeclarations.length === 0) {
                        // means that there is nothing left, thus delete the entire thing
                        removedCount += declList.declarations.length;
                        return undefined;
                    }
                    // only update remove some of the declarations
                    removedCount +=
                        declList.declarations.length - filteredDeclarations.length;
                    return typescript_1.default.updateVariableStatement(node, undefined, typescript_1.default.updateVariableDeclarationList(declList, filteredDeclarations));
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        // TODO make this code pretty
        let result = typescript_1.default.visitNode(sourceCopy, visitor);
        unused = collectUnusedVariables(result);
        while (unused.length > 0) {
            console.log('found unused nextRound:', unused.length);
            result = typescript_1.default.visitNode(result, visitor);
            unused = collectUnusedVariables(result);
        }
        console.log('totalRemoveCount:', removedCount);
        return result;
    };
};
exports.createRemoveUnusedLocalsTransform = createRemoveUnusedLocalsTransform;
const defaultCompilerHost = typescript_1.default.createCompilerHost({});
const cache = new Map();
function serveLibFile(name, languageVersion) {
    const cached = cache.get(name);
    if (cached)
        return cached;
    const val = defaultCompilerHost.getSourceFile(name, languageVersion);
    cache.set(name, val);
    return val;
}
function collectUnusedVariables(sourceFile) {
    const customCompilerHost = {
        getSourceFile: (name, languageVersion) => {
            // console.log(`getSourceFile ${name}`);
            if (name === 'elm.js') {
                return sourceFile;
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
    const program = typescript_1.default.createProgram(['elm.js'], {
        allowJs: true,
        noUnusedLocals: true,
        checkJs: true,
        outDir: 'yo',
    }, customCompilerHost);
    const res = typescript_1.default.getPreEmitDiagnostics(program);
    return res.filter(d => d.reportsUnnecessary);
}
function isUnused(unused, start, end) {
    return unused.some(d => {
        var _a, _b;
        const dstart = (_a = d.start) !== null && _a !== void 0 ? _a : -1;
        const dend = dstart + ((_b = d.length) !== null && _b !== void 0 ? _b : -2);
        return (dstart < end && dend > start) || (start < dend && end > dstart);
    });
}
//# sourceMappingURL=removeUnusedLocals.js.map