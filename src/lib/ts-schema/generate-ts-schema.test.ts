import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateTsSchema } from './generate-ts-schema'

describe('generateTsSchema', () => {
	beforeEach(() => {
		// Mock global $app object
		global.$app = {
			findAllCollections: vi.fn().mockReturnValue([]),
		}
		// Mock global $os object
		global.$os = {
			writeFile: vi.fn(),
		}
	})

	it('should return empty schema when no collections exist', () => {
		const result = generateTsSchema()
		expect(result).toContain('export type Schema = {')
	})

	it('should handle includeSystemCollections parameter', () => {
		const mockCollections = [
			{
				id: '1',
				name: 'users',
				system: true,
				fields: [],
				indexes: [],
			},
		]
		global.$app.findAllCollections = vi.fn().mockReturnValue(mockCollections)

		const resultWithSystem = generateTsSchema(true)
		expect(resultWithSystem).toContain('export interface Users ')

		const resultWithoutSystem = generateTsSchema(false)
		expect(resultWithoutSystem).not.toContain('export interface Users ')
	})

	it('should include unique identifier if necessary', () => {
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
		global.$app.findAllCollections = vi.fn().mockReturnValue(mockCollections)

		const result = generateTsSchema()
		expect(result).toContain('readonly [uniqueIdentifier]: unique symbol')
	})

	it('should not include unique identifier unless necessary', () => {
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
		global.$app.findAllCollections = vi.fn().mockReturnValue(mockCollections)

		const result = generateTsSchema()
		expect(result).not.toContain('readonly [uniqueIdentifier]: unique symbol')
	})
})
