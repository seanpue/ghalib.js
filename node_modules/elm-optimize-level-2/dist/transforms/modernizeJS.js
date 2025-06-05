"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToObjectShorthandLiterals = exports.convertFunctionExpressionsToArrowFuncs = exports.objectUpdate = void 0;
const typescript_1 = __importDefault(require("typescript"));
const types_1 = require("../types");
const create_1 = require("./utils/create");
const copyWithSpread = `
const _Utils_update = (oldRecord, updatedFields) => {
    var newRecord = {...oldRecord};
    
    for (var key in updatedFields) {
        newRecord[key] = updatedFields[key];
    }
    return newRecord;
}
`;
const spreadForBoth = `
const _Utils_update = (oldRecord, updatedFields) => ({...oldRecord, ...updatedFields});
}
`;
const assign = `
const _Utils_update = (oldRecord, updatedFields) => (Object.assign({}, oldRecord, updatedFields));
}
`;
const objectUpdate = (kind) => {
    switch (kind) {
        case types_1.ObjectUpdate.UseSpreadForUpdateAndOriginalRecord:
            return createReplaceUtilsUpdateWithObjectSpread(kind);
        case types_1.ObjectUpdate.UseSpreadOnlyToMakeACopy:
            return createReplaceUtilsUpdateWithObjectSpread(kind);
        case types_1.ObjectUpdate.UseAssign:
            return createReplaceUtilsUpdateWithObjectSpread(kind);
        case types_1.ObjectUpdate.InlineAssign:
            return inlineObjectAssign();
        case types_1.ObjectUpdate.InlineSpread:
            return inlineObjectSpread();
    }
};
exports.objectUpdate = objectUpdate;
const createReplaceUtilsUpdateWithObjectSpread = (kind) => (context) => {
    return (sourceFile) => {
        const visitor = (node) => {
            var _a;
            // detects function f(..){..}
            if (typescript_1.default.isFunctionDeclaration(node) &&
                ((_a = node.name) === null || _a === void 0 ? void 0 : _a.text) === '_Utils_update') {
                switch (kind) {
                    case types_1.ObjectUpdate.UseSpreadForUpdateAndOriginalRecord:
                        return (0, create_1.ast)(spreadForBoth);
                    case types_1.ObjectUpdate.UseSpreadOnlyToMakeACopy:
                        return (0, create_1.ast)(copyWithSpread);
                    case types_1.ObjectUpdate.UseAssign:
                        return (0, create_1.ast)(assign);
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
const OBJECT_UPDATE = '_Utils_update';
const inlineObjectAssign = () => (context) => {
    return (sourceFile) => {
        const visitor = (node) => {
            // detects function f(..){..}
            if (typescript_1.default.isCallExpression(node)) {
                if (typescript_1.default.isIdentifier(node.expression) &&
                    node.expression.text === OBJECT_UPDATE) {
                    return typescript_1.default.createCall(typescript_1.default.createIdentifier('Object.assign'), undefined, [typescript_1.default.createObjectLiteral(), node.arguments[0], node.arguments[1]]);
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
const inlineObjectSpread = () => (context) => {
    return (sourceFile) => {
        const visitor = (node) => {
            // detects function f(..){..}
            if (typescript_1.default.isCallExpression(node)) {
                if (typescript_1.default.isIdentifier(node.expression) &&
                    node.expression.text === OBJECT_UPDATE) {
                    let props = [];
                    node.arguments[1].forEachChild((child) => {
                        if (typescript_1.default.isPropertyAssignment(child)) {
                            props.push(typescript_1.default.createPropertyAssignment(child.name, child.initializer));
                        }
                    });
                    return typescript_1.default.createObjectLiteral([typescript_1.default.createSpreadAssignment(node.arguments[0])].concat(props));
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
const convertFunctionExpressionsToArrowFuncs = (context) => {
    return (sourceFile) => {
        const visitor = (node) => {
            //   console.log(
            //     `Visiting: ${ts.SyntaxKind[node.kind]} with name ${
            //       (node as any).name?.text
            //     }`
            //   );
            if (typescript_1.default.isFunctionExpression(node) &&
                node.name === undefined &&
                node.body.statements.length === 1) {
                // console.log('$$body', node.body.getText());
                const [returnStatement] = node.body.statements;
                if (typescript_1.default.isReturnStatement(returnStatement) &&
                    returnStatement.expression !== undefined) {
                    return typescript_1.default.createArrowFunction(undefined, undefined, node.parameters, undefined, undefined, typescript_1.default.visitNode(returnStatement.expression, visitor)
                    // returnStatement.expression
                    );
                }
            }
            if (typescript_1.default.isFunctionDeclaration(node) &&
                node.name !== undefined &&
                node.body !== undefined &&
                node.body.statements.length === 1) {
                // console.log('$$body', node.body.getText());
                const [returnStatement] = node.body.statements;
                if (typescript_1.default.isReturnStatement(returnStatement) &&
                    returnStatement.expression !== undefined) {
                    return typescript_1.default.createVariableStatement(undefined, typescript_1.default.createVariableDeclarationList([
                        typescript_1.default.createVariableDeclaration(node.name, undefined, typescript_1.default.createArrowFunction(undefined, undefined, node.parameters, undefined, undefined, typescript_1.default.visitNode(returnStatement.expression, visitor))),
                    ]
                    // ts.NodeFlags.Const
                    ));
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        return typescript_1.default.visitNode(sourceFile, visitor);
    };
};
exports.convertFunctionExpressionsToArrowFuncs = convertFunctionExpressionsToArrowFuncs;
const convertToObjectShorthandLiterals = (context) => {
    return (sourceFile) => {
        let shortenedCount = 0;
        const visitor = (node) => {
            if (typescript_1.default.isObjectLiteralExpression(node)) {
                let hasAnyTransforms = false;
                const props = [];
                for (const prop of node.properties) {
                    if (typescript_1.default.isPropertyAssignment(prop)) {
                        if (typescript_1.default.isIdentifier(prop.name) &&
                            typescript_1.default.isIdentifier(prop.initializer) &&
                            prop.name.text === prop.initializer.text) {
                            // bingo
                            props.push(typescript_1.default.createShorthandPropertyAssignment(prop.name.text));
                            shortenedCount += 1;
                            hasAnyTransforms = true;
                        }
                        else {
                            const visitedAssignment = typescript_1.default.visitNode(prop.initializer, visitor);
                            if (visitedAssignment === prop.initializer) {
                                // found nothing in initializer
                                props.push(prop);
                            }
                            else {
                                // initializer has some transforms too
                                hasAnyTransforms = true;
                                props.push(typescript_1.default.updatePropertyAssignment(prop, prop.name, visitedAssignment));
                            }
                        }
                    }
                    else {
                        props.push(prop);
                    }
                }
                if (hasAnyTransforms) {
                    return typescript_1.default.updateObjectLiteral(node, props);
                }
            }
            return typescript_1.default.visitEachChild(node, visitor, context);
        };
        const res = typescript_1.default.visitNode(sourceFile, visitor);
        console.log('convertToObjectsShorthand -> shortened assignments:', shortenedCount);
        return res;
    };
};
exports.convertToObjectShorthandLiterals = convertToObjectShorthandLiterals;
//# sourceMappingURL=modernizeJS.js.map