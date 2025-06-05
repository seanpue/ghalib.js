"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitives = void 0;
// List variants
const nil = {
    typeName: 'List',
    name: 'Nil',
    jsName: '_List_Nil',
    index: 0,
    slots: [],
    totalTypeSlotCount: 2,
};
const cons = {
    typeName: 'List',
    name: 'Cons',
    jsName: '_List_Nil',
    index: 1,
    slots: ['a'],
    totalTypeSlotCount: 2,
};
const listVariants = [nil, cons];
// Maybe variants
const nothing = {
    typeName: 'Maybe',
    name: 'Nothing',
    jsName: '$elm$core$Maybe$Nothing',
    index: 1,
    slots: [],
    totalTypeSlotCount: 1,
};
const just = {
    typeName: 'Maybe',
    name: 'Just',
    jsName: '$elm$core$Maybe$Just',
    index: 0,
    slots: ['a'],
    totalTypeSlotCount: 1,
};
const maybe = [nothing, just];
exports.primitives = listVariants.concat(maybe);
//# sourceMappingURL=primitives.js.map