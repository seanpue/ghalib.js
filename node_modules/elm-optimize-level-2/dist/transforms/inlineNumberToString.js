"use strict";
/*

If we see `String$fromFloat(val)`, replace it with `val + ""`
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineNumberToString = void 0;
const typescript_1 = __importDefault(require("typescript"));
const FLOAT_2_STRING = '$elm$core$String$fromFloat';
const INT_2_STRING = '$elm$core$String$fromInt';
const inlineNumberToString = () => context => {
    return sourceFile => {
        const visitor = (node) => {
            if (typescript_1.default.isCallExpression(node)) {
                const expression = node.expression;
                if (typescript_1.default.isIdentifier(expression) &&
                    (expression.text === FLOAT_2_STRING ||
                        expression.text === INT_2_STRING) &&
                    node.arguments.length == 1) {
                    return typescript_1.default.createAdd(node.arguments[0], typescript_1.default.createIdentifier('""'));
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
exports.inlineNumberToString = inlineNumberToString;
//# sourceMappingURL=inlineNumberToString.js.map