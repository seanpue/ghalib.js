"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceVDomNode = void 0;
const typescript_1 = __importDefault(require("typescript"));
const create_1 = require("./utils/create");
const newVDomNS4 = `_VirtualDom_nodeNS = F4(function (namespace, tag, factList, kidList) {
      for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
       {
          var kid = kidList.a;
          descendantsCount += (kid.b || 0);
          kids.push(kid);
      }
      descendantsCount += kids.length;
      return {
          $: 1,
          c: tag,
          d: _VirtualDom_organizeFacts(factList),
          e: kids,
          f: namespace,
          b: descendantsCount
      };

})`;
const replaceVDomNode = () => context => {
    return sourceFile => {
        const visitor = (node) => {
            // replace the two virtualdom node functions with our own implementation
            if (typescript_1.default.isVariableDeclaration(node)) {
                if (typescript_1.default.isIdentifier(node.name) &&
                    node.name.text == '_VirtualDom_nodeNS') {
                    return (0, create_1.create)('_VirtualDom_nodeNS', (0, create_1.ast)(newVDomNS4));
                }
            }
            // replace calls
            //   var $elm$html$Html$div = _VirtualDom_node("div");
            // with
            //   var $elm$html$Html$div = _VirtualDom_nodeNS(undefined, "div");
            if (typescript_1.default.isCallExpression(node) &&
                typescript_1.default.isIdentifier(node.expression) &&
                node.expression.text == '_VirtualDom_node' &&
                node.arguments.length == 1) {
                return typescript_1.default.createCall(typescript_1.default.createIdentifier('A2'), undefined, [
                    typescript_1.default.createIdentifier('_VirtualDom_nodeNS'),
                    typescript_1.default.createIdentifier('undefined'),
                    node.arguments[0],
                ]);
            }
            // replace calls to $elm$virtual_dom$VirtualDom$node with calls to _VirtualDom_nodeNS
            const replaced = replaceVDomWithNSInline(node);
            if (replaced) {
                return replaced;
            }
            // An alternative version of the above which is slower.
            // const replaced = replaceAPIVDomNodeWithF3A4(node)
            // if (replaced) {
            //   return replaced
            // }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
exports.replaceVDomNode = replaceVDomNode;
// replace calls to $elm$virtual_dom$VirtualDom$node with calls to _VirtualDom_nodeNS
function replaceVDomWithNSInline(node) {
    if (typescript_1.default.isCallExpression(node) &&
        node.expression &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'A3') {
        const [firstArg] = node.arguments;
        if (typescript_1.default.isIdentifier(firstArg) &&
            firstArg.text === '$elm$virtual_dom$VirtualDom$node') {
            return typescript_1.default.createCall(typescript_1.default.createIdentifier('A4'), undefined, [
                typescript_1.default.createIdentifier('_VirtualDom_nodeNS'),
                typescript_1.default.createIdentifier('undefined'),
                typescript_1.default.createCall(typescript_1.default.createIdentifier('_VirtualDom_noScript'), undefined, [
                    node.arguments[1],
                ]),
                node.arguments[2],
                node.arguments[3],
            ]);
        }
    }
    return undefined;
}
// replace calls
//    var $elm$virtual_dom$VirtualDom$node = function (tag) {
//        return _VirtualDom_node(_VirtualDom_noScript(tag));
//    };
// with
//   var $elm$virtual_dom$VirtualDom$node = _VirtualDom_nodeNS(undefined, "div");
// function replaceAPIVDomNodeWithF3A4(node: ts.Node): ts.Node | undefined {
//   if (
//     ts.isVariableDeclaration(node) &&
//     ts.isIdentifier(node.name) &&
//     node.name.text == '$elm$virtual_dom$VirtualDom$node' &&
//     node.initializer &&
//     ts.isFunctionExpression(node.initializer)
//   ) {
//     let newCall = ts.createCall(ts.createIdentifier('A4'), undefined, [
//       ts.createIdentifier('_VirtualDom_nodeNS'),
//       ts.createIdentifier('undefined'),
//       ts.createCall(ts.createIdentifier('_VirtualDom_noScript'), undefined, [
//         ts.createIdentifier('tag'),
//       ]),
//       ts.createIdentifier('attrs'),
//       ts.createIdentifier('kids'),
//     ]);
//     let newFn = ts.createCall(ts.createIdentifier('F3'), undefined, [
//       ts.createFunctionExpression(
//         undefined,
//         undefined,
//         undefined,
//         undefined,
//         [param('tag'), param('attrs'), param('kids')],
//         undefined,
//         ts.createBlock([ts.createReturn(newCall)])
//       ),
//     ]);
//     return ts.createVariableDeclaration(
//       '$elm$virtual_dom$VirtualDom$node',
//       undefined,
//       newFn
//     );
//   }
//   return undefined;
// }
// function param(name: string) {
//   return ts.createParameter(
//     undefined,
//     undefined,
//     undefined,
//     ts.createIdentifier(name),
//     undefined,
//     undefined,
//     undefined
//   );
// }
//# sourceMappingURL=adjustVirtualDom.js.map