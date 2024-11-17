/// <reference path="../pb/pb_data/types.d.ts" />

const PATH_TO_SCHEMA_FILE = './schema.ts'

const UNIQUE_IDENTIFIER_KEY = `declare const uniqueIdentifier: unique symbol`

const UNIQUE_IDENTIFIER = `
	/**
	 * This is a unique identifier to help TypeScript differentiate this interface from others sharing the same properties.
	 * Refer to https://github.com/satohshi/pocketbase-ts#dealing-with-tables-with-exactly-the-same-properties for more information.
	 */
	readonly [uniqueIdentifier]: unique symbol
`

const BASE_COLLECTION_INTERFACE = `interface BaseCollection {
    id: string
    created: string
    updated: string
}`

const AUTH_COLLECTION_INTERFACE = `interface AuthCollection extends BaseCollection {
    username: string
    email: string
    emailVisibility: boolean
    verified: boolean
}`

const VIEW_COLLECTION_INTERFACE = `interface ViewCollection {
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
	const startedAt = Date.now()
	const allCollections = [
		...$app.dao().findCollectionsByType('auth'),
		...$app.dao().findCollectionsByType('base'),
		...$app.dao().findCollectionsByType('view'),
	] as Array<models.Collection>

	const collectionIdToNameMap = Object.fromEntries(
		allCollections.map((collection) => [collection.id, collection.name])
	)

	// interfaces
	let hasOverlap = false
	let collectionInterfaces =
		newLine(0, BASE_COLLECTION_INTERFACE, 2) +
		newLine(0, AUTH_COLLECTION_INTERFACE, 2) +
		newLine(0, VIEW_COLLECTION_INTERFACE, 2)
	const fieldSets: Set<string>[] = []
	for (const collection of allCollections) {
		const fields = new Set<string>()

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

				const field = `${name}: ${multipleValues ? `(${selectOptions})[]` : selectOptions}`
				fields.add(field)

				collectionInterfaces += newLine(1, field)
			} else {
				const fieldType = TYPE_MAP[type]

				const field = `${name}: ${fieldType}${multipleValues ? '[]' : ''}`
				fields.add(field)

				collectionInterfaces += newLine(1, field)
			}
		}

		// add unique identifier if there are collections with the same set of fields
		if (fieldSets.some((set) => haveSameValues(set, fields))) {
			hasOverlap = true
			collectionInterfaces += newLine(1, UNIQUE_IDENTIFIER)
		}

		collectionInterfaces += newLine(0, '}', 2)

		fieldSets.push(fields)
	}

	// add unique identifier at the top if there are collections with the same set of fields
	if (hasOverlap) {
		collectionInterfaces = newLine(0, UNIQUE_IDENTIFIER_KEY, 2) + collectionInterfaces
	}

	// relations
	const collectionToRelationMap: Record<string, string[]> = {}
	for (const collection of allCollections) {
		const fieldsWithUniqueIndex = new Set(
			collection.indexes
				.filter((index) => {
					return index.includes('UNIQUE') && !index.includes('\n')
				})
				.map((index) => /^CREATE UNIQUE.+\(`(.+)`\)$/.exec(index)![1])
		)

		for (const fieldSchema of collection.schema.fields() as Array<SchemaField>) {
			// has to be outside if block for collections without relations
			collectionToRelationMap[collection.name] ??= []

			if (fieldSchema.type === 'relation') {
				const isOptional = !fieldSchema.required
				const isToMany = Number(fieldSchema.options.maxSelect) !== 1
				const relatedCollectionName =
					collectionIdToNameMap[fieldSchema.options.collectionId]!
				const hasUniqueConstraint = fieldsWithUniqueIndex.has(fieldSchema.name)

				// Forward relation
				collectionToRelationMap[collection.name]!.push(
					`${fieldSchema.name}${
						isOptional ? '?' : ''
					}: ${toPascalCase(relatedCollectionName)}${isToMany ? '[]' : ''}`
				)

				// Back relation
				collectionToRelationMap[relatedCollectionName] ??= []
				collectionToRelationMap[relatedCollectionName].push(
					`${collection.name}_via_${fieldSchema.name}?: ${toPascalCase(collection.name)}${
						hasUniqueConstraint ? '' : '[]'
					}`
				)
			}
		}
	}

	// schema
	let schemaText = newLine(0, 'export type Schema = {')
	for (const [collection, relations] of Object.entries(collectionToRelationMap)) {
		schemaText += newLine(1, `${collection}: {`)
		schemaText += newLine(2, `type: ${toPascalCase(collection)}`)

		if (relations.length) {
			schemaText += newLine(2, `relations: {`)

			for (const relation of relations) {
				schemaText += newLine(3, relation)
			}

			schemaText += newLine(2, `}`)
		}
		schemaText += newLine(1, `}`)
	}
	schemaText += newLine(0, `}`)

	console.log(`Generated schema.ts in ${Date.now() - startedAt}ms`)

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

function haveSameValues(set1: Set<string>, set2: Set<string>) {
	if (set1.size !== set2.size) return false
	return [...set1].every((value) => set2.has(value))
}
