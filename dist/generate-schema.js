"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_docs_1 = require("./generate-docs");
const utils_1 = require("./utils");
const PATH_TO_SCHEMA_FILE = './schema.ts';
const UNIQUE_IDENTIFIER_KEY = `declare const uniqueIdentifier: unique symbol`;
const UNIQUE_IDENTIFIER = `
	/**
	 * This is a unique identifier to help TypeScript differentiate this interface from others sharing the same properties.
	 * Refer to https://github.com/satohshi/pocketbase-ts#dealing-with-tables-with-exactly-the-same-properties for more information.
	 */
	readonly [uniqueIdentifier]: unique symbol
`;
const BASE_COLLECTION_INTERFACE = `interface BaseCollection {
    id: string
    created: string
    updated: string
}`;
const AUTH_COLLECTION_INTERFACE = `interface AuthCollection extends BaseCollection {
    username: string
    email: string
    emailVisibility: boolean
    verified: boolean
}`;
const VIEW_COLLECTION_INTERFACE = `interface ViewCollection {
    id: string
}`;
const COLLECTOIN_TYPE_MAP = {
    base: 'BaseCollection',
    auth: 'AuthCollection',
    view: 'ViewCollection',
};
const TYPE_MAP = {
    number: 'number',
    bool: 'boolean',
    json: 'any',
};
exports.default = () => {
    var _a, _b, _c, _d, _e;
    var _f;
    const allCollections = [
        ...$app.dao().findCollectionsByType('auth'),
        ...$app.dao().findCollectionsByType('base'),
        ...$app.dao().findCollectionsByType('view'),
    ];
    const collectionIdToNameMap = Object.fromEntries(allCollections.map((collection) => [collection.id, collection.name]));
    let addedUniqueKey = false;
    let collectionInterfaces = (0, utils_1.newLine)(0, BASE_COLLECTION_INTERFACE, 2) +
        (0, utils_1.newLine)(0, AUTH_COLLECTION_INTERFACE, 2) +
        (0, utils_1.newLine)(0, VIEW_COLLECTION_INTERFACE, 2);
    const fieldSets = [];
    for (const collection of allCollections) {
        const fields = new Set();
        collectionInterfaces += (0, utils_1.newLine)(0, `export interface ${(0, utils_1.toPascalCase)(collection.name)} extends ${COLLECTOIN_TYPE_MAP[collection.type]} {`);
        for (const field of collection.schema.fields()) {
            const { type, name, options } = field;
            const multipleValues = (_b = (_a = options.isMultiple) === null || _a === void 0 ? void 0 : _a.call(options)) !== null && _b !== void 0 ? _b : false;
            collectionInterfaces += (0, utils_1.newLine)(1, (0, generate_docs_1.generateDocString)(field, multipleValues, collectionIdToNameMap));
            if (type === 'select') {
                const selectOptions = options.values.map((v) => `'${v}'`).join(' | ');
                const field = `${name}: ${multipleValues ? `(${selectOptions})[]` : selectOptions}`;
                fields.add(field);
                collectionInterfaces += (0, utils_1.newLine)(1, field);
            }
            else {
                const fieldType = (_c = TYPE_MAP[type]) !== null && _c !== void 0 ? _c : 'string';
                const field = `${name}: ${fieldType}${multipleValues ? '[]' : ''}`;
                fields.add(field);
                collectionInterfaces += (0, utils_1.newLine)(1, field);
            }
        }
        if (fieldSets.some((set) => (0, utils_1.haveSameValues)(set, fields))) {
            if (!addedUniqueKey) {
                collectionInterfaces = (0, utils_1.newLine)(0, UNIQUE_IDENTIFIER_KEY, 2) + collectionInterfaces;
                addedUniqueKey = true;
            }
            collectionInterfaces += (0, utils_1.newLine)(1, UNIQUE_IDENTIFIER);
        }
        collectionInterfaces += (0, utils_1.newLine)(0, '}', 2);
        fieldSets.push(fields);
    }
    const collectionToRelationMap = {};
    for (const collection of allCollections) {
        const fieldsWithUniqueIndex = new Set(collection.indexes
            .filter((index) => {
            return index.includes('UNIQUE') && !index.includes('\n');
        })
            .map((index) => /^CREATE UNIQUE.+\(`(.+)`\)$/.exec(index)[1]));
        for (const fieldSchema of collection.schema.fields()) {
            (_d = collectionToRelationMap[_f = collection.name]) !== null && _d !== void 0 ? _d : (collectionToRelationMap[_f] = []);
            if (fieldSchema.type === 'relation') {
                const isOptional = !fieldSchema.required;
                const isToMany = Number(fieldSchema.options.maxSelect) !== 1;
                const relatedCollectionName = collectionIdToNameMap[fieldSchema.options.collectionId];
                const hasUniqueConstraint = fieldsWithUniqueIndex.has(fieldSchema.name);
                collectionToRelationMap[collection.name].push(`${fieldSchema.name}${isOptional ? '?' : ''}: ${(0, utils_1.toPascalCase)(relatedCollectionName)}${isToMany ? '[]' : ''}`);
                (_e = collectionToRelationMap[relatedCollectionName]) !== null && _e !== void 0 ? _e : (collectionToRelationMap[relatedCollectionName] = []);
                collectionToRelationMap[relatedCollectionName].push(`${collection.name}_via_${fieldSchema.name}?: ${(0, utils_1.toPascalCase)(collection.name)}${hasUniqueConstraint ? '' : '[]'}`);
            }
        }
    }
    let schemaText = (0, utils_1.newLine)(0, 'export type Schema = {');
    for (const [collection, relations] of Object.entries(collectionToRelationMap)) {
        schemaText += (0, utils_1.newLine)(1, `${collection}: {`);
        schemaText += (0, utils_1.newLine)(2, `type: ${(0, utils_1.toPascalCase)(collection)}`);
        if (relations.length) {
            schemaText += (0, utils_1.newLine)(2, `relations: {`);
            for (const relation of relations) {
                schemaText += (0, utils_1.newLine)(3, relation);
            }
            schemaText += (0, utils_1.newLine)(2, `}`);
        }
        schemaText += (0, utils_1.newLine)(1, `}`);
    }
    schemaText += (0, utils_1.newLine)(0, `}`);
    $os.writeFile(PATH_TO_SCHEMA_FILE, collectionInterfaces + schemaText, 0o644);
};
