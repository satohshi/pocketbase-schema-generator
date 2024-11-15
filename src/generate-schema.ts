/// <reference path="../pb/pb_data/types.d.ts" />

const PATH_TO_SCHEMA_FILE = './schema.ts'

const UNIQUE_IDENTIFIER = `declare const uniqueIdentifier: unique symbol`

const BASE_COLLECTION_INTERFACE = `
interface BaseCollection {
    id: string
    created: string
    updated: string
}`

const AUTH_COLLECTION_INTERFACE = `
interface AuthCollection extends BaseCollection {
    username: string
    email: string
    emailVisibility: boolean
    verified: boolean
}`

const VIEW_COLLECTION_INTERFACE = `
interface ViewCollection {
    id: string
}`

const COLLECTOIN_TYPE_MAP: Record<string, string> = {
	base: 'BaseCollection',
	auth: 'AuthCollection',
	view: 'ViewCollection',
}

const TYPE_MAP: Record<string, string> = {
	text: 'string',
	editor: 'string',
	number: 'number',
	bool: 'boolean',
	email: 'string',
	url: 'string',
	date: 'string',
	relation: 'string',
	file: 'string',
	json: 'any',
}

export default () => {
	const allCollections = [
		...$app.dao().findCollectionsByType('base'),
		...$app.dao().findCollectionsByType('auth'),
		...$app.dao().findCollectionsByType('view'),
	] as Array<models.Collection>

	const collectionIdToNameMap = Object.fromEntries(
		allCollections.map((collection) => [collection.id, collection.name])
	)

	// interfaces
	let collectionInterfaces =
		newLine(0, UNIQUE_IDENTIFIER, 1) +
		newLine(0, BASE_COLLECTION_INTERFACE, 1) +
		newLine(0, AUTH_COLLECTION_INTERFACE, 1) +
		newLine(0, VIEW_COLLECTION_INTERFACE, 2)
	for (const collection of allCollections) {
		collectionInterfaces += newLine(
			0,
			`export interface ${toPascalCase(collection.name)} extends ${
				COLLECTOIN_TYPE_MAP[collection.type]
			} {`
		)

		for (const field of collection.schema.fields() as Array<SchemaField>) {
			const { type, name, options } = field

			const multipleValues =
				['file', 'relation', 'select'].includes(type) && Number(options.maxSelect) !== 1

			if (type === 'select') {
				const selectOptions = options.values.map((v: string) => `'${v}'`).join(' | ')

				collectionInterfaces += newLine(
					1,
					`${name}: ${multipleValues ? `(${selectOptions})[]` : selectOptions}`
				)
			} else {
				const fieldType = TYPE_MAP[type]
				collectionInterfaces += newLine(
					1,
					`${name}: ${fieldType}${multipleValues ? '[]' : ''}`
				)
			}
		}

		collectionInterfaces += newLine(1, 'readonly [uniqueIdentifier]: unique symbol')
		collectionInterfaces += newLine(0, '}', 2)
	}

	// relations
	const relFieldMap: Record<string, string[]> = {}
	for (const collection of allCollections) {
		const fieldsWithUniqueIndex = new Set(
			collection.indexes
				.filter((index) => {
					return index.includes('UNIQUE') && !index.includes('\n')
				})
				.map((index) => /^CREATE UNIQUE.+\(`(.+)`\)$/.exec(index)![1])
		)

		for (const fieldSchema of collection.schema.fields() as Array<SchemaField>) {
			if (fieldSchema.type === 'relation') {
				const isOptional = !fieldSchema.required
				const isToMany = Number(fieldSchema.options.maxSelect) !== 1
				const relatedCollectionName =
					collectionIdToNameMap[fieldSchema.options.collectionId]!
				const hasUniqueConstraint = fieldsWithUniqueIndex.has(fieldSchema.name)

				// Forward relation
				relFieldMap[collection.name] ??= []
				relFieldMap[collection.name]!.push(
					`${fieldSchema.name}${
						isOptional ? '?' : ''
					}: ${toPascalCase(relatedCollectionName)}${isToMany ? '[]' : ''}`
				)

				// Back relation
				relFieldMap[relatedCollectionName] ??= []
				relFieldMap[relatedCollectionName].push(
					`${collection.name}_via_${fieldSchema.name}?: ${toPascalCase(collection.name)}${
						hasUniqueConstraint ? '' : '[]'
					}`
				)
			}
		}
	}

	// schema
	let schemaText = newLine(0, 'export type Schema = {')
	for (const [collection, relFields] of Object.entries(relFieldMap)) {
		schemaText += newLine(1, `${collection}: {`)
		schemaText += newLine(2, `type: ${toPascalCase(collection)}`)

		if (relFields.length) {
			schemaText += newLine(2, `relFields: {`)

			for (const relField of relFields) {
				schemaText += newLine(3, relField)
			}

			schemaText += newLine(2, `}`)
		}
		schemaText += newLine(1, `}`)
	}
	schemaText += newLine(0, `}`)

	$os.writeFile(PATH_TO_SCHEMA_FILE, collectionInterfaces + schemaText, 0o644 as any)
}

/**
 * Utils
 */
function newLine(indent: number, str: string, newLine = 1) {
	return '    '.repeat(indent) + str + '\n'.repeat(newLine)
}

function toPascalCase(collectionName: string) {
	return collectionName
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('')
}
