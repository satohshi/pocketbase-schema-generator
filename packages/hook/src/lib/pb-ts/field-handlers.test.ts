import { afterEach, describe, it, vi } from 'vitest'
import { generateMDTable } from '../utils'

function setIncludeDocs(value: boolean): void {
	vi.doMock('../../config.json', () => {
		return {
			default: {
				tsSchema: {
					includeDocs: value,
				},
			},
		}
	})
}

/**
 * Some field options are null when they're not set (like `min` and `max` in `NumberField`),
 * but they're non-nullable in types provided by PocketBase.
 * So `as any` is okay here.
 */

describe('textFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'title',
			hidden: false,
			min: 0,
			max: 0,
			pattern: '',
			autogeneratePattern: '',
			required: false,
		}

		const { textFieldSchema } = await import('./field-handlers')
		const [schema, docs] = textFieldSchema(field as any)

		expect(schema).toBe('title: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'title',
			hidden: true,
			min: 5,
			max: 100,
			pattern: '^[a-z]+$',
			autogeneratePattern: '^[a-z]+$',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'text'],
			['hidden', 'true'],
			['required', 'true'],
			['min', '5'],
			['max', '100'],
			['pattern', '^[a-z]+$'],
			['autogeneratePattern', '^[a-z]+$'],
		])

		const { textFieldSchema } = await import('./field-handlers')
		const [schema, docs] = textFieldSchema(field as any)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit min if they're not set", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'title',
			hidden: false,
			min: 0,
			max: 100,
			pattern: '^[a-z]+$',
			autogeneratePattern: '^[a-z]+$',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'text'],
			['hidden', 'false'],
			['required', 'true'],
			['max', '100'],
			['pattern', '^[a-z]+$'],
			['autogeneratePattern', '^[a-z]+$'],
		])

		const { textFieldSchema } = await import('./field-handlers')
		const [schema, docs] = textFieldSchema(field as any)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit max if they're not set", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'title',
			hidden: false,
			min: 5,
			max: 0,
			pattern: '^[a-z]+$',
			autogeneratePattern: '^[a-z]+$',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'text'],
			['hidden', 'false'],
			['required', 'true'],
			['min', '5'],
			['pattern', '^[a-z]+$'],
			['autogeneratePattern', '^[a-z]+$'],
		])

		const { textFieldSchema } = await import('./field-handlers')
		const [schema, docs] = textFieldSchema(field as any)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit pattern if they're not set", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'title',
			hidden: false,
			min: 5,
			max: 100,
			pattern: '',
			autogeneratePattern: '^[a-z]+$',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'text'],
			['hidden', 'false'],
			['required', 'true'],
			['min', '5'],
			['max', '100'],
			['autogeneratePattern', '^[a-z]+$'],
		])

		const { textFieldSchema } = await import('./field-handlers')
		const [schema, docs] = textFieldSchema(field as any)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit autogeneratePattern if they're not set", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'title',
			hidden: false,
			min: 5,
			max: 100,
			pattern: '^[a-z]+$',
			autogeneratePattern: '',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'text'],
			['hidden', 'false'],
			['required', 'true'],
			['min', '5'],
			['max', '100'],
			['pattern', '^[a-z]+$'],
		])

		const { textFieldSchema } = await import('./field-handlers')
		const [schema, docs] = textFieldSchema(field as any)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('passwordFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'password',
			hidden: false,
			min: 0,
			max: 0,
			pattern: '',
			required: false,
		}

		const { passwordFieldSchema } = await import('./field-handlers')
		const [schema, docs] = passwordFieldSchema(field as any)

		expect(schema).toBe('password: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'password',
			hidden: true,
			min: 8,
			max: 32,
			pattern: '^[a-zA-Z0-9]+$',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'password'],
			['hidden', 'true'],
			['required', 'true'],
			['min', '8'],
			['max', '32'],
			['pattern', '^[a-zA-Z0-9]+$'],
		])

		const { passwordFieldSchema } = await import('./field-handlers')
		const [schema, docs] = passwordFieldSchema(field as any)

		expect(schema).toBe('password: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit min if it's not set", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'password',
			hidden: false,
			min: 0,
			max: 32,
			pattern: '^[a-zA-Z0-9]+$',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'password'],
			['hidden', 'false'],
			['required', 'true'],
			['max', '32'],
			['pattern', '^[a-zA-Z0-9]+$'],
		])

		const { passwordFieldSchema } = await import('./field-handlers')
		const [schema, docs] = passwordFieldSchema(field as any)

		expect(schema).toBe('password: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit max if it's not set", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'password',
			hidden: false,
			min: 8,
			max: 0,
			pattern: '^[a-zA-Z0-9]+$',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'password'],
			['hidden', 'false'],
			['required', 'true'],
			['min', '8'],
			['pattern', '^[a-zA-Z0-9]+$'],
		])

		const { passwordFieldSchema } = await import('./field-handlers')
		const [schema, docs] = passwordFieldSchema(field as any)

		expect(schema).toBe('password: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit pattern if it's not set", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'password',
			hidden: false,
			min: 8,
			max: 32,
			pattern: '',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'password'],
			['hidden', 'false'],
			['required', 'true'],
			['min', '8'],
			['max', '32'],
		])

		const { passwordFieldSchema } = await import('./field-handlers')
		const [schema, docs] = passwordFieldSchema(field as any)

		expect(schema).toBe('password: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('editorFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'content',
			hidden: false,
			maxSize: 0,
			convertURLs: false,
			required: false,
		}

		const { editorFieldSchema } = await import('./field-handlers')
		const [schema, docs] = editorFieldSchema(field as any)

		expect(schema).toBe('content: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'content',
			hidden: true,
			maxSize: 1000,
			convertURLs: true,
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'editor'],
			['hidden', 'true'],
			['required', 'true'],
			['convertURLs', 'true'],
			['maxSize', '1000'],
		])

		const { editorFieldSchema } = await import('./field-handlers')
		const [schema, docs] = editorFieldSchema(field as any)

		expect(schema).toBe('content: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit maxSize if it's not set", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'content',
			hidden: false,
			maxSize: 0,
			convertURLs: true,
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'editor'],
			['hidden', 'false'],
			['required', 'true'],
			['convertURLs', 'true'],
		])

		const { editorFieldSchema } = await import('./field-handlers')
		const [schema, docs] = editorFieldSchema(field as any)

		expect(schema).toBe('content: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('numberFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'count',
			hidden: false,
			min: null,
			max: null,
			onlyInt: false,
			required: false,
		}

		const { numberFieldSchema } = await import('./field-handlers')
		const [schema, docs] = numberFieldSchema(field as any)

		expect(schema).toBe('count: number')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'count',
			hidden: true,
			min: 0,
			max: 100,
			onlyInt: true,
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'number'],
			['hidden', 'true'],
			['required', 'true'],
			['onlyInt', 'true'],
			['min', '0'],
			['max', '100'],
		])

		const { numberFieldSchema } = await import('./field-handlers')
		const [schema, docs] = numberFieldSchema(field as any)

		expect(schema).toBe('count: number')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit min if it's null", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'count',
			hidden: false,
			min: null,
			max: 100,
			onlyInt: true,
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'number'],
			['hidden', 'false'],
			['required', 'true'],
			['onlyInt', 'true'],
			['max', '100'],
		])

		const { numberFieldSchema } = await import('./field-handlers')
		const [schema, docs] = numberFieldSchema(field as any)

		expect(schema).toBe('count: number')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit max if it's null", async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'count',
			hidden: false,
			min: 0,
			max: null,
			onlyInt: true,
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'number'],
			['hidden', 'false'],
			['required', 'true'],
			['onlyInt', 'true'],
			['min', '0'],
		])

		const { numberFieldSchema } = await import('./field-handlers')
		const [schema, docs] = numberFieldSchema(field as any)

		expect(schema).toBe('count: number')
		expect(docs).toBe(expectedDocs)
	})
})

