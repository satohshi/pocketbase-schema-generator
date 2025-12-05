import { describe, it, vi, afterEach } from 'vitest'
import { generateZodSchema } from './generate-zod-schema'

function setIncludeSystemCollections(value: boolean): void {
	vi.doMock('../../config.json', () => {
		return {
			default: {
				zodSchema: {
					includeSystemCollections: value,
				},
			},
		}
	})
}

describe('generateZodSchema', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.resetModules()
		vi.resetAllMocks()
	})

	it('should import zod', async ({ expect }) => {
		vi.stubGlobal('$app', {
			findAllCollections: vi.fn().mockReturnValue([]),
		})

		const result = generateZodSchema()
		expect(result).toContain("import { z } from 'zod'")
	})

	it('should generate schema with datetime regex when date fields exist', async ({ expect }) => {
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

	it('should generate schema with datetime regex when autodate fields exist', async ({
		expect,
	}) => {
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

	it('should not generate schema with datetime regex when no date fields exist', async ({
		expect,
	}) => {
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

	it('should only generate schema for non-system collections when the option is set to false', async ({
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
		setIncludeSystemCollections(false)

		const { generateZodSchema } = await import('./generate-zod-schema')

		const result = generateZodSchema()
		expect(result).not.toContain('systemSchema')
	})

	it('should generate schema for all collections when the option is set to true', async ({
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
		setIncludeSystemCollections(true)

		const { generateZodSchema } = await import('./generate-zod-schema')

		const result = generateZodSchema()
		expect(result).toContain('systemSchema')
	})
})
