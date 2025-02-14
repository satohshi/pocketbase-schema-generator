import { format, haveSameValues, toPascalCase } from '../utils'
import config from '../../config.json'
import { CollectionType } from '../types'
import {
	autodateFieldSchema,
	boolFieldSchema,
	dateFieldSchema,
	editorFieldSchema,
	emailFieldSchema,
	fileFieldSchema,
	jsonFieldSchema,
	numberFieldSchema,
	passwordFieldSchema,
	relationFieldSchema,
	selectFieldSchema,
	textFieldSchema,
	urlFieldSchema,
} from './field-handlers'

const UNIQUE_IDENTIFIER_KEY = `declare const uniqueIdentifier: unique symbol`
const UNIQUE_IDENTIFIER = `
/**
 * This is a unique identifier to help TypeScript differentiate this interface from others sharing the same properties.
 * Refer to https://github.com/satohshi/pocketbase-ts#dealing-with-tables-with-exactly-the-same-properties for more information.
 */
readonly [uniqueIdentifier]: unique symbol
`

export const generateTsSchema = (
	includeSystemCollections = config.zodSchema.includeSystemCollections
) => {
	const allCollections = $app.findAllCollections() as Array<core.Collection>
	const collectionIdToNameMap = new Map(
		allCollections.map((collection) => [collection.id, collection.name])
	)

	const fieldSets: Set<string>[] = []
	const collectionToRelationMap = new Map<string, string[]>()

	// interfaces
	let collectionInterfaces = ''
	for (const collection of allCollections) {
		if (!includeSystemCollections && collection.system) continue

		const fieldsWithUniqueIndex = new Set(
			collection.indexes
				.filter((index) => index.includes('UNIQUE') && !index.includes(','))
				.map((index) => /^CREATE UNIQUE.+\(`?([^`\s]+).*\).*/.exec(index)![1])
		)

		const fields = new Set<string>()
		const interfaceName = toPascalCase(collection.name)
		collectionInterfaces += `export interface ${interfaceName} {\n`
		for (const fieldOptions of collection.fields as Array<core.Field>) {
			if (!collectionToRelationMap.has(collection.name)) {
				collectionToRelationMap.set(collection.name, [])
			}

			const type = fieldOptions.type() as CollectionType

			let schema: [string, string]
			switch (type) {
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
					const { name, collectionId, required, isMultiple } =
						fieldOptions as RelationField

					const hasUniqueConstraint = fieldsWithUniqueIndex.has(name)
					const relatedCollectionName = collectionIdToNameMap.get(collectionId)!
					if (!collectionToRelationMap.has(relatedCollectionName)) {
						collectionToRelationMap.set(relatedCollectionName, [])
					}

					const forwardRelation = `${name}${
						!required ? '?' : ''
					}: ${toPascalCase(relatedCollectionName)}${isMultiple() ? '[]' : ''}`
					collectionToRelationMap.get(collection.name)!.push(forwardRelation)

					let backRelation = `${collection.name}_via_${name}?: ${interfaceName}`
					if (!hasUniqueConstraint) {
						backRelation = `// ${backRelation}[]`
					}
					collectionToRelationMap.get(relatedCollectionName)!.push(backRelation)

					schema = relationFieldSchema({
						...(fieldOptions as RelationField),
						collectionName: relatedCollectionName,
					})
					break
				case 'json':
					schema = jsonFieldSchema(fieldOptions as JSONField)
					break
			}

			const [typeDef, docs] = schema

			collectionInterfaces += `${docs === '' ? '' : docs + '\n'}${typeDef}\n`

			fields.add(typeDef)
		}

		if (fieldSets.some((set) => haveSameValues(set, fields))) {
			if (!collectionInterfaces.includes(UNIQUE_IDENTIFIER_KEY)) {
				collectionInterfaces = UNIQUE_IDENTIFIER_KEY + '\n\n' + collectionInterfaces
			}
			collectionInterfaces += UNIQUE_IDENTIFIER
		}

		collectionInterfaces += '}\n\n'

		fieldSets.push(fields)
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

	return format(collectionInterfaces + schemaText)
}

export const writeTsSchemaToFile = () => {
	const data = generateTsSchema()
	$os.writeFile(config.tsSchema.outputPath, data, 0o644 as any)
}
