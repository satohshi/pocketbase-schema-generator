export function textFieldSchema(fieldOptions: TextField) {
	const { name, pattern, min, max } = fieldOptions
	let schema = `${name}: z.string()`

	if (pattern) {
		schema += `.regex(/${pattern}/)`
	}

	if (min > 0 && min === max) {
		schema += `.length(${min})`
	} else {
		if (min > 0) schema += `.min(${min})`
		if (max > 0) schema += `.max(${max})`
	}

	return schema
}

export function editorFieldSchema(fieldOptions: EditorField) {
	return `${fieldOptions.name}: z.string()`
}

export function numberFieldSchema(fieldOptions: NumberField) {
	const { name, onlyInt, min, max } = fieldOptions
	let schema = `${name}: z.number()`

	if (onlyInt) schema += '.int()'
	if (min) schema += `.min(${min})`
	if (max) schema += `.max(${max})`

	return schema
}

export function boolFieldSchema(fieldOptions: BoolField) {
	if (fieldOptions.required) {
		return `${fieldOptions.name}: z.literal(true)`
	}
	return `${fieldOptions.name}: z.boolean()`
}

export function emailFieldSchema(fieldOptions: EmailField) {
	const { name, exceptDomains, onlyDomains } = fieldOptions
	let schema = `${name}: z.string().email()`

	if (onlyDomains.length > 0) {
		schema += `.refine((v) => [${onlyDomains.map((d) => `"${d}"`).join(', ')}].includes(v.split('@')[1]))`
	} else if (exceptDomains.length > 0) {
		schema += `.refine((v) => ![${exceptDomains.map((d) => `"${d}"`).join(', ')}].includes(v.split('@')[1]))`
	}

	return schema
}

export function urlFieldSchema(fieldOptions: URLField) {
	let schema = `${fieldOptions.name}: z.string().url()`
	const { exceptDomains, onlyDomains } = fieldOptions
	if (onlyDomains.length > 0) {
		schema += `.refine((v) => [${onlyDomains.map((d) => `"${d}"`).join(', ')}].some((domain) => v.includes(domain)))`
	} else if (exceptDomains.length > 0) {
		schema += `.refine((v) => [${exceptDomains.map((d) => `"${d}"`).join(', ')}].every((domain) => !v.includes(domain)))`
	}
	return schema
}

export function dateFieldSchema(fieldOptions: DateField) {
	let schema = `${fieldOptions.name}: z.string().regex(DATETIME_REGEX)`
	const min = fieldOptions.min.string()
	const max = fieldOptions.max.string()

	if (!min && !max) return schema

	const conditions: string[] = []
	const funcLines: string[] = [`const date = new Date(v)`]

	if (min) {
		funcLines.push(`const minDate = new Date('${min}')`)
		conditions.push('date >= minDate')
	}
	if (max) {
		funcLines.push(`const maxDate = new Date('${max}')`)
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

export function selectFieldSchema(fieldOptions: SelectField) {
	const isMultiple = fieldOptions.isMultiple()
	const { name, values, maxSelect } = fieldOptions
	const schema = `${name}: z.enum([${values.map((v) => `"${v}"`).join(', ')}])${isMultiple ? '.array()' : ''}`
	if (isMultiple && maxSelect) {
		return `${schema}.max(${maxSelect})`
	}
	return schema
}

export function fileFieldSchema(fieldOptions: FileField) {
	const { name, maxSelect } = fieldOptions
	const baseSchema = `${name}: z.string()`

	if (fieldOptions.isMultiple()) {
		return `${baseSchema}.array()${maxSelect ? `.max(${maxSelect})` : ''}`
	}

	return baseSchema
}

export function relationFieldSchema(fieldOptions: RelationField, baseIdSchema: string) {
	let schema = `${fieldOptions.name}: ${baseIdSchema}`
	const isMultiple = fieldOptions.isMultiple()
	if (isMultiple) {
		const maxSelect = fieldOptions.maxSelect
		schema += `.array()${maxSelect ? `.max(${maxSelect})` : ''}`
	}
	return schema
}

export function jsonFieldSchema(fieldOptions: JSONField) {
	return `${fieldOptions.name}: z.unknown()`
}

export function autodateFieldSchema(fieldOptions: AutodateField) {
	return `${fieldOptions.name}: z.string().regex(DATETIME_REGEX)`
}

export function passwordFieldSchema(fieldOptions: PasswordField) {
	return textFieldSchema(fieldOptions as unknown as TextField)
}
