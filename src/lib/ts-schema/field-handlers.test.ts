import { describe, it, expect } from 'vitest'
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
import { generateMDTable } from '../utils'

describe('textFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'title',
			hidden: false,
			min: 0,
			max: 0,
			pattern: '',
			autogeneratePattern: '',
			required: false,
		}

		const [schema, docs] = textFieldSchema(field, false)

		expect(schema).toBe('title: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = textFieldSchema(field, true)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit min if they're not set", () => {
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

		const [schema, docs] = textFieldSchema(field, true)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit max if they're not set", () => {
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

		const [schema, docs] = textFieldSchema(field, true)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit pattern if they're not set", () => {
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

		const [schema, docs] = textFieldSchema(field, true)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit autogeneratePattern if they're not set", () => {
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

		const [schema, docs] = textFieldSchema(field, true)

		expect(schema).toBe('title: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('passwordFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'password',
			hidden: false,
			min: 0,
			max: 0,
			pattern: '',
			required: false,
		}

		const [schema, docs] = passwordFieldSchema(field, false)

		expect(schema).toBe('password: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = passwordFieldSchema(field, true)

		expect(schema).toBe('password: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit min if it's not set", () => {
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

		const [schema, docs] = passwordFieldSchema(field, true)

		expect(schema).toBe('password: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit max if it's not set", () => {
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

		const [schema, docs] = passwordFieldSchema(field, true)

		expect(schema).toBe('password: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit pattern if it's not set", () => {
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

		const [schema, docs] = passwordFieldSchema(field, true)

		expect(schema).toBe('password: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('editorFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'content',
			hidden: false,
			maxSize: 0,
			convertURLs: false,
			required: false,
		}

		const [schema, docs] = editorFieldSchema(field, false)

		expect(schema).toBe('content: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = editorFieldSchema(field, true)

		expect(schema).toBe('content: string')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit maxSize if it's not set", () => {
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

		const [schema, docs] = editorFieldSchema(field, true)

		expect(schema).toBe('content: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('numberFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'count',
			hidden: false,
			min: null,
			max: null,
			onlyInt: false,
			required: false,
		}

		const [schema, docs] = numberFieldSchema(field, false)

		expect(schema).toBe('count: number')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = numberFieldSchema(field, true)

		expect(schema).toBe('count: number')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit min if it's null", () => {
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

		const [schema, docs] = numberFieldSchema(field, true)

		expect(schema).toBe('count: number')
		expect(docs).toBe(expectedDocs)
	})

	it("should omit max if it's null", () => {
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

		const [schema, docs] = numberFieldSchema(field, true)

		expect(schema).toBe('count: number')
		expect(docs).toBe(expectedDocs)
	})
})

describe('boolFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'active',
			hidden: false,
			required: false,
		}

		const [schema, docs] = boolFieldSchema(field, false)

		expect(schema).toBe('active: boolean')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
		const field = {
			name: 'active',
			hidden: true,
			required: false,
		}

		const expectedDocs = generateMDTable([
			['type', 'bool'],
			['hidden', 'true'],
		])

		const [schema, docs] = boolFieldSchema(field, true)

		expect(schema).toBe('active: boolean')
		expect(docs).toBe(expectedDocs)
	})

	it('should return "true" type when required is true', () => {
		const field = {
			name: 'active',
			hidden: false,
			required: true,
		}

		const expectedDocs = generateMDTable([
			['type', 'bool'],
			['hidden', 'false'],
		])

		const [schema, docs] = boolFieldSchema(field, true)

		expect(schema).toBe('active: true')
		expect(docs).toBe(expectedDocs)
	})
})

