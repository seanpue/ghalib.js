"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordUpdate = void 0;
const typescript_1 = __importDefault(require("typescript"));
const create_1 = require("./utils/create");
const recordUpdate = () => (context) => (sourceFile) => {
    const registry = new RecordRegistry();
    const propSet = new Set();
    const updateSet = new Map();
    typescript_1.default.visitNode(sourceFile, registerUpdateStatements(propSet, updateSet, context));
    const replacedUpdates = typescript_1.default.visitNode(sourceFile, replaceUpdateStatements(updateSet, context));
    const replacedLiterals = typescript_1.default.visitNode(replacedUpdates, replaceObjectLiterals(propSet, registry, context));
    const recordStatements = createRecordStatements(registry);
    const reusableUpdateStatements = createReusableUpdateStatements(updateSet);
    const statementsToPrepend = recordStatements.concat(reusableUpdateStatements);
    const insertedCtors = typescript_1.default.visitNode(replacedLiterals, prependNodes(statementsToPrepend, context));
    return insertedCtors;
};
exports.recordUpdate = recordUpdate;
class RecordRegistry {
    constructor() {
        this.counter = 0;
        this.map = new Map();
    }
    register(recordAst) {
        const shapeId = recordAst.properties.
            map((it) => it.name.text).
            join(",");
        const possibleShape = this.map.get(shapeId);
        if (possibleShape) {
            return possibleShape;
        }
        const recordId = this.counter + 1;
        this.counter = recordId;
        const recordClassName = `$$Record${recordId}`;
        this.map.set(shapeId, recordClassName);
        return recordClassName;
    }
}
function registerUpdateStatements(propSet, updateSet, ctx) {
    const visitorHelp = (node) => {
        typescript_1.default.visitEachChild(node, visitorHelp, ctx);
        const updateExpression = isUpdateExpression(node);
        if (!updateExpression) {
            return node;
        }
        const objectLiteral = updateExpression.arguments[1];
        const objectProperties = Array.from(objectLiteral.properties);
        objectProperties.sort(objectLiteralPropertySort);
        // Add updated properties to propSet
        objectProperties.
            map((it) => it.name.text).
            forEach((it) => { propSet.add(it); });
        // Register how many times this particular update expression is being used
        const shape = objectProperties.map((it) => it.name.text).join(',');
        let num = updateSet.get(shape) || 0;
        num += 1;
        updateSet.set(shape, num);
        return node;
    };
    return visitorHelp;
}
function objectLiteralPropertySort(a, b) {
    var nameA = a.name.text;
    var nameB = b.name.text;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}
