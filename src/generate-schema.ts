import { SchemaField, generateDocString } from './generate-docs'
import { format, haveSameValues, toPascalCase } from './utils'
import config from './config.json'

const UNIQUE_IDENTIFIER_KEY = `declare const uniqueIdentifier: unique symbol`

const UNIQUE_IDENTIFIER = `
/**
 * This is a unique identifier to help TypeScript differentiate this interface from others sharing the same properties.
 * Refer to https://github.com/satohshi/pocketbase-ts#dealing-with-tables-with-exactly-the-same-properties for more information.
 */
readonly [uniqueIdentifier]: unique symbol
`

const TYPE_MAP: Record<string, string> = {
	number: 'number',
	bool: 'boolean',
	json: 'any',
	// everything else is "string"
}

export default () => {
	const allCollections = $app.findAllCollections() as Array<core.Collection>

	const collectionIdToNameMap = Object.fromEntries(
		allCollections.map((collection) => [collection.id, collection.name])
	)

	// interfaces
	let collectionInterfaces = ''
	const fieldSets: Set<string>[] = []
	for (const collection of allCollections) {
		const fields = new Set<string>()

		collectionInterfaces += `export interface ${toPascalCase(collection.name)} {\n`

		for (const fieldOptions of collection.fields as Array<core.Field>) {
			const name = fieldOptions.name
			const type = fieldOptions.type()
			const multipleValues = fieldOptions.isMultiple?.() ?? false

			if (config.includeDocs) {
				collectionInterfaces +=
					generateDocString(
						fieldOptions as SchemaField,
						multipleValues,
						collectionIdToNameMap
					) + '\n'
			}

			let field: string
			if (type === 'select') {
				const selectOptions = fieldOptions.values.map((v: string) => `'${v}'`).join(' | ')
				field = `${name}: ${multipleValues ? `(${selectOptions})[]` : selectOptions}`
			} else {
				const fieldType = TYPE_MAP[type] ?? 'string'
				field = `${name}: ${fieldType}${multipleValues ? '[]' : ''}`
			}

			fields.add(field)
			collectionInterfaces += field + '\n'
		}

		// add unique identifier if there are collections with the same set of fields
		if (fieldSets.some((set) => haveSameValues(set, fields))) {
			// add unique identifier at the top if there are collections with the same set of fields
			if (!collectionInterfaces.includes(UNIQUE_IDENTIFIER_KEY)) {
				collectionInterfaces = UNIQUE_IDENTIFIER_KEY + '\n\n' + collectionInterfaces
			}
			collectionInterfaces += UNIQUE_IDENTIFIER
		}

		collectionInterfaces += '}\n\n'

		fieldSets.push(fields)
	}

	// relations
	const collectionToRelationMap: Record<string, string[]> = {}
	for (const collection of allCollections) {
		const fieldsWithUniqueIndex = new Set(
			collection.indexes
				.filter((index) => index.includes('UNIQUE') && !index.includes(','))
				.map((index) => /^CREATE UNIQUE.+\(`?([^`\s]+).*\).*/.exec(index)![1])
		)

		for (const fieldSchema of collection.fields as Array<core.Field>) {
			// has to be outside if block for collections without relations
			collectionToRelationMap[collection.name] ??= []

			if (fieldSchema.type() === 'relation') {
				const isOptional = !fieldSchema.required
				const isToMany = fieldSchema.isMultiple()

				const relatedCollectionName = collectionIdToNameMap[fieldSchema.collectionId]!
				const hasUniqueConstraint = fieldsWithUniqueIndex.has(fieldSchema.name)

				// Forward relation
				collectionToRelationMap[collection.name]!.push(
					`${fieldSchema.name}${
						isOptional ? '?' : ''
					}: ${toPascalCase(relatedCollectionName)}${isToMany ? '[]' : ''}`
				)

				// back relation
				let backRelation = `${collection.name}_via_${fieldSchema.name}?: ${toPascalCase(collection.name)}`
				if (!hasUniqueConstraint) {
					backRelation = `// ${backRelation}[]`
				}
				collectionToRelationMap[relatedCollectionName] ??= []
				collectionToRelationMap[relatedCollectionName].push(backRelation)
			}
		}
	}

	// schema
	let schemaText = `/**
 * Commented-out back-relations are what will be inferred by pocketbase-ts from the forward relations.
 *
 * The "UNIQUE index constraint" case is automatically handled by this hook,
 * but if you want to make a back-relation non-nullable, you can uncomment it and remove the "?".
 *
 * See [here](https://github.com/satohshi/pocketbase-ts#back-relations) for more information.
 */
`
	schemaText += 'export type Schema = {\n'
	for (const [collection, relations] of Object.entries(collectionToRelationMap)) {
		schemaText += `${collection}: {\n`
		schemaText += `type: ${toPascalCase(collection)}\n`

		if (relations.length) {
			schemaText += `relations: {\n`

			for (const relation of relations) {
				schemaText += relation + '\n'
			}

			schemaText += `}\n`
		}
		schemaText += `}\n`
	}
	schemaText += `}\n`

	const data = format(collectionInterfaces + schemaText)
	$os.writeFile(config.outputPath, data, 0o644 as any)
}
