import { generateMDTable } from '../utils'
import config from '../../config.json'

export function textFieldSchema(
	{ name, hidden, min, max, pattern, autogeneratePattern, required }: TextField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: string`, '']

	const rows: [string, string][] = [
		['type', 'text'],
		['hidden', `${hidden}`],
		['required', `${required}`],
	]

	if (min > 0) rows.push(['min', `${min}`])
	if (max > 0) rows.push(['max', `${max}`])
	if (pattern) rows.push(['pattern', pattern])
	if (autogeneratePattern) rows.push(['autogeneratePattern', autogeneratePattern])

	const docs = generateMDTable(rows)

	return [`${name}: string`, docs]
}

export function passwordFieldSchema(
	{ name, hidden, min, max, pattern, required }: PasswordField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: string`, '']

	const rows: [string, string][] = [
		['type', 'password'],
		['hidden', `${hidden}`],
		['required', `${required}`],
	]

	if (min > 0) rows.push(['min', `${min}`])
	if (max > 0) rows.push(['max', `${max}`])
	if (pattern) rows.push(['pattern', pattern])

	const docs = generateMDTable(rows)

	return [`${name}: string`, docs]
}

export function editorFieldSchema(
	{ name, hidden, maxSize, convertURLs, required }: EditorField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: string`, '']

	const rows: [string, string][] = [
		['type', 'editor'],
		['hidden', `${hidden}`],
		['required', `${required}`],
		['convertURLs', `${convertURLs}`],
	]
	if (maxSize > 0) rows.push(['maxSize', `${maxSize}`])

	const docs = generateMDTable(rows)

	return [`${name}: string`, docs]
}

export function numberFieldSchema(
	{ name, hidden, min, max, onlyInt, required }: NumberField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: number`, '']

	const rows: [string, string][] = [
		['type', 'number'],
		['hidden', `${hidden}`],
		['required', `${required}`],
		['onlyInt', `${onlyInt}`],
	]

	if (min !== null) rows.push(['min', `${min}`])
	if (max !== null) rows.push(['max', `${max}`])

	const docs = generateMDTable(rows)

	return [`${name}: number`, docs]
}

export function boolFieldSchema(
	{ name, hidden, required }: BoolField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	const typeStr = `${name}: ${required ? 'true' : 'boolean'}`
	if (!includeDocs) return [typeStr, '']

	const docs = generateMDTable([
		['type', 'bool'],
		['hidden', `${hidden}`],
	])

	return [typeStr, docs]
}

export function emailFieldSchema(
	{ name, hidden, exceptDomains, onlyDomains, required }: EmailField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: string`, '']

	const rows: [string, string][] = [
		['type', 'email'],
		['hidden', `${hidden}`],
		['required', `${required}`],
	]

	if (exceptDomains.length > 0) rows.push(['exceptDomains', exceptDomains.join('`, `')])
	if (onlyDomains.length > 0) rows.push(['onlyDomains', onlyDomains.join('`, `')])

	const docs = generateMDTable(rows)

	return [`${name}: string`, docs]
}

export function urlFieldSchema(
	{ name, hidden, exceptDomains, onlyDomains, required }: URLField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: string`, '']

	const rows: [string, string][] = [
		['type', 'email'],
		['hidden', `${hidden}`],
		['required', `${required}`],
	]

	if (exceptDomains.length > 0) rows.push(['exceptDomains', exceptDomains.join('`, `')])
	if (onlyDomains.length > 0) rows.push(['onlyDomains', onlyDomains.join('`, `')])

	const docs = generateMDTable(rows)

	return [`${name}: string`, docs]
}

