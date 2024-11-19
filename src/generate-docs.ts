interface BaseSchemaFields {
	system: boolean
	id: string
	name: string
	required: boolean
	presentable: boolean
	unique: boolean
}

interface TextSchemaFields extends BaseSchemaFields {
	type: 'text'
	options: {
		min: number | null
		max: number | null
		pattern: string
	}
}

interface EditorSchemaFields extends BaseSchemaFields {
	type: 'editor'
	options: {
		convertUrls: boolean
	}
}

interface NumberSchemaFields extends BaseSchemaFields {
	type: 'number'
	options: {
		min: number | null
		max: number | null
		noDecimal: boolean
	}
}

interface BoolSchemaFields extends BaseSchemaFields {
	type: 'bool'
	options: {}
}

interface EmailSchemaFields extends BaseSchemaFields {
	type: 'email'
	options: {
		exceptDomains: string[] | null
		onlyDomains: string[] | null
	}
}

interface UrlSchemaFields extends BaseSchemaFields {
	type: 'url'
	options: {
		exceptDomains: string[] | null
		onlyDomains: string[] | null
	}
}

interface DateSchemaFields extends BaseSchemaFields {
	type: 'date'
	options: {
		min: string
		max: string
	}
}

interface SelectSchemaFields extends BaseSchemaFields {
	type: 'select'
	options: {
		maxSelect: number
		values: string[]
		isMultiple: () => boolean
	}
}

interface FileSchemaFields extends BaseSchemaFields {
	type: 'file'
	options: {
		mimeTypes: string[]
		thumbs: string[]
		maxSelect: number
		maxSize: number
		protected: boolean
		isMultiple: () => boolean
	}
}

interface RelationSchemaFields extends BaseSchemaFields {
	type: 'relation'
	options: {
		collectionId: string
		cascadeDelete: boolean
		minSelect: number | null
		maxSelect: number | null
		displayFields: string[] | null
		isMultiple: () => boolean
	}
}

interface JsonSchemaFields extends BaseSchemaFields {
	type: 'json'
	options: {
		maxSize: number
	}
}

export type SchemaFields =
	| TextSchemaFields
	| EditorSchemaFields
	| NumberSchemaFields
	| BoolSchemaFields
	| EmailSchemaFields
	| UrlSchemaFields
	| DateSchemaFields
	| SelectSchemaFields
	| FileSchemaFields
	| RelationSchemaFields
	| JsonSchemaFields

export const generateDocString = (
	options: SchemaFields,
	multiple: boolean,
	collectionMap: Record<string, string>
): string => {
	// remove options that are not needed in the table
	const optionEntries = Object.entries(options.options)
		.filter(([key, value]) => {
			const unnecessaryKeys = ['isMultiple', 'validate', 'displayFields', 'values']
			if (!multiple) {
				unnecessaryKeys.push('maxSelect', 'minSelect')
			}

			// value of `min` and `max` is of type `object`, not array, string, or number
			const hasValue =
				value !== null &&
				(Array.isArray(value) ? value.length > 0 : value.toString() !== '')

			return hasValue && !unnecessaryKeys.includes(key)
		})
		// wrap values in backticks
		.map<[string, string]>(([key, value]) => {
			if (Array.isArray(value)) {
				return [key, `${value.map((v) => `\`${v}\``).join(', ')}`]
			}
			return [key, `\`${value}\``]
		})

	const typeNameStr = `\`${options.type}${
		['file', 'relation', 'select'].includes(options.type)
			? multiple
				? '(multiple)'
				: '(single)'
			: ''
	}\``
	const requiredStr = `\`${options.required}\``
	const relatedCollectionNameStr =
		options.type === 'relation' ? `\`${collectionMap[options.options.collectionId]}\`` : ''

	// column width
	const leftColWidth = Math.max(
		options.type === 'relation' ? 14 : 8, // length of `collectionName` is 14
		...optionEntries.map(([key]) => key.length)
	)
	const rightColWidth = Math.max(
		options.type === 'relation' ? 15 : 0, // id length
		relatedCollectionNameStr.length, // collection name length
		typeNameStr.length,
		requiredStr.length,
		...optionEntries.map(([_, value]) => value.length)
	)

	const rows = [
		`/**`,
		`| ${' '.repeat(leftColWidth)} | ${' '.repeat(rightColWidth)} |`,
		`| ${'-'.repeat(leftColWidth)} | ${'-'.repeat(rightColWidth)} |`,
		`| ${'type'.padEnd(leftColWidth, ' ')} | ${typeNameStr.padEnd(rightColWidth, ' ')} |`,
		`| ${'required'.padEnd(leftColWidth, ' ')} | ${requiredStr.padEnd(rightColWidth, ' ')} |`,
	]

	for (const [key, value] of optionEntries) {
		rows.push(`| ${key.padEnd(leftColWidth, ' ')} | ${value.padEnd(rightColWidth, ' ')} |`)

		// add collection name for relation type
		if (key === 'collectionId') {
			rows.push(`| collectionName | ${relatedCollectionNameStr.padEnd(rightColWidth, ' ')} |`)
		}
	}

	return rows.join('\n     * ') + '\n     */'
}
