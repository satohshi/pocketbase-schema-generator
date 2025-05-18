import { format, haveSameValues, toPascalCase } from '../utils'
import {
	autodateFieldSchema,
	boolFieldSchema,
	dateFieldSchema,
	editorFieldSchema,
	emailFieldSchema,
	fileFieldSchema,
	geoPointSchema,
	jsonFieldSchema,
	numberFieldSchema,
	passwordFieldSchema,
	relationFieldSchema,
	selectFieldSchema,
	textFieldSchema,
	urlFieldSchema,
} from './field-handlers'
import config from '../../config.json'
import type { CollectionTypeName } from '../types'

export function generateTsSchema(
	includeSystemCollections = config.tsSchema.includeSystemCollections
) {
	const collections = ($app.findAllCollections() as Array<core.Collection>).filter(
		(c) => includeSystemCollections || !c.system
	)

	const collectionInterfaces = getCollectionInterfaces(collections)
	const pbTsSchema = getPbTsSchema(collections)

	return format(collectionInterfaces + pbTsSchema)
}

function getCollectionInterfaces(collections: Array<core.Collection>) {
	const UNIQUE_IDENTIFIER_KEY = `declare const uniqueIdentifier: unique symbol`
	const UNIQUE_IDENTIFIER = `
/**
 * This is a unique identifier to help TypeScript differentiate this interface from others sharing the same properties.
 * Refer to https://github.com/satohshi/pocketbase-ts#dealing-with-tables-with-exactly-the-same-properties for more information.
 */
readonly [uniqueIdentifier]: unique symbol
`

	const collectionIdToNameMap = new Map(
		collections.map((collection) => [collection.id, collection.name])
	)

	const fieldSets: Set<string>[] = []

	const overrides = (config as Config).tsSchema.overrides

	let collectionInterfaces = ''
	for (const collection of collections) {
		const fields = new Set<string>()

		collectionInterfaces += `export interface ${toPascalCase(collection.name)} {\n`

		for (const fieldOptions of collection.fields as Array<core.Field>) {
			const fieldType = fieldOptions.type() as CollectionTypeName

			let schema!: [string, string]
			switch (fieldType) {
				case 'text':
					schema = textFieldSchema(fieldOptions as TextField)
					break
				case 'password':
					schema = passwordFieldSchema(fieldOptions as PasswordField)
					break
				case 'editor':
					schema = editorFieldSchema(fieldOptions as EditorField)
					break
				case 'number':
					schema = numberFieldSchema(fieldOptions as NumberField)
					break
				case 'bool':
					schema = boolFieldSchema(fieldOptions as BoolField)
					break
				case 'email':
					schema = emailFieldSchema(fieldOptions as EmailField)
					break
				case 'url':
					schema = urlFieldSchema(fieldOptions as URLField)
					break
				case 'date':
					schema = dateFieldSchema(fieldOptions as DateField)
					break
				case 'autodate':
					schema = autodateFieldSchema(fieldOptions as AutodateField)
					break
				case 'select':
					schema = selectFieldSchema(fieldOptions as SelectField)
					break
				case 'file':
					schema = fileFieldSchema(fieldOptions as FileField)
					break
				case 'relation':
					schema = relationFieldSchema({
						...(fieldOptions as RelationField),
						collectionName: collectionIdToNameMap.get(fieldOptions.collectionId)!,
					})
					break
				case 'json':
					schema = jsonFieldSchema({
						...(fieldOptions as JSONField),
						override: overrides?.[collection.name]?.[fieldOptions.name],
					})
					break
				case 'geoPoint':
					schema = geoPointSchema(fieldOptions as GeoPointField)
					break
				default:
					fieldType satisfies never
			}

			const [typeDef, docs] = schema
			collectionInterfaces += docs ? `${docs}\n${typeDef}\n` : `${typeDef}\n`

			fields.add(typeDef)
		}

		if (fieldSets.some((set) => haveSameValues(set, fields))) {
			if (!collectionInterfaces.startsWith(UNIQUE_IDENTIFIER_KEY)) {
				collectionInterfaces = UNIQUE_IDENTIFIER_KEY + '\n\n' + collectionInterfaces
			}
			collectionInterfaces += UNIQUE_IDENTIFIER
		}

		collectionInterfaces += '}\n\n'

		fieldSets.push(fields)
	}

	return collectionInterfaces
}

function getPbTsSchema(collections: Array<core.Collection>) {
	const collectionToRelationMap = getRelationMap(collections)

	let schemaText = `
/**
 * Commented-out back-relations are what will be inferred by pocketbase-ts from the forward relations.
 *
 * The "UNIQUE index constraint" case is automatically handled by this hook,
 * but if you want to make a back-relation non-nullable, you can uncomment it and remove the "?".
 *
 * See [here](https://github.com/satohshi/pocketbase-ts#back-relations) for more information.
 */
export type Schema = {
`
	for (const [collection, relations] of collectionToRelationMap) {
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

	return schemaText
}

function getRelationMap(collections: Array<core.Collection>): Map<string, string[]> {
	const collectionIdToNameMap = new Map(
		collections.map((collection) => [collection.id, collection.name])
	)
	const relationMap = new Map<string, string[]>(collections.map((c) => [c.name, []]))

	for (const collection of collections) {
		const fieldsWithUniqueIndex = new Set(
			collection.indexes
				.filter((index) => index.includes('UNIQUE') && !index.includes(','))
				.map((index) => /^CREATE UNIQUE.+\(`?([^`\s]+).*\).*/.exec(index)![1])
		)

		for (const field of collection.fields) {
			if (field.type() === 'relation') {
				const { name, collectionId, required, isMultiple } = field as RelationField

				const hasUniqueConstraint = fieldsWithUniqueIndex.has(name)
				const relatedCollectionName = collectionIdToNameMap.get(collectionId)!

				const forwardRelation = `${name}${
					!required ? '?' : ''
				}: ${toPascalCase(relatedCollectionName)}${isMultiple() ? '[]' : ''}`
				relationMap.get(collection.name)!.push(forwardRelation)

				let backRelation = `${collection.name}_via_${name}?: ${toPascalCase(collection.name)}`
				if (!hasUniqueConstraint) {
					backRelation = `// ${backRelation}[]`
				}
				relationMap.get(relatedCollectionName)!.push(backRelation)
			}
		}
	}

	return relationMap
}
