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

const removeUnnecessaryKeys = (
	type: string,
	field: SchemaField,
	multiple: boolean
): [string, string][] => {
	const unnecessaryKeys = ['id', 'name', 'system', 'presentable', 'values', 'primaryKey', 'cost']

	if (!multiple) {
		unnecessaryKeys.push('maxSelect', 'minSelect')
	}

	return (
		Object.entries(field)
			.filter(([key, value]) => {
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
	)
}

export const generateDocString = (
	field: SchemaField,
	multiple: boolean,
	collectionMap: Map<string, string>
): string => {
	const type = field.type()

	// remove options that are not needed in the table
	const optionEntries = removeUnnecessaryKeys(type, field, multiple)

	const typeSuffix = ['file', 'relation', 'select'].includes(type)
		? multiple
			? '(multiple)'
			: '(single)'
		: ''

	const rows: [string, string][] = [['type', `\`${type}${typeSuffix}\``]]

	for (const [key, value] of optionEntries) {
		rows.push([key, value])

		// add collection name for relation type
		if (key === 'collectionId') {
			const collectionName = collectionMap.get((field as RelationField).collectionId)!
			rows.push(['collectionName', `\`${collectionName}\``])
		}
	}

	return generateMDTable(rows)
}
