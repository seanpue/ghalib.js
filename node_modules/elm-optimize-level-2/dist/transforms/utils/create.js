"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.astNodes = exports.ast = void 0;
const typescript_1 = __importDefault(require("typescript"));
const ast = (sourceText) => {
    const source = typescript_1.default.createSourceFile('bla', sourceText, typescript_1.default.ScriptTarget.ES2018);
    return source.statements[0];
};
exports.ast = ast;
const astNodes = (sourceText) => {
    const source = typescript_1.default.createSourceFile('bla', sourceText, typescript_1.default.ScriptTarget.ES2018);
    return Array.from(source.statements);
};
exports.astNodes = astNodes;
function create(name, body) {
    if (typescript_1.default.isExpressionStatement(body) &&
        typescript_1.default.isBinaryExpression(body.expression)) {
        return typescript_1.default.createVariableDeclaration(name, undefined, body.expression.right);
    }
    return body;
}
exports.create = create;
//# sourceMappingURL=create.js.map