export function dateFieldSchema(
	{ name, hidden, min, max, required }: DateField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: string`, '']

	const minDateStr = min.toString()
	const maxDateStr = max.toString()

	const rows: [string, string][] = [
		['type', 'date'],
		['hidden', `${hidden}`],
		['required', `${required}`],
	]

	if (minDateStr) rows.push(['min', minDateStr])
	if (maxDateStr) rows.push(['max', maxDateStr])

	const docs = generateMDTable(rows)

	return [`${name}: string`, docs]
}

export function autodateFieldSchema(
	{ name, hidden, onCreate, onUpdate }: AutodateField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: string`, '']

	const docs = generateMDTable([
		['type', 'autodate'],
		['hidden', `${hidden}`],
		['onCreate', `${onCreate}`],
		['onUpdate', `${onUpdate}`],
	])

	return [`${name}: string`, docs]
}

export function selectFieldSchema(
	{ name, hidden, values, maxSelect, required, isMultiple }: SelectField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	const multiple = isMultiple()
	const options = values.map((v: string) => `'${v}'`).join(' | ')

	const typeStr = `${name}: ${
		multiple ? (required ? `[${options}, ...(${options})[]]` : `(${options})[]`) : options
	}`
	if (!includeDocs) return [typeStr, '']

	const rows: [string, string][] = [
		['type', `select${multiple ? ' (multiple)' : '(single)'}`],
		['hidden', `${hidden}`],
		['required', `${required}`],
	]

	if (multiple && maxSelect > 0) rows.push(['maxSelect', `${maxSelect}`])

	const docs = generateMDTable(rows)

	return [typeStr, docs]
}

export function fileFieldSchema(
	{
		name,
		hidden,
		maxSize,
		maxSelect,
		mimeTypes,
		thumbs,
		protected: $protected,
		required,
		isMultiple,
	}: FileField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	const multiple = isMultiple()

	const typeStr = `${name}: ${multiple ? (required ? `[string, ...string[]]` : `string[]`) : 'string'}`
	if (!includeDocs) return [typeStr, '']

	const rows: [string, string][] = [
		['type', `file${multiple ? ' (multiple)' : '(single)'}`],
		['hidden', `${hidden}`],
		['required', `${required}`],
		['protected', `${$protected}`],
		['maxSize', `${maxSize}`],
	]
	if (multiple && maxSelect > 0) rows.push(['maxSelect', `${maxSelect}`])
	if (mimeTypes.length > 0) rows.push(['mimeTypes', mimeTypes.join('`, `')])
	if (thumbs.length > 0) rows.push(['thumbs', thumbs.join('`, `')])

	const docs = generateMDTable(rows)

	return [typeStr, docs]
}

export function relationFieldSchema(
	{
		name,
		hidden,
		collectionId,
		collectionName,
		cascadeDelete,
		minSelect,
		maxSelect,
		required,
		isMultiple,
	}: RelationField & { collectionName: string },
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	const multiple = isMultiple()

	const typeStr = `${name}: ${multiple ? (required ? `[string, ...string[]]` : `string[]`) : 'string'}`
	if (!includeDocs) return [typeStr, '']

	const rows: [string, string][] = [
		['type', `relation${multiple ? ' (multiple)' : '(single)'}`],
		['hidden', `${hidden}`],
		['required', `${required}`],
		['collectionId', `${collectionId}`],
		['collectionName', `${collectionName}`],
		['cascadeDelete', `${cascadeDelete}`],
	]

	if (minSelect > 0) rows.push(['minSelect', `${minSelect}`])
	if (multiple && maxSelect > 0) rows.push(['maxSelect', `${maxSelect}`])

	const docs = generateMDTable(rows)

	return [typeStr, docs]
}

export function jsonFieldSchema(
	{ name, hidden, maxSize, required }: JSONField,
	includeDocs = config.tsSchema.includeDocs
): [string, string] {
	if (!includeDocs) return [`${name}: any`, '']

	const docs = generateMDTable([
		['type', 'json'],
		['hidden', `${hidden}`],
		['maxSize', `${maxSize}`],
		['required', `${required}`],
	])

	return [`${name}: any`, docs]
}