function replaceUpdateStatements(updateSet, ctx) {
    const visitorHelp = (node) => {
        const visitedNode = typescript_1.default.visitEachChild(node, visitorHelp, ctx);
        const updateExpression = isUpdateExpression(visitedNode);
        if (!updateExpression) {
            return visitedNode;
        }
        const objName = updateExpression.arguments[0].text;
        const objectLiteral = updateExpression.arguments[1];
        const objectProperties = Array.from(objectLiteral.properties);
        objectProperties.sort(objectLiteralPropertySort);
        const updateShape = objectProperties.map((it) => it.name.text).join(',');
        const updatePerformed = updateSet.get(updateShape) || 0;
        if (updatePerformed > 1) {
            return generateCodeForReusableUpdate(objName, updateShape, objectProperties);
        }
        return generateCodeForSingleUpdate(objName, objectProperties);
    };
    return visitorHelp;
}
function isUpdateExpression(node) {
    if (typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === '_Utils_update') {
        return node;
    }
    return null;
}
function generateCodeForReusableUpdate(objName, shape, objectProperties) {
    const updateFnName = `$$update__${shape.replace(/,/g, '__')}`;
    const initialArgs = [typescript_1.default.createIdentifier(objName)];
    const newValues = objectProperties.map((it) => it.initializer);
    const args = initialArgs.concat(newValues);
    return typescript_1.default.createCall(typescript_1.default.createIdentifier(updateFnName), undefined, args);
}
function generateCodeForSingleUpdate(objName, objectProperties) {
    const copyId = typescript_1.default.createIdentifier('$r');
    const cloneObj = typescript_1.default.createVariableStatement(undefined, typescript_1.default.createVariableDeclarationList([
        typescript_1.default.createVariableDeclaration(copyId, undefined, typescript_1.default.createCall(typescript_1.default.createPropertyAccess(typescript_1.default.createIdentifier(objName), typescript_1.default.createIdentifier('$c')), undefined, []))
    ]));
    const propSetters = objectProperties.
        map((it) => typescript_1.default.createExpressionStatement(typescript_1.default.createBinary(typescript_1.default.createPropertyAccess(copyId, it.name), typescript_1.default.createToken(typescript_1.default.SyntaxKind.EqualsToken), it.initializer)));
    const retStmt = typescript_1.default.createReturn(copyId);
    propSetters.push(retStmt);
    const block = [cloneObj].concat(propSetters);
    return typescript_1.default.createImmediatelyInvokedFunctionExpression(block);
}
function replaceObjectLiterals(propSet, registry, ctx) {
    const visitorHelp = (node) => {
        if (isTupleConstructor(node)) {
            return node;
        }
        const visitedNode = typescript_1.default.visitEachChild(node, visitorHelp, ctx);
        const objectLiteral = isRecordLiteral(visitedNode);
        if (!objectLiteral) {
            return visitedNode;
        }
        // Abort of none of the record properties are used in an update expression
        const recordPropNames = objectLiteral.properties.map((it) => it.name.text);
        if (!recordPropNames.some((it) => propSet.has(it))) {
            return visitedNode;
        }
        const recordClassName = registry.register(objectLiteral);
        const recordConstruction = typescript_1.default.createParen(typescript_1.default.createNew(typescript_1.default.createIdentifier(recordClassName), undefined, objectLiteral.properties.map((it) => it.initializer)));
        return recordConstruction;
    };
    return visitorHelp;
}
function isTupleConstructor(node) {
    var _a, _b;
    return typescript_1.default.isFunctionDeclaration(node) &&
        (((_a = node.name) === null || _a === void 0 ? void 0 : _a.text) === '_Utils_Tuple2' || ((_b = node.name) === null || _b === void 0 ? void 0 : _b.text) === '_Utils_Tuple3');
}
function isRecordLiteral(node) {
    var _a, _b;
    if (typescript_1.default.isObjectLiteralExpression(node) && node.properties[0] && ((_b = (_a = node.properties[0]) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.text) !== '$') {
        return node;
    }
    return null;
}
function createRecordStatements(registry) {
    const statementString = Array.from(registry.map.entries()).
        map((it) => createRecordStatement(it[1].valueOf(), it[0].split(','))).join('\n');
    return (0, create_1.astNodes)(statementString);
}
function createRecordStatement(className, props) {
    const propList = props.join(',');
    const propSetters = props.
        map((name) => `this.${name} = ${name};`).
        join(' ');
    const propGetters = props.
        map((name) => `this.${name}`).
        join(', ');
    return `
        function ${className}(${propList}) {
            ${propSetters}
        }

        ${className}.prototype.$c = function() {
            return new ${className}(${propGetters});
        }
    `;
}
function createReusableUpdateStatements(updateSet) {
    const statementString = Array.from(updateSet.entries()).
        filter((it) => it[1] > 1).
        map((it) => createReusableUpdateStatement(it[0])).
        join('\n');
    return (0, create_1.astNodes)(statementString);
}
function createReusableUpdateStatement(shape) {
    const updateFnName = `$$update__${shape.replace(/,/g, '__')}`;
    const props = shape.split(',');
    const propSetters = props.
        map((name) => `$r.${name} = ${name};`).
        join(' ');
    const propList = ['obj'].concat(props).join(',');
    return `
        function ${updateFnName}(${propList}) {
            var $r = obj.$c();
            ${propSetters}
            return $r;
        }
    `;
}
function prependNodes(nodes, ctx) {
    const visitorHelp = (node) => {
        if (isFirstFWrapper(node)) {
            return nodes.concat(node);
        }
        return typescript_1.default.visitEachChild(node, visitorHelp, ctx);
    };
    return visitorHelp;
}
function isFirstFWrapper(node) {
    var _a;
    return typescript_1.default.isFunctionDeclaration(node) && ((_a = node === null || node === void 0 ? void 0 : node.name) === null || _a === void 0 ? void 0 : _a.text) === 'F';
}
//# sourceMappingURL=recordUpdate.js.map