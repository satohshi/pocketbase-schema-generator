import { describe, it, expect } from 'vitest'
import {
	boolFieldSchema,
	dateFieldSchema,
	editorFieldSchema,
	emailFieldSchema,
	fileFieldSchema,
	numberFieldSchema,
	relationFieldSchema,
	selectFieldSchema,
	textFieldSchema,
	urlFieldSchema,
} from './field-handlers'

describe('textFieldSchema', () => {
	it('should generate basic string schema', () => {
		expect(
			textFieldSchema({
				name: 'title',
				pattern: '',
				min: 0,
				max: 0,
				required: false,
			})
		).toBe('title: z.string()')
	})

	it('should handle regex pattern', () => {
		expect(
			textFieldSchema({
				name: 'code',
				pattern: '[A-Z]+',
				min: 0,
				max: 0,
				required: false,
			})
		).toBe('code: z.string().regex(/[A-Z]+/)')
	})

	it('should add length when min equals max', () => {
		expect(
			textFieldSchema({
				name: 'pin',
				pattern: '',
				min: 4,
				max: 4,
				required: false,
			})
		).toBe('pin: z.string().length(4)')
	})

	it('should add min/max constraints', () => {
		expect(
			textFieldSchema({
				name: 'username',
				pattern: '',
				min: 3,
				max: 20,
				required: false,
			})
		).toBe('username: z.string().min(3).max(20)')
	})

	it('should add min(1) when required without min', () => {
		expect(
			textFieldSchema({
				name: 'required_field',
				pattern: '',
				min: 0,
				max: 0,
				required: true,
			})
		).toBe('required_field: z.string().min(1)')
	})
})

describe('editorFieldSchema', () => {
	it('should generate basic editor schema when not required', () => {
		expect(
			editorFieldSchema({
				name: 'content',
				required: false,
			})
		).toBe('content: z.string()')
	})

	it('should add min(1) when required', () => {
		expect(
			editorFieldSchema({
				name: 'content',
				required: true,
			})
		).toBe('content: z.string().min(1)')
	})
})

describe('numberFieldSchema', () => {
	it('should generate basic number schema', () => {
		expect(
			numberFieldSchema({
				name: 'amount',
				onlyInt: false,
				min: undefined,
				max: undefined,
				required: false,
			})
		).toBe('amount: z.number()')
	})

	it('should add int() constraint when onlyInt is true', () => {
		expect(
			numberFieldSchema({
				name: 'count',
				onlyInt: true,
				min: undefined,
				max: undefined,
				required: false,
			})
		).toBe('count: z.number().int()')
	})

	it('should add min/max constraints', () => {
		expect(
			numberFieldSchema({
				name: 'rating',
				onlyInt: false,
				min: 1,
				max: 5,
				required: false,
			})
		).toBe('rating: z.number().min(1).max(5)')
	})

	it('should add non-zero refinement when required', () => {
		expect(
			numberFieldSchema({
				name: 'quantity',
				onlyInt: false,
				min: undefined,
				max: undefined,
				required: true,
			})
		).toBe('quantity: z.number().refine((n) => n !== 0)')
	})
})

describe('boolFieldSchema', () => {
	it('should generate basic boolean schema when not required', () => {
		expect(
			boolFieldSchema({
				name: 'active',
				required: false,
			})
		).toBe('active: z.boolean()')
	})

	it('should generate literal true schema when required', () => {
		expect(
			boolFieldSchema({
				name: 'terms',
				required: true,
			})
		).toBe('terms: z.literal(true)')
	})
})

describe('emailFieldSchema', () => {
	it('should generate basic email schema', () => {
		expect(
			emailFieldSchema({
				name: 'email',
				exceptDomains: [],
				onlyDomains: [],
			})
		).toBe('email: z.string().email()')
	})

	it('should add onlyDomains refinement', () => {
		expect(
			emailFieldSchema({
				name: 'email',
				exceptDomains: [],
				onlyDomains: ['example.com', 'test.com'],
			})
		).toBe(
			`email: z.string().email().refine((v) => ["example.com", "test.com"].includes(v.split('@')[1]))`
		)
	})

	it('should add exceptDomains refinement', () => {
		expect(
			emailFieldSchema({
				name: 'email',
				exceptDomains: ['spam.com'],
				onlyDomains: [],
			})
		).toBe(`email: z.string().email().refine((v) => !["spam.com"].includes(v.split('@')[1]))`)
	})
})

describe('urlFieldSchema', () => {
	it('should generate basic url schema', () => {
		expect(
			urlFieldSchema({
				name: 'website',
				exceptDomains: [],
				onlyDomains: [],
			})
		).toBe('website: z.string().url()')
	})

	it('should add onlyDomains refinement', () => {
		expect(
			urlFieldSchema({
				name: 'website',
				exceptDomains: [],
				onlyDomains: ['example.com'],
			})
		).toBe(
			'website: z.string().url().refine((v) => ["example.com"].some((domain) => v.includes(domain)))'
		)
	})

	it('should add exceptDomains refinement', () => {
		expect(
			urlFieldSchema({
				name: 'website',
				exceptDomains: ['spam.com'],
				onlyDomains: [],
			})
		).toBe(
			'website: z.string().url().refine((v) => ["spam.com"].every((domain) => !v.includes(domain)))'
		)
	})
})

