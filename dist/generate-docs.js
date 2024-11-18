"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocString = void 0;
const generateDocString = (options, multiple, collectionMap) => {
    const optionEntries = Object.entries(options.options)
        .filter(([key, value]) => {
        const unnecessaryKeys = ['isMultiple', 'validate', 'displayFields', 'values'];
        if (!multiple) {
            unnecessaryKeys.push('maxSelect', 'minSelect');
        }
        const hasValue = value !== null &&
            (Array.isArray(value) ? value.length > 0 : value.toString() !== '');
        return hasValue && !unnecessaryKeys.includes(key);
    })
        .map(([key, value]) => {
        if (Array.isArray(value)) {
            return [key, `${value.map((v) => `\`${v}\``).join(', ')}`];
        }
        return [key, `\`${value}\``];
    });
    const typeNameStr = `\`${options.type}${['file', 'relation', 'select'].includes(options.type)
        ? multiple
            ? '(multiple)'
            : '(single)'
        : ''}\``;
    const requiredStr = `\`${options.required}\``;
    const relatedCollectionNameStr = options.type === 'relation' ? `\`${collectionMap[options.options.collectionId]}\`` : '';
    const leftColWidth = Math.max(options.type === 'relation' ? 14 : 8, ...optionEntries.map(([key]) => key.length));
    const rightColWidth = Math.max(options.type === 'relation' ? 15 : 0, relatedCollectionNameStr.length, typeNameStr.length, requiredStr.length, ...optionEntries.map(([_, value]) => value.length));
    const rows = [
        `/**`,
        `| ${' '.repeat(leftColWidth)} | ${' '.repeat(rightColWidth)} |`,
        `| ${'-'.repeat(leftColWidth)} | :${'-'.repeat(rightColWidth - 2)}: |`,
        `| ${'type'.padEnd(leftColWidth, ' ')} | ${typeNameStr.padEnd(rightColWidth, ' ')} |`,
        `| ${'required'.padEnd(leftColWidth, ' ')} | ${requiredStr.padEnd(rightColWidth, ' ')} |`,
    ];
    for (const [key, value] of optionEntries) {
        rows.push(`| ${key.padEnd(leftColWidth, ' ')} | ${value.padEnd(rightColWidth, ' ')} |`);
        if (key === 'collectionId') {
            rows.push(`| collectionName | ${relatedCollectionNameStr.padEnd(rightColWidth, ' ')} |`);
        }
    }
    return rows.join('\n     * ') + '\n     */';
};
exports.generateDocString = generateDocString;