describe('boolFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'active',
			hidden: false,
			required: false,
		}

		const { boolFieldSchema } = await import('./field-handlers')
		const [schema, docs] = boolFieldSchema(field as any)

		expect(schema).toBe('active: boolean')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'active',
			hidden: true,
			required: false,
		}

		const expectedDocs = generateMDTable([
			['type', 'bool'],
			['hidden', 'true'],
		])

		const { boolFieldSchema } = await import('./field-handlers')
		const [schema, docs] = boolFieldSchema(field as any)

		expect(schema).toBe('active: boolean')
		expect(docs).toBe(expectedDocs)
	})

	it('should return "true" type when required is true', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'active',
			hidden: false,
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'bool'],
			['hidden', 'false'],
		])

		const { boolFieldSchema } = await import('./field-handlers')
		const [schema, docs] = boolFieldSchema(field as any)

		expect(schema).toBe('active: true')
		expect(docs).toBe(expectedDocs)
	})
})

describe('emailFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'email',
			hidden: false,
			exceptDomains: [],
			onlyDomains: [],
			required: false,
		}

		const { emailFieldSchema } = await import('./field-handlers')
		const [schema, docs] = emailFieldSchema(field as any)

		expect(schema).toBe('email: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'email',
			hidden: true,
			exceptDomains: ['test.com', 'example.com'],
			onlyDomains: ['allowed.com', 'valid.com'],
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'email'],
			['hidden', 'true'],
			['required', 'true'],
			['exceptDomains', 'test.com`, `example.com'],
			['onlyDomains', 'allowed.com`, `valid.com'],
		])

		const { emailFieldSchema } = await import('./field-handlers')
		const [schema, docs] = emailFieldSchema(field as any)

		expect(schema).toBe('email: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit exceptDomains if empty', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'email',
			hidden: false,
			exceptDomains: [],
			onlyDomains: ['allowed.com'],
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'email'],
			['hidden', 'false'],
			['required', 'true'],
			['onlyDomains', 'allowed.com'],
		])

		const { emailFieldSchema } = await import('./field-handlers')
		const [schema, docs] = emailFieldSchema(field as any)

		expect(schema).toBe('email: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit onlyDomains if empty', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'email',
			hidden: false,
			exceptDomains: ['test.com'],
			onlyDomains: [],
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'email'],
			['hidden', 'false'],
			['required', 'true'],
			['exceptDomains', 'test.com'],
		])

		const { emailFieldSchema } = await import('./field-handlers')
		const [schema, docs] = emailFieldSchema(field as any)

		expect(schema).toBe('email: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('urlFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'website',
			hidden: false,
			exceptDomains: [],
			onlyDomains: [],
			required: false,
		}

		const { urlFieldSchema } = await import('./field-handlers')
		const [schema, docs] = urlFieldSchema(field as any)

		expect(schema).toBe('website: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'website',
			hidden: true,
			exceptDomains: ['test.com', 'example.com'],
			onlyDomains: ['allowed.com', 'valid.com'],
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'email'],
			['hidden', 'true'],
			['required', 'true'],
			['exceptDomains', 'test.com`, `example.com'],
			['onlyDomains', 'allowed.com`, `valid.com'],
		])

		const { urlFieldSchema } = await import('./field-handlers')
		const [schema, docs] = urlFieldSchema(field as any)

		expect(schema).toBe('website: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit exceptDomains if empty', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'website',
			hidden: false,
			exceptDomains: [],
			onlyDomains: ['allowed.com'],
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'email'],
			['hidden', 'false'],
			['required', 'true'],
			['onlyDomains', 'allowed.com'],
		])

		const { urlFieldSchema } = await import('./field-handlers')
		const [schema, docs] = urlFieldSchema(field as any)

		expect(schema).toBe('website: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit onlyDomains if empty', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'website',
			hidden: false,
			exceptDomains: ['test.com'],
			onlyDomains: [],
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'email'],
			['hidden', 'false'],
			['required', 'true'],
			['exceptDomains', 'test.com'],
		])

		const { urlFieldSchema } = await import('./field-handlers')
		const [schema, docs] = urlFieldSchema(field as any)

		expect(schema).toBe('website: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('dateFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'created',
			hidden: false,
			min: '',
			max: '',
			required: false,
		}

		const { dateFieldSchema } = await import('./field-handlers')
		const [schema, docs] = dateFieldSchema(field as any)

		expect(schema).toBe('created: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'created',
			hidden: true,
			min: '2023-01-01',
			max: '2023-12-31',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'date'],
			['hidden', 'true'],
			['required', 'true'],
			['min', '2023-01-01'],
			['max', '2023-12-31'],
		])

		const { dateFieldSchema } = await import('./field-handlers')
		const [schema, docs] = dateFieldSchema(field as any)

		expect(schema).toBe('created: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit min if empty string', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'created',
			hidden: false,
			min: '',
			max: '2023-12-31',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'date'],
			['hidden', 'false'],
			['required', 'true'],
			['max', '2023-12-31'],
		])

		const { dateFieldSchema } = await import('./field-handlers')
		const [schema, docs] = dateFieldSchema(field as any)

		expect(schema).toBe('created: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit max if empty string', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'created',
			hidden: false,
			min: '2023-01-01',
			max: '',
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'date'],
			['hidden', 'false'],
			['required', 'true'],
			['min', '2023-01-01'],
		])

		const { dateFieldSchema } = await import('./field-handlers')
		const [schema, docs] = dateFieldSchema(field as any)

		expect(schema).toBe('created: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('autodateFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'timestamp',
			hidden: false,
			onCreate: false,
			onUpdate: false,
		}

		const { autodateFieldSchema } = await import('./field-handlers')
		const [schema, docs] = autodateFieldSchema(field as any)

		expect(schema).toBe('timestamp: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'timestamp',
			hidden: true,
			onCreate: true,
			onUpdate: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'autodate'],
			['hidden', 'true'],
			['onCreate', 'true'],
			['onUpdate', 'true'],
		])

		const { autodateFieldSchema } = await import('./field-handlers')
		const [schema, docs] = autodateFieldSchema(field as any)

		expect(schema).toBe('timestamp: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('selectFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'category',
			hidden: false,
			values: ['news', 'blog'],
			maxSelect: 0,
			required: false,
			isMultiple: () => false,
		}

		const { selectFieldSchema } = await import('./field-handlers')
		const [schema, docs] = selectFieldSchema(field as any)

		expect(schema).toBe("category: 'news' | 'blog'")
		expect(docs).toBe('')
	})

	it('should return tuple if multiple and required', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'tags',
			hidden: true,
			values: ['featured', 'trending', 'popular'],
			maxSelect: 2,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'select (multiple)'],
			['hidden', 'true'],
			['required', 'true'],
			['maxSelect', '2'],
		])

		const { selectFieldSchema } = await import('./field-handlers')
		const [schema, docs] = selectFieldSchema(field as any)

		expect(schema).toBe(
			"tags: ['featured' | 'trending' | 'popular', ...('featured' | 'trending' | 'popular')[]]"
		)
		expect(docs).toBe(expectedDocs)
	})

	it('should return array if multiple and NOT required', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'tags',
			hidden: true,
			values: ['featured', 'trending', 'popular'],
			maxSelect: 2,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'select (multiple)'],
			['hidden', 'true'],
			['required', 'false'],
			['maxSelect', '2'],
		])

		const { selectFieldSchema } = await import('./field-handlers')
		const [schema, docs] = selectFieldSchema(field as any)

		expect(schema).toBe("tags: ('featured' | 'trending' | 'popular')[]")
		expect(docs).toBe(expectedDocs)
	})

	it('should return schema for multiple select with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'tags',
			hidden: true,
			values: ['featured', 'trending', 'popular'],
			maxSelect: 2,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'select (multiple)'],
			['hidden', 'true'],
			['required', 'false'],
			['maxSelect', '2'],
		])

		const { selectFieldSchema } = await import('./field-handlers')
		const [schema, docs] = selectFieldSchema(field as any)

		expect(schema).toBe("tags: ('featured' | 'trending' | 'popular')[]")
		expect(docs).toBe(expectedDocs)
	})

	it('should return schema for single select with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'status',
			hidden: false,
			values: ['draft', 'published'],
			maxSelect: 0,
			required: true,
			isMultiple: () => false,
		}

		const expectedDocs = generateMDTable([
			['type', 'select(single)'],
			['hidden', 'false'],
			['required', 'true'],
		])

		const { selectFieldSchema } = await import('./field-handlers')
		const [schema, docs] = selectFieldSchema(field as any)

		expect(schema).toBe("status: 'draft' | 'published'")
		expect(docs).toBe(expectedDocs)
	})

	it('should omit maxSelect if not multiple or zero', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'category',
			hidden: false,
			values: ['news', 'blog'],
			maxSelect: 0,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'select (multiple)'],
			['hidden', 'false'],
			['required', 'false'],
		])

		const { selectFieldSchema } = await import('./field-handlers')
		const [schema, docs] = selectFieldSchema(field as any)

		expect(schema).toBe("category: ('news' | 'blog')[]")
		expect(docs).toBe(expectedDocs)
	})
})

