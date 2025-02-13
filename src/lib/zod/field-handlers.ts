export function textFieldSchema({ name, pattern, min, max, required }: TextField) {
	let schema = `${name}: z.string()`

	if (pattern) {
		schema += `.regex(/${pattern}/)`
	}

	if (min > 0 && min === max) {
		schema += `.length(${min})`
	} else {
		if (min > 0) {
			schema += `.min(${min})`
		} else if (required) {
			schema += '.min(1)'
		}
		if (max > 0) schema += `.max(${max})`
	}

	return schema
}

export function editorFieldSchema({ name, required }: EditorField) {
	return `${name}: z.string()${required ? '.min(1)' : ''}`
}

export function numberFieldSchema({ name, onlyInt, min, max, required }: NumberField) {
	let schema = `${name}: z.number()`

	if (onlyInt) schema += '.int()'
	if (min) schema += `.min(${min})`
	if (max) schema += `.max(${max})`
	if (required) schema += '.refine((n) => n !== 0)' // `required` === `nonZero`

	return schema
}

export function boolFieldSchema({ name, required }: BoolField) {
	if (required) {
		return `${name}: z.literal(true)`
	}
	return `${name}: z.boolean()`
}

export function emailFieldSchema({ name, exceptDomains, onlyDomains }: EmailField) {
	let schema = `${name}: z.string().email()`

	if (onlyDomains.length > 0) {
		schema += `.refine((v) => [${onlyDomains.map((d) => `"${d}"`).join(', ')}].includes(v.split('@')[1]))`
	} else if (exceptDomains.length > 0) {
		schema += `.refine((v) => ![${exceptDomains.map((d) => `"${d}"`).join(', ')}].includes(v.split('@')[1]))`
	}

	return schema
}

export function urlFieldSchema({ name, exceptDomains, onlyDomains }: URLField) {
	let schema = `${name}: z.string().url()`
	if (onlyDomains.length > 0) {
		schema += `.refine((v) => [${onlyDomains.map((d) => `"${d}"`).join(', ')}].some((domain) => v.includes(domain)))`
	} else if (exceptDomains.length > 0) {
		schema += `.refine((v) => [${exceptDomains.map((d) => `"${d}"`).join(', ')}].every((domain) => !v.includes(domain)))`
	}

	return schema
}

export function dateFieldSchema({ name, min, max }: DateField) {
	let schema = `${name}: z.string().regex(DATETIME_REGEX)`
	const minDateStr = min.string()
	const maxDateStr = max.string()

	if (!minDateStr && !maxDateStr) return schema

	const conditions: string[] = []
	const funcLines: string[] = [`const date = new Date(v)`]

	if (minDateStr) {
		funcLines.push(`const minDate = new Date('${minDateStr}')`)
		conditions.push('date >= minDate')
	}
	if (maxDateStr) {
		funcLines.push(`const maxDate = new Date('${maxDateStr}')`)
		conditions.push('date <= maxDate')
	}

	return (
		schema +
		`.refine((v) => {
${funcLines.map((line) => `        ${line}`).join('\n')}
        return ${conditions.join(' && ')}
    })`
	)
}

export function selectFieldSchema({ name, values, maxSelect, required, isMultiple }: SelectField) {
	let schema = `${name}: z.enum([${values.map((v) => `"${v}"`).join(', ')}])`
	if (isMultiple()) {
		schema += '.array()'
		if (required) schema += '.nonempty()'
		if (maxSelect) schema += `.max(${maxSelect})`
	}
	return schema
}

export function fileFieldSchema({ name, maxSelect, required, isMultiple }: FileField) {
	let schema = `${name}: z.string()`
	if (isMultiple()) {
		schema += '.array()'
		if (required) schema += '.nonempty()'
		if (maxSelect) schema += `.max(${maxSelect})`
	}
	return schema
}

export function relationFieldSchema(
	{ name, minSelect, maxSelect, required, isMultiple }: RelationField,
	targetCollectionIdSchema: string
) {
	let schema = `${name}: ${targetCollectionIdSchema}`
	if (isMultiple()) {
		schema += '.array()'
		if (required) schema += '.nonempty()'
		if (minSelect) schema += `.min(${minSelect})`
		if (maxSelect) schema += `.max(${maxSelect})`
	}
	return schema
}

export function jsonFieldSchema({ name }: JSONField) {
	return `${name}: z.unknown()`
}

export function autodateFieldSchema({ name }: AutodateField) {
	return `${name}: z.string().regex(DATETIME_REGEX)`
}

export function passwordFieldSchema(fieldOptions: PasswordField) {
	return textFieldSchema(fieldOptions as unknown as TextField)
}
