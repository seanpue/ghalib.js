"use strict";
/*

Calculating structural equality is expensive.

This shows up as `_Utils_eq` calls in resulting js.

For primitives it can be much faster to inline a `===`

Primitives such as:
    - Int
    - Float
    - String
    - Bool


Current plan:
    x replace with `===` if one of the values is a number literal
    x replace if there's a number literal within a math expression

A few manual overrides to see if they affect performance

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineEquality = void 0;
const typescript_1 = __importDefault(require("typescript"));
const EQUALITY_FN = '_Utils_eq';
const inlineEquality = () => context => {
    return sourceFile => {
        const visitor = (node) => {
            if (typescript_1.default.isCallExpression(node)) {
                const expression = node.expression;
                if (typescript_1.default.isIdentifier(expression) && expression.text === EQUALITY_FN) {
                    let inferredPrimitive = false;
                    const len = node.arguments.length;
                    for (let i = 0; i < len; i++) {
                        if (inferIsPrimitive(node.arguments[i])) {
                            inferredPrimitive = true;
                            break;
                        }
                    }
                    if (inferredPrimitive) {
                        // Documentation for creating nodes using the typescript compiler:
                        // https://github.com/microsoft/TypeScript/blob/2c08affa0d0d7fc55f15ab22e0326b93326d21d8/src/compiler/factory/nodeFactory.ts
                        return typescript_1.default.createStrictEquality(node.arguments[0], node.arguments[1]);
                    }
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
exports.inlineEquality = inlineEquality;
// NOTE: we're cheating here with the source.
// I've manually verified that these are number or string comparisons
// So they can safely be converted to ===
// const overrideIdentifiers: string[] = [
//   'leftFringeRank',
//   'end_',
//   'c',
//   'startTagName',
//   'openChar',
// ];
function inferIsPrimitive(node) {
    let kind = typescript_1.default.SyntaxKind[node.kind];
    if (kind == 'Identifier') {
        // Disabled the manual override for now
        // if (ts.isIdentifier(node)) {
        //   if (overrideIdentifiers.includes(node.text)) {
        //     return true;
        //   }
        // }
        return false;
    }
    else if (kind == 'PrefixUnaryExpression') {
        let isPrim = false;
        node.forEachChild((child) => {
            if (typescript_1.default.TypeFlags[child.kind] === 'Number') {
                isPrim = true;
            }
        });
        return isPrim;
    }
    else if (typescript_1.default.TypeFlags[node.kind] === 'Number') {
        return true;
    }
    else if (typescript_1.default.TypeFlags[node.kind] === 'String') {
        return true;
    }
    else if (kind == 'PropertyAccessExpression') {
        return false;
    }
    else if (kind == 'BinaryExpression') {
        let isPrim = false;
        node.forEachChild((child) => {
            if (typescript_1.default.TypeFlags[child.kind] == 'Number') {
                isPrim = true;
            }
        });
        // console.log('is number', isPrim);
        return isPrim;
    }
    else {
        // console.log(ts.SyntaxKind[node.kind]);
        // console.log(ts.TypeFlags[node.kind]);
        // console.log(node);
        //  console.log(ts.TypeFlags[child.kind]);
        // console.log(ts.SyntaxKind[node.kind]);
        // console.log(ts.TokenClass);
        // console.log(ts.TokenFlags);
        // console.log(ts.TypeFlags);
        // console.log(ts.TypeFlags[node.]);
        // console.log(ts.ModifierFlags);
        // console.log(ts.SymbolFlags);
        // console.log(node);
        return false;
    }
}
//# sourceMappingURL=inlineEquality.js.map