describe('fileFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'avatar',
			hidden: false,
			maxSize: 0,
			maxSelect: 0,
			mimeTypes: [],
			thumbs: [],
			protected: false,
			required: false,
			isMultiple: () => false,
		}

		const { fileFieldSchema } = await import('./field-handlers')
		const [schema, docs] = fileFieldSchema(field as any)

		expect(schema).toBe('avatar: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs for single file', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'avatar',
			hidden: true,
			maxSize: 5242880,
			maxSelect: 0,
			mimeTypes: ['image/jpeg', 'image/png'],
			thumbs: ['100x100', '200x200'],
			protected: true,
			required: true,
			isMultiple: () => false,
		}

		const expectedDocs = generateMDTable([
			['type', 'file(single)'],
			['hidden', 'true'],
			['required', 'true'],
			['protected', 'true'],
			['maxSize', '5242880'],
			['mimeTypes', 'image/jpeg`, `image/png'],
			['thumbs', '100x100`, `200x200'],
		])

		const { fileFieldSchema } = await import('./field-handlers')
		const [schema, docs] = fileFieldSchema(field as any)

		expect(schema).toBe('avatar: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should return schema with complete docs for multiple files', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'gallery',
			hidden: false,
			maxSize: 10485760,
			maxSelect: 5,
			mimeTypes: ['image/jpeg', 'image/png'],
			thumbs: ['100x100'],
			protected: false,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'file (multiple)'],
			['hidden', 'false'],
			['required', 'false'],
			['protected', 'false'],
			['maxSize', '10485760'],
			['maxSelect', '5'],
			['mimeTypes', 'image/jpeg`, `image/png'],
			['thumbs', '100x100'],
		])

		const { fileFieldSchema } = await import('./field-handlers')
		const [schema, docs] = fileFieldSchema(field as any)

		expect(schema).toBe('gallery: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should return tuple if multiple and required', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'gallery',
			hidden: true,
			maxSize: 10485760,
			maxSelect: 5,
			mimeTypes: ['image/jpeg'],
			thumbs: [],
			protected: true,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'file (multiple)'],
			['hidden', 'true'],
			['required', 'true'],
			['protected', 'true'],
			['maxSize', '10485760'],
			['maxSelect', '5'],
			['mimeTypes', 'image/jpeg'],
		])

		const { fileFieldSchema } = await import('./field-handlers')
		const [schema, docs] = fileFieldSchema(field as any)

		expect(schema).toBe('gallery: [string, ...string[]]')
		expect(docs).toBe(expectedDocs)
	})

	it('should return array if multiple and NOT required', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'gallery',
			hidden: true,
			maxSize: 10485760,
			maxSelect: 5,
			mimeTypes: ['image/jpeg'],
			thumbs: [],
			protected: true,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'file (multiple)'],
			['hidden', 'true'],
			['required', 'false'],
			['protected', 'true'],
			['maxSize', '10485760'],
			['maxSelect', '5'],
			['mimeTypes', 'image/jpeg'],
		])

		const { fileFieldSchema } = await import('./field-handlers')
		const [schema, docs] = fileFieldSchema(field as any)

		expect(schema).toBe('gallery: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit maxSelect if not multiple or zero', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'gallery',
			hidden: false,
			maxSize: 5242880,
			maxSelect: 0,
			mimeTypes: ['image/jpeg'],
			thumbs: [],
			protected: false,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'file (multiple)'],
			['hidden', 'false'],
			['required', 'false'],
			['protected', 'false'],
			['maxSize', '5242880'],
			['mimeTypes', 'image/jpeg'],
		])

		const { fileFieldSchema } = await import('./field-handlers')
		const [schema, docs] = fileFieldSchema(field as any)

		expect(schema).toBe('gallery: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit mimeTypes and thumbs if empty', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'document',
			hidden: false,
			maxSize: 1048576,
			maxSelect: 1,
			mimeTypes: [],
			thumbs: [],
			protected: false,
			required: true,
			isMultiple: () => false,
		}

		const expectedDocs = generateMDTable([
			['type', 'file(single)'],
			['hidden', 'false'],
			['required', 'true'],
			['protected', 'false'],
			['maxSize', '1048576'],
		])

		const { fileFieldSchema } = await import('./field-handlers')
		const [schema, docs] = fileFieldSchema(field as any)

		expect(schema).toBe('document: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('relationFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'user',
			hidden: false,
			collectionId: 'users',
			collectionName: 'users',
			cascadeDelete: false,
			minSelect: 0,
			maxSelect: 0,
			required: false,
			isMultiple: () => false,
		}

		const { relationFieldSchema } = await import('./field-handlers')
		const [schema, docs] = relationFieldSchema(field as any)

		expect(schema).toBe('user: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs for single relation', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'author',
			hidden: true,
			collectionId: 'users',
			collectionName: 'users',
			cascadeDelete: true,
			minSelect: 1,
			maxSelect: 1,
			required: true,
			isMultiple: () => false,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation(single)'],
			['hidden', 'true'],
			['required', 'true'],
			['collectionId', 'users'],
			['collectionName', 'users'],
			['cascadeDelete', 'true'],
			['minSelect', '1'],
		])

		const { relationFieldSchema } = await import('./field-handlers')
		const [schema, docs] = relationFieldSchema(field as any)

		expect(schema).toBe('author: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should return schema with complete docs for multiple relations', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'categories',
			hidden: false,
			collectionId: 'categories',
			collectionName: 'categories',
			cascadeDelete: true,
			minSelect: 1,
			maxSelect: 3,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation (multiple)'],
			['hidden', 'false'],
			['required', 'false'],
			['collectionId', 'categories'],
			['collectionName', 'categories'],
			['cascadeDelete', 'true'],
			['minSelect', '1'],
			['maxSelect', '3'],
		])

		const { relationFieldSchema } = await import('./field-handlers')
		const [schema, docs] = relationFieldSchema(field as any)

		expect(schema).toBe('categories: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should return tuple if multiple and required', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'tags',
			hidden: true,
			collectionId: 'tags',
			collectionName: 'tags',
			cascadeDelete: false,
			minSelect: 1,
			maxSelect: 3,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation (multiple)'],
			['hidden', 'true'],
			['required', 'true'],
			['collectionId', 'tags'],
			['collectionName', 'tags'],
			['cascadeDelete', 'false'],
			['minSelect', '1'],
			['maxSelect', '3'],
		])

		const { relationFieldSchema } = await import('./field-handlers')
		const [schema, docs] = relationFieldSchema(field as any)

		expect(schema).toBe('tags: [string, ...string[]]')
		expect(docs).toBe(expectedDocs)
	})

	it('should return array if multiple and NOT required', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'tags',
			hidden: true,
			collectionId: 'tags',
			collectionName: 'tags',
			cascadeDelete: false,
			minSelect: 0,
			maxSelect: 3,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation (multiple)'],
			['hidden', 'true'],
			['required', 'false'],
			['collectionId', 'tags'],
			['collectionName', 'tags'],
			['cascadeDelete', 'false'],
			['maxSelect', '3'],
		])

		const { relationFieldSchema } = await import('./field-handlers')
		const [schema, docs] = relationFieldSchema(field as any)

		expect(schema).toBe('tags: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit minSelect if zero', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'tags',
			hidden: false,
			collectionId: 'tags',
			collectionName: 'tags',
			cascadeDelete: false,
			minSelect: 0,
			maxSelect: 5,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation (multiple)'],
			['hidden', 'false'],
			['required', 'false'],
			['collectionId', 'tags'],
			['collectionName', 'tags'],
			['cascadeDelete', 'false'],
			['maxSelect', '5'],
		])

		const { relationFieldSchema } = await import('./field-handlers')
		const [schema, docs] = relationFieldSchema(field as any)

		expect(schema).toBe('tags: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit maxSelect if not multiple or zero', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'category',
			hidden: false,
			collectionId: 'categories',
			collectionName: 'categories',
			cascadeDelete: false,
			minSelect: 1,
			maxSelect: 0,
			required: false,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation (multiple)'],
			['hidden', 'false'],
			['required', 'false'],
			['collectionId', 'categories'],
			['collectionName', 'categories'],
			['cascadeDelete', 'false'],
			['minSelect', '1'],
		])

		const { relationFieldSchema } = await import('./field-handlers')
		const [schema, docs] = relationFieldSchema(field as any)

		expect(schema).toBe('category: string[]')
		expect(docs).toBe(expectedDocs)
	})
})

describe('jsonFieldSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should return basic schema without docs', async ({ expect }) => {
		setIncludeDocs(false)

		const field = {
			name: 'data',
			hidden: false,
			maxSize: 0,
			required: false,
		}

		const { jsonFieldSchema } = await import('./field-handlers')
		const [schema, docs] = jsonFieldSchema(field as any)

		expect(schema).toBe('data: any')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', async ({ expect }) => {
		setIncludeDocs(true)

		const field = {
			name: 'data',
			hidden: true,
			maxSize: 2048,
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'json'],
			['hidden', 'true'],
			['maxSize', '2048'],
			['required', 'true'],
		])

		const { jsonFieldSchema } = await import('./field-handlers')
		const [schema, docs] = jsonFieldSchema(field as any)

		expect(schema).toBe('data: any')
		expect(docs).toBe(expectedDocs)
	})
})