describe('emailFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'email',
			hidden: false,
			exceptDomains: [],
			onlyDomains: [],
			required: false,
		}

		const [schema, docs] = emailFieldSchema(field, false)

		expect(schema).toBe('email: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = emailFieldSchema(field, true)

		expect(schema).toBe('email: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit exceptDomains if empty', () => {
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

		const [schema, docs] = emailFieldSchema(field, true)

		expect(schema).toBe('email: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit onlyDomains if empty', () => {
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

		const [schema, docs] = emailFieldSchema(field, true)

		expect(schema).toBe('email: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('urlFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'website',
			hidden: false,
			exceptDomains: [],
			onlyDomains: [],
			required: false,
		}

		const [schema, docs] = urlFieldSchema(field, false)

		expect(schema).toBe('website: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = urlFieldSchema(field, true)

		expect(schema).toBe('website: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit exceptDomains if empty', () => {
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

		const [schema, docs] = urlFieldSchema(field, true)

		expect(schema).toBe('website: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit onlyDomains if empty', () => {
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

		const [schema, docs] = urlFieldSchema(field, true)

		expect(schema).toBe('website: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('dateFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'created',
			hidden: false,
			min: '',
			max: '',
			required: false,
		}

		const [schema, docs] = dateFieldSchema(field, false)

		expect(schema).toBe('created: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = dateFieldSchema(field, true)

		expect(schema).toBe('created: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit min if empty string', () => {
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

		const [schema, docs] = dateFieldSchema(field, true)

		expect(schema).toBe('created: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit max if empty string', () => {
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

		const [schema, docs] = dateFieldSchema(field, true)

		expect(schema).toBe('created: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('autodateFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'timestamp',
			hidden: false,
			onCreate: false,
			onUpdate: false,
		}

		const [schema, docs] = autodateFieldSchema(field, false)

		expect(schema).toBe('timestamp: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = autodateFieldSchema(field, true)

		expect(schema).toBe('timestamp: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('selectFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'category',
			hidden: false,
			values: ['news', 'blog'],
			maxSelect: 0,
			required: false,
			isMultiple: () => false,
		}

		const [schema, docs] = selectFieldSchema(field, false)

		expect(schema).toBe("category: 'news' | 'blog'")
		expect(docs).toBe('')
	})

	it('should return schema for multiple select with complete docs', () => {
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

		const [schema, docs] = selectFieldSchema(field, true)

		expect(schema).toBe("tags: ('featured' | 'trending' | 'popular')[]")
		expect(docs).toBe(expectedDocs)
	})

	it('should return schema for single select with complete docs', () => {
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

		const [schema, docs] = selectFieldSchema(field, true)

		expect(schema).toBe("status: 'draft' | 'published'")
		expect(docs).toBe(expectedDocs)
	})

	it('should omit maxSelect if not multiple or zero', () => {
		const field = {
			name: 'category',
			hidden: false,
			values: ['news', 'blog'],
			maxSelect: 0,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'select (multiple)'],
			['hidden', 'false'],
			['required', 'true'],
		])

		const [schema, docs] = selectFieldSchema(field, true)

		expect(schema).toBe("category: ('news' | 'blog')[]")
		expect(docs).toBe(expectedDocs)
	})
})

describe('fileFieldSchema', () => {
	it('should return basic schema without docs', () => {
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

		const [schema, docs] = fileFieldSchema(field, false)

		expect(schema).toBe('avatar: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs for single file', () => {
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

		const [schema, docs] = fileFieldSchema(field, true)

		expect(schema).toBe('avatar: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should return schema with complete docs for multiple files', () => {
		const field = {
			name: 'gallery',
			hidden: false,
			maxSize: 10485760,
			maxSelect: 5,
			mimeTypes: ['image/jpeg', 'image/png'],
			thumbs: ['100x100'],
			protected: false,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'file (multiple)'],
			['hidden', 'false'],
			['required', 'true'],
			['protected', 'false'],
			['maxSize', '10485760'],
			['maxSelect', '5'],
			['mimeTypes', 'image/jpeg`, `image/png'],
			['thumbs', '100x100'],
		])

		const [schema, docs] = fileFieldSchema(field, true)

		expect(schema).toBe('gallery: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit maxSelect if not multiple or zero', () => {
		const field = {
			name: 'gallery',
			hidden: false,
			maxSize: 5242880,
			maxSelect: 0,
			mimeTypes: ['image/jpeg'],
			thumbs: [],
			protected: false,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'file (multiple)'],
			['hidden', 'false'],
			['required', 'true'],
			['protected', 'false'],
			['maxSize', '5242880'],
			['mimeTypes', 'image/jpeg'],
		])

		const [schema, docs] = fileFieldSchema(field, true)

		expect(schema).toBe('gallery: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit mimeTypes and thumbs if empty', () => {
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

		const [schema, docs] = fileFieldSchema(field, true)

		expect(schema).toBe('document: string')
		expect(docs).toBe(expectedDocs)
	})
})

describe('relationFieldSchema', () => {
	it('should return basic schema without docs', () => {
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

		const [schema, docs] = relationFieldSchema(field, false)

		expect(schema).toBe('user: string')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs for single relation', () => {
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

		const [schema, docs] = relationFieldSchema(field, true)

		expect(schema).toBe('author: string')
		expect(docs).toBe(expectedDocs)
	})

	it('should return schema with complete docs for multiple relations', () => {
		const field = {
			name: 'categories',
			hidden: false,
			collectionId: 'categories',
			collectionName: 'categories',
			cascadeDelete: true,
			minSelect: 1,
			maxSelect: 3,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation (multiple)'],
			['hidden', 'false'],
			['required', 'true'],
			['collectionId', 'categories'],
			['collectionName', 'categories'],
			['cascadeDelete', 'true'],
			['minSelect', '1'],
			['maxSelect', '3'],
		])

		const [schema, docs] = relationFieldSchema(field, true)

		expect(schema).toBe('categories: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit minSelect if zero', () => {
		const field = {
			name: 'tags',
			hidden: false,
			collectionId: 'tags',
			collectionName: 'tags',
			cascadeDelete: false,
			minSelect: 0,
			maxSelect: 5,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation (multiple)'],
			['hidden', 'false'],
			['required', 'true'],
			['collectionId', 'tags'],
			['collectionName', 'tags'],
			['cascadeDelete', 'false'],
			['maxSelect', '5'],
		])

		const [schema, docs] = relationFieldSchema(field, true)

		expect(schema).toBe('tags: string[]')
		expect(docs).toBe(expectedDocs)
	})

	it('should omit maxSelect if not multiple or zero', () => {
		const field = {
			name: 'category',
			hidden: false,
			collectionId: 'categories',
			collectionName: 'categories',
			cascadeDelete: false,
			minSelect: 1,
			maxSelect: 0,
			required: true,
			isMultiple: () => true,
		}

		const expectedDocs = generateMDTable([
			['type', 'relation (multiple)'],
			['hidden', 'false'],
			['required', 'true'],
			['collectionId', 'categories'],
			['collectionName', 'categories'],
			['cascadeDelete', 'false'],
			['minSelect', '1'],
		])

		const [schema, docs] = relationFieldSchema(field, true)

		expect(schema).toBe('category: string[]')
		expect(docs).toBe(expectedDocs)
	})
})

describe('jsonFieldSchema', () => {
	it('should return basic schema without docs', () => {
		const field = {
			name: 'data',
			hidden: false,
			maxSize: 0,
			required: false,
		}

		const [schema, docs] = jsonFieldSchema(field, false)

		expect(schema).toBe('data: any')
		expect(docs).toBe('')
	})

	it('should return schema with complete docs', () => {
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

		const [schema, docs] = jsonFieldSchema(field, true)

		expect(schema).toBe('data: any')
		expect(docs).toBe(expectedDocs)
	})
})
