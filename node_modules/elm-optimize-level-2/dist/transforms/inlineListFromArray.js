"use strict";
/*

Inline the creation of a list from an array:

// initial
_List_fromArray(["a", "b", "c"]);

// with InlineMode.UsingConsFunc
_List_cons("a", _List_cons("b", _List_cons("c", _List_Nil)))

// with InlineMode.UsingLiteralObjects(Mode.Prod)
({ $: 1, a: "a", b: { $: 1, a: "b", b: { $: 1, a: "c", b: _List_Nil } } });

// with InlineMode.UsingLiteralObjects(Mode.Dev)
({ $: "::", a: "a", b: { $: "::", a: "b", b: { $: "::", a: "c", b: _List_Nil } } });





*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInlineListFromArrayTransformer = exports.InlineMode = void 0;
const typescript_1 = __importDefault(require("typescript"));
const ts_union_1 = require("ts-union");
const types_1 = require("../types");
// debug
// const f = () => {
//   var _List_Nil = { $: '[]' };
//   function _List_Cons<T>(hd: T, tl: T | typeof _List_Nil) {
//     return { $: '::', a: hd, b: tl };
//   }
//   // var _List_cons = F2(_List_Cons);
//   function _List_fromArray<T>(arr: T[]) {
//     var out = _List_Nil;
//     for (var i = arr.length; i--; ) {
//       out = _List_Cons(arr[i], out);
//     }
//     return out;
//   }
//   const res = _List_fromArray(['a', 'b', 'c']);
//   console.log(res);
// };
// f();
// prod
// var _List_Nil = { $: 0 };
// var _List_Nil_UNUSED = { $: '[]' };
// function _List_Cons(hd, tl) {
//   return { $: 1, a: hd, b: tl };
// }
const listElementMarker = (mode) => mode === types_1.Mode.Dev
    ? typescript_1.default.createStringLiteral('::')
    : typescript_1.default.createNumericLiteral('1');
exports.InlineMode = (0, ts_union_1.Union)({
    UsingConsFunc: (0, ts_union_1.of)(null),
    UsingLiteralObjects: (0, ts_union_1.of)(),
});
const LIST_FROM_ARRAY_F_NAME = '_List_fromArray';
const LIST_NIL_NAME = '_List_Nil';
const LIST_CONS_F_NAME = '_List_cons';
const listNil = typescript_1.default.createIdentifier(LIST_NIL_NAME);
const listConsCall = typescript_1.default.createIdentifier(LIST_CONS_F_NAME);
const createInlineListFromArrayTransformer = (inlineMode) => context => {
    return sourceFile => {
        const visitor = (node) => {
            // detects [exp](..)
            if (typescript_1.default.isCallExpression(node)) {
                const expression = node.expression;
                // detects _List_fromArray(..)
                if (typescript_1.default.isIdentifier(expression) &&
                    expression.text === LIST_FROM_ARRAY_F_NAME &&
                    node.arguments.length === 1) {
                    const [arrayLiteral] = node.arguments;
                    // detects _List_fromArray([..])
                    if (typescript_1.default.isArrayLiteralExpression(arrayLiteral)) {
                        return arrayLiteral.elements.reduceRight((list, element) => {
                            return exports.InlineMode.match(inlineMode, {
                                UsingConsFunc: () => typescript_1.default.createCall(listConsCall, undefined, [
                                    typescript_1.default.visitNode(element, visitor),
                                    list,
                                ]),
                                UsingLiteralObjects: mode => typescript_1.default.createObjectLiteral([
                                    typescript_1.default.createPropertyAssignment('$', listElementMarker(mode)),
                                    typescript_1.default.createPropertyAssignment('a', element),
                                    typescript_1.default.createPropertyAssignment('b', list),
                                ]),
                            });
                        }, listNil);
                    }
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
exports.createInlineListFromArrayTransformer = createInlineListFromArrayTransformer;
//# sourceMappingURL=inlineListFromArray.js.map