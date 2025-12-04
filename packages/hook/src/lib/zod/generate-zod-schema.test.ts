import { describe, it, vi, afterEach } from 'vitest'
import { generateZodSchema } from './generate-zod-schema'

describe('generateZodSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
	})

	it('should import zod', ({ expect }) => {
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue([]),
		})
		const result = generateZodSchema()
		expect(result).toContain("import { z } from 'zod'")
	})

	it('should generate schema with datetime regex when date fields exist', ({ expect }) => {
		const mockCollections = [
			{
				id: '123',
				name: 'posts',
				system: false,
				fields: [
					{
						name: 'id',
						type: () => 'text',
					},
					{
						name: 'created',
						type: () => 'date',
						required: true,
						min: { string: () => '' },
						max: { string: () => '' },
					},
				],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateZodSchema()
		expect(result).toContain('DATETIME_REGEX')
	})

	it('should generate schema with datetime regex when autodate fields exist', ({ expect }) => {
		const mockCollections = [
			{
				id: '123',
				name: 'posts',
				system: false,
				fields: [
					{
						name: 'id',
						type: () => 'text',
					},
					{
						name: 'created',
						type: () => 'autodate',
						required: true,
						min: { string: () => '' },
						max: { string: () => '' },
					},
				],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateZodSchema()
		expect(result).toContain('DATETIME_REGEX')
	})

	it('should not generate schema with datetime regex when no date fields exist', ({ expect }) => {
		const mockCollections = [
			{
				id: '123',
				name: 'posts',
				system: false,
				fields: [
					{
						name: 'id',
						type: () => 'text',
					},
					{
						name: 'title',
						type: () => 'text',
						required: true,
					},
				],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateZodSchema()
		expect(result).not.toContain('DATETIME_REGEX')
	})

	it('should only generate schema for non-system collections when the option is set to false', ({
		expect,
	}) => {
		const mockCollections = [
			{
				id: '123',
				name: '_system',
				system: true,
				fields: [
					{
						name: 'id',
						type: () => 'text',
					},
					{
						name: 'title',
						type: () => 'text',
						required: true,
					},
				],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateZodSchema()
		expect(result).not.toContain('systemSchema')
	})

	it('should generate schema for all collections when the option is set to true', ({
		expect,
	}) => {
		const mockCollections = [
			{
				id: '123',
				name: '_system',
				system: true,
				fields: [
					{
						name: 'id',
						type: () => 'text',
					},
					{
						name: 'title',
						type: () => 'text',
						required: true,
					},
				],
			},
		]
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue(mockCollections),
		})

		const result = generateZodSchema(true)
		expect(result).toContain('systemSchema')
	})
})
