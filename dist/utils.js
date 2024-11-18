"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newLine = newLine;
exports.toPascalCase = toPascalCase;
exports.haveSameValues = haveSameValues;
function newLine(indent, str, newLine = 1) {
    return '    '.repeat(indent) + str + '\n'.repeat(newLine);
}
function toPascalCase(collectionName) {
    return collectionName
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
function haveSameValues(set1, set2) {
    if (set1.size !== set2.size)
        return false;
    return [...set1].every((value) => set2.has(value));
}
