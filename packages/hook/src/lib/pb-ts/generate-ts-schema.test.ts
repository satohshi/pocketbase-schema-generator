import { describe, it, vi, afterEach } from 'vitest'
import { generateTsSchema } from './generate-ts-schema'

describe('generateTsSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
	})

	it('should handle includeSystemCollections parameter', ({ expect }) => {
		const mockCollections = [
			{
				id: '1',
				name: 'users',
				system: true,
				fields: [],
				indexes: [],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const resultWithSystem = generateTsSchema(true)
		expect(resultWithSystem).toContain('export interface Users ')

		const resultWithoutSystem = generateTsSchema(false)
		expect(resultWithoutSystem).not.toContain('export interface Users ')
	})

	it('should include unique identifier if necessary', ({ expect }) => {
		const mockCollections = [
			{
				id: '1',
				name: 'foo',
				system: false,
				fields: [
					{
						name: 'boolField',
						type: () => 'bool',
						hidden: false,
						required: false,
					},
				],
				indexes: [],
			},
			{
				id: '1',
				name: 'bar',
				system: false,
				fields: [
					{
						name: 'boolField',
						type: () => 'bool',
						hidden: false,
						required: false,
					},
				],
				indexes: [],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateTsSchema()
		expect(result).toContain('readonly [uniqueIdentifier]: unique symbol')
	})

	it('should not include unique identifier unless necessary', ({ expect }) => {
		const mockCollections = [
			{
				id: '1',
				name: 'foo',
				system: false,
				fields: [
					{
						name: 'boolField',
						type: () => 'bool',
						hidden: false,
						required: false,
					},
				],
				indexes: [],
			},
			{
				id: '1',
				name: 'bar',
				system: false,
				fields: [
					{
						name: 'boolFieldWithDifferentName',
						type: () => 'bool',
						hidden: false,
						required: false,
					},
				],
				indexes: [],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateTsSchema()
		expect(result).not.toContain('readonly [uniqueIdentifier]: unique symbol')
	})

	it('should handle optional forward relations properly', ({ expect }) => {
		const mockCollections = [
			{
				id: '1',
				name: 'foo',
				system: false,
				fields: [
					{
						name: 'relatedBar',
						type: () => 'relation',
						hidden: false,
						collectionId: '2',
						cascadeDelete: false,
						minSelect: 0,
						maxSelect: 100,
						required: false,
						isMultiple: () => false,
					},
				],
				indexes: [],
			},
			{
				id: '2',
				name: 'bar',
				system: false,
				fields: [
					{
						name: 'fooId',
						type: () => 'text',
						hidden: false,
						min: 0,
						max: 100,
						pattern: '',
						autogeneratePattern: '',
						required: false,
					},
				],
				indexes: [],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateTsSchema()
		expect(result).toContain('relatedBar?: Bar')
	})

	it('should handle required forward relations properly', ({ expect }) => {
		const mockCollections = [
			{
				id: '1',
				name: 'foo',
				system: false,
				fields: [
					{
						name: 'relatedBar',
						type: () => 'relation',
						hidden: false,
						collectionId: '2',
						cascadeDelete: false,
						minSelect: 0,
						maxSelect: 100,
						required: true,
						isMultiple: () => false,
					},
				],
				indexes: [],
			},
			{
				id: '2',
				name: 'bar',
				system: false,
				fields: [
					{
						name: 'fooId',
						type: () => 'text',
						hidden: false,
						min: 0,
						max: 100,
						pattern: '',
						autogeneratePattern: '',
						required: false,
					},
				],
				indexes: [],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateTsSchema()
		expect(result).toContain('relatedBar: Bar')
	})

	it('should handle optional(no unique constraint) back relations properly', ({ expect }) => {
		const mockCollections = [
			{
				id: '1',
				name: 'foo',
				system: false,
				fields: [
					{
						name: 'relatedBar',
						type: () => 'relation',
						hidden: false,
						collectionId: '2',
						cascadeDelete: false,
						minSelect: 0,
						maxSelect: 100,
						required: false,
						isMultiple: () => false,
					},
				],
				indexes: [],
			},
			{
				id: '2',
				name: 'bar',
				system: false,
				fields: [
					{
						name: 'fooId',
						type: () => 'text',
						hidden: false,
						min: 0,
						max: 100,
						pattern: '',
						autogeneratePattern: '',
						required: false,
					},
				],
				indexes: [],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateTsSchema()
		expect(result).toContain('// foo_via_relatedBar?: Foo[]')
	})

	it('should handle required(unique constraint) back relations properly', ({ expect }) => {
		const mockCollections = [
			{
				id: 'userCollectionId',
				name: 'users',
				system: false,
				fields: [
					{
						name: 'id',
						type: () => 'text',
						hidden: false,
						min: 0,
						max: 100,
						pattern: '',
						autogeneratePattern: '',
						required: false,
					},
				],
				indexes: [],
			},
			{
				id: 'userDetailsCollectionId',
				name: 'userDetails',
				system: false,
				fields: [
					{
						name: 'user',
						type: () => 'relation',
						hidden: false,
						collectionId: 'userCollectionId',
						cascadeDelete: false,
						minSelect: 0,
						maxSelect: 100,
						required: true,
						isMultiple: () => false,
					},
				],
				indexes: ['CREATE UNIQUE INDEX `idx_1` ON `userDetails` (`user`)'],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateTsSchema()
		expect(result).not.toContain(`// userDetails_via_user?: UserDetails[]`)
		expect(result).toContain(`userDetails_via_user?: UserDetails`)
	})

	it('should include system collections if includeSystemCollections is true', ({ expect }) => {
		const mockCollections = [
			{
				id: '1',
				name: 'users',
				system: true,
				fields: [],
				indexes: [],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateTsSchema(true)
		expect(result).toContain('export interface Users ')
	})

	it('should not include system collections if includeSystemCollections is false', ({
		expect,
	}) => {
		const mockCollections = [
			{
				id: '1',
				name: 'users',
				system: true,
				fields: [],
				indexes: [],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateTsSchema(false)
		expect(result).not.toContain('export interface Users ')
	})
})
