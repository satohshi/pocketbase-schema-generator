export type SchemaField =
	| TextField
	| EditorField
	| NumberField
	| BoolField
	| EmailField
	| URLField
	| DateField
	| SelectField
	| FileField
	| RelationField
	| JSONField

export const generateDocString = (
	field: SchemaField,
	multiple: boolean,
	collectionMap: Record<string, string>
): string => {
	const type = field.type()

	// remove options that are not needed in the table
	const optionEntries = Object.entries(field)
		.filter(([key, value]) => {
			const unnecessaryKeys = [
				'id',
				'name',
				'system',
				'presentable',
				'values',
				'primaryKey',
				'cost',
			]
			if (!multiple) {
				unnecessaryKeys.push('maxSelect', 'minSelect')
			}

			const isFunction = typeof value === 'function'

			// value of `min` and `max` is of type `object`, not array, string, or number
			const hasValue =
				value !== null &&
				(Array.isArray(value) ? value.length > 0 : value.toString() !== '')

			// `0` means not defined in these cases
			const notDefined =
				type !== 'number' &&
				['max', 'min', 'maxSize', 'minSelect', 'maxSelect'].includes(key) &&
				value === 0

			return !isFunction && hasValue && !notDefined && !unnecessaryKeys.includes(key)
		})
		// wrap values in backticks
		.map<[string, string]>(([key, value]) => {
			if (Array.isArray(value)) {
				return [key, `${value.map((v) => `\`${v}\``).join(', ')}`]
			}
			return [key, `\`${value}\``]
		})

	const typeNameStr = `\`${type}${
		['file', 'relation', 'select'].includes(type) ? (multiple ? '(multiple)' : '(single)') : ''
	}\``
	const requiredStr = `\`${field.required}\``
	const relatedCollectionNameStr =
		type === 'relation' ? `\`${collectionMap[(field as RelationField).collectionId]}\`` : ''

	// column width
	const leftColWidth = Math.max(
		type === 'relation' ? 14 : 8, // length of `collectionName` is 14
		...optionEntries.map(([key]) => key.length)
	)
	const rightColWidth = Math.max(
		type === 'relation' ? 15 : 0, // id length
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