describe('dateFieldSchema', () => {
	it('should generate basic date schema with regex', () => {
		expect(
			dateFieldSchema({
				name: 'created',
				min: { string: () => '' },
				max: { string: () => '' },
			})
		).toBe('created: z.string().regex(DATETIME_REGEX)')
	})

	it('should add min date refinement', () => {
		expect(
			dateFieldSchema({
				name: 'start',
				min: { string: () => '2023-01-01' },
				max: { string: () => '' },
			})
		).toBe(
			'start: z.string().regex(DATETIME_REGEX).refine((v) => {\n' +
				'        const date = new Date(v)\n' +
				"        const minDate = new Date('2023-01-01')\n" +
				'        return date >= minDate\n' +
				'    })'
		)
	})

	it('should add max date refinement', () => {
		expect(
			dateFieldSchema({
				name: 'end',
				min: { string: () => '' },
				max: { string: () => '2023-12-31' },
			})
		).toBe(
			'end: z.string().regex(DATETIME_REGEX).refine((v) => {\n' +
				'        const date = new Date(v)\n' +
				"        const maxDate = new Date('2023-12-31')\n" +
				'        return date <= maxDate\n' +
				'    })'
		)
	})

	it('should add both min and max date refinements', () => {
		expect(
			dateFieldSchema({
				name: 'period',
				min: { string: () => '2023-01-01' },
				max: { string: () => '2023-12-31' },
			})
		).toBe(
			'period: z.string().regex(DATETIME_REGEX).refine((v) => {\n' +
				'        const date = new Date(v)\n' +
				"        const minDate = new Date('2023-01-01')\n" +
				"        const maxDate = new Date('2023-12-31')\n" +
				'        return date >= minDate && date <= maxDate\n' +
				'    })'
		)
	})
})

describe('selectFieldSchema', () => {
	it('should generate basic enum schema for single select', () => {
		expect(
			selectFieldSchema({
				name: 'status',
				values: ['active', 'inactive'],
				maxSelect: undefined,
				required: false,
				isMultiple: () => false,
			})
		).toBe('status: z.enum(["active", "inactive"])')
	})

	it('should generate array schema for multiple select', () => {
		expect(
			selectFieldSchema({
				name: 'tags',
				values: ['news', 'tech', 'sports'],
				maxSelect: undefined,
				required: false,
				isMultiple: () => true,
			})
		).toBe('tags: z.enum(["news", "tech", "sports"]).array()')
	})

	it('should add nonempty() when required and multiple', () => {
		expect(
			selectFieldSchema({
				name: 'categories',
				values: ['A', 'B', 'C'],
				maxSelect: undefined,
				required: true,
				isMultiple: () => true,
			})
		).toBe('categories: z.enum(["A", "B", "C"]).array().nonempty()')
	})

	it('should add max constraint when maxSelect provided', () => {
		expect(
			selectFieldSchema({
				name: 'options',
				values: ['x', 'y', 'z'],
				maxSelect: 2,
				required: false,
				isMultiple: () => true,
			})
		).toBe('options: z.enum(["x", "y", "z"]).array().max(2)')
	})
})

describe('fileFieldSchema', () => {
	it('should generate basic string schema for single file', () => {
		expect(
			fileFieldSchema({
				name: 'avatar',
				maxSelect: undefined,
				required: false,
				isMultiple: () => false,
			})
		).toBe('avatar: z.string()')
	})

	it('should generate array schema for multiple files', () => {
		expect(
			fileFieldSchema({
				name: 'attachments',
				maxSelect: undefined,
				required: false,
				isMultiple: () => true,
			})
		).toBe('attachments: z.string().array()')
	})

	it('should add nonempty() when required and multiple', () => {
		expect(
			fileFieldSchema({
				name: 'documents',
				maxSelect: undefined,
				required: true,
				isMultiple: () => true,
			})
		).toBe('documents: z.string().array().nonempty()')
	})

	it('should add max constraint when maxSelect provided', () => {
		expect(
			fileFieldSchema({
				name: 'photos',
				maxSelect: 5,
				required: false,
				isMultiple: () => true,
			})
		).toBe('photos: z.string().array().max(5)')
	})
})

describe('relationFieldSchema', () => {
	it('should generate basic schema for single relation', () => {
		expect(
			relationFieldSchema({
				name: 'author',
				minSelect: undefined,
				maxSelect: undefined,
				required: false,
				isMultiple: () => false,
				targetIdSchema: 'z.string().regex(/^[a-z0-9]+$/).length(15)',
			})
		).toBe('author: z.string().regex(/^[a-z0-9]+$/).length(15)')
	})

	it('should generate array schema for multiple relations', () => {
		expect(
			relationFieldSchema({
				name: 'categories',
				minSelect: undefined,
				maxSelect: undefined,
				required: false,
				isMultiple: () => true,
				targetIdSchema: 'z.string().regex(/^[a-z0-9]+$/).length(15)',
			})
		).toBe('categories: z.string().regex(/^[a-z0-9]+$/).length(15).array()')
	})

	it('should add nonempty() when required and multiple', () => {
		expect(
			relationFieldSchema({
				name: 'tags',
				minSelect: undefined,
				maxSelect: undefined,
				required: true,
				isMultiple: () => true,
				targetIdSchema: 'z.string().regex(/^[a-z0-9]+$/).length(15)',
			})
		).toBe('tags: z.string().regex(/^[a-z0-9]+$/).length(15).array().nonempty()')
	})

	it('should add min/max constraints when provided', () => {
		expect(
			relationFieldSchema({
				name: 'references',
				minSelect: 2,
				maxSelect: 5,
				required: false,
				isMultiple: () => true,
				targetIdSchema: 'z.string().regex(/^[a-z0-9]+$/).length(15)',
			})
		).toBe('references: z.string().regex(/^[a-z0-9]+$/).length(15).array().min(2).max(5)')
	})
})
