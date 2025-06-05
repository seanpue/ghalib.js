"use strict";
/* # Variant Shapes


initial
```
var elm$core$Maybe$Just = function (a) {
    return {$: 0, a: a};
};

var elm$core$Maybe$Nothing = {$: 1};
```


after
```
var elm$core$Maybe$Just = function (a) {
    return {$: 0, a: a};
};

var elm$core$Maybe$Nothing = {$: 1, a: null};
```

The V8 engine is likely better able to optimize these objects if they have the same shape, even if they're stubbed in with `null`.

This does require information from the Elm code itself, which we're currently getting through `elm-tree-sitter`.

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomTypesTransformer = void 0;
const typescript_1 = __importDefault(require("typescript"));
const types_1 = require("../types");
const patterns_1 = require("./patterns");
// TODO fill a proper array
const argNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const createVariantObjectLiteral = ({ name, totalTypeSlotCount, index }, slotsCount, mode) => {
    return typescript_1.default.createObjectLiteral([
        typescript_1.default.createPropertyAssignment('$', mode === types_1.Mode.Dev
            ? typescript_1.default.createStringLiteral(name)
            : typescript_1.default.createNumericLiteral(index.toString())),
        // existing arguments
        ...argNames
            .slice(0, slotsCount)
            .map((arg) => typescript_1.default.createPropertyAssignment(arg, typescript_1.default.createIdentifier(arg))),
        // fillings with nulls for the rest
        ...argNames
            .slice(slotsCount, totalTypeSlotCount)
            .map((arg) => typescript_1.default.createPropertyAssignment(arg, typescript_1.default.createNull())),
    ]);
};
const createCtorVariant = (replacement, slotsCount, mode) => {
    const funcExpression = typescript_1.default.createFunctionExpression(undefined, // modifiers
    undefined, //asteriskToken
    undefined, //name
    undefined, //typeParameters
    argNames
        .slice(0, slotsCount)
        .map((arg) => typescript_1.default.createParameter(undefined, undefined, undefined, arg, undefined, undefined, undefined)), undefined, //type
    typescript_1.default.createBlock([
        typescript_1.default.createReturn(createVariantObjectLiteral(replacement, slotsCount, mode)),
    ]));
    if (slotsCount > 1) {
        // wrap it in Fn
        return typescript_1.default.createCall(typescript_1.default.createIdentifier('F' + slotsCount.toString()), undefined, [funcExpression]);
    }
    return funcExpression;
};
const extractNumberOfSlots = (exp) => {
    if (typescript_1.default.isFunctionExpression(exp)) {
        // should be just one
        if (exp.parameters.length !== 1) {
            throw new Error('expected a wrapped function expression');
        }
        return 1;
    }
    if (typescript_1.default.isObjectLiteralExpression(exp)) {
        return 0;
    }
    // means that we are dealing with an arity > 1
    const match = (0, patterns_1.matchWrapping)(exp);
    if (match) {
        return match.arity;
    }
    throw new Error('unexpected expression');
};
const createCustomTypesTransformer = (replacements, mode) => (context) => {
    return (sourceFile) => {
        const visitor = (node) => {
            if (typescript_1.default.isVariableDeclaration(node) &&
                typescript_1.default.isIdentifier(node.name) &&
                node.initializer) {
                for (const replacement of replacements) {
                    if (node.name.text === replacement.jsName) {
                        const slotsCount = extractNumberOfSlots(node.initializer);
                        if (slotsCount === 0) {
                            return typescript_1.default.updateVariableDeclaration(node, node.name, node.type, createVariantObjectLiteral(replacement, slotsCount, mode));
                        }
                        return typescript_1.default.updateVariableDeclaration(node, node.name, node.type, createCtorVariant(replacement, slotsCount, mode));
                    }
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
exports.createCustomTypesTransformer = createCustomTypesTransformer;
//# sourceMappingURL=variantShapes.js.map