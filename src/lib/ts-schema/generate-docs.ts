import { generateMDTable } from '../utils'

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

	const rows: [string, string][] = [
		[
			'type',
			`\`${type}${
				['file', 'relation', 'select'].includes(type)
					? multiple
						? '(multiple)'
						: '(single)'
					: ''
			}\``,
		],
	]

	for (const [key, value] of optionEntries) {
		rows.push([key, value])

		// add collection name for relation type
		if (key === 'collectionId') {
			const collectionName = collectionMap[(field as RelationField).collectionId]!
			rows.push(['collectionName', `\`${collectionName}\``])
		}
	}

	return generateMDTable(rows)
}
