import { describe, it, vi, beforeEach } from 'vitest'
import { generateZodSchema } from './generate-zod-schema'

describe('generateZodSchema', () => {
	beforeEach(() => {
		global.$app = {
			findAllCollections: vi.fn().mockReturnValue([]),
		}
	})

	it('should import zod', ({ expect }) => {
		const result = generateZodSchema()
		expect(result).toContain("import { z } from 'zod'")
	})

	it('should generate schema with datetime regex when date fields exist', ({ expect }) => {
		global.$app.findAllCollections.mockReturnValue([
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
		])

		const result = generateZodSchema()
		expect(result).toContain('DATETIME_REGEX')
	})

	it('should generate schema with datetime regex when autodate fields exist', ({ expect }) => {
		global.$app.findAllCollections.mockReturnValue([
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
		])

		const result = generateZodSchema()
		expect(result).toContain('DATETIME_REGEX')
	})

	it('should not generate schema with datetime regex when no date fields exist', ({ expect }) => {
		global.$app.findAllCollections.mockReturnValue([
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
		])

		const result = generateZodSchema()
		expect(result).not.toContain('DATETIME_REGEX')
	})

	it('should only generate schema for non-system collections when the option is set to false', ({
		expect,
	}) => {
		global.$app.findAllCollections.mockReturnValue([
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
		])

		const result = generateZodSchema()
		expect(result).not.toContain('systemSchema')
	})

	it('should generate schema for all collections when the option is set to true', ({
		expect,
	}) => {
		global.$pb_schema_conf = {
			zodSchema: {
				includeSystemCollections: true,
			},
		}

		global.$app.findAllCollections.mockReturnValue([
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
		])

		const result = generateZodSchema(true)
		expect(result).toContain('systemSchema')
	})
})
